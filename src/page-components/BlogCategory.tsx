"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { useState, useEffect, useCallback } from "react";
// import { Helmet } from "react-helmet-async"; // Replaced by Next.js Metadata API
// import { Link, useParams } from "react-router-dom"; // Replaced by Next.js
import { useQueryClient, useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import GoldenPlantBadge from "@/components/GoldenPlantBadge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Loader2, SortAsc, SortDesc } from "lucide-react";

interface WPPost {
	id: number;
	date: string;
	title: { rendered: string };
	excerpt: { rendered: string };
	slug: string;
	categories: number[];
	_embedded?: {
		"wp:featuredmedia"?: { source_url: string; alt_text?: string }[];
	};
}

interface WPCategory {
	id: number;
	name: string;
	slug: string;
	description: string;
	count: number;
}

interface BlogPost {
	id: number;
	title: string;
	excerpt: string;
	date: string;
	rawDate: string;
	slug: string;
	image: string;
	imageAlt: string;
}

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || "https://lylusio.fr/wp-json/wp/v2";

const formatDate = (dateString: string) =>
	new Date(dateString).toLocaleDateString("fr-FR", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});

// Strip HTML tags (server-safe)
const stripHtml = (html: string): string => {
	return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').trim();
};

// Convert to Sentence case
const toSentenceCase = (text: string): string => {
	if (!text) return text;
	return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

type SortOrder = "newest" | "oldest";

const CATEGORY_SLUG_MAP: Record<string, string> = {
	astrologie: "astrologie",
	reiki: "reiki",
	"developpement-personnel": "developpement-personnel",
};

const BlogCategory = () => {
	const router = useRouter();
	const { categorySlug } = useParams<{ categorySlug: string }>();
	const [posts, setPosts] = useState<BlogPost[]>([]);
	const [category, setCategory] = useState<WPCategory | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
	const [postsToShow, setPostsToShow] = useState(12);

	const wpCategorySlug = categorySlug
		? CATEGORY_SLUG_MAP[categorySlug] || categorySlug
		: "";

	const queryClient = useQueryClient();

	// Prefetch article on hover
	const handlePrefetch = (slug: string) => {
		router.prefetch(`/${slug}/`);
	};

	// Fetch category info
	useEffect(() => {
		if (!wpCategorySlug) return;
		const fetchCategory = async () => {
			try {
				const res = await fetch(
					`${WP_API_URL}/categories?slug=${wpCategorySlug}`
				);
				const data: WPCategory[] = await res.json();
				if (data.length === 0) throw new Error("Catégorie non trouvée");
				setCategory(data[0]);
			} catch {
				setError("Erreur lors du chargement de la catégorie");
			}
		};
		fetchCategory();
	}, [wpCategorySlug]);

	// Fetch posts for category
	const fetchCategoryPosts = useCallback(async () => {
		if (!category) return;
		setLoading(true);
		try {
			const res = await fetch(
				`${WP_API_URL}/posts?_embed&categories=${category.id}&per_page=100`
			);
			const wpPosts: WPPost[] = await res.json();

			const formattedPosts: BlogPost[] = wpPosts.map((p) => ({
				id: p.id,
				title: p.title.rendered,
				excerpt:
					stripHtml(p.excerpt.rendered).substring(0, 150) + "...",
				date: formatDate(p.date),
				rawDate: p.date,
				slug: p.slug,
				image:
					p._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
					"/placeholder.svg",
				imageAlt:
					p._embedded?.["wp:featuredmedia"]?.[0]?.alt_text ||
					p.title.rendered,
			}));

			setPosts(formattedPosts);
			setError(null);

			// Précharge chaque post en cache
			// Précharger chaque post et son image
			formattedPosts.forEach((post) => {
				// Précharger le post dans le cache React Query
				queryClient.prefetchQuery({
					queryKey: ["blogPost", post.slug],
					queryFn: async () => {
						const res = await fetch(
							`${WP_API_URL}/posts?slug=${post.slug}&_embed`
						);
						const data = await res.json();
						return data[0];
					},
					staleTime: 1000 * 60 * 5, // 5 minutes
				});

				// Précharger l'image
				const img = document.createElement('img');
				img.src = post.image;
			});
		} catch {
			setError("Erreur lors du chargement des articles");
		} finally {
			setLoading(false);
		}
	}, [category, queryClient]);

	useEffect(() => {
		if (category) fetchCategoryPosts();
	}, [category, fetchCategoryPosts]);

	// Sort & slice posts
	const displayedPosts = [...posts]
		.sort((a, b) =>
			sortOrder === "newest"
				? new Date(b.rawDate).getTime() - new Date(a.rawDate).getTime()
				: new Date(a.rawDate).getTime() - new Date(b.rawDate).getTime()
		)
		.slice(0, postsToShow);

	const handleLoadMore = () => setPostsToShow((prev) => prev + 12);

	const categoryTitle = category?.name || "Catégorie";
	const categoryDescription = category?.description
		? stripHtml(category.description)
		: `Découvrez tous nos articles sur ${categoryTitle.toLowerCase()}`;

	const structuredData = {
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		name: `${categoryTitle} - Blog Lylusio`,
		description: categoryDescription,
		url: `https://lylusio.fr/category/blog/${categorySlug}/`,
		isPartOf: {
			"@type": "Blog",
			name: "Blog Lylusio",
			url: "https://lylusio.fr/blog",
		},
	};

	return (
		<>
			{/* SEO metadata handled by Next.js Metadata API */}

			<Header />
			<main className="min-h-screen bg-background pb-20">
				<Breadcrumbs customTitle={`Catégorie : ${categoryTitle}`} />
				<div className="container mx-auto px-4">
					{/* Header */}
					<header className="text-center mb-16">
						<div className="flex justify-center mb-6">
							<GoldenPlantBadge size="lg" />
						</div>
						<h1 className="text-foreground text-4xl mb-4 sm:mb-6 leading-tight">
							{categoryTitle}
						</h1>
						<p className="text-muted-foreground max-w-2xl mx-auto mt-4 text-lg">
							{categoryDescription}
						</p>
						{category && (
							<p className="text-sm text-muted-foreground mt-2">
								{category.count} article
								{category.count > 1 ? "s" : ""}
							</p>
						)}
					</header>

					{/* Sort */}
					<div className="flex justify-end mb-8">
						<Button
							variant="outline"
							size="sm"
							onClick={() =>
								setSortOrder((prev) =>
									prev === "newest" ? "oldest" : "newest"
								)
							}
							className="flex items-center gap-2"
						>
							{sortOrder === "newest" ? (
								<SortDesc className="h-4 w-4" />
							) : (
								<SortAsc className="h-4 w-4" />
							)}
							{sortOrder === "newest"
								? "Plus récents"
								: "Plus anciens"}
						</Button>
					</div>

					{/* Posts */}
					{loading ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{[1, 2, 3, 4, 5, 6].map((i) => (
								<div key={i} className="animate-pulse">
									<div className="aspect-[16/10] bg-muted rounded-xl mb-4" />
									<div className="space-y-3">
										<div className="h-4 bg-muted/50 rounded w-32" />
										<div className="h-6 bg-muted rounded-lg w-3/4" />
										<div className="h-4 bg-muted/70 rounded w-full" />
										<div className="h-4 bg-muted/70 rounded w-5/6" />
									</div>
								</div>
							))}
						</div>
					) : error ? (
						<div className="text-center py-20">
							<p className="text-destructive">{error}</p>
							<Link href="/blog">
								<Button variant="outline" className="mt-4">
									Retour au blog
								</Button>
							</Link>
						</div>
					) : displayedPosts.length === 0 ? (
						<div className="text-center py-20">
							<p className="text-muted-foreground">
								Aucun article dans cette catégorie.
							</p>
							<Link href="/blog">
								<Button variant="outline" className="mt-4">
									Voir tous les articles
								</Button>
							</Link>
						</div>
					) : (
						<>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
								{displayedPosts.map((post) => (
									<article
										key={post.id}
										className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
										onMouseEnter={() => handlePrefetch(post.slug)}
									>
										<Link href={`/${post.slug}/`} className="flex flex-col h-full">
											<div className="aspect-[16/10] overflow-hidden relative bg-muted">
												<Image
													src={post.image}
													alt={post.imageAlt}
													fill
													sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
													className="object-cover group-hover:scale-105 transition-transform duration-500"
													loading="lazy"
												/>
											</div>
											<div className="p-6 flex flex-col flex-grow">
												<div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 uppercase tracking-wide">
													<Calendar className="h-3.5 w-3.5" />
													<time dateTime={post.rawDate}>
														{post.date}
													</time>
												</div>
												<h2 className="font-heading text-lg md:text-xl font-bold mb-3 group-hover:text-accent transition-colors line-clamp-2 min-h-[3.5rem] leading-tight">
													<span className="font-calligraphic text-accent inline-block align-baseline text-2xl md:text-3xl">
														{toSentenceCase(stripHtml(post.title)).charAt(0)}
													</span>
													{toSentenceCase(stripHtml(post.title)).slice(1)}
												</h2>
												<p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4 flex-grow">
													{post.excerpt}
												</p>
												<div className="flex items-center gap-2 text-accent font-semibold text-sm mt-auto pt-2 border-t border-border/10">
													Lire l'article{" "}
													<ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
												</div>
											</div>
										</Link>
									</article>
								))}
							</div>

							{displayedPosts.length < posts.length && (
								<div className="flex justify-center mt-12">
									<Button
										onClick={handleLoadMore}
										variant="outline"
										size="lg"
									>
										Charger plus d'articles
									</Button>
								</div>
							)}
						</>
					)}

					{/* Back to Blog */}
					<div className="text-center mt-16">
						<Link href="/blog">
							<Button variant="ghost" className="group">
								<ArrowRight className="h-4 w-4 mr-2 rotate-180 group-hover:-translate-x-1 transition-transform" />
								Retour au blog
							</Button>
						</Link>
					</div>
				</div>
			</main>

			<Footer />
		</>
	);
};

export default BlogCategory;
