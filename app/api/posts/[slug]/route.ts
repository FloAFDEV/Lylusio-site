import { NextRequest, NextResponse } from "next/server";

// ============================================================
// Rate Limiting (inchangé)
// ============================================================
const RATE_LIMIT = {
	windowMs: 60 * 1000,
	maxRequests: 60,
};

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function getRateLimitKey(request: NextRequest): string {
	const forwarded = request.headers.get("x-forwarded-for");
	const ip = forwarded ? forwarded.split(",")[0] : "unknown";
	return `post:${ip}`;
}

function checkRateLimit(key: string) {
	const now = Date.now();
	const record = rateLimitMap.get(key);

	if (!record || now > record.resetTime) {
		const resetTime = now + RATE_LIMIT.windowMs;
		rateLimitMap.set(key, { count: 1, resetTime });
		return {
			allowed: true,
			remaining: RATE_LIMIT.maxRequests - 1,
			resetTime,
		};
	}

	if (record.count >= RATE_LIMIT.maxRequests) {
		return { allowed: false, remaining: 0, resetTime: record.resetTime };
	}

	record.count++;
	rateLimitMap.set(key, record);

	return {
		allowed: true,
		remaining: RATE_LIMIT.maxRequests - record.count,
		resetTime: record.resetTime,
	};
}

// ============================================================
// Cache in-memory slug → article
// Limite les appels répétés à WordPress pour le même slug.
// ============================================================
interface CacheEntry {
	data: any;
	expiresAt: number;
}

const slugCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 2 * 60 * 60 * 1000; // 2 heures
const CACHE_MAX_ENTRIES = 500;

function getCached(key: string): any | null {
	const entry = slugCache.get(key);
	if (!entry) return null;
	if (Date.now() > entry.expiresAt) {
		slugCache.delete(key);
		return null;
	}
	return entry.data;
}

function setCache(key: string, data: any): void {
	// Éviction FIFO si le cache est plein
	if (slugCache.size >= CACHE_MAX_ENTRIES) {
		const firstKey = slugCache.keys().next().value;
		if (firstKey !== undefined) slugCache.delete(firstKey);
	}
	slugCache.set(key, { data, expiresAt: Date.now() + CACHE_TTL_MS });
}

// ============================================================
// Slug Utilities
// ============================================================

/**
 * Décode un slug en gérant :
 * - l'encodage simple (%27 → ')
 * - le double-encodage (%2527 → %27 → ')
 * - les URI malformés (décodage byte-par-byte en fallback)
 */
function safeDecode(str: string): string {
	try {
		const once = decodeURIComponent(str);
		try {
			const twice = decodeURIComponent(once);
			// Ne retourne le double-décodage que s'il produit un résultat différent
			return twice !== once ? twice : once;
		} catch {
			return once;
		}
	} catch {
		// URI malformé : décodage partiel byte-par-byte
		return str.replace(/%[0-9A-Fa-f]{2}/g, (encoded) => {
			try {
				return decodeURIComponent(encoded);
			} catch {
				return encoded;
			}
		});
	}
}

/**
 * Normalisation compatible WordPress (sanitize_title_with_dashes).
 *
 * Règles, dans l'ordre :
 *   1. Minuscule
 *   2. NFD → suppression des diacritiques (é→e, à→a, ç→c…)
 *   3. Apostrophes/guillemets → rien (WP les supprime, pas de tiret)
 *   4. Tirets longs → tiret simple
 *   5. Flèches Unicode → tiret (→ ← ↔ …)
 *   6. Ponctuation générale Unicode → espace
 *   7. Tout caractère restant non-ASCII → tiret
 *   8. Espaces/underscores → tiret
 *   9. Tirets multiples → un seul
 *  10. Tirets en début/fin → supprimés
 */
function normalizeSlug(str: string): string {
	return str
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")           // diacritiques combinants
		.replace(/[\u2018\u2019\u02bc\u0027]/g, "") // apostrophes typographiques et ASCII → rien
		.replace(/[\u00ab\u00bb\u2039\u203a]/g, "") // guillemets « » ‹ › → rien
		.replace(/[\u2013\u2014\u2012]/g, "-")      // tirets longs – — ‒ → tiret
		.replace(/[\u2190-\u21ff]/g, "-")           // flèches Unicode → tiret
		.replace(/[\u2000-\u206f]/g, " ")           // ponctuation Unicode générale → espace
		.replace(/[^a-z0-9\s-]/g, "-")             // tout autre caractère non-ASCII → tiret
		.replace(/[\s_]+/g, "-")                   // espaces / underscores → tiret
		.replace(/-+/g, "-")                       // tirets multiples → un seul
		.replace(/^-|-$/g, "");                    // tirets en début/fin → supprimés
}

