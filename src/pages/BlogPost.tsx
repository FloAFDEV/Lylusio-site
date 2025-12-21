import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import GoldenPlantBadge from "@/components/GoldenPlantBadge";
import LazyImage from "@/components/LazyImage";
import { Button } from "@/components/ui/button";
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

const WP_API_URL = "https://lylusio.fr/wp-json/wp/v2";

const formatDate = (dateString: string): string => {
	const date = new Date(dateString);
	return date.toLocaleDateString("fr-FR", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
};

const stripHtml = (html: string): string => {
	const tmp = document.createElement("div");
	tmp.innerHTML = html;
	return tmp.textContent || tmp.innerText || "";
};

const calculateReadTime = (content: string): number => {
	const wordsPerMinute = 200;
	const words = stripHtml(content).split(/\s+/).length;
	return Math.max(1, Math.ceil(words / wordsPerMinute));
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

	processed = processed.replace(
		/src="\/wp-content/g,
		'src="https://lylusio.fr/wp-content'
	);

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

	return (
		<figure className="relative mb-10">
			{!isLoaded && (
				<div className="w-full h-[300px] sm:h-[400px] lg:h-[450px] rounded-2xl shimmer-loading" />
			)}
			<img
				src={src}
				alt={alt}
				className={
					"w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-elegant transition-opacity duration-500 " +
					(isLoaded ? "opacity-100" : "opacity-0 absolute inset-0")
				}
				loading="eager"
				decoding="async"
				onLoad={() => setIsLoaded(true)}
			/>
			<GoldenPlantBadge
				size="md"
				className="absolute -bottom-3 -right-3"
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
			const response = await fetch(
				WP_API_URL + "/posts?slug=" + slug + "&_embed"
			);
			if (!response.ok) throw new Error("Post not found");
			const posts: WPPost[] = await response.json();
			if (posts.length === 0) throw new Error("Post not found");
			return posts[0];
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
					excerpt: stripHtml(wpPost.excerpt.rendered),
					date: wpPost.date,
					imageUrl: imageUrl,
					imageAlt:
						featuredMedia?.alt_text ||
						stripHtml(wpPost.title.rendered),
					author:
						wpPost._embedded?.author?.[0]?.name || "Émilie Perez",
					readTime: calculateReadTime(wpPost.content.rendered),
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
					WP_API_URL +
						"/posts?categories=" +
						wpPost.categories[0] +
						"&exclude=" +
						wpPost.id +
						"&per_page=3&_embed"
				);
				if (res.ok) {
					const related: WPPost[] = await res.json();

					related.forEach((rp) => {
						queryClient.prefetchQuery({
							queryKey: ["blogPost", rp.slug],
							queryFn: async () => {
								const r = await fetch(
									WP_API_URL +
										"/posts?slug=" +
										rp.slug +
										"&_embed"
								);
								const d = await r.json();
								return d[0];
							},
							staleTime: 1000 * 60 * 10,
						});

						const img = new Image();
						img.src =
							rp._embedded?.["wp:featuredmedia"]?.[0]
								?.source_url || "/placeholder.svg";
					});

					setRelatedPosts(
						related.map((rp) => ({
							id: rp.id,
							slug: rp.slug,
							title: stripHtml(rp.title.rendered),
							image:
								rp._embedded?.["wp:featuredmedia"]?.[0]
									?.source_url || "/placeholder.svg",
							date: formatDate(rp.date),
							excerpt:
								stripHtml(rp.excerpt.rendered).slice(0, 100) +
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

	const handleShare = async (platform?: string) => {
		if (!post) return;

		const url = window.location.href;
		const title = stripHtml(post.title);

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
				headline: stripHtml(post.title),
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
				wordCount: stripHtml(post.content).split(/\s+/).length,
				articleSection: post.categories[0]?.name || "Blog",
		  }
		: null;

	if (isLoading) {
		return (
			<>
				<Header />
				<main className="min-h-screen bg-background">
					<div className="container mx-auto px-4 py-32">
						<div className="max-w-3xl mx-auto animate-pulse space-y-8">
							<div className="h-8 bg-muted rounded w-3/4" />
							<div className="h-64 bg-muted rounded-2xl" />
							<div className="space-y-4">
								<div className="h-4 bg-muted rounded w-full" />
								<div className="h-4 bg-muted rounded w-5/6" />
								<div className="h-4 bg-muted rounded w-4/6" />
							</div>
						</div>
					</div>
				</main>
				<Footer />
			</>
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
						<Link to="/blog">
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
			<Helmet>
				<title>{stripHtml(post.title)} | Blog Lylusio</title>
				<meta name="description" content={post.excerpt} />
				<meta name="author" content={post.author} />
				<meta
					name="robots"
					content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
				/>
				<link
					rel="canonical"
					href={"https://lylusio.fr/blog/" + post.slug}
				/>

				{post.categories.map((cat) => (
					<meta key={cat.id} name="keywords" content={cat.name} />
				))}

				<meta property="og:locale" content="fr_FR" />
				<meta property="og:type" content="article" />
				<meta property="og:title" content={stripHtml(post.title)} />
				<meta property="og:description" content={post.excerpt} />
				<meta
					property="og:url"
					content={"https://lylusio.fr/blog/" + post.slug}
				/>
				<meta
					property="og:site_name"
					content="Lylusio - Astrologie & Reiki Toulouse"
				/>
				<meta
					property="article:publisher"
					content="https://www.facebook.com/lylusio"
				/>
				<meta property="article:published_time" content={post.date} />
				<meta property="article:modified_time" content={post.date} />
				<meta property="article:author" content={post.author} />
				{post.categories.map((cat) => (
					<meta
						key={cat.id + "-tag"}
						property="article:tag"
						content={cat.name}
					/>
				))}
				{post.categories[0] && (
					<meta
						property="article:section"
						content={post.categories[0].name}
					/>
				)}
				{post.imageUrl && (
					<>
						<meta property="og:image" content={post.imageUrl} />
						<meta
							property="og:image:secure_url"
							content={post.imageUrl}
						/>
						<meta property="og:image:width" content="1200" />
						<meta property="og:image:height" content="630" />
						<meta property="og:image:alt" content={post.imageAlt} />
						<meta property="og:image:type" content="image/jpeg" />
					</>
				)}

				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={stripHtml(post.title)} />
				<meta name="twitter:description" content={post.excerpt} />
				<meta name="twitter:site" content="@lylusio" />
				<meta name="twitter:creator" content="@lylusio" />
				{post.imageUrl && (
					<meta name="twitter:image" content={post.imageUrl} />
				)}

				<link
					rel="alternate"
					type="application/rss+xml"
					title="Blog Lylusio"
					href="https://lylusio.fr/feed/"
				/>

				{structuredData && (
					<script type="application/ld+json">
						{JSON.stringify(structuredData)}
					</script>
				)}
			</Helmet>

			<Header />
			<main id="main-content" className="min-h-screen bg-background">
				<Breadcrumbs customTitle={stripHtml(post.title)} />

				<article className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
					<div className="max-w-3xl mx-auto mt-2 sm:mt-4 lg:mt-8">
						<Link
							to="/blog"
							className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-6"
						>
							<ArrowLeft className="w-4 h-4" aria-hidden="true" />
							Retour au blog
						</Link>

						<header className="mb-8">
							<h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-navy leading-tight">
								{stripHtml(post.title)}
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
										{formatDate(post.date)}
									</time>
								</span>
								{post.categories.map((cat) => (
									<Link
										key={cat.id}
										to={"/category/blog/" + cat.slug}
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
							className="prose prose-lg prose-navy max-w-none prose-headings:font-heading prose-headings:text-navy prose-headings:scroll-mt-24 prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-foreground/90 prose-p:leading-relaxed prose-p:mb-5 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-navy prose-strong:font-semibold prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:italic prose-blockquote:text-foreground/80 prose-blockquote:bg-sand/30 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:my-8 prose-ul:list-disc prose-ul:pl-6 prose-ul:my-5 prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-5 prose-li:mb-2 prose-img:rounded-xl prose-img:shadow-md prose-img:mx-auto prose-img:my-8 prose-figure:my-8"
							dangerouslySetInnerHTML={{ __html: post.content }}
						/>

						<div className="flex flex-wrap items-center justify-center gap-3 mt-12 pt-8 border-t border-border/30">
							<span className="text-sm text-muted-foreground mr-2">
								Partager :
							</span>
							<Button
								variant="outline"
								size="sm"
								onClick={() => handleShare("facebook")}
							>
								<Facebook className="w-4 h-4 mr-2" /> Facebook
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => handleShare("instagram")}
							>
								<Instagram className="w-4 h-4 mr-2" /> Instagram
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => handleShare("linkedin")}
							>
								<Linkedin className="w-4 h-4 mr-2" /> LinkedIn
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={() => handleShare()}
							>
								<LinkIcon className="w-4 h-4 mr-2" /> Copier
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
											to={"/blog/" + rp.slug}
											className="group block bg-card/50 rounded-xl overflow-hidden border border-border/20 hover:shadow-soft transition-all"
										>
											<div className="aspect-[16/10] overflow-hidden">
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
