import { MetadataRoute } from 'next';
import { fetchPosts, fetchCategories, CACHE_DURATIONS } from '@/lib/wordpress-cache';

const baseUrl = 'https://lylusio.fr';

interface WPPost {
  slug: string;
  modified: string;
}

interface WPCategory {
  slug: string;
  count: number;
}

const CATEGORY_SLUG_MAP: Record<string, string> = {
  astrologie: 'astrologie',
  reiki: 'reiki',
  'developpement-personnel': 'developpement-personnel',
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/astrologie-toulouse`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/reiki-toulouse`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/accompagnement-toulouse`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/approche-therapeutique`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/emilie-perez`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ressources`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/mentions-legales`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/confidentialite`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cgu`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  // Fetch blog posts from WordPress - using optimized cache
  let blogPostRoutes: MetadataRoute.Sitemap = [];
  try {
    const result = await fetchPosts({
      perPage: 100,
      fields: 'slug,modified',
      embed: false,
      revalidate: CACHE_DURATIONS.SITEMAP,
    });

    blogPostRoutes = result.posts.map((post: WPPost) => ({
      url: `${baseUrl}/${post.slug}/`,
      lastModified: new Date(post.modified),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }

  // Fetch blog categories from WordPress - using optimized cache
  let categoryRoutes: MetadataRoute.Sitemap = [];
  try {
    const categories: WPCategory[] = await fetchCategories({
      perPage: 100,
      fields: 'slug,count',
      revalidate: CACHE_DURATIONS.SITEMAP,
    });

    // Only include categories with posts and that are in our mapping
    categoryRoutes = categories
      .filter((cat) => cat.count > 0 && Object.values(CATEGORY_SLUG_MAP).includes(cat.slug))
      .map((cat) => {
        // Find the front-end slug that maps to this WP slug
        const frontendSlug = Object.keys(CATEGORY_SLUG_MAP).find(
          (key) => CATEGORY_SLUG_MAP[key] === cat.slug
        ) || cat.slug;

        return {
          url: `${baseUrl}/category/blog/${frontendSlug}/`,
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.6,
        };
      });
  } catch (error) {
    console.error('Error fetching categories for sitemap:', error);
  }

  return [...staticRoutes, ...blogPostRoutes, ...categoryRoutes];
}
