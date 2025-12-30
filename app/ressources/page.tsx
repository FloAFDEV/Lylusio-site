import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
	BookOpen,
	Instagram,
	Youtube,
	ArrowRight,
	ExternalLink,
	Sparkles,
} from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import { Button } from "@/components/ui/button";
import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { getYouTubeVideoInfo } from "@/lib/youtube";
import { useInView } from "@/hooks/useInView";

// SEO Metadata
export const metadata: Metadata = {
	title: "Ressources Gratuites - Ateliers, Vidéos & Articles | Lylusio",
	description:
		"Découvrez mes vidéos pédagogiques sur l'astrologie et le Reiki, suivez mes ateliers lives sur Instagram et approfondissez vos connaissances avec mes articles de fond.",
	keywords: [
		"ressources astrologie",
		"vidéos reiki",
		"ateliers lives",
		"articles développement personnel",
		"Émilie Perez",
		"Lylusio",
		"Toulouse",
	],
	openGraph: {
		title: "Ressources Gratuites - Lylusio",
		description:
			"Vidéos, ateliers lives et articles pour approfondir votre chemin personnel",
		url: "https://lylusio.fr/ressources",
		siteName: "Lylusio - Émilie Perez",
		images: [
			{
				url: "https://lylusio.fr/og-image.jpg",
				width: 1200,
				height: 630,
				alt: "Lylusio - Ressources Gratuites",
			},
		],
		locale: "fr_FR",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Ressources Gratuites - Lylusio",
		description:
			"Vidéos, ateliers lives et articles pour approfondir votre chemin personal",
		images: ["https://lylusio.fr/og-image.jpg"],
	},
};

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

