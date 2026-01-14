import { MetadataRoute } from "next";
import {
	fetchPosts,
	fetchCategories,
	CACHE_DURATIONS,
} from "@/lib/wordpress-cache";

const baseUrl = "https://lylusio.fr";

interface WPPost {
	slug: string;
	modified: string;
}

interface WPCategory {
	slug: string;
	count: number;
}

const CATEGORY_SLUG_MAP: Record<string, string> = {
	astrologie: "astrologie",
	reiki: "reiki",
	"developpement-personnel": "developpement-personnel",
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	// Pages statiques - toutes les routes du projet
	const staticRoutes: MetadataRoute.Sitemap = [
		// Homepage (priorité maximale)
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 1,
		},

		// Pages services principales (haute priorité SEO)
		{
			url: `${baseUrl}/astrologie-toulouse`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.9
		},
		{
			url: `${baseUrl}/reiki-toulouse`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.9
		},
		{
			url: `${baseUrl}/therapie-holistique`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.9
		},
		{
			url: `${baseUrl}/therapie-energetique`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.9
		},
		{
			url: `${baseUrl}/accompagnement-toulouse`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.9
		},

		// Pages À propos (haute priorité)
		{
			url: `${baseUrl}/approche-therapeutique`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.9
		},
		{
			url: `${baseUrl}/emilie-perez`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.9
		},

		// Pages utilitaires (priorité moyenne-haute)
		{
			url: `${baseUrl}/contact`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8
		},
		{
			url: `${baseUrl}/blog`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8
		},
		{
			url: `${baseUrl}/ressources`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.8
		},
		{
			url: `${baseUrl}/faq`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.6
		},

		// Pages légales (basse priorité mais nécessaires)
		{
			url: `${baseUrl}/mentions-legales`,
			lastModified: new Date("2026-01-13"),
			changeFrequency: "yearly",
			priority: 0.3
		},
		{
			url: `${baseUrl}/confidentialite`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.3
		},
		{
			url: `${baseUrl}/cgu`,
			lastModified: new Date("2026-01-13"),
			changeFrequency: "yearly",
			priority: 0.3
		},
	];

	// Articles de blog dynamiques depuis WordPress
	let blogPostRoutes: MetadataRoute.Sitemap = [];
	try {
		const result = await fetchPosts({
			perPage: 100,
			fields: "slug,modified",
			embed: false,
			revalidate: CACHE_DURATIONS.SITEMAP,
		});

		blogPostRoutes = result.posts.map((post: WPPost) => ({
			url: `${baseUrl}/${post.slug}`, // URL directe sans /blog/ prefix
			lastModified: new Date(post.modified),
			changeFrequency: "monthly" as const,
			priority: 0.7,
		}));
	} catch (error) {
		console.error("❌ Error fetching blog posts for sitemap:", error);
	}

	// Catégories de blog (uniquement celles avec des posts)
	let categoryRoutes: MetadataRoute.Sitemap = [];
	try {
		const categories: WPCategory[] = await fetchCategories({
			perPage: 100,
			fields: "slug,count",
			revalidate: CACHE_DURATIONS.SITEMAP,
		});

		categoryRoutes = categories
			.filter(cat => cat.count > 0 && Object.values(CATEGORY_SLUG_MAP).includes(cat.slug))
			.map(cat => {
				const frontendSlug = Object.keys(CATEGORY_SLUG_MAP).find(
					key => CATEGORY_SLUG_MAP[key] === cat.slug
				) || cat.slug;

				return {
					url: `${baseUrl}/category/blog/${frontendSlug}`,
					lastModified: new Date(),
					changeFrequency: "weekly" as const,
					priority: 0.6,
				};
			});
	} catch (error) {
		console.error("❌ Error fetching categories for sitemap:", error);
	}

	// Fusion et tri des routes par priorité (plus haute priorité en premier)
	const allRoutes = [...staticRoutes, ...blogPostRoutes, ...categoryRoutes];

	console.log(`✅ Sitemap généré: ${staticRoutes.length} pages statiques, ${blogPostRoutes.length} articles, ${categoryRoutes.length} catégories`);

	return allRoutes;
}
