import { Metadata } from "next";
import BlogPost from "@/src/page-components/BlogPost";
import { generateBlogPostSchema } from "@/content/schema";
import { fetchPostBySlug, fetchPosts } from "@/lib/wordpress-cache";
import { getOptimizedImageUrl } from "@/lib/wordpress-images";

// ISR: Static with revalidation every 2 hours
export const revalidate = 7200; // 2 hours ISR

interface WPPost {
	id: number;
	date: string;
	modified: string;
	title: { rendered: string };
	excerpt: { rendered: string };
	content: { rendered: string };
	slug: string;
	_embedded?: {
		"wp:featuredmedia"?: Array<{
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
		.replace(/<[^>]*>/g, "") // Remove HTML tags
		.replace(/&nbsp;/g, " ")
		.replace(/&amp;/g, "&")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, '"')
		.replace(/&#039;/g, "'")
		.replace(/&rsquo;/g, "'")
		.replace(/&lsquo;/g, "'")
		.replace(/&rdquo;/g, '"')
		.replace(/&ldquo;/g, '"')
		.replace(/&hellip;/g, "...")
		.replace(/&ndash;/g, "–")
		.replace(/&mdash;/g, "—")
		.replace(/\s+/g, " ")
		.trim();
};

/**
 * Generate static params for the most recent posts
 * This ensures popular/recent posts are pre-rendered at build time
 */
export async function generateStaticParams() {
	try {
		// Fetch recent 20 posts to pre-generate at build time
		const { posts } = await fetchPosts({
			perPage: 20,
			page: 1,
			embed: true,
			revalidate: 3600, // 1 hour cache for build
		});

		console.log(`[generateStaticParams] Pre-generating ${posts.length} article pages`);

		return posts.map((post: any) => ({
			slug: post.slug,
		}));
	} catch (error) {
		console.error("[generateStaticParams] Error fetching posts:", error);
		// Return empty array to allow dynamic rendering
		return [];
	}
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;

	try {
		const post = await fetchPostBySlug(slug, 7200); // 2 hours cache

		if (!post) {
			console.warn(`[generateMetadata] Post not found for slug: ${slug}`);
			return {
				title: "Article | Lylusio",
				description:
					"Découvrez nos articles sur l'astrologie, le Reiki et le développement personnel.",
			};
		}

		const title = stripHtml(post.title.rendered);
		const description = stripHtml(post.excerpt.rendered).substring(0, 160);
		const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0];

		const imageUrl = getOptimizedImageUrl(featuredImage?.source_url);

		const imageAlt = featuredImage?.alt_text || title;
		const authorName = post._embedded?.author?.[0]?.name || "Émilie Perez";
		const url = `https://lylusio.fr/blog/${slug}`;

		console.log(`[generateMetadata] Generated metadata for: ${title} (${slug})`);

		return {
			title: `${title} | Lylusio`,
			description,
			alternates: {
				canonical: url,
			},
			openGraph: {
				type: "article",
				locale: "fr_FR",
				url,
				title,
				description,
				siteName: "Lylusio",
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
				card: "summary_large_image",
				title,
				description,
				images: [imageUrl],
			},
		};
	} catch (error) {
		console.error(`[generateMetadata] Error for slug ${slug}:`, error);
		// Return fallback metadata instead of throwing
		return {
			title: "Article | Lylusio",
			description:
				"Découvrez nos articles sur l'astrologie, le Reiki et le développement personnel.",
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
	let serverFetchSuccess = false;

	try {
		const post = await fetchPostBySlug(slug, 7200); // 2 hours cache

		if (post) {
			serverFetchSuccess = true;
			const title = stripHtml(post.title.rendered);
			const description = stripHtml(post.excerpt.rendered).substring(
				0,
				300
			);
			const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0];
			const imageUrl = getOptimizedImageUrl(featuredImage?.source_url);
			const authorName =
				post._embedded?.author?.[0]?.name || "Émilie Perez";

			blogPostSchema = generateBlogPostSchema({
				title,
				description,
				url: `https://lylusio.fr/blog/${slug}`,
				image: imageUrl,
				datePublished: post.date,
				dateModified: post.modified,
				author: authorName,
			});

			console.log(`[BlogPostPage] Server fetch success for: ${title} (${slug})`);
		} else {
			console.warn(`[BlogPostPage] Post returned null for slug: ${slug}`);
		}
	} catch (error) {
		console.error(`[BlogPostPage] Server fetch error for slug ${slug}:`, error);
		// Don't throw - let client component handle fetching
	}

	// Always render BlogPost component - it has robust client-side fetching
	// This prevents 404 flashes when server fetch fails/timeouts
	// The component will show skeleton loader → content, never 404 unless post truly doesn't exist
	return (
		<>
			{blogPostSchema && (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(blogPostSchema),
					}}
				/>
			)}
			<BlogPost />
		</>
	);
}
