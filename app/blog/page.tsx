import { Metadata } from 'next';
import BlogClientWrapper from '@/src/page-components/BlogClientWrapper';
import { generateMetadata as genMeta } from '@/content/seo';
import { fetchPosts, fetchCategories, CACHE_DURATIONS } from '@/lib/wordpress-cache';

// ISR: 1 hour - configured via fetch options

export const metadata: Metadata = genMeta('blog');

interface WPPost {
  id: number;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  categories: number[];
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    'wp:term'?: Array<
      Array<{
        id: number;
        name: string;
        slug: string;
      }>
    >;
  };
}

interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

// Server-safe HTML stripping
const stripHtml = (html: string): string => {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

async function fetchBlogPosts() {
  try {
    // Fetch first page to get total count - using optimized cache
    const firstPage = await fetchPosts({
      perPage: 20,
      page: 1,
      embed: true,
      revalidate: CACHE_DURATIONS.POSTS,
    });

    let allPosts = firstPage.posts;

    // Fetch remaining pages if there are more (up to 100 total posts = 5 pages)
    if (firstPage.totalPages > 1) {
      const maxPages = Math.min(firstPage.totalPages, 5);
      const pagePromises = [];

      for (let page = 2; page <= maxPages; page++) {
        pagePromises.push(
          fetchPosts({
            perPage: 20,
            page,
            embed: true,
            revalidate: CACHE_DURATIONS.POSTS,
          })
        );
      }

      const additionalPages = await Promise.all(pagePromises);
      additionalPages.forEach(({ posts }) => allPosts.push(...posts));
    }

    return allPosts.map((post: WPPost) => {
      const imageObj = post._embedded?.['wp:featuredmedia']?.[0];
      const imageUrl = imageObj?.source_url || '/placeholder.svg';
      const imageAlt = imageObj?.alt_text || stripHtml(post.title.rendered);

      const categories =
        post._embedded?.['wp:term']?.[0]?.map((term) => ({
          id: term.id,
          name: term.name,
          slug: term.slug,
        })) || [];

      return {
        id: post.id,
        title: stripHtml(post.title.rendered),
        excerpt: stripHtml(post.excerpt.rendered).slice(0, 150) + '...',
        date: formatDate(post.date),
        rawDate: post.date,
        slug: post.slug,
        image: imageUrl,
        imageAlt,
        categories,
      };
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

async function fetchBlogCategories() {
  try {
    const wpCategories: WPCategory[] = await fetchCategories({
      perPage: 50,
      revalidate: CACHE_DURATIONS.CATEGORIES,
    });
    return wpCategories.filter((cat) => cat.count > 0);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export default async function BlogPage() {
  // Server-side data fetching with parallel deduplication
  const [posts, categories] = await Promise.all([fetchBlogPosts(), fetchBlogCategories()]);

  return <BlogClientWrapper initialPosts={posts} initialCategories={categories} />;
}
