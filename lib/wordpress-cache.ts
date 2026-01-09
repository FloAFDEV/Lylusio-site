/**
 * WordPress API Cache Layer
 * Optimized fetch with deduplication, ISR, and error handling
 * 🔒 Sécurisé via Edge Functions avec rate limiting
 */

// URL des Edge Functions internes (pas d'appel direct à WordPress)
const API_BASE_URL =
	process.env.NEXT_PUBLIC_SITE_URL || "https://lylusio.fr";

// Cache duration constants (in seconds)
export const CACHE_DURATIONS = {
	POSTS: 3600, // 1 hour
	POST_SINGLE: 7200, // 2 hours
	CATEGORIES: 21600, // 6 hours
	SITEMAP: 3600, // 1 hour
} as const;

interface FetchOptions {
	revalidate?: number;
	tags?: string[];
	timeout?: number;
}

/**
 * Optimized fetch with automatic retry and timeout
 */
async function fetchWithTimeout(
	url: string,
	options: RequestInit & { timeout?: number } = {}
): Promise<Response> {
	const { timeout = 10000, ...fetchOptions } = options;

	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), timeout);

	try {
		const response = await fetch(url, {
			...fetchOptions,
			signal: controller.signal,
		});
		clearTimeout(timeoutId);
		return response;
	} catch (error) {
		clearTimeout(timeoutId);
		if (error instanceof Error && error.name === "AbortError") {
			throw new Error(`Request timeout after ${timeout}ms: ${url}`);
		}
		throw error;
	}
}

/**
 * Fetch WordPress posts with cache and deduplication
 */
export async function fetchPosts(params: {
	perPage?: number;
	page?: number;
	embed?: boolean;
	categoryId?: number;
	slug?: string;
	fields?: string;
	revalidate?: number;
}) {
	const {
		perPage = 20,
		page = 1,
		embed = true,
		categoryId,
		slug,
		fields,
		revalidate = CACHE_DURATIONS.POSTS,
	} = params;

	// Utiliser Edge Function pour un seul post (par slug)
	if (slug) {
		const url = `${API_BASE_URL}/api/posts/${slug}`;
		try {
			const response = await fetchWithTimeout(url, {
				next: {
					revalidate,
					tags: ["wordpress-posts", `post-${slug}`],
				},
				timeout: 8000,
			});

			if (!response.ok) {
				throw new Error(`Edge Function error: ${response.status}`);
			}

			const data = await response.json();
			return {
				posts: [data],
				total: 1,
				totalPages: 1,
			};
		} catch (error) {
			console.error("Error fetching WordPress posts:", error);
			return {
				posts: [],
				total: 0,
				totalPages: 0,
			};
		}
	}

	// Utiliser Edge Function pour liste de posts
	const queryParams = new URLSearchParams({
		per_page: perPage.toString(),
		page: page.toString(),
		...(embed && { _embed: "1" }),
		...(categoryId && { categories: categoryId.toString() }),
	});

	const url = `${API_BASE_URL}/api/posts?${queryParams}`;

	try {
		const response = await fetchWithTimeout(url, {
			next: {
				revalidate,
				tags: ["wordpress-posts", "posts-list"],
			},
			timeout: 8000,
		});

		if (!response.ok) {
			throw new Error(`Edge Function error: ${response.status}`);
		}

		const data = await response.json();

		// Return both data and total count from headers
		const totalPosts = response.headers.get("X-WP-Total");
		const totalPages = response.headers.get("X-WP-TotalPages");

		return {
			posts: data,
			total: totalPosts ? parseInt(totalPosts, 10) : data.length,
			totalPages: totalPages ? parseInt(totalPages, 10) : 1,
		};
	} catch (error) {
		console.error("Error fetching WordPress posts:", error);

		// Return empty fallback instead of throwing
		return {
			posts: [],
			total: 0,
			totalPages: 0,
		};
	}
}

/**
 * Fetch single post by slug with extended cache
 */
export async function fetchPostBySlug(slug: string, revalidate?: number) {
	const result = await fetchPosts({
		slug,
		embed: true,
		perPage: 1,
		revalidate: revalidate || CACHE_DURATIONS.POST_SINGLE,
	});

	return result.posts[0] || null;
}

/**
 * Fetch WordPress categories with long cache
 * 🔒 Utilise Edge Function avec rate limiting
 */
export async function fetchCategories(params?: {
	perPage?: number;
	fields?: string;
	revalidate?: number;
}) {
	const { revalidate = CACHE_DURATIONS.CATEGORIES } = params || {};

	// Utiliser Edge Function pour les catégories
	const url = `${API_BASE_URL}/api/categories`;

	try {
		const response = await fetchWithTimeout(url, {
			next: {
				revalidate,
				tags: ["wordpress-categories"],
			},
			timeout: 5000,
		});

		if (!response.ok) {
			throw new Error(`Edge Function error: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error("Error fetching WordPress categories:", error);
		return [];
	}
}

/**
 * Fetch category by slug
 * Optimisé : utilise fetchCategories (déjà caché) et filtre côté client
 */
export async function fetchCategoryBySlug(
	slug: string,
	revalidate = CACHE_DURATIONS.CATEGORIES
) {
	try {
		// Récupérer toutes les catégories (déjà caché longtemps)
		const categories = await fetchCategories({ revalidate });

		// Filtrer par slug côté client
		const category = categories.find(
			(cat: any) => cat.slug === slug
		);

		return category || null;
	} catch (error) {
		console.error(`Error fetching category ${slug}:`, error);
		return null;
	}
}

/**
 * Batch fetch multiple posts by slugs (deduplication)
 */
export async function fetchPostsBatch(
	slugs: string[],
	revalidate = CACHE_DURATIONS.POSTS
) {
	// Deduplicate slugs
	const uniqueSlugs = Array.from(new Set(slugs));

	// Fetch in parallel with deduplication
	const results = await Promise.allSettled(
		uniqueSlugs.map((slug) => fetchPostBySlug(slug, revalidate))
	);

	return results
		.filter(
			(result): result is PromiseFulfilledResult<any> =>
				result.status === "fulfilled"
		)
		.map((result) => result.value)
		.filter(Boolean);
}

/**
 * Revalidate WordPress content (for on-demand revalidation)
 */
export async function revalidateWordPressContent(tags: string[]) {
	// This would be called from an API route with revalidateTag()
	// Example: await revalidateTag('wordpress-posts')
	if (process.env.NODE_ENV === "development") {
		console.log("Would revalidate tags:", tags);
	}
}