export default async function RessourcesPage() {
	// Fetch YouTube video info server-side
	const videoInfos = await Promise.all(
		YOUTUBE_VIDEOS.map(async (video) => {
			const info = await getYouTubeVideoInfo(video.id);
			return {
				id: video.id,
				...info,
				title: info.title || video.fallbackTitle,
			};
		})
	);

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
				<section className="relative py-20 md:py-32 overflow-hidden">
					{/* Plant decoration */}
					<div
						className="rounded-full items-center justify-center overflow-hidden bg-background/90 border-2 border-gold/40 shadow-[0_0_15px_hsl(var(--gold)/0.25)] animate-float w-16 h-16 absolute top-20 right-10 opacity-80 hidden sm:flex"
						aria-hidden="true"
					>
						<Image
							src="/assets/plant-decoration.webp"
							alt=""
							width={64}
							height={64}
							className="rounded-full object-cover w-10 h-10"
							loading="lazy"
							quality={80}
							aria-hidden="true"
						/>
					</div>

					{/* Background decoration */}
					<div
						className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent"
						aria-hidden="true"
					/>
					<div
						className="absolute top-20 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl"
						aria-hidden="true"
					/>
					<div
						className="absolute bottom-20 left-10 w-48 h-48 bg-gold/10 rounded-full blur-3xl"
						aria-hidden="true"
					/>

					<div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
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

				{/* YouTube Videos Section */}
				<section className="py-18 md:py-24">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-12 md:mb-16">
							<p className="section-label">Sur YouTube</p>
							<h2 className="text-foreground mb-6 text-2xl sm:text-3xl md:text-4xl">
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

						<div className="grid md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto mb-12">
							{videoInfos.map((video, index) => (
								<article
									key={video.id}
									className="group bg-card/50 backdrop-blur-sm rounded-2xl md:rounded-3xl overflow-hidden border border-border/30 hover:border-accent/40 hover:shadow-medium transition-all duration-500"
								>
									<YouTubeEmbed
										videoId={video.id}
										title={video.title}
										thumbnailUrl={video.thumbnailUrl}
									/>
									<div className="p-4 md:p-5">
										<h3 className="font-display text-lg md:text-xl text-foreground mb-2">
											{video.title}
										</h3>
										<p className="text-sm text-muted-foreground/70">
											Par {video.author}
										</p>
									</div>
								</article>
							))}
						</div>

						{/* CTA YouTube Channel */}
						<div className="text-center">
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
									className="inline-flex items-center gap-2"
								>
									<Youtube
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
						</div>
					</div>
				</section>

				{/* Instagram Section */}
				<section
					className="py-20 md:py-28 relative overflow-hidden bg-gradient-sky-center"
				>
					{/* Background decoration */}
					<div
						className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent"
						aria-hidden="true"
					/>

					<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
						<div className="text-center mb-12 md:mb-16">
							<p className="section-label">Sur Instagram</p>
							<h2 className="text-foreground mb-6 text-2xl sm:text-3xl md:text-4xl">
								<span className="font-calligraphic text-accent text-3xl sm:text-4xl md:text-5xl inline-block align-baseline">
									S
								</span>
								uivez-moi sur Instagram
							</h2>
							<p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
								Ateliers, lives, cercles de paroles et contenus
								exclusifs au quotidien
							</p>
						</div>

						<div className="max-w-2xl mx-auto">
							<div className="bg-card/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-8 md:p-12 border border-border/30 shadow-medium">
								<div className="flex flex-col md:flex-row items-center gap-6 mb-8">
									{/* Instagram Profile Photo */}
									<div className="relative group/profile">
										{/* Glow effect */}
										<div className="absolute -inset-2 bg-gradient-to-br from-pink-500/30 via-purple-600/30 to-gold/30 rounded-full blur-xl opacity-0 group-hover/profile:opacity-100 transition-opacity duration-500" />

										<div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-gradient-to-br from-pink-500 to-purple-600 shadow-medium">
											<div className="w-full h-full bg-gradient-to-br from-accent/20 to-gold/20 flex items-center justify-center">
												<Instagram
													className="w-12 h-12 md:w-16 md:h-16 text-accent"
													aria-hidden="true"
												/>
											</div>
										</div>

										{/* Instagram badge */}
										<div className="absolute -bottom-1 -right-1 w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center border-4 border-card shadow-medium">
											<Instagram
												className="w-5 h-5 text-white"
												aria-hidden="true"
											/>
										</div>
									</div>

									<div className="text-center md:text-left flex-1">
										<h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-2">
											@emilie.perez_astroreiki_
										</h3>
										<p className="text-muted-foreground mb-4 text-sm md:text-base">
											Astrologue / Praticienne Reiki /
											Accompagnement professionnel
										</p>
										<div className="flex items-center gap-4 justify-center md:justify-start text-sm text-muted-foreground/70">
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

								{/* CTA Instagram */}
								<Button
									asChild
									size="lg"
									className="w-full group"
								>
									<a
										href="https://www.instagram.com/emilie.perez_astroreiki_/"
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-pink-500 via-purple-600 to-gold hover:brightness-110 text-white font-medium shadow-gold transition-all duration-300"
									>
										<Instagram
											className="w-6 h-6"
											aria-hidden="true"
										/>
										<span className="text-lg">
											Suivre sur Instagram
										</span>
										<ExternalLink
											className="w-4 h-4 group-hover:translate-x-1 transition-transform"
											aria-hidden="true"
										/>
									</a>
								</Button>
							</div>
						</div>
					</div>
				</section>

				{/* Blog Articles Section */}
				<section className="py-20 md:py-28">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-12">
							<p className="section-label">Sur le blog</p>
							<h2 className="text-foreground mb-6 text-2xl sm:text-3xl md:text-4xl">
								<span className="font-calligraphic text-accent text-3xl sm:text-4xl md:text-5xl inline-block align-baseline">
									B
								</span>
								log & Articles
							</h2>
							<p className="text-muted-foreground max-w-2xl mx-auto mb-10 text-base md:text-lg">
								Approfondissez vos connaissances en astrologie,
								Reiki et développement personnel
							</p>

							<Button asChild size="lg" className="group">
								<Link
									href="/blog"
									className="inline-flex items-center gap-2 bg-gold hover:brightness-110 text-white shadow-gold"
								>
									<BookOpen
										className="w-5 h-5"
										aria-hidden="true"
									/>
									<span>Découvrir tous mes articles</span>
									<ArrowRight
										className="w-5 h-5 group-hover:translate-x-1 transition-transform"
										aria-hidden="true"
									/>
								</Link>
							</Button>
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</>
	);
}
