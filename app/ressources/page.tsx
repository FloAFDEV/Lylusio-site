import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";
import {
	BookOpen,
	ArrowRight,
	ExternalLink,
	Sparkles,
	Calendar,
} from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { Button } from "@/components/ui/button";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { getYouTubeVideoInfo } from "@/lib/youtube";
import { generateMetadata as genMeta } from "@/content/seo";

// SEO Metadata
export const metadata = genMeta("ressources");

// Revalidate every 24 hours
export const revalidate = 86400;

// YouTube video IDs
const YOUTUBE_VIDEOS = [
	{ id: "Qo10SGie2wE", fallbackTitle: "Comprendre les cycles astrologiques" },
	{
		id: "xZNjolQ1OHk",
		fallbackTitle: "Introduction au Reiki et pratiques énergétiques",
	},
];

// WordPress API
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
		"wp:term"?: Array<
			Array<{
				id: number;
				name: string;
				slug: string;
			}>
		>;
	};
}

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
		.replace(/\s+/g, " ")
		.trim();
};

const formatDate = (dateString: string): string => {
	const date = new Date(dateString);
	return date.toLocaleDateString("fr-FR", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
};

async function fetchLatestBlogPosts() {
	try {
		const res = await fetch(
			`${WP_API_URL}/posts?_embed&per_page=3&orderby=date&order=desc`,
			{
				next: { revalidate: 3600 },
			}
		);

		if (!res.ok) {
			console.error("Failed to fetch blog posts:", res.status);
			return [];
		}

		const wpPosts: WPPost[] = await res.json();

		return wpPosts.map((post) => {
			const imageObj = post._embedded?.["wp:featuredmedia"]?.[0];
			const imageUrl = imageObj?.source_url || "/placeholder.svg";
			const imageAlt =
				imageObj?.alt_text || stripHtml(post.title.rendered);

			const categories =
				post._embedded?.["wp:term"]?.[0]?.map((term) => ({
					id: term.id,
					name: term.name,
					slug: term.slug,
				})) || [];

			return {
				id: post.id,
				title: stripHtml(post.title.rendered),
				excerpt: stripHtml(post.excerpt.rendered).slice(0, 120) + "...",
				date: formatDate(post.date),
				slug: post.slug,
				image: imageUrl,
				imageAlt,
				categories,
			};
		});
	} catch (error) {
		console.error("Error fetching blog posts:", error);
		return [];
	}
}

export default async function RessourcesPage() {
	// Fetch YouTube video info and latest blog posts server-side
	const [videoInfos, latestPosts] = await Promise.all([
		Promise.all(
			YOUTUBE_VIDEOS.map(async (video) => {
				const info = await getYouTubeVideoInfo(video.id);
				return {
					id: video.id,
					...info,
					title: info.title || video.fallbackTitle,
				};
			})
		),
		fetchLatestBlogPosts(),
	]);

	// JSON-LD Structured Data
	const structuredData = {
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		name: "Ressources Gratuites - Ateliers & Vidéos",
		description:
			"Vidéos pédagogiques, ateliers lives et articles sur l'astrologie et le Reiki par Émilie Perez",
		url: "https://lylusio.fr/ressources",
		publisher: {
			"@type": "Person",
			name: "Émilie Perez",
			url: "https://lylusio.fr",
			sameAs: [
				"https://www.instagram.com/emilie.perez_astroreiki_/",
				"https://www.youtube.com/@emilielylusio6206",
				"https://www.facebook.com/share/16cEgpLgk9/",
			],
		},
		mainEntity: {
			"@type": "ItemList",
			itemListElement: videoInfos.map((video, index) => ({
				"@type": "VideoObject",
				position: index + 1,
				name: video.title,
				description: `Vidéo pédagogique sur l'astrologie et le Reiki`,
				thumbnailUrl: video.thumbnailUrl,
				contentUrl: `https://www.youtube.com/watch?v=${video.id}`,
			})),
		},
	};

	return (
		<>
			{/* JSON-LD Structured Data */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData),
				}}
			/>

			<Header />
			<FloatingCTA />

			<main
				id="main-content"
				className="min-h-screen bg-background relative overflow-hidden"
			>
				{/* Hero Section */}
				<section
					aria-label="Hero - Ateliers et ressources gratuites"
					className="relative py-20 md:py-32 overflow-hidden"
				>
					{/* Background decoration */}
					<div
						className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent"
						aria-hidden="true"
					/>
					<div
						className="absolute top-20 right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl"
						aria-hidden="true"
					/>
					<div
						className="absolute bottom-20 left-10 w-48 h-48 bg-gold/10 rounded-full blur-3xl "
						aria-hidden="true"
					/>

					<div className="container mx-auto pt-10 px-4 sm:px-6 lg:px-8 text-center relative z-10">
						<div className="max-w-4xl mx-auto">
							{/* Badge */}
							<div className="inline-flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm border border-border/30 rounded-full mb-8">
								<Sparkles
									className="w-4 h-4 text-gold"
									aria-hidden="true"
								/>
								<span className="text-sm font-medium text-muted-foreground">
									Contenus gratuits
								</span>
							</div>

							<h1 className="text-foreground mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
								<span className="font-calligraphic text-accent text-4xl sm:text-5xl md:text-6xl lg:text-7xl inline-block align-baseline">
									A
								</span>
								teliers, Lives & Ressources
							</h1>

							<p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
								Retrouvez mes contenus gratuits pour approfondir
								votre compréhension de l'astrologie, du Reiki et
								de votre chemin personnel
							</p>
						</div>
					</div>
				</section>

				{/* Section 1: Instagram + Facebook (2 cards côte à côte) */}
				<section
					aria-labelledby="social-section-title"
					className="py-16 bg-gradient-to-b from-transparent via-accent/5 to-transparent relative overflow-hidden"
				>
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-12 md:mb-16">
							<p className="section-label">Sur les réseaux</p>
							<h2
								id="social-section-title"
								className="text-foreground mb-6 text-2xl sm:text-3xl md:text-4xl"
							>
								<span className="font-calligraphic text-accent text-3xl sm:text-4xl md:text-5xl inline-block align-baseline">
									S
								</span>
								uivez-moi sur les réseaux
							</h2>
							<p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
								Ateliers, lives, cercles de paroles et échanges
								avec la communauté
							</p>
						</div>

						<div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto items-stretch">
							{/* CARD INSTAGRAM */}
							<article
								className="group relative bg-[#f7f5ee] p-6 md:p-8 h-full flex flex-col justify-between
               border border-black/5 shadow-sm origin-left
               transition-all duration-700 ease-out
               hover:[transform:perspective(1200px)_rotateY(-4deg)_rotateX(1deg)]
               hover:-translate-y-1 hover:shadow-xl
               before:absolute before:inset-0 before:bg-[url('https://www.transparenttextures.com/patterns/felt.png')] before:opacity-15 before:pointer-events-none"
							>
								<div className="relative z-10 flex flex-col justify-between h-full">
									<div className="flex flex-col items-center gap-6 mb-8">
										{/* Portrait */}
										<div className="relative group/profile">
											<div className="absolute -inset-2 bg-gradient-to-br from-pink-500/30 via-purple-600/30 to-gold/30 rounded-full blur-xl opacity-0 group-hover/profile:opacity-100 transition-opacity duration-500" />
											<div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-gradient-to-br bg-pink-500 shadow-medium">
												<Image
													src="/assets/emilie-portrait.webp"
													alt="Émilie Perez - Instagram"
													width={128}
													height={128}
													className="object-cover w-full h-full"
													quality={90}
												/>
											</div>
											<div className="absolute -bottom-1 -right-1 w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center border-4 border-card shadow-medium">
												<FaInstagram
													className="w-5 h-5 text-white"
													aria-hidden="true"
												/>
											</div>
										</div>

										{/* Texte */}
										<div className="text-center">
											<h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-2">
												@emilie.perez_astroreiki_
											</h3>
											<p className="text-muted-foreground mb-4 text-sm md:text-base">
												Astrologue / Praticienne Reiki /
												Accompagnement professionnel
											</p>
											<div className="flex items-center gap-4 justify-center text-sm text-muted-foreground/70">
												<span>
													<strong className="text-foreground">
														273
													</strong>{" "}
													publications
												</span>
												<span className="text-border">
													·
												</span>
												<span>
													<strong className="text-foreground">
														405
													</strong>{" "}
													followers
												</span>
											</div>
										</div>
									</div>

									{/* CTA */}
									<Button
										asChild
										size="lg"
										className="w-full group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
									>
										<a
											href="https://www.instagram.com/emilie.perez_astroreiki_/"
											target="_blank"
											rel="noopener noreferrer"
											aria-label="Suivre Émilie Perez sur Instagram (nouvelle fenêtre)"
											className="inline-flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-md px-4 py-2 shadow-sm transition-colors duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:rotate-y-1 motion-safe:hover:rotate-x-0.5"
										>
											<FaInstagram
												className="w-5 h-5"
												aria-hidden="true"
											/>
											<span>Suivre</span>
											<ExternalLink
												className="w-4 h-4 group-hover:translate-x-1 transition-transform"
												aria-hidden="true"
											/>
										</a>
									</Button>
								</div>
							</article>

							{/* CARD FACEBOOK */}
							<article
								className="group relative bg-[#f7f5ee] p-6 md:p-8 h-full flex flex-col justify-between
               border border-black/5 shadow-sm origin-right
               transition-all duration-700 ease-out
               hover:[transform:perspective(1200px)_rotateY(4deg)_rotateX(1deg)]
               hover:-translate-y-1 hover:shadow-xl
               before:absolute before:inset-0 before:bg-[url('https://www.transparenttextures.com/patterns/felt.png')] before:opacity-15 before:pointer-events-none"
							>
								<div className="relative z-10 flex flex-col justify-between h-full">
									<div className="flex flex-col items-center gap-6 mb-8">
										{/* Portrait */}
										<div className="relative group/profile">
											<div className="absolute -inset-2 bg-gradient-to-br from-blue-500/30 to-blue-700/30 rounded-full blur-xl opacity-0 group-hover/profile:opacity-100 transition-opacity duration-500" />
											<div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-blue-500 shadow-medium">
												<Image
													src="/assets/emilie-portrait.webp"
													alt="Émilie Perez Lylusio - Facebook"
													width={128}
													height={128}
													className="object-cover w-full h-full"
													quality={90}
												/>
											</div>
											<div className="absolute -bottom-1 -right-1 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center border-4 border-card shadow-medium">
												<FaFacebook
													className="w-5 h-5 text-white"
													aria-hidden="true"
												/>
											</div>
										</div>

										{/* Texte */}
										<div className="text-center">
											<h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-2">
												Emilie Perez Lylusio
											</h3>
											<p className="text-muted-foreground mb-4 text-sm md:text-base">
												Exploratrice passionnée de
												l'astrologie et du Reiki
											</p>
											<div className="flex items-center gap-4 justify-center text-sm text-muted-foreground/70">
												<span>
													<strong className="text-foreground">
														100
													</strong>{" "}
													abonnés
												</span>
												<span className="text-border">
													·
												</span>
												<span>
													<strong className="text-foreground">
														474
													</strong>{" "}
													publications
												</span>
											</div>
										</div>
									</div>

									{/* CTA */}
									<Button
										asChild
										size="lg"
										className="w-full group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
									>
										<a
											href="https://www.facebook.com/share/16cEgpLgk9/"
											target="_blank"
											rel="noopener noreferrer"
											aria-label="Suivre Émilie Perez sur Facebook (nouvelle fenêtre)"
											className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md px-4 py-2 shadow-sm transition-colors duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:rotate-y-1 motion-safe:hover:rotate-x-0.5"
										>
											<FaFacebook
												className="w-5 h-5"
												aria-hidden="true"
											/>
											<span>Suivre</span>
											<ExternalLink
												className="w-4 h-4 group-hover:translate-x-1 transition-transform"
												aria-hidden="true"
											/>
										</a>
									</Button>
								</div>
							</article>
						</div>
					</div>
				</section>

				{/* Section 2: Vidéos YouTube */}
				<section
					aria-labelledby="youtube-section-title"
					className="py-18 md:py-24"
				>
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-12 md:mb-16">
							<p className="section-label">Sur YouTube</p>
							<h2
								id="youtube-section-title"
								className="text-foreground mb-6 text-2xl sm:text-3xl md:text-4xl"
							>
								<span className="font-calligraphic text-accent text-3xl sm:text-4xl md:text-5xl inline-block align-baseline">
									V
								</span>
								idéos Pédagogiques
							</h2>
							<p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
								Explorez mes vidéos pour mieux comprendre les
								cycles astrologiques et les pratiques
								énergétiques
							</p>
						</div>

						<div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto mb-12">
							{videoInfos.map((video) => (
								<article
									key={video.id}
									className="group bg-card rounded-2xl md:rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-border/20"
								>
									<YouTubeEmbed
										videoId={video.id}
										title={video.title}
										thumbnailUrl={video.thumbnailUrl}
									/>
									<div className="p-6 md:p-7 bg-card">
										<h3 className="font-heading text-lg md:text-xl font-bold text-foreground mb-2 line-clamp-2">
											{video.title}
										</h3>
										<p className="text-sm text-muted-foreground">
											Par {video.author}
										</p>
									</div>
								</article>
							))}
						</div>

						{/* CTA YouTube Channel */}
						<nav
							className="text-center"
							aria-label="Navigation vers YouTube"
						>
							<Button
								asChild
								variant="elegant"
								size="lg"
								className="group"
							>
								<a
									href="https://www.youtube.com/@emilielylusio6206"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Voir toutes mes vidéos sur la chaîne YouTube d'Émilie Perez (ouvre dans un nouvel onglet)"
									className="inline-flex items-center gap-2"
								>
									<FaYoutube
										className="w-5 h-5 text-red-500"
										aria-hidden="true"
									/>
									<span>
										Voir toutes mes vidéos sur YouTube
									</span>
									<ExternalLink
										className="w-4 h-4 group-hover:translate-x-1 transition-transform"
										aria-hidden="true"
									/>
								</a>
							</Button>
						</nav>
					</div>
				</section>

				{/* Section 3: Articles Blog */}
				<section
					aria-labelledby="blog-section-title"
					className="py-12 md:py-16 bg-gradient-to-b from-transparent to-accent/5"
				>
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-12 md:mb-14">
							<p className="section-label">Sur le blog</p>
							<h2
								id="blog-section-title"
								className="text-foreground mb-6 text-2xl sm:text-3xl md:text-4xl"
							>
								<span className="font-calligraphic text-accent text-3xl sm:text-4xl md:text-5xl inline-block align-baseline">
									B
								</span>
								log & Articles
							</h2>
							<p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
								Approfondissez vos connaissances en astrologie,
								Reiki et développement personnel
							</p>
						</div>

						{/* Grid des 3 derniers articles */}
						<div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto mb-12">
							{latestPosts.map((post, index) => {
								// Première lettre en majuscule, reste en minuscule (sentence case)
								const firstLetter = post.title
									.charAt(0)
									.toUpperCase();
								const restOfTitle = post.title
									.slice(1)
									.toLowerCase();

								return (
									<article
										key={post.id}
										className="group bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
									>
										<Link
											href={`/blog/${post.slug}`}
											className="flex flex-col h-full"
											aria-label={`Lire l'article : ${post.title}`}
										>
											{/* Image */}
											<div className="aspect-[16/10] overflow-hidden relative bg-muted">
												<Image
													src={post.image}
													alt={
														post.imageAlt ||
														`Image de l'article ${post.title}`
													}
													fill
													className="object-cover group-hover:scale-105 transition-transform duration-500"
													sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
													loading={
														index === 0
															? "eager"
															: "lazy"
													}
													priority={index === 0}
												/>
											</div>

											{/* Contenu */}
											<div className="p-6 flex flex-col flex-grow">
												{/* Date */}
												<div className="flex items-center gap-2 text-xs text-muted-foreground mb-3 uppercase tracking-wide">
													<Calendar
														className="h-3.5 w-3.5"
														aria-hidden="true"
													/>
													<time dateTime={post.slug}>
														{post.date}
													</time>
												</div>

												{/* Titre avec première lettre dorée */}
												<h3 className="font-heading text-lg md:text-xl font-bold mb-3 group-hover:text-accent transition-colors line-clamp-2 min-h-[3.5rem] leading-tight">
													<span className="font-calligraphic text-accent inline-block align-baseline text-2xl md:text-3xl">
														{firstLetter}
													</span>
													{restOfTitle}
												</h3>

												{/* Excerpt */}
												<p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4 flex-grow">
													{post.excerpt}
												</p>

												{/* Lire la suite */}
												<div className="flex items-center gap-2 text-accent font-semibold text-sm mt-auto pt-2 border-t border-border/10">
													Lire l'article
													<ArrowRight
														className="h-4 w-4 group-hover:translate-x-1 transition-transform"
														aria-hidden="true"
													/>
												</div>
											</div>
										</Link>
									</article>
								);
							})}
						</div>

						{/* CTA Voir tous les articles */}
						<nav
							className="text-center"
							aria-label="Navigation vers le blog"
						>
							<Button
								asChild
								variant="elegant"
								size="lg"
								className="group"
							>
								<Link
									href="/blog"
									aria-label="Voir tous les articles du blog sur l'astrologie et le Reiki"
									className="inline-flex items-center gap-2"
								>
									<BookOpen
										className="w-5 h-5"
										aria-hidden="true"
									/>
									<span>Voir tous les articles</span>
									<ArrowRight
										className="w-4 h-4 group-hover:translate-x-1 transition-transform"
										aria-hidden="true"
									/>
								</Link>
							</Button>
						</nav>
					</div>
				</section>
			</main>

			<Footer />
		</>
	);
}
