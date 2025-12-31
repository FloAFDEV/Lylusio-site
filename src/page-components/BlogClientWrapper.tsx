"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import GoldenPlantBadge from "@/components/GoldenPlantBadge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Filter, SortAsc, SortDesc } from "lucide-react";

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

interface WPCategory {
	id: number;
	name: string;
	slug: string;
	count: number;
}

interface Props {
	initialPosts: BlogPost[];
	initialCategories: WPCategory[];
}

type SortOrder = "newest" | "oldest";

// Convert to Sentence case
const toSentenceCase = (text: string): string => {
	if (!text) return text;
	return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

const BlogClientWrapper = ({ initialPosts, initialCategories }: Props) => {
	const router = useRouter();
	const [selectedCategory, setSelectedCategory] = useState<number | null>(
		null
	);
	const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
	const [postsToShow, setPostsToShow] = useState(12);
	const [searchQuery, setSearchQuery] = useState("");

	const totalPosts = initialPosts.length;

	// Prefetch article on hover for instant navigation
	const handlePrefetch = (slug: string) => {
		router.prefetch(`/${slug}/`);
	};

	// Filter and sort posts
	let displayedPosts = [...initialPosts];

	// Filter by category
	if (selectedCategory !== null) {
		displayedPosts = displayedPosts.filter((post) =>
			post.categories.some((cat) => cat.id === selectedCategory)
		);
	}

	// Filter by search query
	if (searchQuery.trim()) {
		const query = searchQuery.toLowerCase();
		displayedPosts = displayedPosts.filter(
			(post) =>
				post.title.toLowerCase().includes(query) ||
				post.excerpt.toLowerCase().includes(query)
		);
	}

	// Sort
	displayedPosts = displayedPosts.sort((a, b) =>
		sortOrder === "newest"
			? new Date(b.rawDate).getTime() - new Date(a.rawDate).getTime()
			: new Date(a.rawDate).getTime() - new Date(b.rawDate).getTime()
	);

	const filteredCount = displayedPosts.length;
	// Slice for pagination
	const paginatedPosts = displayedPosts.slice(0, postsToShow);
	const displayedCount = paginatedPosts.length;
	const hasMore = displayedPosts.length > postsToShow;

	const handleLoadMore = () => setPostsToShow((prev) => prev + 12);

	return (
		<div className="min-h-screen bg-background relative">
			<a href="#main-content" className="skip-link">
				Aller au contenu principal
			</a>
			<Header />
			<Breadcrumbs />

			<main id="main-content" className="pb-16 md:pb-20 relative">
				<section
					className="container mx-auto px-4 sm:px-6 lg:px-8"
					aria-labelledby="blog-title"
				>
					{/* Header */}
					<header className="max-w-4xl mx-auto text-center mb-12 md:mb-16 relative">
						<p className="section-label">Blog & Inspiration</p>
						<h1
							id="blog-title"
							className="text-foreground mb-6 text-center text-3xl sm:text-4xl md:text-5xl"
						>
							<span className="font-calligraphic text-accent inline-block align-baseline text-4xl sm:text-5xl md:text-6xl">
								A
							</span>
							rticles & Réflexions
						</h1>
						<p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
							Lectures inspirantes et analyses approfondies sur
							l'astrologie humaniste, le Reiki et votre chemin de
							développement personnel.
						</p>
					</header>
					{/* Filters avec compteurs intégrés */}
					<div className="max-w-5xl mx-auto mb-2">
						<div className="bg-card/50 rounded-xl border border-border/20 p-4 space-y-4">
							<div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
								{/* Category Filters avec compteurs */}

								<div className="flex flex-wrap items-center gap-2 flex-1">
									<Filter className="w-4 h-4 text-muted-foreground mr-1" />

									<button
										onClick={() =>
											setSelectedCategory(null)
										}
										className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-accent leading-tight ${
											selectedCategory === null
												? "bg-navy text-white shadow-sm"
												: "bg-muted/50 text-muted-foreground hover:bg-muted"
										}`}
										aria-pressed={selectedCategory === null}
									>
										Tous{" "}
										<span className="ml-1 opacity-75">
											({totalPosts})
										</span>
									</button>

									{initialCategories.map((category) => (
										<button
											key={category.id}
											onClick={() =>
												setSelectedCategory(category.id)
											}
											className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-accent leading-tight ${
												selectedCategory === category.id
													? "bg-navy text-white shadow-sm"
													: "bg-muted/50 text-muted-foreground hover:bg-muted"
											}`}
											aria-pressed={
												selectedCategory === category.id
											}
										>
											{category.name}{" "}
											<span className="ml-1 opacity-75">
												({category.count})
											</span>
										</button>
									))}
								</div>

								{/* Sort */}

								<div className="flex items-center gap-2">
									<button
										onClick={() =>
											setSortOrder((prev) =>
												prev === "newest"
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
											<SortDesc className="w-4 h-4" />
										) : (
											<SortAsc className="w-4 h-4" />
										)}{" "}
										{sortOrder === "newest"
											? "Plus récent"
											: "Plus ancien"}
									</button>
								</div>
							</div>
						</div>
					</div>

					{/* Compteurs articles */}

					<div
						className="max-w-5xl mx-auto mb-8 text-left px-4 py-2 text-sm text-muted-foreground"
						aria-live="polite"
					>
						{selectedCategory !== null || searchQuery ? (
							<>
								<span className="font-medium text-foreground">
									{filteredCount} article
									{filteredCount > 1 ? "s" : ""}
								</span>{" "}
								trouvé{filteredCount > 1 ? "s" : ""}
								{displayedCount < filteredCount && (
									<span>
										{" "}
										· {displayedCount} affiché
										{displayedCount > 1 ? "s" : ""}
									</span>
								)}
							</>
						) : (
							<>
								<span className="font-medium text-foreground">
									{totalPosts} article
									{totalPosts > 1 ? "s" : ""}
								</span>{" "}
								au total
								{displayedCount < totalPosts && (
									<span>
										{" "}
										· {displayedCount} affiché
										{displayedCount > 1 ? "s" : ""}
									</span>
								)}
							</>
						)}
					</div>
					{/* Search */}
					<div className="max-w-3xl mx-auto mb-8 px-4">
						<input
							type="text"
							placeholder="Rechercher des articles..."
							className="w-full max-w-xl mx-auto block px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
						{searchQuery && (
							<p
								className="text-center text-sm text-accent mt-3 font-medium"
								aria-live="polite"
							>
								{displayedPosts.length} article
								{displayedPosts.length > 1 ? "s" : ""} trouvé
								{displayedPosts.length > 1 ? "s" : ""}
							</p>
						)}
					</div>
					{/* Posts Grid */}
					{paginatedPosts.length === 0 ? (
						<div className="text-center py-12">
							<p className="text-muted-foreground">
								Aucun article ne correspond à votre recherche.
							</p>
						</div>
					) : (
						<>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
								{paginatedPosts.map((post) => (
									<article
										key={post.id}
										className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
										onMouseEnter={() =>
											handlePrefetch(post.slug)
										}
									>
										<Link
											href={`/${post.slug}/`}
											className="flex flex-col h-full"
										>
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
													<time
														dateTime={post.rawDate}
													>
														{post.date}
													</time>
												</div>
												<h2 className="font-heading text-lg md:text-xl font-bold mb-3 group-hover:text-accent transition-colors line-clamp-2 min-h-[3.5rem] leading-tight">
													<span className="font-calligraphic text-accent inline-block align-baseline text-2xl md:text-3xl">
														{toSentenceCase(
															post.title
														).charAt(0)}
													</span>
													{toSentenceCase(
														post.title
													).slice(1)}
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
							<div className="absolute center-22 right-0 md:right-12">
								<GoldenPlantBadge size="md" />
							</div>
							{/* Load More */}
							{hasMore && (
								<div className="text-center mt-12">
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
					{/* CTA Principal */}
					<div className="mt-16 p-8 bg-gradient-sand-center/30 rounded-2xl text-center max-w-3xl mx-auto">
						<h3 className="font-display text-xl text-navy mb-4">
							Découvrez mes accompagnements
						</h3>
						<p className="text-muted-foreground mb-6">
							Vous souhaitez aller plus loin dans votre
							cheminement ? Je propose des séances d'{" "}
							<Link
								className="text-accent hover:underline"
								href="/astrologie-toulouse"
							>
								astrologie consciente
							</Link>
							, de{" "}
							<Link
								className="text-accent hover:underline"
								href="/reiki-toulouse"
							>
								thérapie énergétique Reiki
							</Link>{" "}
							et d'{" "}
							<Link
								className="text-accent hover:underline"
								href="/accompagnement-toulouse"
							>
								accompagnement personnalisé
							</Link>
							.
						</p>
						<Link href="/accompagnement-toulouse">
							<Button variant="outline">
								Voir toutes les prestations
							</Button>
						</Link>
					</div>

					{/* CTA Secondaire - Ressources */}
					<div className="mt-8 text-center">
						<p className="text-sm text-muted-foreground">
							Envie de contenus pratiques ?{" "}
							<Link
								href="/ressources"
								className="text-accent hover:text-gold transition-colors font-medium underline decoration-accent/30 hover:decoration-gold/50 underline-offset-2"
							>
								Découvrir les ressources gratuites
							</Link>
						</p>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
};

export default BlogClientWrapper;
