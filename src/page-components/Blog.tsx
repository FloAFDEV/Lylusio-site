"use client";

import Link from "next/link";
import Image from "next/image";

import { useState, useEffect } from "react";
// import { Helmet } from "react-helmet-async"; // Replaced by Next.js Metadata API
// import { Link } from "react-router-dom"; // Replaced by Next.js Link
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import GoldenPlantBadge from "@/components/GoldenPlantBadge";
import LazyImage from "@/components/LazyImage";
import { Button } from "@/components/ui/button";
import {
	Calendar,
	ArrowRight,
	Loader2,
	Filter,
	SortAsc,
	SortDesc,
} from "lucide-react";

// Types WordPress API
interface WPPost {
	id: number;
	date: string;
	title: { rendered: string };
	excerpt: { rendered: string };
	slug: string;
	featured_media: number;
	categories: number[];
	_embedded?: {
		"wp:featuredmedia"?: Array<{
			id: number;
			media_type: string;
			source_url: string;
			alt_text: string;
		}>;
		"wp:term"?: Array<
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

interface BlogPost {
	id: number;
	title: string;
	excerpt: string;
	date: string;
	rawDate: string;
	slug: string;
	image: string;
	imageAlt: string;
	categories: { id: number; name: string; slug: string }[];
}

interface RelatedPost {
	id: number;
	slug: string;
	title: string;
	excerpt: string;
	date: string;
	image: string;
}

// WordPress API URL from environment
const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || "https://lylusio.fr/wp-json/wp/v2";

const formatDate = (dateString: string): string => {
	const date = new Date(dateString);
	return date.toLocaleDateString("fr-FR", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});
};

const stripHtml = (html: string): string => {
	const doc = new DOMParser().parseFromString(html, "text/html");
	return doc.body.textContent || "";
};

type SortOrder = "newest" | "oldest";

const fetchAllBlogPosts = async (): Promise<BlogPost[]> => {
	const firstRes = await fetch(
		`${WP_API_URL}/posts?_embed&per_page=20&page=1`
	);
	if (!firstRes.ok) throw new Error("Erreur chargement articles");

	const totalPages = parseInt(
		firstRes.headers.get("X-WP-TotalPages") || "1",
		10
	);
	let allPosts: WPPost[] = await firstRes.json();

	if (totalPages > 1) {
		const pagePromises = [];
		for (let page = 2; page <= totalPages; page++) {
			pagePromises.push(
				fetch(
					`${WP_API_URL}/posts?_embed&per_page=20&page=${page}`
				).then((res) => (res.ok ? res.json() : []))
			);
		}
		const additionalPages = await Promise.all(pagePromises);
		additionalPages.forEach((p) => allPosts.push(...p));
	}

	return allPosts.map((post) => {
		const imageObj = post._embedded?.["wp:featuredmedia"]?.[0];
		const imageUrl = imageObj?.source_url || "/placeholder.svg";
		const imageAlt = imageObj?.alt_text || stripHtml(post.title.rendered);

		const categories =
			post._embedded?.["wp:term"]?.[0]?.map((term) => ({
				id: term.id,
				name: term.name,
				slug: term.slug,
			})) || [];

		return {
			id: post.id,
			title: stripHtml(post.title.rendered),
			excerpt: stripHtml(post.excerpt.rendered).slice(0, 150) + "...",
			date: formatDate(post.date),
			rawDate: post.date,
			slug: post.slug,
			image: imageUrl,
			imageAlt,
			categories,
		};
	});
};

const Blog = () => {
	const queryClient = useQueryClient();
	const [categories, setCategories] = useState<WPCategory[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<number | null>(
		null
	);
	const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
	const [postsToShow, setPostsToShow] = useState(12);
	const [loadingMore, setLoadingMore] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState<RelatedPost[]>([]);

	const {
		data: posts = [],
		isLoading,
		error,
	} = useQuery({
		queryKey: ["blogPosts"],
		queryFn: fetchAllBlogPosts,
		staleTime: 1000 * 60 * 10,
		gcTime: 1000 * 60 * 30,
	});

	const totalPosts = posts.length;

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await fetch(
					`${WP_API_URL}/categories?per_page=50`
				);
				if (response.ok) {
					const wpCategories: WPCategory[] = await response.json();
					setCategories(wpCategories.filter((cat) => cat.count > 0));
				}
			} catch (err) {
				console.error("Erreur lors du chargement des catégories:", err);
			}
		};
		fetchCategories();
	}, []);

	useEffect(() => {
		if (!posts.length) return;

		let result = [...posts];
		if (selectedCategory !== null) {
			result = result.filter((post) =>
				post.categories.some((cat) => cat.id === selectedCategory)
			);
		}
		result.sort((a, b) =>
			sortOrder === "newest"
				? new Date(b.rawDate).getTime() - new Date(a.rawDate).getTime()
				: new Date(a.rawDate).getTime() - new Date(b.rawDate).getTime()
		);

		result.slice(0, postsToShow).forEach((post) => {
			queryClient.prefetchQuery({
				queryKey: ["blogPost", post.slug],
				queryFn: async () => {
					const res = await fetch(
						`${WP_API_URL}/posts?slug=${post.slug}&_embed`
					);
					const data = await res.json();
					return data[0];
				},
				staleTime: 1000 * 60 * 10,
			});
			// Preload image using native HTMLImageElement (not Next.js Image component)
			if (typeof window !== 'undefined') {
				const img = document.createElement('img');
				img.src = post.image;
			}
		});
	}, [posts, selectedCategory, sortOrder, postsToShow, queryClient]);

	const filteredPosts = (() => {
		let result = [...posts];
		if (selectedCategory !== null) {
			result = result.filter((post) =>
				post.categories.some((cat) => cat.id === selectedCategory)
			);
		}
		result.sort((a, b) =>
			sortOrder === "newest"
				? new Date(b.rawDate).getTime() - new Date(a.rawDate).getTime()
				: new Date(a.rawDate).getTime() - new Date(b.rawDate).getTime()
		);
		return result;
	})();

	const displayedPosts = filteredPosts.slice(0, postsToShow);

	useEffect(() => {
		const fetchSearchResults = async () => {
			if (!searchQuery) {
				setSearchResults([]);
				return;
			}
			try {
				const res = await fetch(
					`${WP_API_URL}/posts?search=${encodeURIComponent(
						searchQuery
					)}&_embed&per_page=5`
				);
				if (!res.ok) throw new Error("Erreur recherche articles");
				const posts: WPPost[] = await res.json();
				const results: RelatedPost[] = posts.map((p) => ({
					id: p.id,
					slug: p.slug,
					title: stripHtml(p.title.rendered),
					excerpt:
						stripHtml(p.excerpt.rendered).slice(0, 100) + "...",
					image:
						p._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
						"/placeholder.svg",
					date: formatDate(p.date),
				}));
				setSearchResults(results);
			} catch (err) {
				console.error(err);
				setSearchResults([]);
			}
		};
		fetchSearchResults();
	}, [searchQuery]);

	const handleLoadMore = () => {
		setLoadingMore(true);
		setTimeout(() => {
			setPostsToShow((prev) => prev + 12);
			setLoadingMore(false);
		}, 300);
	};

	const structuredData = {
		"@context": "https://schema.org",
		"@type": "Blog",
		name: "Blog Lylusio - Astrologie & Bien-être",
		description:
			"Articles et réflexions sur l'astrologie, le Reiki et le développement personnel par Émilie Perez.",
		url: "https://lylusio.fr/blog",
		author: { "@type": "Person", name: "Émilie Perez" },
		blogPost: displayedPosts.slice(0, 10).map((post) => ({
			"@type": "BlogPosting",
			headline: post.title,
			description: post.excerpt,
			datePublished: post.rawDate,
			url: `https://lylusio.fr/blog/${post.slug}`,
			author: { "@type": "Person", name: "Émilie Perez" },
		})),
	};

	return (
		<>
			{/* SEO metadata handled by Next.js Metadata API */}

			<div
				className="min-h-screen bg-background relative animate-fade-in"
				style={{ animationDuration: "0.6s" }}
			>
				<a href="#main-content" className="skip-link">
					Aller au contenu principal
				</a>
				<Header />
				<Breadcrumbs showPlant={false} />

				<main id="main-content" className="pb-16 md:pb-20 relative">
					<section
						className="container mx-auto px-4 sm:px-6 lg:px-8"
						aria-labelledby="blog-title"
					>
						<header className="max-w-4xl mx-auto text-center mb-12 md:mb-16 relative">
							<GoldenPlantBadge
								size="lg"
								className="absolute -top-4 right-0 md:right-12 opacity-60"
							/>
							<p className="section-label">Blog</p>
							<h1
								id="blog-title"
								className="text-foreground mb-6 text-center"
							>
								<span className="font-calligraphic text-accent inline-block align-baseline  ">
									A
								</span>
								rticles & Réflexions
							</h1>
							<p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
								Explorations autour de l'astrologie, du Reiki et
								du développement personnel.
							</p>
						</header>

						{/* Filters & Sort */}
						<div className="max-w-5xl mx-auto mb-8 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center p-4 bg-card/50 rounded-xl border border-border/20">
								<div className="flex flex-wrap items-center gap-2">
									<Filter className="w-4 h-4 text-muted-foreground" />
									<button
										onClick={() =>
											setSelectedCategory(null)
										}
										className={`px-3 py-1.5 rounded-full text-sm transition-colors focus-visible:ring-2 focus-visible:ring-accent ${
											selectedCategory === null
												? "bg-accent text-white"
												: "bg-muted/50 text-muted-foreground hover:bg-muted"
										}`}
										aria-pressed={selectedCategory === null}
									>
										Tous
									</button>
									{categories.map((cat) => (
										<button
											key={cat.id}
											onClick={() =>
												setSelectedCategory(cat.id)
											}
											className={`px-3 py-1.5 rounded-full text-sm transition-colors focus-visible:ring-2 focus-visible:ring-accent ${
												selectedCategory === cat.id
													? "bg-accent text-white"
													: "bg-muted/50 text-muted-foreground hover:bg-muted"
											}`}
											aria-pressed={
												selectedCategory === cat.id
											}
										>
											{cat.name} ({cat.count})
										</button>
									))}
								</div>
								<div className="flex items-center gap-2">
									<button
										onClick={() =>
											setSortOrder(
												sortOrder === "newest"
													? "oldest"
													: "newest"
											)
										}
										className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm bg-muted/50 text-muted-foreground hover:bg-muted transition-colors focus-visible:ring-2 focus-visible:ring-accent"
										aria-label={`Trier par date : ${
											sortOrder === "newest"
												? "plus récent"
												: "plus ancien"
										}`}
									>
										{sortOrder === "newest" ? (
											<>
												<SortDesc className="w-4 h-4" />{" "}
												Plus récent
											</>
										) : (
											<>
												<SortAsc className="w-4 h-4" />{" "}
												Plus ancien
											</>
										)}
									</button>
								</div>
						</div>

						{/* Compteur d'articles trouvés/affichés - sous les sélecteurs */}
						{totalPosts > 0 && (
							<div className="flex items-center justify-center gap-2 mb-8" aria-live="polite">
								<div className="h-px w-10 bg-gradient-to-r from-transparent via-accent/30 to-accent/20" />
								<p className="text-[10px] text-muted-foreground/80 font-thin tracking-[0.15em]">
									{filteredPosts.length} {filteredPosts.length > 1 ? "articles trouvés" : "article trouvé"}
									{displayedPosts.length < filteredPosts.length && (
										<>
											<span className="mx-1.5 text-accent/40">·</span>
											<span className="text-accent/60 font-light">{displayedPosts.length} affichés</span>
										</>
									)}
								</p>
								<div className="h-px w-10 bg-gradient-to-l from-transparent via-accent/30 to-accent/20" />
							</div>
						)}

						{/* Search & Results */}
						<div className="max-w-3xl mx-auto mb-8 px-4">
							{/* Barre de recherche */}
							<input
								type="text"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder="Rechercher des articles..."
								className="w-full max-w-xl mx-auto block px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
							/>

							{/* Résultats instantanés de la recherche */}
							{searchQuery && searchResults && (
								<div className="mt-4">
									{searchResults.length > 0 ? (
										<div className="grid gap-4 sm:grid-cols-2">
											{searchResults.map((res) => (
												<Link
													key={res.id}
													href={"/blog/" + res.slug}
													className="block p-4 border border-border rounded-lg hover:shadow-md transition bg-card"
												>
													<h3 className="font-medium text-accent mb-1">
														{res.title}
													</h3>
													<p className="text-sm text-muted-foreground mb-1">
														{res.excerpt}
													</p>
													<p className="text-xs text-muted-foreground">
														{res.date}
													</p>
												</Link>
											))}
										</div>
									) : (
										<p className="text-muted-foreground text-center">
											Aucun article trouvé.
										</p>
									)}
								</div>
							)}
						</div>

						{/* Loading */}
						{isLoading && (
							<div className="flex justify-center items-center py-20">
								<Loader2 className="w-8 h-8 text-accent animate-spin" />
								<span className="ml-3 text-muted-foreground">
									Chargement des articles...
								</span>
							</div>
						)}

						{error && (
							<p className="text-center text-muted-foreground mb-8 text-sm">
								Impossible de charger les articles
							</p>
						)}

						{!isLoading && filteredPosts.length === 0 && (
							<div className="text-center py-16">
								<p className="text-muted-foreground mb-4">
									Aucun article trouvé pour cette catégorie.
								</p>
								<Button
									variant="outline"
									onClick={() => setSelectedCategory(null)}
								>
									Voir tous les articles
								</Button>
							</div>
						)}

						{/* Blog Grid */}
						{!isLoading && displayedPosts.length > 0 && (
							<>
								<div className="grid gap-6 lg:gap-8 max-w-5xl mx-auto">
									{displayedPosts.map((post, index) => (
										<article
											key={post.id}
											className="group bg-card/50 rounded-2xl md:rounded-3xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-500 border border-border/20"
											aria-labelledby={`post-${post.slug}`}
										>
											<div className="flex flex-col sm:flex-row">
												<div className="relative sm:w-2/5 lg:w-1/3 flex-shrink-0">
													<div className="aspect-[4/3] sm:aspect-square sm:h-full overflow-hidden">
														<LazyImage
															src={post.image}
															alt={post.imageAlt}
															className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
															placeholderClassName="w-full h-full shimmer-loading"
															priority={index < 3}
															width={400}
															height={400}
															sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 33vw"
															quality={85}
														/>
													</div>
													<GoldenPlantBadge
														size="sm"
														className="absolute -bottom-2 -right-2"
													/>
												</div>
												<div className="flex-1 p-5 sm:p-6 lg:p-8 flex flex-col justify-center">
													{post.categories.length >
														0 && (
														<div className="flex flex-wrap gap-1.5 mb-2">
															{post.categories.map(
																(cat) => (
																	<span
																		key={
																			cat.id
																		}
																		className="px-1.5 py-0.5 text-[10px] sm:text-xs bg-accent/10 text-accent rounded-full leading-tight"
																	>
																		{
																			cat.name
																		}
																	</span>
																)
															)}
														</div>
													)}
													<p className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
														<Calendar className="w-4 h-4" />
														<time
															dateTime={
																post.rawDate
															}
														>
															{post.date}
														</time>
													</p>
													<h2
														id={`post-${post.slug}`}
														className="font-display text-xl sm:text-2xl text-foreground mb-3 group-hover:text-accent transition-colors leading-tight"
													>
														{post.title}
													</h2>
													<p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4 line-clamp-2">
														{post.excerpt}
													</p>
													<Link
														href={`/blog/${post.slug}`}
														className="inline-flex items-center gap-2 text-accent text-sm font-medium group-hover:gap-3 transition-all mt-auto"
														aria-label={`Lire l'article : ${post.title}`}
													>
														Lire l'article{" "}
														<ArrowRight className="w-4 h-4" />
													</Link>
												</div>
											</div>
										</article>
									))}
								</div>

								{displayedPosts.length <
									filteredPosts.length && (
									<div className="text-center mt-10">
										<Button
											variant="outline"
											size="lg"
											onClick={handleLoadMore}
											disabled={loadingMore}
											className="min-w-[200px]"
										>
											{loadingMore ? (
												<>
													<Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
													Chargement...
												</>
											) : (
												<>
													Voir plus d'articles{" "}
													<span className="ml-2 text-muted-foreground">
														(
														{filteredPosts.length -
															displayedPosts.length}{" "}
														restants)
													</span>
												</>
											)}
										</Button>
									</div>
								)}
							</>
						)}

						{/* Internal links */}
						<div className="mt-16 p-8 bg-gradient-sand-center/30 rounded-2xl text-center max-w-3xl mx-auto">
							<h3 className="font-display text-xl text-navy mb-4">
								Découvrez mes accompagnements
							</h3>
							<p className="text-muted-foreground mb-6">
								Vous souhaitez aller plus loin dans votre
								cheminement ? Je propose des séances d'{" "}
								<Link
									href="/astrologie"
									className="text-accent hover:underline"
								>
									astrologie consciente
								</Link>
								, de{" "}
								<Link
									href="/reiki"
									className="text-accent hover:underline"
								>
									thérapie énergétique Reiki
								</Link>{" "}
								et d'{" "}
								<Link
									href="/accompagnement"
									className="text-accent hover:underline"
								>
									accompagnement personnalisé
								</Link>
								.
							</p>
							<Link href="/services">
								<Button variant="elegant" size="default">
									Voir toutes les prestations
								</Button>
							</Link>
						</div>
					</section>
				</main>

				<Footer />
			</div>
		</>
	);
};

export default Blog;
