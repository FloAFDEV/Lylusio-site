import { Metadata } from "next";
import BlogCategoryClient from "@/src/page-components/BlogCategoryClient";
import {
	fetchPosts,
	CACHE_DURATIONS,
} from "@/lib/wordpress-cache";
import { getOptimizedImageUrl } from "@/lib/wordpress-images";
import { getSafeExcerpt } from "@/lib/wordpress-shortcodes";
import { notFound } from "next/navigation";

const WP_API_URL =
	process.env.NEXT_PUBLIC_WP_API_URL ||
	"https://admin.lylusio.fr/wp-json/wp/v2";

interface WPCategory {
	id: number;
	name: string;
	slug: string;
	description: string;
	count: number;
}

interface WPPost {
	id: number;
	date: string;
	title: { rendered: string };
	excerpt: { rendered: string };
	slug: string;
	_embedded?: {
		"wp:featuredmedia"?: Array<{
			source_url: string;
			alt_text?: string;
		}>;
	};
}

const CATEGORY_SLUG_MAP: Record<string, string> = {
	astrologie: "astrologie",
	reiki: "reiki",
	"developpement-personnel": "developpement-personnel",
};

// Server-safe HTML stripping
const stripHtml = (html: string): string => {
	return html
		.replace(/<[^>]*>/g, "")
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

const formatDate = (dateString: string): string => {
	const date = new Date(dateString);
	return date.toLocaleDateString("fr-FR", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});
};

export async function generateMetadata({
	params,
}: {
	params: Promise<{ categorySlug: string }>;
}): Promise<Metadata> {
	const { categorySlug } = await params;
	const wpCategorySlug = CATEGORY_SLUG_MAP[categorySlug] || categorySlug;

	try {
		const res = await fetch(
			`${WP_API_URL}/categories?slug=${wpCategorySlug}`,
			{
				next: { revalidate: 3600 },
			}
		);

		if (!res.ok) {
			return {
				title: "Catégorie non trouvée | Lylusio",
				description: "Cette catégorie n'existe pas.",
			};
		}

		const categories: WPCategory[] = await res.json();

		if (categories.length === 0) {
			return {
				title: "Catégorie non trouvée | Lylusio",
				description: "Cette catégorie n'existe pas.",
			};
		}

		const category = categories[0];
		const categoryName = category.name;
		const categoryDescription = category.description
			? stripHtml(category.description)
			: `Découvrez tous nos articles sur ${categoryName.toLowerCase()}`;
		const url = `https://lylusio.fr/category/blog/${categorySlug}`;

		return {
			title: `${categoryName} - Blog | Lylusio`,
			description: categoryDescription.substring(0, 160),
			alternates: {
				canonical: url,
			},
			openGraph: {
				type: "website",
				locale: "fr_FR",
				url,
				title: `${categoryName} - Blog Lylusio`,
				description: categoryDescription,
				siteName: "Lylusio",
				images: [
					{
						url: "https://lylusio.fr/assets/logo-lylusio.webp",
						width: 1200,
						height: 630,
						alt: `Catégorie ${categoryName} - Lylusio`,
					},
				],
			},
			twitter: {
				card: "summary_large_image",
				title: `${categoryName} - Blog`,
				description: categoryDescription,
				images: ["https://lylusio.fr/assets/logo-lylusio.webp"],
			},
		};
	} catch (error) {
		console.error("Error fetching category metadata:", error);
		return {
			title: "Catégorie Blog | Lylusio",
			description: "Découvrez nos articles classés par catégorie.",
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

	let category: WPCategory | null = null;
	let collectionPageSchema = null;

	// Fetch category info
	try {
		const res = await fetch(
			`${WP_API_URL}/categories?slug=${wpCategorySlug}`,
			{
				next: { revalidate: CACHE_DURATIONS.CATEGORIES },
			}
		);

		if (res.ok) {
			const categories: WPCategory[] = await res.json();
			if (categories.length > 0) {
				category = categories[0];

				const categoryName = category.name;
				const categoryDescription = category.description
					? stripHtml(category.description)
					: `Découvrez tous nos articles sur ${categoryName.toLowerCase()}`;

				collectionPageSchema = {
					"@context": "https://schema.org",
					"@type": "CollectionPage",
					name: `${categoryName} - Blog Lylusio`,
					description: categoryDescription,
					url: `https://lylusio.fr/category/blog/${categorySlug}`,
					isPartOf: {
						"@type": "Blog",
						name: "Blog Lylusio",
						url: "https://lylusio.fr/blog",
					},
				};
			}
		}
	} catch (error) {
		console.error("Error fetching category:", error);
	}

	if (!category) {
		notFound();
	}

	// Fetch posts for this category (SSR)
	let posts: any[] = [];
	try {
		const result = await fetchPosts({
			perPage: 100,
			categoryId: category.id,
			embed: true,
			revalidate: CACHE_DURATIONS.POSTS,
		});

		posts = result.posts.map((post: WPPost) => {
			const imageObj = post._embedded?.["wp:featuredmedia"]?.[0];
			const imageUrl = getOptimizedImageUrl(imageObj?.source_url);
			const imageAlt =
				imageObj?.alt_text || stripHtml(post.title.rendered);

			return {
				id: post.id,
				title: stripHtml(post.title.rendered),
				excerpt: getSafeExcerpt(post.excerpt.rendered, 150),
				date: formatDate(post.date),
				rawDate: post.date,
				slug: post.slug,
				image: imageUrl,
				imageAlt,
			};
		});
	} catch (error) {
		console.error("Error fetching category posts:", error);
	}

	return (
		<>
			{collectionPageSchema && (
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(collectionPageSchema),
					}}
				/>
			)}
			<BlogCategoryClient
				initialPosts={posts}
				category={category}
				categorySlug={categorySlug}
			/>
		</>
	);
}
