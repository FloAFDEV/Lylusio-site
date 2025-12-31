import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";
import {
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
import CALENDLY_URLS from "@/lib/calendly";

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
		name: "Ressources Gratuites & Contenus Pratiques",
		description:
			"Vidéos pédagogiques, ateliers & lives pour enrichir votre chemin - Astrologie et Reiki par Émilie Perez",
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
					aria-label="Hero - Ressources gratuites et contenus pratiques"
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
									Ressources gratuites
								</span>
							</div>

							<h1 className="text-foreground mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
								<span className="font-calligraphic text-accent text-4xl sm:text-5xl md:text-6xl lg:text-7xl inline-block align-baseline">
									R
								</span>
								essources gratuites & contenus pratiques
							</h1>

							<p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
								Vidéos pédagogiques, ateliers & lives pour enrichir votre chemin
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
								className="text-foreground mb-6 text-3xl sm:text-4xl md:text-5xl"
							>
								<span className="font-calligraphic text-accent text-4xl sm:text-5xl md:text-6xl inline-block align-baseline">
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
								className="text-foreground mb-6 text-3xl sm:text-4xl md:text-5xl"
							>
								<span className="font-calligraphic text-accent text-4xl sm:text-5xl md:text-6xl inline-block align-baseline">
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

				{/* CTA Section - Transition vers accompagnement */}
				<section
					aria-label="Appel à l'action - Séance découverte"
					className="py-16 md:py-20 bg-gradient-to-b from-accent/5 via-gold/5 to-transparent relative overflow-hidden"
				>
					{/* Background decoration */}
					<div
						className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/10 to-transparent"
						aria-hidden="true"
					/>
					<div
						className="absolute top-10 right-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl"
						aria-hidden="true"
					/>
					<div
						className="absolute bottom-10 left-10 w-48 h-48 bg-gold/10 rounded-full blur-2xl"
						aria-hidden="true"
					/>

					<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
						<div className="max-w-3xl mx-auto text-center">
							{/* Badge Icon */}
							<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gold/20 to-accent/15 rounded-2xl mb-6 shadow-sm ring-1 ring-accent/20">
								<Sparkles
									className="w-8 h-8 text-gold"
									aria-hidden="true"
								/>
							</div>

							{/* Titre */}
							<h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground mb-6">
								<span className="font-calligraphic text-accent text-3xl sm:text-4xl md:text-5xl inline-block align-baseline">
									C
								</span>
								es contenus vous inspirent ?
							</h2>

							{/* Description */}
							<p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
								Passons à l'action ensemble. Réservez une séance d'astrologie ou de Reiki pour approfondir votre cheminement personnel.
							</p>

							{/* CTA Buttons */}
							<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
								<Button
									asChild
									variant="accent"
									size="lg"
									className="w-full sm:w-auto group"
								>
									<a
										href={CALENDLY_URLS.GENERAL}
										target="_blank"
										rel="noopener noreferrer"
										aria-label="Réserver une séance avec Émilie Perez (ouvre Calendly dans un nouvel onglet)"
										className="inline-flex items-center gap-2"
									>
										<Calendar
											className="w-5 h-5"
											aria-hidden="true"
										/>
										<span>Réserver une séance</span>
										<ArrowRight
											className="w-4 h-4 group-hover:translate-x-1 transition-transform"
											aria-hidden="true"
										/>
									</a>
								</Button>

								<Button
									asChild
									variant="outline"
									size="lg"
									className="w-full sm:w-auto group"
								>
									<Link
										href="/accompagnement-toulouse"
										aria-label="Découvrir toutes les prestations d'accompagnement"
										className="inline-flex items-center gap-2"
									>
										<span>Découvrir mes accompagnements</span>
										<ArrowRight
											className="w-4 h-4 group-hover:translate-x-1 transition-transform"
											aria-hidden="true"
										/>
									</Link>
								</Button>
							</div>
						</div>
					</div>
				</section>

				{/* CTA Secondaire - Blog */}
				<section className="pb-16 md:pb-20">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center">
							<p className="text-sm text-muted-foreground">
								Envie de lectures inspirantes ?{" "}
								<Link
									href="/blog"
									className="text-accent hover:text-gold transition-colors font-medium underline decoration-accent/30 hover:decoration-gold/50 underline-offset-2"
								>
									Découvrir les articles et réflexions
								</Link>
							</p>
						</div>
					</div>
				</section>

			</main>

			<Footer />
		</>
	);
}
