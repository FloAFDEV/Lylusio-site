import { Metadata } from 'next';
import BlogPost from '@/src/page-components/BlogPost';
import { generateBlogPostSchema } from '@/content/schema';
import { fetchPostBySlug, CACHE_DURATIONS } from '@/lib/wordpress-cache';

// ISR: 2 hours - configured via fetch options

interface WPPost {
  id: number;
  date: string;
  modified: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  slug: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text?: string;
      media_details: {
        width: number;
        height: number;
      };
    }>;
    author?: Array<{
      name: string;
    }>;
  };
}

// Server-safe HTML stripping
const stripHtml = (html: string): string => {
  return html
    .replace(/<[^>]*>/g, '') // Remove HTML tags
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
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await fetchPostBySlug(slug, CACHE_DURATIONS.POST_SINGLE);

    if (!post) {
      return {
        title: 'Article non trouvé | Lylusio',
        description: 'Cet article n\'existe pas ou a été supprimé.',
      };
    }
    const title = stripHtml(post.title.rendered);
    const description = stripHtml(post.excerpt.rendered).substring(0, 160);
    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0];
    const imageUrl = featuredImage?.source_url || 'https://lylusio.fr/assets/logo-lylusio.webp';
    const imageAlt = featuredImage?.alt_text || title;
    const authorName = post._embedded?.author?.[0]?.name || 'Émilie Perez';
    const url = `https://lylusio.fr/${slug}/`;

    return {
      title: `${title} | Lylusio`,
      description,
      alternates: {
        canonical: url,
      },
      openGraph: {
        type: 'article',
        locale: 'fr_FR',
        url,
        title,
        description,
        siteName: 'Lylusio',
        images: [
          {
            url: imageUrl,
            width: featuredImage?.media_details?.width || 1200,
            height: featuredImage?.media_details?.height || 630,
            alt: imageAlt,
          },
        ],
        publishedTime: post.date,
        modifiedTime: post.modified,
        authors: [authorName],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error('Error fetching blog post metadata:', error);
    return {
      title: 'Article | Lylusio',
      description: 'Découvrez nos articles sur l\'astrologie, le Reiki et le développement personnel.',
    };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let blogPostSchema = null;

  try {
    const post = await fetchPostBySlug(slug, CACHE_DURATIONS.POST_SINGLE);

    if (post) {
      const title = stripHtml(post.title.rendered);
      const description = stripHtml(post.excerpt.rendered).substring(0, 300);
      const featuredImage = post._embedded?.['wp:featuredmedia']?.[0];
      const imageUrl = featuredImage?.source_url;
      const authorName = post._embedded?.author?.[0]?.name || 'Émilie Perez';

      blogPostSchema = generateBlogPostSchema({
        title,
        description,
        url: `https://lylusio.fr/${slug}/`,
        image: imageUrl,
        datePublished: post.date,
        dateModified: post.modified,
        author: authorName,
      });
    }
  } catch (error) {
    console.error('Error generating blog post schema:', error);
  }

  return (
    <>
      {blogPostSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
        />
      )}
      <BlogPost />
    </>
  );
}