/**
 * Construit les variantes dans l'ordre de probabilité vis-à-vis du format WordPress.
 *
 * Ordre (du plus probable au moins probable) :
 *   1. ASCII pur — format standard WordPress (sanitize_title_with_dashes)
 *   2. NFD normalisé — WordPress avec plugin d'accents (Polylang, WPML…)
 *   3. Décodé brut — WordPress en mode Unicode slug
 *   4. Minuscule simple — dernier recours
 *
 * Le Set garantit l'unicité : aucune requête dupliquée vers WP.
 */
function buildSlugVariants(decoded: string): string[] {
	const seen = new Set<string>();
	const variants: string[] = [];

	const add = (v: string) => {
		const trimmed = v.trim();
		if (trimmed && !seen.has(trimmed)) {
			seen.add(trimmed);
			variants.push(trimmed);
		}
	};

	// 1. ASCII pur : format WP standard (le plus fiable en premier)
	add(
		decoded
			.toLowerCase()
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")           // diacritiques
			.replace(/[\u2018\u2019\u02bc\u0027]/g, "") // apostrophes → rien
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/-+/g, "-")
			.replace(/^-|-$/g, ""),
	);

	// 2. NFD complet (caractères spéciaux gérés, accents supprimés)
	add(normalizeSlug(decoded));

	// 3. Décodé brut (WP Unicode mode)
	add(decoded);

	// 4. Minuscule simple
	add(decoded.toLowerCase());

	return variants;
}

// ============================================================
// WordPress Fetch Helpers
// Chaque helper possède son propre AbortController + timeout.
// ============================================================

async function fetchBySlug(
	wpApiUrl: string,
	slug: string,
	timeoutMs = 8000,
): Promise<any[]> {
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), timeoutMs);

	try {
		const url = new URL(`${wpApiUrl}/posts`);
		url.searchParams.set("slug", slug);
		url.searchParams.set("_embed", "1");

		const res = await fetch(url.toString(), {
			signal: controller.signal,
			headers: { Accept: "application/json" },
		});

		clearTimeout(timer);
		if (!res.ok) return [];
		const data = await res.json();
		return Array.isArray(data) ? data : [];
	} catch {
		clearTimeout(timer);
		return [];
	}
}

async function fetchBySearch(
	wpApiUrl: string,
	query: string,
	perPage = 10,
	timeoutMs = 8000,
): Promise<any[]> {
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), timeoutMs);

	try {
		const url = new URL(`${wpApiUrl}/posts`);
		url.searchParams.set("search", query);
		url.searchParams.set("per_page", String(perPage));
		url.searchParams.set("_embed", "1");

		const res = await fetch(url.toString(), {
			signal: controller.signal,
			headers: { Accept: "application/json" },
		});

		clearTimeout(timer);
		if (!res.ok) return [];
		const data = await res.json();
		return Array.isArray(data) ? data : [];
	} catch {
		clearTimeout(timer);
		return [];
	}
}

// ============================================================
// Matching intelligent avec scoring par tokens
// ============================================================

/**
 * Extrait les tokens significatifs d'un slug normalisé.
 * Les tokens < 3 caractères (articles, prépositions…) sont exclus
 * pour éviter les faux positifs sur des mots courts.
 */
function extractTokens(slug: string): Set<string> {
	return new Set(
		normalizeSlug(slug)
			.split("-")
			.filter((t) => t.length >= 3),
	);
}

/**
 * Calcule le taux de recouvrement de tokens entre deux slugs.
 * Retourne un score entre 0 (aucun token commun) et 1 (identiques).
 */
function tokenOverlapScore(slugA: string, slugB: string): number {
	const tokensA = extractTokens(slugA);
	const tokensB = extractTokens(slugB);
	if (!tokensA.size || !tokensB.size) return 0;

	let matches = 0;
	for (const t of tokensA) {
		if (tokensB.has(t)) matches++;
	}
	return matches / Math.max(tokensA.size, tokensB.size);
}

/**
 * Sélectionne le meilleur article parmi les candidats WP.
 *
 * Niveaux de matching (ordre décroissant de fiabilité) :
 *   1. Slug exact (identique)
 *   2. Casse insensible
 *   3. Slug normalisé exact (NFD + caractères spéciaux)
 *   4. Recouvrement tokens ≥ 80 % (haute confiance)
 *   5. Recouvrement tokens ≥ 60 % avec ≥ 3 tokens cibles (confiance moyenne)
 *
 * Aucune heuristique "contains" ou "prefix" seule → évite les faux positifs.
 */
