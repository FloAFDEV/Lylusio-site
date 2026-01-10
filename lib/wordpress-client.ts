/**
 * WordPress API Client-Side Fetch Utility
 * Robust error handling, timeout, and fallbacks
 */

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'https://admin.lylusio.fr/wp-json/wp/v2';

interface WPPost {
  id: number;
  date: string;
  modified: string;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content?: { rendered: string };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
      media_details?: {
        width: number;
        height: number;
      };
    }>;
    author?: Array<{
      name: string;
    }>;
  };
}

interface WPCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
}

interface FetchPostsParams {
  perPage?: number;
  page?: number;
  categoryId?: number;
  orderBy?: 'date' | 'title' | 'modified';
  order?: 'asc' | 'desc';
}

interface FetchPostsResult {
  posts: WPPost[];
  total: number;
  totalPages: number;
  error?: string;
}

/**
 * Fetch with timeout and abort controller
 */
async function fetchWithTimeout(
  url: string,
  timeout = 8000
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      },
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`Request timeout after ${timeout}ms`);
    }
    throw error;
  }
}

/**
 * Fetch recent posts from WordPress API (client-side)
 */
export async function fetchRecentPosts(
  params: FetchPostsParams = {}
): Promise<FetchPostsResult> {
  const {
    perPage = 3,
    page = 1,
    categoryId,
    orderBy = 'date',
    order = 'desc',
  } = params;

  const queryParams = new URLSearchParams({
    _embed: 'true',
    per_page: perPage.toString(),
    page: page.toString(),
    orderby: orderBy,
    order: order,
  });

  if (categoryId) {
    queryParams.append('categories', categoryId.toString());
  }

  const url = `${WP_API_URL}/posts?${queryParams}`;

  try {
    const response = await fetchWithTimeout(url, 8000);

    if (!response.ok) {
      console.error(`WordPress API error: ${response.status} ${response.statusText}`);
      return {
        posts: [],
        total: 0,
        totalPages: 0,
        error: `API returned ${response.status}`,
      };
    }

    const posts: WPPost[] = await response.json();
    const totalPosts = response.headers.get('X-WP-Total');
    const totalPages = response.headers.get('X-WP-TotalPages');

    return {
      posts,
      total: totalPosts ? parseInt(totalPosts, 10) : posts.length,
      totalPages: totalPages ? parseInt(totalPages, 10) : 1,
    };
  } catch (error) {
    console.error('Error fetching WordPress posts:', error);
    return {
      posts: [],
      total: 0,
      totalPages: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Fetch categories from WordPress API (client-side)
 */
export async function fetchCategories(perPage = 50): Promise<WPCategory[]> {
  const queryParams = new URLSearchParams({
    per_page: perPage.toString(),
    orderby: 'name',
    order: 'asc',
  });

  const url = `${WP_API_URL}/categories?${queryParams}`;

  try {
    const response = await fetchWithTimeout(url, 5000);

    if (!response.ok) {
      console.error(`WordPress API error: ${response.status}`);
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching WordPress categories:', error);
    return [];
  }
}

/**
 * Strip HTML tags and decode entities
 */
export function stripHtml(html: string, maxLength = 120): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&hellip;/g, '...')
    .replace(/&ndash;/g, '–')
    .replace(/&mdash;/g, '—')
    .trim()
    .substring(0, maxLength);
}

/**
 * Format date in French locale
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export type { WPPost, WPCategory, FetchPostsParams, FetchPostsResult };
