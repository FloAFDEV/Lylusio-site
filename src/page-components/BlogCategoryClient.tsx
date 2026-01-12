"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import GoldenPlantBadge from "@/components/GoldenPlantBadge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, SortAsc, SortDesc } from "lucide-react";
import * as utils from "@/lib/utils";

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

interface WPCategory {
	id: number;
	name: string;
	slug: string;
	description: string;
	count: number;
}

interface Props {
	initialPosts: BlogPost[];
	category: WPCategory;
	categorySlug: string;
}

type SortOrder = "newest" | "oldest";

const BlogCategoryClient = ({
	initialPosts,
	category,
	categorySlug,
}: Props) => {
	const router = useRouter();
	const queryClient = useQueryClient();
	const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
	const [postsToShow, setPostsToShow] = useState(12);

	// Prefetch article on hover
	const handlePrefetch = (slug: string) => {
		router.prefetch(`/${slug}/`);

		// Prefetch dans React Query cache
		queryClient.prefetchQuery({
			queryKey: ["blogPost", slug],
			queryFn: async () => {
				const res = await fetch(`/api/posts/${slug}`);
				return res.json();
			},
			staleTime: 1000 * 60 * 5,
		});
	};

	// Sort & slice posts (client-side interactivité)
	const displayedPosts = useMemo(() => {
		return [...initialPosts]
			.sort((a, b) =>
				sortOrder === "newest"
					? new Date(b.rawDate).getTime() -
					  new Date(a.rawDate).getTime()
					: new Date(a.rawDate).getTime() -
					  new Date(b.rawDate).getTime()
			)
			.slice(0, postsToShow);
	}, [initialPosts, sortOrder, postsToShow]);

	const handleLoadMore = () => setPostsToShow((prev) => prev + 12);

	const categoryTitle = category.name;
	const categoryDescription = category.description
		? utils.stripHtml(category.description)
		: `Découvrez tous nos articles sur ${categoryTitle.toLowerCase()}`;

	return (
		<>
			<Header />
			<main className="min-h-screen bg-background pb-20">
				<Breadcrumbs customTitle={`Catégorie : ${categoryTitle}`} />
				<div className="container mx-auto px-4">
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
						<p className="text-sm text-muted-foreground mt-2">
							{category.count} article
							{category.count > 1 ? "s" : ""}
						</p>
					</header>

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

					{displayedPosts.length === 0 ? (
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
													<time dateTime={post.rawDate}>
														{post.date}
													</time>
												</div>
												<h2 className="font-heading text-lg md:text-xl font-bold mb-3 group-hover:text-accent transition-colors line-clamp-2 min-h-[3.5rem] leading-tight">
													<span className="font-calligraphic text-accent inline-block align-baseline text-2xl md:text-3xl">
														{utils
															.toSentenceCase(
																utils.stripHtml(
																	post.title
																)
															)
															.charAt(0)}
													</span>
													{utils
														.toSentenceCase(
															utils.stripHtml(
																post.title
															)
														)
														.slice(1)}
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

							{displayedPosts.length < initialPosts.length && (
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

export default BlogCategoryClient;
