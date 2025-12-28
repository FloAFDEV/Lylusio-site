import { Metadata } from 'next';
import BlogClientWrapper from '@/src/page-components/BlogClientWrapper';
import { generateMetadata as genMeta } from '@/content/seo';

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'https://lylusio.fr/wp-json/wp/v2';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour (ISR)

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
    const res = await fetch(`${WP_API_URL}/posts?_embed&per_page=100`, {
      next: { revalidate: 3600 }, // ISR: revalidate every hour
    });

    if (!res.ok) {
      console.error('Failed to fetch blog posts:', res.status);
      return [];
    }

    const wpPosts: WPPost[] = await res.json();

    return wpPosts.map((post) => {
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

async function fetchCategories() {
  try {
    const res = await fetch(`${WP_API_URL}/categories?per_page=50`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error('Failed to fetch categories:', res.status);
      return [];
    }

    const wpCategories: WPCategory[] = await res.json();
    return wpCategories.filter((cat) => cat.count > 0);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export default async function BlogPage() {
  // Server-side data fetching
  const [posts, categories] = await Promise.all([fetchBlogPosts(), fetchCategories()]);

  return <BlogClientWrapper initialPosts={posts} initialCategories={categories} />;
}