function findBestMatch(posts: any[], targetSlug: string): any | null {
	if (!posts.length) return null;

	const normalizedTarget = normalizeSlug(targetSlug);
	const lowerTarget = targetSlug.toLowerCase();

	// 1. Slug exact
	const exact = posts.find((p) => p.slug === targetSlug);
	if (exact) return exact;

	// 2. Casse insensible
	const caseMatch = posts.find(
		(p) => typeof p.slug === "string" && p.slug.toLowerCase() === lowerTarget,
	);
	if (caseMatch) return caseMatch;

	// 3. Normalisé exact
	const normMatch = posts.find(
		(p) =>
			typeof p.slug === "string" && normalizeSlug(p.slug) === normalizedTarget,
	);
	if (normMatch) return normMatch;

	// 4. Scoring par tokens — haute confiance (≥ 80 %)
	const scoredPosts = posts
		.filter((p) => typeof p.slug === "string")
		.map((p) => ({
			post: p,
			score: tokenOverlapScore(p.slug, targetSlug),
		}))
		.sort((a, b) => b.score - a.score);

	if (scoredPosts.length > 0 && scoredPosts[0].score >= 0.8) {
		return scoredPosts[0].post;
	}

	// 5. Scoring par tokens — confiance moyenne (≥ 60 %), uniquement si
	//    le slug cible contient assez de tokens pour que le score soit fiable
	const targetTokenCount = extractTokens(targetSlug).size;
	if (targetTokenCount >= 3 && scoredPosts.length > 0 && scoredPosts[0].score >= 0.6) {
		return scoredPosts[0].post;
	}

	return null;
}

// ============================================================
// GET Handler
// ============================================================

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ slug: string }> },
) {
	try {
		// ── Rate limit ──────────────────────────────────────────
		const rateLimit = checkRateLimit(getRateLimitKey(request));
		if (!rateLimit.allowed) {
			return NextResponse.json(
				{ error: "Too many requests" },
				{ status: 429 },
			);
		}

		const { slug } = await params;

		if (!slug || slug.length > 300) {
			return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
		}

		const wpApiUrl = process.env.NEXT_PUBLIC_WP_API_URL;
		if (!wpApiUrl) {
			return NextResponse.json(
				{ error: "WP API not configured" },
				{ status: 500 },
			);
		}

		// ── Décodage et clé de cache ────────────────────────────
		const decodedSlug = safeDecode(slug);
		const cacheKey = normalizeSlug(decodedSlug);

		// ── Vérification du cache ───────────────────────────────
		const cached = getCached(cacheKey);
		if (cached) {
			return NextResponse.json(cached, {
				status: 200,
				headers: {
					"Cache-Control":
						"public, s-maxage=86400, stale-while-revalidate=604800",
					"X-Cache": "HIT",
				},
			});
		}

		// ── Étape 1 : essai en parallèle de toutes les variantes ──
		// Ordre : ASCII pur → NFD → brut → lowercase
		// Dédupliquées → pas de requête WP redondante
		const variants = buildSlugVariants(decodedSlug);

		const variantResults = await Promise.all(
			variants.map((v) => fetchBySlug(wpApiUrl, v, 8000)),
		);

		for (const results of variantResults) {
			if (results.length > 0) {
				setCache(cacheKey, results[0]);
				return NextResponse.json(results[0], {
					status: 200,
					headers: {
						"Cache-Control":
							"public, s-maxage=86400, stale-while-revalidate=604800",
						"X-Cache": "MISS",
					},
				});
			}
		}

		// ── Étape 2 : recherche textuelle + matching par tokens ──
		// Converti en mots (hyphens → espaces) pour une meilleure pertinence WP
		const searchTerms = cacheKey.replace(/-/g, " ");
		const searchResults = await fetchBySearch(wpApiUrl, searchTerms, 10, 8000);
		const match = findBestMatch(searchResults, decodedSlug);

		if (match) {
			setCache(cacheKey, match);
			return NextResponse.json(match, {
				status: 200,
				headers: {
					"Cache-Control":
						"public, s-maxage=86400, stale-while-revalidate=604800",
					"X-Cache": "MISS",
				},
			});
		}

		// ── Étape 3 : dernier recours — recherche avec le slug brut ──
		// Utile si WordPress utilise des slugs Unicode non-normalisés
		if (decodedSlug !== searchTerms) {
			const rawResults = await fetchBySearch(wpApiUrl, decodedSlug, 5, 8000);
			const rawMatch = findBestMatch(rawResults, decodedSlug);

			if (rawMatch) {
				setCache(cacheKey, rawMatch);
				return NextResponse.json(rawMatch, {
					status: 200,
					headers: {
						"Cache-Control":
							"public, s-maxage=86400, stale-while-revalidate=604800",
						"X-Cache": "MISS",
					},
				});
			}
		}

		// ── Aucun résultat fiable → 404 ──────────────────────────
		return NextResponse.json({ error: "Post not found" }, { status: 404 });
	} catch (error) {
		if (error instanceof Error && error.name === "AbortError") {
			return NextResponse.json({ error: "Timeout" }, { status: 504 });
		}
		return NextResponse.json({ error: "Internal error" }, { status: 500 });
	}
}
