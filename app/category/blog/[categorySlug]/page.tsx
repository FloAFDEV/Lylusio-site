import { Metadata } from 'next';
import BlogCategory from '@/src/page-components/BlogCategory';

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'https://lylusio.fr/wp-json/wp/v2';

interface WPCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
}

const CATEGORY_SLUG_MAP: Record<string, string> = {
  astrologie: 'astrologie',
  reiki: 'reiki',
  'developpement-personnel': 'developpement-personnel',
};

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}): Promise<Metadata> {
  const { categorySlug } = await params;
  const wpCategorySlug = CATEGORY_SLUG_MAP[categorySlug] || categorySlug;

  try {
    const res = await fetch(`${WP_API_URL}/categories?slug=${wpCategorySlug}`, {
      next: { revalidate: 3600 }, // Cache 1h
    });

    if (!res.ok) {
      return {
        title: 'Catégorie non trouvée | Lylusio',
        description: 'Cette catégorie n\'existe pas.',
      };
    }

    const categories: WPCategory[] = await res.json();

    if (categories.length === 0) {
      return {
        title: 'Catégorie non trouvée | Lylusio',
        description: 'Cette catégorie n\'existe pas.',
      };
    }

    const category = categories[0];
    const categoryName = category.name;
    const categoryDescription = category.description
      ? stripHtml(category.description)
      : `Découvrez tous nos articles sur ${categoryName.toLowerCase()}`;
    const url = `https://lylusio.fr/category/blog/${categorySlug}/`;

    return {
      title: `${categoryName} - Blog | Lylusio`,
      description: categoryDescription.substring(0, 160),
      alternates: {
        canonical: url,
      },
      openGraph: {
        type: 'website',
        locale: 'fr_FR',
        url,
        title: `${categoryName} - Blog Lylusio`,
        description: categoryDescription,
        siteName: 'Lylusio',
        images: [
          {
            url: 'https://lylusio.fr/assets/logo-lylusio.webp',
            width: 1200,
            height: 630,
            alt: `Catégorie ${categoryName} - Lylusio`,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${categoryName} - Blog`,
        description: categoryDescription,
        images: ['https://lylusio.fr/assets/logo-lylusio.webp'],
      },
    };
  } catch (error) {
    console.error('Error fetching category metadata:', error);
    return {
      title: 'Catégorie Blog | Lylusio',
      description: 'Découvrez nos articles classés par catégorie.',
    };
  }
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;
  const wpCategorySlug = CATEGORY_SLUG_MAP[categorySlug] || categorySlug;

  let collectionPageSchema = null;

  try {
    const res = await fetch(`${WP_API_URL}/categories?slug=${wpCategorySlug}`, {
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const categories: WPCategory[] = await res.json();

      if (categories.length > 0) {
        const category = categories[0];
        const categoryName = category.name;
        const categoryDescription = category.description
          ? stripHtml(category.description)
          : `Découvrez tous nos articles sur ${categoryName.toLowerCase()}`;

        collectionPageSchema = {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `${categoryName} - Blog Lylusio`,
          description: categoryDescription,
          url: `https://lylusio.fr/category/blog/${categorySlug}/`,
          isPartOf: {
            '@type': 'Blog',
            name: 'Blog Lylusio',
            url: 'https://lylusio.fr/blog',
          },
        };
      }
    }
  } catch (error) {
    console.error('Error generating collection page schema:', error);
  }

  return (
    <>
      {collectionPageSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
        />
      )}
      <BlogCategory />
    </>
  );
}
