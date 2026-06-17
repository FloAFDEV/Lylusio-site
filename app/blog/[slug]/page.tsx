import { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
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

/**
 * Décode un slug de façon sécurisée.
 * Évite une URIError non gérée → 500 si le slug contient un séquence
 * percent-encodée malformée (ex: slug tronqué, double-encodage partiel…).
 */
function safeDecodeSlug(raw: string): string {
	try {
		return decodeURIComponent(raw);
	} catch {
		return raw;
	}
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
		.replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
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

		console.log(
			`[generateStaticParams] Pre-generating ${posts.length} article pages`
		);

		return posts.map((post: WPPost) => ({
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
	params: Promise<{ slug: string }>; // Next.js 15+: params is a Promise
}): Promise<Metadata> {
	const { slug: rawSlug } = await params;
	const slug = safeDecodeSlug(rawSlug);

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
		// Toujours utiliser post.slug (source WordPress) comme canonical,
		// jamais le slug extrait de l'URL (peut différer après décoding).
		// Les slugs WP sont déjà ASCII-safe → pas besoin d'encodeURIComponent.
		const url = `https://lylusio.fr/blog/${post.slug}`;

		console.log(
			`[generateMetadata] Generated metadata for: ${title} (${slug})`
		);

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
	params: Promise<{ slug: string }>; // Next.js 15+: params is a Promise
}) {
	const { slug: rawSlug } = await params;
	const slug = safeDecodeSlug(rawSlug);

	let blogPostSchema = null;
	let serverFetchSuccess = false;
	// Slug canonique WordPress (peut différer du slug dans l'URL si caractères spéciaux)
	let canonicalSlug: string | null = null;
	// Post brut WordPress transmis au composant client pour le rendu initial côté serveur.
	// Permet à useQuery d'utiliser initialData → contenu dans le HTML initial → indexable Google.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let initialPost: any = null;

	try {
		const post = await fetchPostBySlug(slug, 7200); // 2 hours cache

		if (post) {
			serverFetchSuccess = true;
			canonicalSlug = post.slug;
			initialPost = post;

			const title = stripHtml(post.title.rendered);
			const description = stripHtml(post.excerpt.rendered).substring(
				0,
				300
			);
			const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0];
			const imageUrl = getOptimizedImageUrl(featuredImage?.source_url);
			const authorName =
				post._embedded?.author?.[0]?.name || "Émilie Perez";

			const wordCount = post.content.rendered.split(/\s+/).length;
			const hasVideo =
				post.content.rendered.includes("<video") ||
				post.content.rendered.includes("<iframe");

			blogPostSchema = generateBlogPostSchema({
				title,
				description,
				url: `https://lylusio.fr/blog/${post.slug}`,
				image: imageUrl,
				datePublished: post.date,
				dateModified: post.modified,
				author: authorName,
				wordCount,
				hasVideo,
			});

			console.log(
				`[BlogPostPage] Server fetch success for: ${title} (${slug})`
			);
		} else {
			// Post doesn't exist in WordPress — return a clean 404.
			// Only reached when the fetch itself succeeded (no exception),
			// so this is a genuine missing slug, not a transient WP outage.
			notFound();
		}
	} catch (error) {
		console.error(
			`[BlogPostPage] Server fetch error for slug ${slug}:`,
			error
		);
		// WP may be temporarily down — let client component retry.
	}

	// Redirection canonique : si le slug WordPress diffère du slug dans l'URL
	// (ex : URL avec "→" alors que WP stocke "transition-2025-2026-…"),
	// on redirige vers l'URL propre pour éviter contenu dupliqué et erreurs futures.
	// Doit être HORS du try-catch (redirect() lève une exception Next.js interne).
	if (
		canonicalSlug &&
		canonicalSlug !== slug &&
		canonicalSlug !== rawSlug
	) {
		redirect(`/blog/${canonicalSlug}`);
	}

	// BlogPost reçoit initialPost pour hydrater useQuery côté serveur :
	// le contenu WordPress est rendu dans le HTML initial sans attendre le fetch client.
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
			<BlogPost initialData={initialPost} />
		</>
	);
}
