"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FaFacebook, FaInstagram, FaLinkedin, FaLink } from "react-icons/fa";

import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import GoldenPlantBadge from "@/components/GoldenPlantBadge";
import LazyImage from "@/components/LazyImage";
import { Button } from "@/components/ui/button";
import * as utils from "@/lib/utils";
import { getOptimizedImageUrl, transformContentImages } from "@/lib/wordpress-images";
import { CALENDLY_URLS } from "@/lib/calendly";

import {
	ArrowLeft,
	Calendar,
	Clock,
	User,
	Tag,
	Facebook,
	Linkedin,
	Instagram,
	Link as LinkIcon,
} from "lucide-react";
import { toast } from "sonner";

interface WPPost {
	id: number;
	date: string;
	slug: string;
	title: { rendered: string };
	content: { rendered: string };
	excerpt: { rendered: string };
	categories: number[];
	_embedded?: {
		"wp:featuredmedia"?: Array<{
			id: number;
			source_url: string;
			alt_text?: string;
		}>;
		author?: Array<{ name: string }>;
		"wp:term"?: Array<Array<{ id: number; name: string; slug: string }>>;
	};
}

interface BlogPostData {
	id: number;
	slug: string;
	title: string;
	content: string;
	excerpt: string;
	date: string;
	imageUrl: string;
	imageAlt: string;
	author: string;
	readTime: number;
	categories: { id: number; name: string; slug: string }[];
}

interface RelatedPost {
	id: number;
	slug: string;
	title: string;
	image: string;
	date: string;
	excerpt: string;
}

// Helper to determine Calendly URL based on article categories
const getCalendlyUrlFromCategories = (
	categories: { id: number; name: string; slug: string }[]
): string => {
	const categorySlugs = categories.map((cat) => cat.slug.toLowerCase());

	// Check if article is about astrology
	if (
		categorySlugs.some(
			(slug) => slug.includes("astrologie") || slug.includes("astro")
		)
	) {
		return CALENDLY_URLS.THEME_NATAL;
	}

	// Check if article is about reiki
	if (
		categorySlugs.some(
			(slug) =>
				slug.includes("reiki") ||
				slug.includes("energie") ||
				slug.includes("energetique")
		)
	) {
		return CALENDLY_URLS.REIKI;
	}

	// Default to general Calendly
	return CALENDLY_URLS.GENERAL;
};

const removeFeaturedImageFromContent = (
	content: string,
	imageUrl: string,
	mediaId?: number
): string => {
	let cleaned = content;

	if (mediaId) {
		const byId1 =
			"<figure[^>]*>\\s*<img[^>]*wp-image-" +
			mediaId +
			"[^>]*>\\s*(?:<figcaption[^>]*>.*?</figcaption>\\s*)?</figure>";
		const byId2 = "<img[^>]*wp-image-" + mediaId + "[^>]*>";
		const regexById = new RegExp(byId1 + "|" + byId2, "gi");
		cleaned = cleaned.replace(regexById, "");
	}

	const urlParts = imageUrl.split("/");
	const fileName = urlParts[urlParts.length - 1];
	const baseName = fileName.replace(/-\d+x\d+\.\w+$/, "");

	if (baseName) {
		const escaped = baseName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		const byName1 =
			"<figure[^>]*>\\s*<img[^>]*" +
			escaped +
			"(?:-\\d+x\\d+)?\\.[^>]+>\\s*(?:<figcaption[^>]*>.*?</figcaption>\\s*)?</figure>";
		const byName2 = "<img[^>]*" + escaped + "(?:-\\d+x\\d+)?\\.[^>]+>";
		const regexByName = new RegExp(byName1 + "|" + byName2, "gi");
		cleaned = cleaned.replace(regexByName, "");
	}

	return cleaned;
};

