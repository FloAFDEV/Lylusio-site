"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";

// WordPress API URL from environment
const WP_API_URL =
	process.env.NEXT_PUBLIC_WP_API_URL || "https://lylusio.fr/wp-json/wp/v2";

interface WPPost {
	id: number;
	date: string;
	title: { rendered: string };
	excerpt: { rendered: string };
	slug: string;
	_embedded?: {
		"wp:featuredmedia"?: Array<{
			source_url: string;
			alt_text: string;
		}>;
	};
}

const RecentArticlesSection = () => {
	const { ref, isInView } = useInView({ threshold: 0.1 });
	const [posts, setPosts] = useState<WPPost[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await fetch(
					`${WP_API_URL}/posts?_embed&per_page=3&orderby=date&order=desc`
				);
				if (!response.ok) {
					throw new Error("Failed to fetch posts");
				}
				const data = await response.json();
				setPosts(data);
			} catch (error) {
				console.error("Error fetching posts:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchPosts();
	}, []);

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("fr-FR", {
			day: "numeric",
			month: "long",
			year: "numeric",
		});
	};

	const stripHtml = (html: string) => {
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
			.substring(0, 120) + "...";
	};

	return (
		<section
			ref={ref}
			className="py-20 md:py-28 bg-gradient-sky-center"
			aria-labelledby="recent-articles-title"
		>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="text-center max-w-3xl mx-auto mb-16">
					<p className="section-label">Blog & Inspiration</p>

					<h2
						id="recent-articles-title"
						className="text-foreground mb-6 text-2xl sm:text-3xl md:text-4xl"
					>
						<span className="font-calligraphic text-accent text-3xl sm:text-4xl md:text-5xl inline-block align-baseline">
							L
						</span>
						ectures & Réflexions
					</h2>

					<p className="text-muted-foreground text-base md:text-lg leading-relaxed">
						Articles inspirants sur l'astrologie humaniste, le Reiki
						et votre cheminement personnel
					</p>
				</div>

				{/* Articles Grid */}
				{loading ? (
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
						{[1, 2, 3].map((i) => (
							<div
								key={i}
								className="bg-card/50 rounded-2xl border border-border/20 overflow-hidden animate-pulse"
							>
								<div className="aspect-[16/10] bg-muted/30" />
								<div className="p-6 space-y-3">
									<div className="h-4 bg-muted/30 rounded w-1/3" />
									<div className="h-6 bg-muted/30 rounded w-full" />
									<div className="h-4 bg-muted/30 rounded w-full" />
									<div className="h-4 bg-muted/30 rounded w-2/3" />
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
						{posts.map((post, index) => (
							<article
								key={post.id}
								className={`group motion-safe:transition-all duration-700 ${
									isInView
										? "opacity-100 translate-y-0"
										: "opacity-0 translate-y-8"
								}`}
								style={{
									transitionDelay: `${index * 150}ms`,
								}}
							>
								<Link
									href={`/blog/${post.slug}`}
									className="block h-full"
								>
									<div className="relative h-full bg-card/50 backdrop-blur-sm border border-border/20 md:border-border/30 rounded-2xl overflow-hidden hover:border-accent/40 motion-safe:transition-all duration-300 hover:shadow-md md:hover:shadow-lg">
										{/* Image */}
										<div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden">
											{post._embedded?.[
												"wp:featuredmedia"
											]?.[0] ? (
												<Image
													src={
														post._embedded[
															"wp:featuredmedia"
														][0].source_url
													}
													alt={
														post._embedded[
															"wp:featuredmedia"
														][0].alt_text ||
														post.title.rendered
													}
													fill
													sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
													className="object-cover group-hover:scale-105 motion-safe:transition-transform duration-500"
													quality={65}
												/>
											) : (
												<div className="w-full h-full bg-gradient-to-br from-accent/20 via-gold/10 to-sand/20" />
											)}
											{/* Gradient overlay */}
											<div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 motion-safe:transition-opacity duration-300" />
										</div>

										{/* Content */}
										<div className="p-4 md:p-6">
											{/* Date */}
											<div className="flex items-center gap-2 text-xs text-muted-foreground/70 mb-3">
												<Calendar className="w-3.5 h-3.5" />
												<time dateTime={post.date}>
													{formatDate(post.date)}
												</time>
											</div>

											{/* Title */}
											<h3 className="text-base md:text-lg lg:text-xl font-display text-foreground mb-3 group-hover:text-accent transition-colors duration-300 line-clamp-2">
												{(() => {
													const title = stripHtml(
														post.title.rendered
													).toLowerCase();
													const firstLetter = title
														.charAt(0)
														.toUpperCase(); // première lettre en majuscule
													return (
														<>
															<span className="text-gold font-calligraphic">
																{firstLetter}
															</span>
															{title.slice(1)}
														</>
													);
												})()}
											</h3>

											{/* Excerpt */}
											<p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
												{stripHtml(
													post.excerpt.rendered
												)}
											</p>

											{/* Read more link */}
											<div className="flex items-center gap-2 text-sm text-accent font-medium group-hover:gap-3 transition-all duration-300">
												<span>Lire l'article</span>
												<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
											</div>
										</div>
									</div>
								</Link>
							</article>
						))}
					</div>
				)}

				{/* CTA Button */}
				<div className="text-center mt-12">
					<Link
						href="/blog"
						aria-label="Voir tous les articles du blog"
					>
						<Button variant="elegant" size="lg" className="group">
							Voir tous les articles
							<ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default RecentArticlesSection;
