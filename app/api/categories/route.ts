import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

// Rate limiting configuration
const RATE_LIMIT = {
	windowMs: 60 * 1000, // 1 minute
	maxRequests: 30, // 30 requests per minute per IP
};

// Simple in-memory rate limiter
const rateLimitMap = new Map<
	string,
	{ count: number; resetTime: number }
>();

function getRateLimitKey(request: NextRequest): string {
	const forwarded = request.headers.get("x-forwarded-for");
	const ip = forwarded ? forwarded.split(",")[0] : "unknown";
	return `categories:${ip}`;
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

export async function GET(request: NextRequest) {
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

		const wpUrl = new URL(`${wpApiUrl}/categories`);
		wpUrl.searchParams.set("per_page", "100"); // Toutes les catégories
		wpUrl.searchParams.set("orderby", "name");
		wpUrl.searchParams.set("order", "asc");

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
					message: `Failed to fetch categories: ${response.statusText}`,
				},
				{ status: response.status },
			);
		}

		const data = await response.json();

		// Réponse avec headers de rate limiting et cache très agressif (les catégories changent rarement)
		return NextResponse.json(data, {
			status: 200,
			headers: {
				"X-RateLimit-Limit": RATE_LIMIT.maxRequests.toString(),
				"X-RateLimit-Remaining": rateLimit.remaining.toString(),
				"X-RateLimit-Reset": new Date(rateLimit.resetTime).toISOString(),
				// Cache très long pour les catégories (7 jours)
				"Cache-Control":
					"public, s-maxage=604800, stale-while-revalidate=2592000",
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
