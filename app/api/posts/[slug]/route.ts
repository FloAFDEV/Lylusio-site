import { NextRequest, NextResponse } from "next/server";

// Removed edge runtime to allow static page generation
// export const runtime = "edge";

// Rate limiting configuration
const RATE_LIMIT = {
	windowMs: 60 * 1000, // 1 minute
	maxRequests: 60, // 60 requests per minute per IP (plus généreux pour articles individuels)
};

// Simple in-memory rate limiter
const rateLimitMap = new Map<
	string,
	{ count: number; resetTime: number }
>();

function getRateLimitKey(request: NextRequest): string {
	const forwarded = request.headers.get("x-forwarded-for");
	const ip = forwarded ? forwarded.split(",")[0] : "unknown";
	return `post:${ip}`;
}

function checkRateLimit(key: string): {
	allowed: boolean;
	remaining: number;
	resetTime: number;
} {
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
		return {
			allowed: false,
			remaining: 0,
			resetTime: record.resetTime,
		};
	}

	record.count++;
	rateLimitMap.set(key, record);

	return {
		allowed: true,
		remaining: RATE_LIMIT.maxRequests - record.count,
		resetTime: record.resetTime,
	};
}

// Validation du slug
function validateSlug(slug: string): { valid: boolean; error?: string } {
	// Décoder le slug si encodé (pour supporter les caractères Unicode)
	let decodedSlug = slug;
	try {
		decodedSlug = decodeURIComponent(slug);
	} catch (e) {
		// Si décodage échoue, utiliser slug original
	}

	// Slug peut contenir alphanumerique, tirets, underscores, et caractères Unicode
	// Maximum 300 caractères pour supporter les slugs WordPress complexes
	if (decodedSlug.length === 0 || decodedSlug.length > 300) {
		return {
			valid: false,
			error: "Slug length must be between 1 and 300 characters",
		};
	}

	// Protection contre path traversal
	if (decodedSlug.includes("..") || decodedSlug.includes("//")) {
		return {
			valid: false,
			error: "Invalid slug: path traversal detected",
		};
	}

	// Bloquer les caractères vraiment dangereux
	if (
		decodedSlug.includes("<") ||
		decodedSlug.includes(">") ||
		decodedSlug.includes("'") ||
		decodedSlug.includes('"')
	) {
		return {
			valid: false,
			error: "Invalid slug: contains forbidden characters",
		};
	}

	return { valid: true };
}

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ slug: string }> },
) {
	try {
		// Rate limiting
		const rateLimitKey = getRateLimitKey(request);
		const rateLimit = checkRateLimit(rateLimitKey);

		if (!rateLimit.allowed) {
			const retryAfter = Math.ceil(
				(rateLimit.resetTime - Date.now()) / 1000,
			);
			return NextResponse.json(
				{
					error: "Too many requests",
					message: "Rate limit exceeded. Please try again later.",
				},
				{
					status: 429,
					headers: {
						"Retry-After": retryAfter.toString(),
						"X-RateLimit-Limit": RATE_LIMIT.maxRequests.toString(),
						"X-RateLimit-Remaining": "0",
						"X-RateLimit-Reset": new Date(
							rateLimit.resetTime,
						).toISOString(),
					},
				},
			);
		}

		// Récupération du slug
		const { slug } = await params;

		// Validation du slug
		const validation = validateSlug(slug);
		if (!validation.valid) {
			return NextResponse.json(
				{
					error: "Invalid slug",
					message: validation.error,
				},
				{ status: 400 },
			);
		}

		// Construction de l'URL WordPress
		const wpApiUrl = process.env.NEXT_PUBLIC_WP_API_URL;
		if (!wpApiUrl) {
			console.error("NEXT_PUBLIC_WP_API_URL is not defined");
			return NextResponse.json(
				{
					error: "Configuration error",
					message: "WordPress API URL not configured",
				},
				{ status: 500 },
			);
		}

		const wpUrl = new URL(`${wpApiUrl}/posts`);
		wpUrl.searchParams.set("slug", slug);
		wpUrl.searchParams.set("_embed", "1");

		// Appel à WordPress avec timeout
		const controller = new AbortController();
		const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

		const response = await fetch(wpUrl.toString(), {
			signal: controller.signal,
			headers: {
				Accept: "application/json",
				"User-Agent": "Lylusio-NextJS/1.0",
			},
		});

		clearTimeout(timeout);

		if (!response.ok) {
			console.error(
				`WordPress API error: ${response.status} ${response.statusText}`,
			);
			return NextResponse.json(
				{
					error: "WordPress API error",
					message: `Failed to fetch post: ${response.statusText}`,
				},
				{ status: response.status },
			);
		}

		const data = await response.json();

		// WordPress retourne un tableau, même pour un seul article
		if (!Array.isArray(data) || data.length === 0) {
			return NextResponse.json(
				{
					error: "Not found",
					message: "Post not found",
				},
				{ status: 404 },
			);
		}

		// Réponse avec headers de rate limiting et cache agressif
		return NextResponse.json(data[0], {
			status: 200,
			headers: {
				"X-RateLimit-Limit": RATE_LIMIT.maxRequests.toString(),
				"X-RateLimit-Remaining": rateLimit.remaining.toString(),
				"X-RateLimit-Reset": new Date(rateLimit.resetTime).toISOString(),
				// Cache plus long pour articles individuels (24h)
				"Cache-Control":
					"public, s-maxage=86400, stale-while-revalidate=604800",
			},
		});
	} catch (error) {
		console.error("Edge Function error:", error);

		if (error instanceof Error && error.name === "AbortError") {
			return NextResponse.json(
				{
					error: "Request timeout",
					message: "WordPress API request timed out",
				},
				{ status: 504 },
			);
		}

		return NextResponse.json(
			{
				error: "Internal server error",
				message: "An unexpected error occurred",
			},
			{ status: 500 },
		);
	}
}
