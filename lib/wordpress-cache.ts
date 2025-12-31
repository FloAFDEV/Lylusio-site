/**
 * WordPress API Cache Layer
 * Optimized fetch with deduplication, ISR, and error handling
 */

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'https://lylusio.fr/wp-json/wp/v2';

// Cache duration constants (in seconds)
export const CACHE_DURATIONS = {
  POSTS: 3600,        // 1 hour
  POST_SINGLE: 7200,  // 2 hours
  CATEGORIES: 21600,  // 6 hours
  SITEMAP: 3600,      // 1 hour
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
    if (error instanceof Error && error.name === 'AbortError') {
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

  const queryParams = new URLSearchParams({
    per_page: perPage.toString(),
    page: page.toString(),
    ...(embed && { _embed: 'true' }),
    ...(categoryId && { categories: categoryId.toString() }),
    ...(slug && { slug }),
    ...(fields && { _fields: fields }),
  });

  const url = `${WP_API_URL}/posts?${queryParams}`;

  try {
    const response = await fetchWithTimeout(url, {
      next: {
        revalidate,
        tags: ['wordpress-posts', slug ? `post-${slug}` : 'posts-list'],
      },
      timeout: 8000,
    });

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

    const data = await response.json();

    // Return both data and total count from headers
    const totalPosts = response.headers.get('X-WP-Total');
    const totalPages = response.headers.get('X-WP-TotalPages');

    return {
      posts: data,
      total: totalPosts ? parseInt(totalPosts, 10) : data.length,
      totalPages: totalPages ? parseInt(totalPages, 10) : 1,
    };
  } catch (error) {
    console.error('Error fetching WordPress posts:', error);

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
 */
export async function fetchCategories(params?: {
  perPage?: number;
  fields?: string;
  revalidate?: number;
}) {
  const {
    perPage = 50,
    fields,
    revalidate = CACHE_DURATIONS.CATEGORIES,
  } = params || {};

  const queryParams = new URLSearchParams({
    per_page: perPage.toString(),
    ...(fields && { _fields: fields }),
  });

  const url = `${WP_API_URL}/categories?${queryParams}`;

  try {
    const response = await fetchWithTimeout(url, {
      next: {
        revalidate,
        tags: ['wordpress-categories'],
      },
      timeout: 5000,
    });

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching WordPress categories:', error);
    return [];
  }
}

/**
 * Fetch category by slug
 */
export async function fetchCategoryBySlug(slug: string, revalidate = CACHE_DURATIONS.CATEGORIES) {
  const queryParams = new URLSearchParams({
    slug,
  });

  const url = `${WP_API_URL}/categories?${queryParams}`;

  try {
    const response = await fetchWithTimeout(url, {
      next: {
        revalidate,
        tags: ['wordpress-categories', `category-${slug}`],
      },
      timeout: 5000,
    });

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

    const data = await response.json();
    return data[0] || null;
  } catch (error) {
    console.error(`Error fetching category ${slug}:`, error);
    return null;
  }
}

/**
 * Batch fetch multiple posts by slugs (deduplication)
 */
export async function fetchPostsBatch(slugs: string[], revalidate = CACHE_DURATIONS.POSTS) {
  // Deduplicate slugs
  const uniqueSlugs = Array.from(new Set(slugs));

  // Fetch in parallel with deduplication
  const results = await Promise.allSettled(
    uniqueSlugs.map(slug => fetchPostBySlug(slug, revalidate))
  );

  return results
    .filter((result): result is PromiseFulfilledResult<any> => result.status === 'fulfilled')
    .map(result => result.value)
    .filter(Boolean);
}

/**
 * Revalidate WordPress content (for on-demand revalidation)
 */
export async function revalidateWordPressContent(tags: string[]) {
  // This would be called from an API route with revalidateTag()
  // Example: await revalidateTag('wordpress-posts')
  if (process.env.NODE_ENV === 'development') {
    console.log('Would revalidate tags:', tags);
  }
}
