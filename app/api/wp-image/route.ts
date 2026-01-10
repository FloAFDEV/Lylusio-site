import { NextRequest, NextResponse } from "next/server";

// Removed edge runtime to allow static page generation
// export const runtime = "edge";

// Rate limiting configuration
const RATE_LIMIT = {
	windowMs: 60 * 1000, // 1 minute
	maxRequests: 100, // 100 requests per minute per IP
};

// Simple in-memory rate limiter
const rateLimitMap = new Map<
	string,
	{ count: number; resetTime: number }
>();

function getRateLimitKey(request: NextRequest): string {
	const forwarded = request.headers.get("x-forwarded-for");
	const ip = forwarded ? forwarded.split(",")[0] : "unknown";
	return `wp-image:${ip}`;
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

/**
 * Edge Function pour servir les images WordPress
 * Permet l'optimisation Next.js (WebP, AVIF, resize, lazy-load)
 * tout en fetch depuis admin.lylusio.fr
 *
 * Usage: /api/wp-image?url=/wp-content/uploads/2024/01/image.jpg
 */
export async function GET(request: NextRequest) {
	try {
		// Rate limiting
		const rateLimitKey = getRateLimitKey(request);
		const rateLimit = checkRateLimit(rateLimitKey);

		if (!rateLimit.allowed) {
			const retryAfter = Math.ceil(
				(rateLimit.resetTime - Date.now()) / 1000,
			);
			return new NextResponse("Too many requests", {
				status: 429,
				headers: {
					"Retry-After": retryAfter.toString(),
					"X-RateLimit-Limit": RATE_LIMIT.maxRequests.toString(),
					"X-RateLimit-Remaining": "0",
					"X-RateLimit-Reset": new Date(
						rateLimit.resetTime,
					).toISOString(),
				},
			});
		}

		// Récupération du paramètre URL
		const { searchParams } = new URL(request.url);
		const imageUrl = searchParams.get("url");

		if (!imageUrl) {
			console.error("[wp-image] Missing url parameter");
			return new NextResponse("Missing url parameter", { status: 400 });
		}

		console.log("[wp-image] Requested URL:", imageUrl);

		// Validation de l'URL (doit commencer par /wp-content/)
		if (!imageUrl.startsWith("/wp-content/")) {
			console.error(
				"[wp-image] Invalid path - does not start with /wp-content/:",
				imageUrl,
			);
			return new NextResponse("Invalid image path", { status: 400 });
		}

		// Protection contre path traversal (mais pas contre //)
		if (imageUrl.includes("..")) {
			console.error("[wp-image] Path traversal attempt:", imageUrl);
			return new NextResponse("Invalid image path", { status: 400 });
		}

		// Construction de l'URL complète vers admin.lylusio.fr
		const fullImageUrl = `https://admin.lylusio.fr${imageUrl}`;
		console.log("[wp-image] Fetching from:", fullImageUrl);

		// Fetch l'image depuis WordPress
		const controller = new AbortController();
		const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout

		const response = await fetch(fullImageUrl, {
			signal: controller.signal,
			headers: {
				"User-Agent": "Lylusio-NextJS/1.0",
			},
		});

		clearTimeout(timeout);

		if (!response.ok) {
			// En cas d'erreur, retourner l'image fallback (logo Lylusio)
			console.error(
				`[wp-image] Failed to fetch from WordPress: ${response.status} - ${fullImageUrl}`,
			);

			// Retourner une réponse 404 avec headers appropriés
			// Next.js Image component gérera le fallback via onError
			return new NextResponse("Image not found", {
				status: 404,
				headers: {
					"Cache-Control": "public, max-age=300", // Cache court pour les 404
				},
			});
		}

		// Récupérer le type de contenu
		const contentType = response.headers.get("content-type") || "image/jpeg";

		// Vérifier que c'est bien une image
		if (!contentType.startsWith("image/")) {
			return new NextResponse("Invalid content type", { status: 400 });
		}

		// Retourner l'image avec les headers appropriés
		const imageBuffer = await response.arrayBuffer();

		return new NextResponse(imageBuffer, {
			status: 200,
			headers: {
				"Content-Type": contentType,
				"Cache-Control":
					"public, max-age=31536000, immutable", // Cache 1 an
				"X-RateLimit-Limit": RATE_LIMIT.maxRequests.toString(),
				"X-RateLimit-Remaining": rateLimit.remaining.toString(),
				"X-RateLimit-Reset": new Date(rateLimit.resetTime).toISOString(),
				// Headers pour Next.js Image Optimization
				"Accept-Ranges": "bytes",
			},
		});
	} catch (error) {
		console.error("Edge Function error:", error);

		if (error instanceof Error && error.name === "AbortError") {
			return new NextResponse("Request timeout", { status: 504 });
		}

		// En cas d'erreur serveur, retourner 500
		return new NextResponse("Internal server error", { status: 500 });
	}
}
