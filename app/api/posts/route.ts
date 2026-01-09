import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

// Rate limiting configuration
const RATE_LIMIT = {
	windowMs: 60 * 1000, // 1 minute
	maxRequests: 30, // 30 requests per minute per IP
};

// Simple in-memory rate limiter (pour Edge Runtime)
const rateLimitMap = new Map<
	string,
	{ count: number; resetTime: number }
>();

function getRateLimitKey(request: NextRequest): string {
	// Utiliser l'IP du client pour le rate limiting
	const forwarded = request.headers.get("x-forwarded-for");
	const ip = forwarded ? forwarded.split(",")[0] : "unknown";
	return `posts:${ip}`;
}

function checkRateLimit(key: string): {
	allowed: boolean;
	remaining: number;
	resetTime: number;
} {
	const now = Date.now();
	const record = rateLimitMap.get(key);

	if (!record || now > record.resetTime) {
		// Nouveau window ou window expiré
		const resetTime = now + RATE_LIMIT.windowMs;
		rateLimitMap.set(key, { count: 1, resetTime });
		return {
			allowed: true,
			remaining: RATE_LIMIT.maxRequests - 1,
			resetTime,
		};
	}

	if (record.count >= RATE_LIMIT.maxRequests) {
		// Limite atteinte
		return {
			allowed: false,
			remaining: 0,
			resetTime: record.resetTime,
		};
	}

	// Incrémenter le compteur
	record.count++;
	rateLimitMap.set(key, record);

	return {
		allowed: true,
		remaining: RATE_LIMIT.maxRequests - record.count,
		resetTime: record.resetTime,
	};
}

// Validation des paramètres de requête
function validateQueryParams(searchParams: URLSearchParams): {
	valid: boolean;
	error?: string;
	params: {
		per_page: number;
		page: number;
		categories?: string;
		_embed: string;
	};
} {
	const perPage = parseInt(searchParams.get("per_page") || "10", 10);
	const page = parseInt(searchParams.get("page") || "1", 10);
	const categories = searchParams.get("categories") || undefined;

	// Validation stricte
	if (perPage < 1 || perPage > 100) {
		return {
			valid: false,
			error: "per_page must be between 1 and 100",
			params: { per_page: 10, page: 1, _embed: "1" },
		};
	}

	if (page < 1 || page > 1000) {
		return {
			valid: false,
			error: "page must be between 1 and 1000",
			params: { per_page: 10, page: 1, _embed: "1" },
		};
	}

	// Validation categories (doit être une liste de nombres)
	if (categories && !/^\d+(,\d+)*$/.test(categories)) {
		return {
			valid: false,
			error: "categories must be comma-separated numbers",
			params: { per_page: 10, page: 1, _embed: "1" },
		};
	}

	return {
		valid: true,
		params: {
			per_page: perPage,
			page,
			categories,
			_embed: "1",
		},
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

		// Validation des paramètres
		const { searchParams } = new URL(request.url);
		const validation = validateQueryParams(searchParams);

		if (!validation.valid) {
			return NextResponse.json(
				{
					error: "Invalid parameters",
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
		wpUrl.searchParams.set("per_page", validation.params.per_page.toString());
		wpUrl.searchParams.set("page", validation.params.page.toString());
		wpUrl.searchParams.set("_embed", validation.params._embed);
		if (validation.params.categories) {
			wpUrl.searchParams.set("categories", validation.params.categories);
		}

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
					message: `Failed to fetch posts: ${response.statusText}`,
				},
				{ status: response.status },
			);
		}

		const data = await response.json();
		const totalPages = response.headers.get("X-WP-TotalPages") || "1";
		const total = response.headers.get("X-WP-Total") || "0";

		// Réponse avec headers de rate limiting
		return NextResponse.json(data, {
			status: 200,
			headers: {
				"X-RateLimit-Limit": RATE_LIMIT.maxRequests.toString(),
				"X-RateLimit-Remaining": rateLimit.remaining.toString(),
				"X-RateLimit-Reset": new Date(rateLimit.resetTime).toISOString(),
				"X-WP-TotalPages": totalPages,
				"X-WP-Total": total,
				"Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
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