const processContent = (html: string): string => {
	let processed = html;

	processed = transformContentImages(processed);

	processed = processed.replace(/<span[^>]*>(.*?)<\/span>/gi, "$1");
	processed = processed.replace(/\sstyle="[^"]*"/gi, "");
	processed = processed.replace(/\sclass="[^"]*wp-[^"]*[^"]*"/gi, "");

	processed = processed.replace(
		/<figure[^>]*class="[^"]*(wp-block-embed|wp-block-video)[^"]*"[^>]*>/gi,
		"<figure>"
	);
	processed = processed.replace(/<figcaption[^>]*>.*?<\/figcaption>/gi, "");

	processed = processed.replace(
		/<div[^>]*class="[^"]*wp-video[^"]*"[^>]*>/gi,
		"<div>"
	);

	processed = processed.replace(/<p>\s*<\/p>/gi, "");
	processed = processed.replace(/<div>\s*<\/div>/gi, "");

	processed = processed.replace(
		/<iframe[^>]*>[\s\S]*?<\/iframe>/gi,
		(match) => {
			const cleaned = match
				.replace(/\swidth="[^"]*"/gi, "")
				.replace(/\sheight="[^"]*"/gi, "")
				.replace(/\sstyle="[^"]*"/gi, "");
			return (
				'<div class="video-responsive my-8 flex justify-center">' +
				cleaned +
				"</div>"
			);
		}
	);

	processed = processed.replace(
		/<video[^>]*>[\s\S]*?<\/video>/gi,
		(match) => {
			const cleaned = match
				.replace(/\swidth="[^"]*"/gi, "")
				.replace(/\sheight="[^"]*"/gi, "")
				.replace(/\sclass="[^"]*"/gi, "")
				.replace(/\sstyle="[^"]*"/gi, "");
			return (
				'<div class="video-responsive my-8 flex justify-center"><video class="rounded-xl shadow-md max-w-full" controls>' +
				cleaned.replace(/<video[^>]*>|<\/video>/gi, "") +
				"</video></div>"
			);
		}
	);

	processed = processed.replace(
		/<table/g,
		'<div class="overflow-x-auto my-6"><table class="min-w-full border-collapse"'
	);
	processed = processed.replace(/<\/table>/g, "</table></div>");

	return processed;
};

const FeaturedImage = ({ src, alt }: { src: string; alt: string }) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const optimizedSrc = getOptimizedImageUrl(src);

	return (
		<figure className="relative mb-10">
			{!isLoaded && (
				<div className="w-full h-[300px] sm:h-[400px] lg:h-[450px] rounded-2xl shimmer-loading" />
			)}
			<div className="relative w-full aspect-[16/9] max-h-[500px]">
				<Image
					src={optimizedSrc}
					alt={alt}
					fill
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
					className={
						"object-cover rounded-2xl shadow-elegant transition-opacity duration-500 " +
						(isLoaded ? "opacity-100" : "opacity-0")
					}
					priority
					quality={90}
					onLoad={() => setIsLoaded(true)}
				/>
			</div>
			<GoldenPlantBadge
				size="md"
				className="absolute -bottom-3 -right-3"
				aria-hidden="true"
			/>
		</figure>
	);
};

