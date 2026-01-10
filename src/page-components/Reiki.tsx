"use client";

import Link from "next/link";
import Image from "next/image";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import GoldenPlantBadge from "@/components/GoldenPlantBadge";
import FloatingParticles from "@/components/FloatingParticles";
import { Button } from "@/components/ui/button";
import MiniFAQ from "@/components/MiniFAQ";
import {
	Clock,
	MapPin,
	Check,
	ExternalLink,
	Quote,
	Heart,
	Zap,
	Sparkles,
	Calendar,
	ArrowRight,
	AlertTriangle,
	BookOpen,
	Leaf,
	HelpCircle,
} from "lucide-react";
import { useParallax } from "@/hooks/useParallax";
import { useInView } from "@/hooks/useInView";
import { CALENDLY_URLS } from "@/lib/calendly";

const Reiki = () => {
	const parallaxOffset = useParallax(0.12);
	const parallaxOffsetSlow = useParallax(0.06);
	const { ref: heroRef, isInView: heroInView } = useInView({
		threshold: 0.1,
	});
	const { ref: historyRef, isInView: historyInView } = useInView({
		threshold: 0.1,
	});
	const { ref: whatIsRef, isInView: whatIsInView } = useInView({
		threshold: 0.1,
	});
	const { ref: benefitsRef, isInView: benefitsInView } = useInView({
		threshold: 0.1,
	});
	const { ref: servicesRef, isInView: servicesInView } = useInView({
		threshold: 0.1,
	});
	const { ref: articlesRef, isInView: articlesInView } = useInView({
		threshold: 0.1,
	});

	const structuredData = {
		"@context": "https://schema.org",
		"@type": "Service",
		"@id": "https://lylusio.fr/reiki-toulouse#service",
		name: "Séance Reiki Toulouse Cépet - Thérapie Énergétique",
		description:
			"Soin énergétique Reiki Usui à Toulouse et Cépet (31). Praticienne Reiki 3ème degré certifiée. Libération des tensions, rééquilibrage énergétique et bien-être intérieur. En cabinet ou à distance.",
		provider: {
			"@type": "LocalBusiness",
			"@id": "https://lylusio.fr/#business",
			name: "Lylusio - Émilie Perez",
			address: {
				"@type": "PostalAddress",
				addressLocality: "Cépet",
				postalCode: "31620",
				addressRegion: "Occitanie",
				addressCountry: "FR",
			},
			telephone: "+33619151959",
		},
		areaServed: [
			{ "@type": "City", name: "Toulouse" },
			{ "@type": "City", name: "Cépet" },
			{ "@type": "AdministrativeArea", name: "Haute-Garonne" },
			{ "@type": "Country", name: "France" },
		],
		serviceType: "Thérapie énergétique",
		offers: [
			{
				"@type": "Offer",
				name: "Séance Reiki en présentiel",
				description:
					"Soin énergétique au cabinet de Cépet près de Toulouse",
				price: "60",
				priceCurrency: "EUR",
				availability: "https://schema.org/InStock",
			},
			{
				"@type": "Offer",
				name: "Séance Reiki à distance",
				description: "Soin énergétique en visio, accessible partout",
				price: "50",
				priceCurrency: "EUR",
				availability: "https://schema.org/InStock",
			},
		],
	};

	return (
		<>
			{/* SEO metadata handled by Next.js Metadata API */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData),
				}}
			/>

			<div className="min-h-screen bg-background relative">
				<FloatingParticles count={20} />
				<a href="#main-content" className="skip-link">
					Aller au contenu principal
				</a>
				<Header />
				<Breadcrumbs />

				<main
					id="main-content"
					className="pt-20 sm:pt-24 md:pt-28 pb-16 md:pb-24 relative overflow-hidden"
				>
					{/* Hero Section with Full Background Image */}
					<section
						ref={heroRef}
						className="relative min-h-[70vh] sm:min-h-[80vh] md:min-h-[85vh] flex items-center overflow-hidden mb-12 md:mb-24"
					>
						{/* Background image with parallax */}
						<div className="absolute inset-0" aria-hidden="true">
							<div
								className="relative w-full h-[120%] -mt-[10%]"
								style={{
									transform: `translate3d(0, ${parallaxOffset}px, 0) scale(1.05)`,
								}}
							>
								<Image
									src="/assets/kundalini-eveil.webp"
									alt=""
									fill
									className="object-cover"
									priority
								/>
							</div>
							{/* Multi-layer gradient overlays for glass effect */}
							<div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/75 to-background/30" />
							<div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
							<div className="absolute inset-0 backdrop-blur-[2px]" />
						</div>

						{/* Animated ambient orbs - hidden on mobile for performance */}
						<div
							className="absolute inset-0 pointer-events-none overflow-hidden hidden sm:block"
							aria-hidden="true"
						>
							<div
								className="absolute top-1/4 right-1/4 w-[300px] md:w-[400px] h-[300px] md:h-[400px] rounded-full opacity-30"
								style={{
									background:
										"radial-gradient(circle, hsl(var(--gold) / 0.2) 0%, transparent 70%)",
									transform: `translateY(${parallaxOffsetSlow}px)`,
								}}
							/>
							<div
								className="absolute bottom-1/3 left-10 w-[200px] md:w-[300px] h-[200px] md:h-[300px] rounded-full opacity-25"
								style={{
									background:
										"radial-gradient(circle, hsl(var(--accent) / 0.15) 0%, transparent 70%)",
									transform: `translateY(${
										-parallaxOffsetSlow * 0.8
									}px)`,
								}}
							/>
						</div>

						{/* Content */}
						<div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
							<div className="max-w-2xl">
								<div
									className={`transition-all duration-1000 ${
										heroInView
											? "opacity-100 translate-y-0"
											: "opacity-0 translate-y-12"
									}`}
								>
									<div className="inline-flex items-center gap-2 px-4 py-2 bg-card/60 backdrop-blur-md rounded-full mb-6 border border-gold/20">
										<Heart className="w-4 h-4 text-gold" />
										<span className="text-sm text-foreground font-medium">
											Thérapie Énergétique
										</span>
									</div>

									<h1 className="text-foreground text-4xl md:text-5xl mb-4 sm:mb-6 leading-tight">
										<span className="font-calligraphic text-accent text-5xl md:text-6xl inline-block align-baseline">
											E
										</span>
										nvie de découvrir le Reiki ?
									</h1>

									<p className="text-xl sm:text-2xl text-accent font-display mb-6">
										Je vous invite à explorer les bienfaits
										du Reiki
									</p>

									<p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
										Pratique universelle à l'approche simple
										et accessible pour tous.
										<strong className="text-foreground">
											{" "}
											Une pratique qui place au centre
											l'être humain dans sa globalité, où
											l'esprit et le corps sont liés et
											indissociables.
										</strong>
									</p>

									<div className="flex flex-col sm:flex-row gap-4">
										<Button
											variant="accent"
											size="lg"
											className="group"
											onClick={() =>
												window.open(
													CALENDLY_URLS.REIKI,
													"_blank"
												)
											}
										>
											<Calendar className="w-5 h-5 mr-2" />
											Réserver ma séance
											<ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
										</Button>
										<Link href="/blog?theme=reiki">
											<Button
												variant="outline"
												size="lg"
												className="w-full sm:w-auto bg-card/40 backdrop-blur-sm border-border/40 hover:bg-card/60"
											>
												<BookOpen className="w-5 h-5 mr-2" />
												Lire mes articles
											</Button>
										</Link>
									</div>
								</div>
							</div>
						</div>

						{/* Floating badge - smaller on mobile */}
						<GoldenPlantBadge
							size="md"
							className="absolute bottom-20 sm:bottom-12 right-4 sm:right-8 md:right-16 z-10 opacity-70 sm:opacity-80"
						/>

						{/* Scroll indicator - hidden on very small screens */}
						<div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce hidden xs:flex">
							<div className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border-2 border-foreground/20 flex justify-center pt-1.5 sm:pt-2">
								<div className="w-1 h-2 sm:w-1.5 sm:h-3 bg-foreground/40 rounded-full animate-pulse" />
							</div>
						</div>
					</section>

					{/* Histoire du Reiki - Glass Card over Image */}
					<section
						ref={historyRef}
						className="relative mb-20 md:mb-28 overflow-hidden"
					>
						{/* Background image */}
						<div
							className="absolute inset-0 -z-10"
							aria-hidden="true"
							style={{
								transform: `translate3d(0, ${
									parallaxOffsetSlow * 0.5
								}px, 0)`,
							}}
						>
							<div className="relative w-full h-full">
								<Image
									src="/assets/reiki-histoire.webp"
									alt=""
									fill
									className="object-cover opacity-20"
								/>
							</div>
							<div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
						</div>

						<div className="container mx-auto px-4 sm:px-6 lg:px-8">
							<div
								className={`max-w-5xl mx-auto transition-all duration-1000 ${
									historyInView
										? "opacity-100 translate-y-0"
										: "opacity-0 translate-y-12"
								}`}
							>
								<div className="text-center mb-12">
									<p className="section-label">Origines</p>
									<h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground">
										<span className="font-calligraphic text-accent text-3xl sm:text-4xl md:text-5xl inline-block align-baseline">
											P
										</span>
										etite histoire du Reiki...
									</h2>
								</div>

								<div className="grid lg:grid-cols-5 gap-6 md:gap-8 items-start">
									{/* Image with reveal effect */}
									<figure
										className={`lg:col-span-2 relative transition-all duration-&lsqb;1.2s&rsqb; ${
											historyInView
												? "opacity-100 scale-100"
												: "opacity-0 scale-95"
										}`}
									>
										<div className="absolute -inset-2 bg-gradient-to-br from-gold/20 via-accent/10 to-transparent rounded-3xl blur-xl opacity-60" />
										<div
											className="relative rounded-2xl overflow-hidden aspect-[3/4]"
											style={{
												clipPath: historyInView
													? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
													: "polygon(0 0, 0 0, 0 100%, 0 100%)",
												transition:
													"clip-path 1s cubic-bezier(0.65, 0, 0.35, 1) 0.3s",
											}}
										>
											<div className="absolute inset-0 rounded-2xl shadow-xl pointer-events-none"></div>

											<Image
												src="/assets/reiki-histoire.webp"
												alt="Histoire du Reiki - Mikao Usui"
												fill
												className="object-cover"
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
										</div>
										<GoldenPlantBadge
											size="md"
											className="absolute -bottom-3 -right-3 z-10"
										/>
										<div
											className={`absolute -top-2 -left-2 w-12 h-12 border-l-2 border-t-2 border-gold/40 rounded-tl-xl transition-opacity duration-700 delay-700 ${
												historyInView
													? "opacity-100"
													: "opacity-0"
											}`}
										/>
									</figure>

									{/* Glass content card */}
									<article
										className={`lg:col-span-3 bg-card/70 backdrop-blur-xl rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 lg:p-10 border border-border/30 shadow-xl transition-all duration-1000 delay-200 ${
											historyInView
												? "opacity-100 translate-x-0"
												: "opacity-0 translate-x-8"
										}`}
									>
										<div className="flex items-center gap-3 mb-6">
											<div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent/20 to-gold/10 flex items-center justify-center">
												<Leaf className="w-6 h-6 text-accent" />
											</div>
											<div>
												<h3 className="font-display text-xl text-foreground">
													Son fondateur
												</h3>
												<p className="text-sm text-muted-foreground">
													Mikao Usui
												</p>
											</div>
										</div>

										<div className="space-y-4 text-muted-foreground leading-relaxed">
											<p>
												<strong className="text-foreground">
													Mikao Usui
												</strong>
												, enseignant japonais de la
												méditation. En 1922, à l'âge de
												57 ans, toujours en quête d'une
												vie spirituelle accomplie, il
												part faire une retraite sur le
												Mont Kuruma, une montagne située
												au nord de Kyoto.
											</p>

											<p>
												Pendant{" "}
												<strong className="text-foreground">
													21 jours
												</strong>
												, il va pratiquer un rituel
												composé de jeûnes, de
												méditations, de chants, de
												prières et rien d'autre.
											</p>

											<p>
												Au bout du 21ème jour, il reçut
												une « grande énergie lumineuse
												», une illumination dans tout
												son corps. Quand il revint de sa
												retraite, il commença à utiliser
												cette énergie sur lui-même et
												sur ses proches.
											</p>
										</div>

										<blockquote className="mt-6 text-accent font-display text-lg italic border-l-2 border-gold/40 pl-4">
											À partir de cet instant, Mikao Usui
											créa le « Reiki ».
										</blockquote>

										<a
											href="https://www.institut-reiki.com/vie-de-mikao-usui-fondateur-reiki-jusqua-usui-reiki-ryoho-gakkai/"
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-2 text-accent hover:text-gold transition-colors text-sm font-medium mt-6 group"
										>
											<ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
											En savoir plus sur Mikao Usui
										</a>
									</article>
								</div>
							</div>
						</div>
					</section>

					{/* C'est quoi le Reiki - Full width glass panel */}
					<section
						ref={whatIsRef}
						className="relative mb-20 md:mb-28 py-16 md:py-24 overflow-hidden"
					>
						{/* Subtle background pattern */}
						<div
							className="absolute inset-0 -z-10"
							aria-hidden="true"
						>
							<div
								className="absolute inset-0 opacity-[0.03]"
								style={{
									backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
								}}
							/>
							<div className="absolute inset-0 bg-gradient-to-b from-sand/40 via-background to-background" />
						</div>

						<div className="container mx-auto px-4 sm:px-6 lg:px-8">
							<div
								className={`max-w-4xl mx-auto transition-all duration-1000 ${
									whatIsInView
										? "opacity-100 translate-y-0"
										: "opacity-0 translate-y-12"
								}`}
							>
								<article className="relative bg-card/60 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 border border-border/20 shadow-2xl overflow-hidden">
									{/* Decorative corner gradients */}
									<div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-gold/10 to-transparent rounded-bl-full" />
									<div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-accent/10 to-transparent rounded-tr-full" />

									<div className="relative z-10">
										<div className="text-center mb-10">
											<div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold/20 to-accent/10 flex items-center justify-center mx-auto mb-6 shadow-lg">
												<Zap className="w-10 h-10 text-gold" />
											</div>
											<h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground">
												<span className="font-calligraphic text-accent text-3xl sm:text-4xl md:text-5xl inline-block align-baseline">
													C
												</span>
												'est quoi le Reiki ?
											</h2>
										</div>

										<p className="text-muted-foreground text-center leading-relaxed mb-10 max-w-2xl mx-auto text-lg">
											Se référant aux textes Bouddhistes
											de son époque (traditions
											orientales), Reiki veut
											littéralement dire « l'énergie de
											l'esprit » :
										</p>

										<div className="grid sm:grid-cols-2 gap-6 mb-10">
											{/* Rei Card */}
											<div className="group relative text-center p-8 bg-gradient-to-br from-accent/10 via-accent/5 to-card/80 backdrop-blur-sm rounded-2xl border border-accent/20 hover:border-accent/40 transition-all duration-500 hover:shadow-[0_12px_40px_-12px_hsl(var(--accent)/0.4),0_0_30px_-8px_hsl(var(--accent)/0.3)] hover:-translate-y-1 hover:scale-105 overflow-hidden">
												{/* Animated glow background */}
												<div className="absolute inset-0 bg-gradient-to-tr from-accent/10 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
												<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent/20 rounded-full blur-3xl opacity-0 group-hover:opacity-70 group-hover:animate-gentle-pulse" />

												<div className="relative z-10">
													<p className="font-display text-6xl text-accent mb-3 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 drop-shadow-[0_0_12px_hsl(var(--accent)/0.6)]">
														Rei
													</p>
													<div className="inline-block px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full mt-2 shadow-[0_0_15px_-5px_hsl(var(--accent)/0.3)] group-hover:shadow-[0_0_25px_-5px_hsl(var(--accent)/0.5)] transition-all duration-300">
														<p className="text-foreground font-semibold text-base bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
															signifie « esprit »
														</p>
													</div>
												</div>
											</div>

											{/* Ki Card */}
											<div className="group relative text-center p-8 bg-gradient-to-br from-gold/10 via-gold/5 to-card/80 backdrop-blur-sm rounded-2xl border border-gold/20 hover:border-gold/40 transition-all duration-500 hover:shadow-[0_12px_40px_-12px_hsl(var(--gold)/0.4),0_0_30px_-8px_hsl(var(--gold)/0.3)] hover:-translate-y-1 hover:scale-105 overflow-hidden">
												{/* Animated glow background */}
												<div className="absolute inset-0 bg-gradient-to-tr from-gold/10 via-transparent to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
												<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gold/20 rounded-full blur-3xl opacity-0 group-hover:opacity-70 group-hover:animate-gentle-pulse" />

												<div className="relative z-10">
													<p className="font-display text-6xl text-gold mb-3 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 drop-shadow-[0_0_12px_hsl(var(--gold)/0.6)]">
														Ki
													</p>
													<div className="inline-block px-4 py-1.5 bg-gold/10 border border-gold/20 rounded-full mt-2 shadow-[0_0_15px_-5px_hsl(var(--gold)/0.3)] group-hover:shadow-[0_0_25px_-5px_hsl(var(--gold)/0.5)] transition-all duration-300">
														<p className="text-foreground font-semibold text-base bg-gradient-to-r from-gold to-gold/70 bg-clip-text text-transparent">
															signifie « énergie »
														</p>
													</div>
												</div>
											</div>
										</div>

										<blockquote className="text-center text-xl text-foreground/90 font-display italic border-y border-border/30 py-8 mb-10">
											Littéralement :{" "}
											<span className="text-accent">
												Énergie de l'esprit
											</span>{" "}
											ou{" "}
											<span className="text-gold">
												Guérison de l'esprit
											</span>
										</blockquote>

										<p className="text-muted-foreground text-center leading-relaxed mb-10 text-lg">
											En occident, on parle plutôt de «
											guérir le mal-être / mal dans sa
											peau / se sentir mal ».
										</p>

										{/* Warning Box */}
										<div className="bg-amber-50/80 dark:bg-amber-900/20 backdrop-blur-sm border border-amber-200/60 dark:border-amber-800/40 rounded-2xl p-6">
											<div className="flex items-start gap-4">
												<div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
													<AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
												</div>
												<div>
													<p className="text-foreground font-medium mb-2 text-lg">
														Rappel important
													</p>
													<p className="text-muted-foreground">
														Le Reiki ne soigne pas
														les maladies ! Il traite
														les « maux de l'esprit »
														qui sont pour la plupart
														responsables des « maux
														du corps » et engendrent
														les maladies.
														<strong className="text-foreground">
															{" "}
															Le Reiki amène un
															bien-être intérieur
															profond.
														</strong>
													</p>
												</div>
											</div>
										</div>
									</div>
								</article>
							</div>
						</div>
					</section>
					{/* Pourquoi faire un soin Reiki */}
					<section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20 md:mb-28 relative z-10">
						<div
							className="
    max-w-5xl mx-auto
    motion-safe:animate-fade-up
  "
						>
							{" "}
							<article className="relative bg-card/20 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 border border-border/30 shadow-2xl overflow-hidden">
								{/* Décors */}
								<div
									className="absolute inset-0 pointer-events-none"
									aria-hidden="true"
								>
									<div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-gold/10 to-transparent rounded-bl-full blur-2xl" />
									<div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-accent/10 to-transparent rounded-tr-full blur-2xl" />
								</div>

								<div className="relative z-10">
									<div className="text-center mb-10">
										<div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold/20 to-accent/10 flex items-center justify-center mx-auto mb-6 shadow-lg">
											<HelpCircle className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gold" />
										</div>
										<h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground">
											<span className="font-calligraphic text-accent text-3xl sm:text-4xl md:text-5xl inline-block align-baseline">
												P
											</span>
											our quelles raisons aurais-je besoin
											d’un soin Reiki ?
										</h2>
									</div>

									<p className="text-muted-foreground text-center leading-relaxed mb-8 max-w-3xl mx-auto text-lg">
										Parce que le corps envoie parfois des
										signaux pour exprimer un mal-être, qu’il
										soit émotionnel, mental ou physique.
									</p>

									<ul className="grid sm:grid-cols-2 gap-4 mb-10">
										{[
											"Crises d’angoisse (boule dans la gorge, le ventre ou la poitrine)",
											"Maux de tête à répétition",
											"Problèmes de sommeil",
											"Blocages sans raison apparente",
											"Problèmes relationnels et/ou émotionnels",
											"Sensation de fatigue ou de surcharge intérieure",
										].map((item) => (
											<li
												key={item}
												className="
		group
		pointer-events-auto
		flex items-start gap-3
		bg-gradient-to-br from-card/80 to-card/60
		backdrop-blur-sm
		rounded-xl
		p-4
		border border-border/20
		transition-all duration-300
		hover:-translate-y-0.5
		hover:border-gold/40
		hover:shadow-[0_0_0_1px_hsl(var(--gold)/0.25),0_10px_30px_-10px_hsl(var(--gold)/0.35)]
	"
											>
												<Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
												<span className="text-muted-foreground text-sm leading-relaxed">
													{item}
												</span>
											</li>
										))}
									</ul>

									<div className="space-y-5 text-muted-foreground leading-relaxed text-base">
										<p>
											Le Reiki aide à{" "}
											<strong className="text-foreground">
												libérer les énergies bloquées
											</strong>{" "}
											au niveau du corps et de l’esprit.
											C’est une pratique qui stimule
											l’auto-guérison.
										</p>

										<p>
											Le Reiki ne soigne pas les maladies
											mais agit sur leurs origines. C’est
											pourquoi certaines manifestations
											psychosomatiques liées aux tensions
											ou aux blocages peuvent disparaître
											naturellement.
										</p>

										<p>
											Il active l’ensemble du système
											énergétique, rééquilibre le corps
											dans sa globalité, agit sur les
											plans{" "}
											<strong className="text-foreground">
												physique, émotionnel et mental
											</strong>{" "}
											et contribue à diminuer le stress.
										</p>
									</div>

									<blockquote className="mt-10 text-center text-lg md:text-xl text-foreground font-display italic border-y border-gold/30 py-6">
										Le Reiki accompagne le corps et l’esprit
										vers un état de bien-être profond et
										durable.
									</blockquote>
								</div>
							</article>
						</div>
					</section>
					<section className="relative py-16 md:py-24">
						<div className="max-w-5xl mx-auto px-4">
							{/* Titre */}
							<h2 className="text-2xl md:text-3xl font-semibold text-center mb-4">
								<span className="font-calligraphic text-accent text-3xl sm:text-4xl md:text-5xl inline-block align-baseline">
									L
								</span>
								es{" "}
								<span className="font-calligraphic text-accent text-3xl sm:text-4xl md:text-5xl inline-block align-baseline">
									5
								</span>{" "}
								principes du Reiki
							</h2>

							<p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
								Des principes simples, transmis comme une
								invitation à revenir à l’essentiel, ici et
								maintenant.
							</p>

							{/* Blockquote */}
							<blockquote className="relative py-5 my-8 border-l-2 border-accent/40 pl-5">
								{/* Guillemets décoratifs */}
								<Quote className="absolute -top-2 -left-3 w-6 h-6 text-gold-light" />

								{/* Liste des principes */}
								<ul className="font-calligraphic text-lg sm:text-xl md:text-2xl  text-gold space-y-4">
									<li>
										"Juste pour aujourd’hui, je me libère de
										toute colère."
									</li>
									<li>
										"Juste pour aujourd’hui, je me libère de
										tout souci."
									</li>
									<li>
										"Juste pour aujourd’hui, j’exprime ma
										profonde gratitude et je rends grâce à
										mes parents et mes aïeux."
									</li>
									<li>
										"Juste pour aujourd’hui, je vis ma vie
										honnêtement."
									</li>
									<li>
										"Juste pour aujourd’hui, j’exprime de la
										bienveillance pour tout ce qui vit."
									</li>
								</ul>
							</blockquote>
						</div>
					</section>

					{/* Bienfaits - Floating Cards */}
					<section
						ref={benefitsRef}
						className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20 md:mb-28 relative z-10"
					>
						<div
							className={`max-w-5xl mx-auto transition-all duration-700 ${
								benefitsInView
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-8"
							}`}
						>
							<div className="text-center mb-12">
								<p className="section-label">Bienfaits</p>
								<h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground">
									<span className="font-calligraphic text-accent text-3xl sm:text-4xl md:text-5xl inline-block align-baseline">
										L
									</span>
									es bienfaits du Reiki
								</h2>
							</div>

							<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
								{[
									{
										icon: Sparkles,
										title: "Rééquilibrage énergétique",
										desc: "Harmonisation globale de vos centres énergétiques",
									},
									{
										icon: Heart,
										title: "Libération émotionnelle",
										desc: "Relâchement des blocages et tensions accumulées",
									},
									{
										icon: Leaf,
										title: "Relaxation profonde",
										desc: "Apaisement du corps et de l'esprit",
									},
									{
										icon: Zap,
										title: "Harmonisation des chakras",
										desc: "Équilibre de vos centres énergétiques",
									},
									{
										icon: Check,
										title: "Réduction du stress",
										desc: "Diminution de l'anxiété et des tensions",
									},
									{
										icon: ArrowRight,
										title: "Accompagnement des transitions",
										desc: "Soutien dans les périodes de changement",
									},
								].map((benefit, index) => (
									<article
										key={benefit.title}
										className={`group relative bg-gradient-to-br from-card/70 via-card/60 to-card/50 backdrop-blur-md rounded-2xl p-6 border border-border/15 hover:border-gold/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_8px_30px_-8px_hsl(var(--gold)/0.25),0_0_20px_-5px_hsl(var(--accent)/0.15)] overflow-hidden ${
											benefitsInView
												? "opacity-100 translate-y-0"
												: "opacity-0 translate-y-8"
										}`}
										style={{
											transitionDelay: `${index * 100}ms`,
										}}
									>
										{/* Soft golden glow on hover */}
										<div className="absolute inset-0 bg-gradient-to-br from-gold/8 via-accent/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
										<div className="absolute top-4 left-4 w-20 h-20 bg-gold/15 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />

										<div className="relative z-10">
											<div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-gold/15 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-[0_4px_12px_-4px_hsl(var(--gold)/0.2)] group-hover:shadow-[0_6px_20px_-4px_hsl(var(--gold)/0.4)]">
												{/* Icon glow */}
												<div className="absolute inset-0 bg-gradient-to-tl from-gold/20 via-transparent to-accent/15 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
												<benefit.icon className="w-6 h-6 text-accent group-hover:text-gold transition-colors duration-500 relative z-10 drop-shadow-[0_0_6px_hsl(var(--gold)/0.3)]" />
											</div>
											<h3 className="font-display text-lg text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
												{benefit.title}
											</h3>
											<p className="text-sm text-muted-foreground text-left leading-relaxed">
												{benefit.desc}
											</p>
										</div>
									</article>
								))}
							</div>

							<blockquote className="mt-12 relative bg-gradient-to-br from-gold/5 via-card/80 to-accent/5 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-border/30 text-center shadow-lg">
								<Quote className="absolute top-4 left-4 w-8 h-8 text-gold-light" />
								<p className="text-lg md:text-xl text-foreground font-display italic max-w-2xl mx-auto leading-relaxed">
									Je suis formée en Reiki Usui Shiki Ryoho,
									dans le respect de la déontologie et de
									l'enseignement traditionnel de Mikao Usui,
									et j'ai obtenu mon 3ᵉ degré de praticienne
									thérapeute.
								</p>
								<Quote className="absolute bottom-4 right-4 w-8 h-8 text-accent/20 rotate-180" />
							</blockquote>
						</div>
					</section>

					{/* Services / Tarifs */}
					<section
						ref={servicesRef}
						className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20 md:mb-28 relative z-10"
					>
						<div
							className={`max-w-5xl mx-auto transition-all duration-700 ${
								servicesInView
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-8"
							}`}
						>
							<div className="text-center mb-12">
								<p className="section-label">Séances</p>
								<h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground mb-4">
									<span className="font-calligraphic text-accent text-3xl sm:text-4xl md:text-5xl inline-block align-baseline">
										M
									</span>
									es prestations en Reiki
								</h2>
								<p className="text-muted-foreground max-w-2xl mx-auto text-lg">
									Des séances personnalisées pour retrouver
									votre équilibre intérieur
								</p>
							</div>

							<div className="grid md:grid-cols-2 gap-8 lg:gap-10">
								{/* Reiki Présentiel */}
								<article className="group relative bg-gradient-to-b from-card/90 to-card/60 backdrop-blur-md rounded-[2rem] overflow-hidden border border-border/20 shadow-soft hover:shadow-[0_20px_50px_-15px_hsl(var(--gold)/0.25)] hover:border-gold/40 hover:-translate-y-3 transition-all duration-500">
									{/* Icon Header */}
									<div className="relative pt-8 pb-4 px-6 flex justify-center">
										{/* Halo full-header */}
										<div
											className="absolute inset-0 z-0 bg-gradient-to-b 
    from-gold/10 via-accent/5 to-transparent
    opacity-0 group-hover:opacity-100 transition-opacity duration-500"
										/>
										<div className="relative">
											<div className="w-20 h-20 lg:w-24 lg:h-24 rounded-[1.5rem] bg-gradient-to-br from-accent/20 to-gold/10 flex items-center justify-center shadow-elegant group-hover:scale-105 group-hover:shadow-[0_8px_30px_-8px_hsl(var(--gold)/0.4)] transition-all duration-500 rotate-3 group-hover:rotate-0">
												<Heart className="w-10 h-10 lg:w-12 lg:h-12 text-accent" />
											</div>
										</div>
									</div>

									<div className="px-6 lg:px-8 pb-6 lg:pb-8 text-center">
										<h3 className="font-display text-xl lg:text-2xl text-foreground mb-1 group-hover:text-accent transition-colors duration-300">
											Reiki en présentiel
										</h3>
										<p className="text-xs uppercase tracking-widest text-gold/80 mb-4 font-medium">
											Séance au cabinet
										</p>

										<p className="text-muted-foreground text-sm leading-relaxed mb-6">
											Une séance de Reiki en personne pour
											bénéficier pleinement de l'énergie
											et du contact direct.
										</p>

										<ul className="space-y-2 mb-6 text-left">
											{[
												"Accueil et échange préalable",
												"Séance de soin énergétique",
												"Temps d'intégration",
											].map((item) => (
												<li
													key={item}
													className="flex items-center gap-2 text-sm text-foreground/70"
												>
													<Check className="w-4 h-4 text-accent flex-shrink-0" />
													{item}
												</li>
											))}
										</ul>

										<div className="pt-5 border-t border-gold/15">
											<div className="flex items-center justify-center gap-3 mb-4">
												<p className="font-display text-2xl font-bold text-gold">
													60€
												</p>
											</div>
											<div className="flex flex-wrap justify-center gap-3 text-xs text-muted-foreground mb-4">
												<span className="flex items-center gap-1">
													<Clock className="w-3.5 h-3.5 text-accent" />
													1h
												</span>
												<span className="flex items-center gap-1">
													<MapPin className="w-3.5 h-3.5 text-accent" />
													Toulouse / Cépet
												</span>
											</div>
										</div>

										<Button
											variant="accent"
											className="w-full group/btn"
											size="lg"
											onClick={() =>
												window.open(
													CALENDLY_URLS.REIKI,
													"_blank"
												)
											}
										>
											<Calendar className="w-5 h-5 mr-2" />
											Réserver
											<ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
										</Button>
									</div>
								</article>

								{/* Reiki à distance */}
								<article className="group relative bg-gradient-to-b from-card/90 to-card/60 backdrop-blur-md rounded-[2rem] overflow-hidden border border-border/20 shadow-soft hover:shadow-[0_20px_50px_-15px_hsl(var(--gold)/0.25)] hover:border-gold/40 hover:-translate-y-3 transition-all duration-500">
									{/* Icon Header */}
									<div className="relative pt-8 pb-4 px-6 flex justify-center">
										{/* Halo full-header */}
										<div
											className="absolute inset-0 z-0 bg-gradient-to-b 
    from-gold/10 via-accent/5 to-transparent
    opacity-0 group-hover:opacity-100 transition-opacity duration-500"
										/>
										<div className="relative">
											<div className="w-20 h-20 lg:w-24 lg:h-24 rounded-[1.5rem] bg-gradient-to-br from-gold/20 to-accent/10 flex items-center justify-center shadow-elegant group-hover:scale-105 group-hover:shadow-[0_8px_30px_-8px_hsl(var(--gold)/0.4)] transition-all duration-500 rotate-3 group-hover:rotate-0">
												<Zap className="w-10 h-10 lg:w-12 lg:h-12 text-gold" />
											</div>
										</div>
									</div>

									<div className="px-6 lg:px-8 pb-6 lg:pb-8 text-center">
										<h3 className="font-display text-xl lg:text-2xl text-foreground mb-1 group-hover:text-accent transition-colors duration-300">
											Reiki à distance
										</h3>
										<p className="text-xs uppercase tracking-widest text-gold/80 mb-4 font-medium">
											Séance en visio
										</p>

										<p className="text-muted-foreground text-sm leading-relaxed mb-6">
											Le Reiki à distance est tout aussi
											efficace qu'en présentiel. L'énergie
											n'a pas de frontière.
										</p>

										<ul className="space-y-2 mb-6 text-left">
											{[
												"Connexion en visio",
												"Séance de soin énergétique",
												"Retour et échanges",
											].map((item) => (
												<li
													key={item}
													className="flex items-center gap-2 text-sm text-foreground/70"
												>
													<Check className="w-4 h-4 text-gold flex-shrink-0" />
													{item}
												</li>
											))}
										</ul>

										<div className="pt-5 border-t border-gold/15">
											<div className="flex items-center justify-center gap-3 mb-4">
												<p className="font-display text-2xl font-bold text-gold">
													50€
												</p>
											</div>
											<div className="flex flex-wrap justify-center gap-3 text-xs text-muted-foreground mb-4">
												<span className="flex items-center gap-1">
													<Clock className="w-3.5 h-3.5 text-gold" />
													45min-1h
												</span>
												<span className="flex items-center gap-1">
													<MapPin className="w-3.5 h-3.5 text-gold" />
													Où que vous soyez
												</span>
											</div>
										</div>

										<Button
											variant="accent"
											className="w-full group/btn"
											size="lg"
											onClick={() =>
												window.open(
													CALENDLY_URLS.REIKI,
													"_blank"
												)
											}
										>
											<Calendar className="w-5 h-5 mr-2" />
											Réserver
											<ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
										</Button>
									</div>
								</article>
							</div>
						</div>
					</section>

					{/* Mini FAQ Section - Now using centralized FAQ data */}
					<MiniFAQ category="Reiki" maxQuestions={3} />

					{/* Articles Section - Elegant CTA */}
					<section
						ref={articlesRef}
						className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
					>
						<div
							className={`max-w-4xl mx-auto transition-all duration-1000 ${
								articlesInView
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-12"
							}`}
						>
							<article className="relative bg-gradient-to-br from-sand/60 via-card/80 to-accent/5 backdrop-blur-sm rounded-[2rem] p-10 md:p-14 border border-border/30 text-center shadow-xl overflow-hidden">
								{/* Decorative elements */}
								<div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
								<div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/5 rounded-full blur-3xl" />
								<div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />

								<div className="relative z-10">
									<div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent/20 to-gold/10 flex items-center justify-center mx-auto mb-8 shadow-lg">
										<BookOpen className="w-10 h-10 text-accent" />
									</div>
									<h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground mb-6">
										<span className="font-calligraphic text-accent text-3xl sm:text-4xl md:text-5xl inline-block align-baseline">
											E
										</span>
										xplorez mes articles sur le Reiki
									</h2>
									<p className="text-muted-foreground mb-10 max-w-xl mx-auto text-lg leading-relaxed">
										Découvrez les principes du Reiki,
										l'histoire de cette pratique millénaire,
										les chakras et bien plus encore à
										travers mes articles.
									</p>
									<div className="flex flex-col sm:flex-row gap-4 justify-center">
										<Link href="/blog?theme=reiki">
											<Button
												variant="elegant"
												size="lg"
												className="group"
											>
												<BookOpen className="w-5 h-5 mr-2" />
												Voir tous les articles
												<ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
											</Button>
										</Link>
										<Link href="/contact">
											<Button variant="elegant" size="lg">
												Me contacter
											</Button>
										</Link>
									</div>
								</div>
							</article>
						</div>
					</section>
				</main>

				<Footer />
			</div>
		</>
	);
};

export default Reiki;