const BlogPost = () => {
	const { slug } = useParams<{ slug: string }>();
	const queryClient = useQueryClient();
	const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);
	const [searchQuery, setSearchQuery] = useState("");

	const {
		data: wpPost,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["blogPost", slug],
		queryFn: async () => {
			if (!slug) throw new Error("No slug provided");
			const response = await fetch(`/api/posts/${slug}`);
			if (!response.ok) throw new Error("Post not found");
			const post: WPPost = await response.json();
			return post;
		},
		staleTime: 1000 * 60 * 10,
		gcTime: 1000 * 60 * 30,
		enabled: !!slug,
	});

	const post: BlogPostData | null = wpPost
		? (() => {
				const featuredMedia =
					wpPost._embedded?.["wp:featuredmedia"]?.[0];
				const imageUrl = featuredMedia?.source_url || "";
				const mediaId = featuredMedia?.id;

				let content = wpPost.content.rendered;
				content = removeFeaturedImageFromContent(
					content,
					imageUrl,
					mediaId
				);
				content = processContent(content);

				return {
					id: wpPost.id,
					slug: wpPost.slug,
					title: wpPost.title.rendered,
					content: content,
					excerpt: utils.stripHtml(wpPost.excerpt.rendered),
					date: wpPost.date,
					imageUrl: imageUrl,
					imageAlt:
						featuredMedia?.alt_text ||
						utils.stripHtml(wpPost.title.rendered),
					author:
						wpPost._embedded?.author?.[0]?.name || "Émilie Perez",
					readTime: utils.calculateReadTime(wpPost.content.rendered),
					categories:
						wpPost._embedded?.["wp:term"]?.[0]?.map((term) => ({
							id: term.id,
							name: term.name,
							slug: term.slug,
						})) || [],
				};
		  })()
		: null;

	useEffect(() => {
		if (!wpPost || !wpPost.categories.length) return;

		const fetchRelatedPosts = async () => {
			try {
				const res = await fetch(
					`/api/posts?categories=${wpPost.categories[0]}&per_page=3&_embed=1`
				);
				if (res.ok) {
					const related: WPPost[] = await res.json();

					related.forEach((rp) => {
						queryClient.prefetchQuery({
							queryKey: ["blogPost", rp.slug],
							queryFn: async () => {
								const r = await fetch(`/api/posts/${rp.slug}`);
								const d = await r.json();
								return d;
							},
							staleTime: 1000 * 60 * 10,
						});

						const img = document.createElement("img");
						img.src = getOptimizedImageUrl(
							rp._embedded?.["wp:featuredmedia"]?.[0]?.source_url
						);
					});

					setRelatedPosts(
						related.map((rp) => ({
							id: rp.id,
							slug: rp.slug,
							title: utils.stripHtml(rp.title.rendered),
							image: getOptimizedImageUrl(
								rp._embedded?.["wp:featuredmedia"]?.[0]?.source_url
							),
							date: utils.formatDate(rp.date),
							excerpt:
								utils.stripHtml(rp.excerpt.rendered).slice(0, 100) +
								"...",
						}))
					);
				}
			} catch (err) {
				console.error("Error fetching related posts:", err);
			}
		};

		fetchRelatedPosts();
	}, [wpPost, queryClient]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [slug]);

	// Redirect all internal article links to Calendly based on article category
	useEffect(() => {
		if (!post) return;

		const calendlyUrl = getCalendlyUrlFromCategories(post.categories);

		const handleArticleLinksClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			const link = target.closest("a");

			// Only intercept links inside the article content
			if (link && link.closest(".prose")) {
				e.preventDefault();
				window.open(calendlyUrl, "_blank", "noopener,noreferrer");
			}
		};

		document.addEventListener("click", handleArticleLinksClick);
		return () =>
			document.removeEventListener("click", handleArticleLinksClick);
	}, [post]);

	// Optimize WordPress content images with native lazy loading
	useEffect(() => {
		if (!post) return;

		const proseElement = document.querySelector(".prose");
		if (!proseElement) return;

		const images = proseElement.querySelectorAll("img");
		images.forEach((img) => {
			// Add native lazy loading
			if (!img.hasAttribute("loading")) {
				img.setAttribute("loading", "lazy");
			}

			// Add decoding async for better performance
			if (!img.hasAttribute("decoding")) {
				img.setAttribute("decoding", "async");
			}

			// Ensure images are responsive
			if (!img.style.maxWidth) {
				img.style.maxWidth = "100%";
				img.style.height = "auto";
			}

			// Add fetchpriority low for better LCP
			if (!img.hasAttribute("fetchpriority")) {
				img.setAttribute("fetchpriority", "low");
			}
		});
	}, [post]);

	const handleShare = async (platform?: string) => {
		if (!post) return;

		const url = window.location.href;
		const title = utils.stripHtml(post.title);

		if (platform === "facebook") {
			window.open(
				"https://www.facebook.com/sharer/sharer.php?u=" +
					encodeURIComponent(url),
				"_blank"
			);
		} else if (platform === "linkedin") {
			window.open(
				"https://www.linkedin.com/sharing/share-offsite/?url=" +
					encodeURIComponent(url),
				"_blank"
			);
		} else if (platform === "instagram") {
			await navigator.clipboard.writeText(url);
			toast.success("Lien copié, à coller sur Instagram !");
		} else if (navigator.share) {
			try {
				await navigator.share({ title, text: post.excerpt, url });
			} catch (err) {
				// User cancelled
			}
		} else {
			await navigator.clipboard.writeText(url);
			toast.success("Lien copié dans le presse-papiers");
		}
	};

	const structuredData = post
		? {
				"@context": "https://schema.org",
				"@type": "BlogPosting",
				headline: utils.stripHtml(post.title),
				description: post.excerpt,
				datePublished: post.date,
				dateModified: post.date,
				author: {
					"@type": "Person",
					name: post.author,
					url: "https://lylusio.fr/emilie-perez",
				},
				publisher: {
					"@type": "Organization",
					name: "Lylusio",
					url: "https://lylusio.fr",
					logo: {
						"@type": "ImageObject",
						url: "https://lylusio.fr/favicon.png",
					},
				},
				mainEntityOfPage: {
					"@type": "WebPage",
					"@id": "https://lylusio.fr/blog/" + post.slug,
				},
				...(post.imageUrl && {
					image: {
						"@type": "ImageObject",
						url: post.imageUrl,
					},
				}),
				wordCount: utils.stripHtml(post.content).split(/\s+/).length,
				articleSection: post.categories[0]?.name || "Blog",
		  }
		: null;

	if (isLoading) {
		return (
			<div className="min-h-screen bg-background">
				<Header />
				<Breadcrumbs />
				<main className="pb-16 md:pb-20">
					<article className="container mx-auto px-4 sm:px-6 lg:px-8">
						<div className="max-w-3xl mx-auto">
							{/* Skeleton Header */}
							<header className="mb-8 md:mb-12 animate-pulse">
								<div className="h-4 bg-muted/50 rounded w-32 mb-4" />
								<div className="h-12 bg-muted rounded-lg w-3/4 mb-6" />
								<div className="flex items-center gap-6 text-sm">
									<div className="h-4 bg-muted/50 rounded w-24" />
									<div className="h-4 bg-muted/50 rounded w-20" />
									<div className="h-4 bg-muted/50 rounded w-32" />
								</div>
							</header>

							{/* Skeleton Image */}
							<div className="mb-8 md:mb-12 animate-pulse">
								<div className="aspect-[16/9] bg-muted rounded-2xl" />
							</div>

							{/* Skeleton Content */}
							<div className="animate-pulse space-y-6 mb-12">
								<div className="space-y-3">
									<div className="h-4 bg-muted/70 rounded w-full" />
									<div className="h-4 bg-muted/70 rounded w-[95%]" />
									<div className="h-4 bg-muted/70 rounded w-[90%]" />
								</div>
								<div className="h-8 bg-muted rounded-lg w-2/3 mt-8" />
								<div className="space-y-3">
									<div className="h-4 bg-muted/70 rounded w-full" />
									<div className="h-4 bg-muted/70 rounded w-[92%]" />
									<div className="h-4 bg-muted/70 rounded w-[97%]" />
									<div className="h-4 bg-muted/70 rounded w-[88%]" />
								</div>
							</div>
						</div>
					</article>
				</main>
				<Footer />
			</div>
		);
	}

	if (isError || !post) {
		return (
			<>
				<Header />
				<main className="min-h-screen bg-background flex items-center justify-center">
					<div className="text-center px-4">
						<h1 className="font-display text-3xl text-navy mb-4">
							Article introuvable
						</h1>
						<p className="text-muted-foreground mb-8">
							Cet article n'existe pas ou a été supprimé.
						</p>
						<Link href="/blog">
							<Button variant="elegant">
								<ArrowLeft className="w-4 h-4 mr-2" />
								Retour au blog
							</Button>
						</Link>
					</div>
				</main>
				<Footer />
			</>
		);
	}

	return (
		<>
			{/* SEO metadata handled by Next.js Metadata API */}

			<Header />
			<main id="main-content" className="pt-20 sm:pt-24 md:pt-28 min-h-screen bg-background">
				<Breadcrumbs customTitle={utils.stripHtml(post.title)} />

				<article className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
					<div className="max-w-3xl mx-auto mt-2 sm:mt-4 lg:mt-8">
						<Link
							href="/blog"
							className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-6"
						>
							<ArrowLeft className="w-4 h-4" aria-hidden="true" />
							Retour au blog
						</Link>

						<header className="mb-8">
							<h1 className="font-display text-4xl md:text-5xl font-bold leading-snug mb-6 text-foreground">
								<span className="font-calligraphic text-accent inline-block align-baseline text-5xl md:text-6xl">
									{utils.toSentenceCase(
										utils.stripHtml(post.title)
									).charAt(0)}
								</span>
								{utils.toSentenceCase(utils.stripHtml(post.title)).slice(1)}
							</h1>

							<div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
								<span className="flex items-center gap-1.5">
									<Clock className="w-4 h-4 text-accent" />
									{post.readTime} min
								</span>
								<span className="flex items-center gap-1.5">
									<User className="w-4 h-4 text-accent" />
									{post.author}
								</span>
								<span className="flex items-center gap-1.5">
									<Calendar className="w-4 h-4 text-accent" />
									<time dateTime={post.date}>
										{utils.formatDate(post.date)}
									</time>
								</span>
								{post.categories.map((cat) => (
									<Link
										key={cat.id}
										href={"/category/blog/" + cat.slug}
										className="flex items-center gap-1.5 text-accent hover:underline"
									>
										<Tag className="w-4 h-4" />
										{cat.name}
									</Link>
								))}
							</div>
						</header>

						{post.imageUrl && (
							<FeaturedImage
								src={post.imageUrl}
								alt={post.imageAlt}
							/>
						)}

						<div
							className="prose prose-lg max-w-2xl mx-auto !text-left
							prose-headings:font-display prose-headings:text-foreground prose-headings:scroll-mt-24 prose-headings:!text-left
							prose-h1:text-4xl prose-h1:font-semibold prose-h1:mt-12 prose-h1:mb-6 prose-h1:leading-tight
							prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-3 prose-h2:leading-snug
							prose-h3:text-xl md:prose-h3:text-2xl prose-h3:font-medium prose-h3:mt-6 prose-h3:mb-2 prose-h3:leading-snug
							prose-p:text-base md:prose-p:text-lg prose-p:font-body prose-p:leading-relaxed prose-p:mb-4 prose-p:max-w-prose prose-p:!text-left prose-p:text-foreground/90
							prose-a:text-accent prose-a:font-medium prose-a:no-underline hover:prose-a:underline hover:prose-a:decoration-2
							prose-strong:text-foreground prose-strong:font-semibold
							prose-em:text-foreground/80 prose-em:italic
							prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:italic prose-blockquote:text-foreground/80 prose-blockquote:bg-gradient-sand-center/30 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:my-8 prose-blockquote:!text-left
							prose-ul:list-disc prose-ul:pl-6 prose-ul:my-6 prose-ul:space-y-2
							prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-6 prose-ol:space-y-2
							prose-li:text-foreground/90 prose-li:leading-relaxed prose-li:mb-2 prose-li:!text-left
							prose-img:rounded-xl prose-img:shadow-md prose-img:mx-auto prose-img:my-8
							prose-figure:my-8
							prose-code:text-accent prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
							prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:p-4"
							dangerouslySetInnerHTML={{ __html: post.content }}
						/>

						{/* Signature manuscrite Emilie Perez */}
						<div className="text-center mt-12 mb-8">
							<p
								className="font-calligraphic text-2xl md:text-3xl text-navy/80 animate-fade-in animate-handwriting"
								style={{
									animationDelay: "0.3s",
								}}
								aria-hidden="true"
							>
								— Émilie Perez —
							</p>
						</div>

						<div className="flex flex-wrap items-center justify-center gap-3 mt-8 pt-8 border-t border-border/30">
							<Button
								variant="outline"
								size="sm"
								onClick={() => handleShare("facebook")}
							>
								<FaFacebook
									className="w-4 h-4 mr-2 text-blue-500"
									aria-hidden="true"
								/>{" "}
								Facebook
							</Button>

							<Button
								variant="outline"
								size="sm"
								onClick={() => handleShare("instagram")}
							>
								<FaInstagram
									className="w-4 h-4 mr-2 text-pink-500"
									aria-hidden="true"
								/>{" "}
								Instagram
							</Button>

							<Button
								variant="outline"
								size="sm"
								onClick={() => handleShare("linkedin")}
							>
								<FaLinkedin
									className="w-4 h-4 mr-2 text-blue-400"
									aria-hidden="true"
								/>{" "}
								LinkedIn
							</Button>

							<Button
								variant="outline"
								size="sm"
								onClick={() => handleShare()}
							>
								<FaLink
									className="w-4 h-4 mr-2"
									aria-hidden="true"
								/>{" "}
								Copier
							</Button>
						</div>

						{relatedPosts.length > 0 && (
							<section
								className="mt-16 pt-10 border-t border-border/30"
								aria-labelledby="related-posts"
							>
								<h2
									id="related-posts"
									className="font-display text-2xl font-bold mb-8 text-navy"
								>
									Articles similaires
								</h2>
								<div className="grid gap-6 sm:grid-cols-2">
									{relatedPosts.map((rp) => (
										<Link
											key={rp.id}
											href={"/blog/" + rp.slug}
											className="group block bg-card/50 rounded-xl overflow-hidden border border-border/20 hover:shadow-soft transition-all"
										>
											<div className="aspect-[16/10] overflow-hidden relative">
												<LazyImage
													src={rp.image}
													alt={rp.title}
													className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
													placeholderClassName="w-full h-full shimmer-loading"
													width={400}
													height={250}
												/>
											</div>
											<div className="p-5">
												<p className="text-xs text-muted-foreground mb-2">
													{rp.date}
												</p>
												<h3 className="font-medium text-foreground group-hover:text-accent transition-colors mb-2 line-clamp-2">
													{rp.title}
												</h3>
												<p className="text-sm text-muted-foreground line-clamp-2">
													{rp.excerpt}
												</p>
											</div>
										</Link>
									))}
								</div>
							</section>
						)}
					</div>
				</article>
			</main>
			<Footer />
		</>
	);
};

export default BlogPost;
