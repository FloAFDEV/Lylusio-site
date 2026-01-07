"use client";

import Link from "next/link";
import Image from "next/image";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import GoldenPlantBadge from "@/components/GoldenPlantBadge";
import FloatingParticles from "@/components/FloatingParticles";
import { Button } from "@/components/ui/button";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	Clock,
	MapPin,
	Check,
	Quote,
	Star,
	Moon,
	Sun,
	Sparkles,
	Calendar,
	ArrowRight,
	BookOpen,
	HelpCircle,
} from "lucide-react";
import { useParallax } from "@/hooks/useParallax";
import { useInView } from "@/hooks/useInView";
import { CALENDLY_URLS } from "@/lib/calendly";

const Astrologie = () => {
	const parallaxOffset = useParallax(0.15);
	const { ref: heroRef, isInView: heroInView } = useInView({
		threshold: 0.1,
	});
	const { ref: introRef, isInView: introInView } = useInView({
		threshold: 0.1,
	});
	const { ref: historyRef, isInView: historyInView } = useInView({
		threshold: 0.1,
	});
	const { ref: processRef, isInView: processInView } = useInView({
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
		"@id": "https://lylusio.fr/astrologie-toulouse#service",
		name: "Consultation Astrologique Toulouse Cépet",
		description:
			"Consultation astrologique à Toulouse et Cépet : lecture de thème natal, analyse des transits et cycles de vie. Astrologie symbolique et psychologique pour comprendre votre personnalité et éclairer vos transitions.",
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
		],
		serviceType: "Astrologie",
		offers: [
			{
				"@type": "Offer",
				name: "Lecture de Thème Natal",
				description:
					"Analyse complète de votre carte du ciel de naissance",
				price: "90",
				priceCurrency: "EUR",
				availability: "https://schema.org/InStock",
			},
			{
				"@type": "Offer",
				name: "Lecture de Thème Natal avec support écrit",
				price: "120",
				priceCurrency: "EUR",
				availability: "https://schema.org/InStock",
			},
			{
				"@type": "Offer",
				name: "Lecture des Transits",
				description: "Analyse des cycles planétaires actuels",
				price: "60",
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
				<FloatingParticles count={25} />
				<a href="#main-content" className="skip-link">
					Aller au contenu principal
				</a>
				<Header />
				<Breadcrumbs />

				<main
					id="main-content"
					className="pb-16 md:pb-24 relative overflow-hidden"
				>
					{/* Zodiac wheel background - subtle decorative element */}
					<div
						className="absolute inset-0 pointer-events-none overflow-hidden"
						aria-hidden="true"
					>
						{/* Large zodiac wheel - top right */}
						<div
							className="absolute -top-16 -right-16 md:top-0 md:right-0 lg:top-20 lg:right-20 w-[350px] h-[350px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px]"
							style={{
								transform: `translateY(${
									parallaxOffset * 0.3
								}px) rotate(${parallaxOffset * 0.02}deg)`,
							}}
						>
							<div className="relative w-full h-full">
								<Image
									src="/assets/zodiac-wheel.webp"
									alt=""
									fill
									className="object-contain opacity-[0.12] dark:opacity-[0.08]"
								/>
							</div>
						</div>

						{/* Smaller zodiac wheel - bottom left */}
						<div
							className="absolute bottom-40 -left-10 md:bottom-60 md:left-0 w-[250px] h-[250px] md:w-[320px] md:h-[320px]"
							style={{
								transform: `translateY(${
									-parallaxOffset * 0.4
								}px) rotate(${-parallaxOffset * 0.03}deg)`,
							}}
						>
							<div className="relative w-full h-full">
								<Image
									src="/assets/zodiac-wheel.webp"
									alt=""
									fill
									className="object-contain opacity-[0.20] dark:opacity-[0.06]"
								/>
							</div>
						</div>
					</div>

					{/* Decorative parallax shapes */}
					<div
						className="absolute inset-0 pointer-events-none overflow-hidden"
						aria-hidden="true"
					>
						<div
							className="absolute top-20 -right-20 w-80 h-80 bg-accent/6 rounded-full blur-3xl"
							style={{
								transform: `translateY(${parallaxOffset}px)`,
							}}
						/>
						<div
							className="absolute top-1/3 -left-20 w-64 h-64 bg-gold/8 rounded-full blur-3xl"
							style={{
								transform: `translateY(${
									-parallaxOffset * 0.7
								}px)`,
							}}
						/>
						<div
							className="absolute bottom-1/4 right-10 w-48 h-48 bg-primary/5 rounded-full blur-2xl"
							style={{
								transform: `translateY(${
									parallaxOffset * 0.5
								}px)`,
							}}
						/>
					</div>

					{/* Hero Section */}
					<section
						ref={heroRef}
						className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-24 pt-4 sm:pt-0 relative z-10"
					>
						<div className="max-w-6xl mx-auto">
							<div
								className={`grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-16 items-center transition-all duration-1000 ${
									heroInView
										? "opacity-100 translate-y-0"
										: "opacity-0 translate-y-12"
								}`}
							>
								{/* Text Content - Titre en premier sur mobile/tablette */}
								<div className="order-1 text-center lg:text-left">
									<div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-6">
										<Star className="w-4 h-4 text-gold" />
										<span className="text-sm text-accent font-medium">
											Astrologie Consciente
										</span>
									</div>

									<h1 className="text-foreground text-4xl md:text-5xl mb-4 sm:mb-6 leading-tight">
										<span className="font-calligraphic text-accent text-5xl md:text-6xl inline-block align-baseline">
											C
										</span>
										onnaissez-vous l'Astrologie ?
									</h1>
									<p className="text-muted-foreground text-left text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
										<strong className="text-foreground">
											50%
										</strong>{" "}
										des personnes interrogées ont déjà
										utilisé l'astrologie comme technique de
										développement personnel. Le besoin
										d'être en accord avec ses valeurs et ses
										choix de vie se veut de plus en plus
										important de nos jours.
									</p>

									<div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
										<Button
											variant="accent"
											size="lg"
											className="group"
											onClick={() =>
												window.open(
													CALENDLY_URLS.THEME_NATAL,
													"_blank"
												)
											}
										>
											<Calendar className="w-5 h-5 mr-2" />
											Réserver ma consultation
											<ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
										</Button>
										<Link href="/blog?theme=astrologie">
											<Button
												variant="elegant"
												size="lg"
												className="w-full sm:w-auto"
											>
												<BookOpen className="w-5 h-5 mr-2" />
												Lire mes articles
											</Button>
										</Link>
									</div>
								</div>

								{/* Image - Après le titre sur mobile/tablette */}
								<figure className="order-2 relative mt-4 md:mt-6 lg:mt-0">
									{/* Glow background */}
									<div
										className="absolute -inset-4 bg-gradient-to-br from-gold/15 via-accent/10 to-transparent rounded-[2.5rem] blur-2xl opacity-60"
										style={{
											transform: `translateY(${
												-parallaxOffset * 0.2
											}px)`,
										}}
									/>

									<div
										className="relative rounded-3xl overflow-hidden shadow-elegant border-2 border-gold/20"
										style={{
											transform: `translateY(${
												-parallaxOffset * 0.3
											}px)`,
										}}
									>
										{/* Clip-path reveal animation */}
										<div
											className="overflow-hidden relative w-full aspect-[4/3]"
											style={{
												clipPath: heroInView
													? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
													: "polygon(0 0, 0 0, 0 100%, 0 100%)",
												transition:
													"clip-path 1.2s cubic-bezier(0.65, 0, 0.35, 1) 0.3s",
											}}
										>
											<Image
												src="/assets/travail-astro.webp"
												alt="Travail astrologique avec carte du ciel et éphémérides"
												fill
												className="object-cover"
												priority
											/>
										</div>
										<div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
									</div>

									<GoldenPlantBadge
										size="md"
										className="absolute -bottom-4 -right-4 z-10"
									/>

									{/* Decorative corner accent */}
									<div
										className={`absolute -top-3 -left-3 w-16 h-16 border-l-2 border-t-2 border-gold/30 rounded-tl-2xl transition-opacity duration-700 delay-700 ${
											heroInView
												? "opacity-100"
												: "opacity-0"
										}`}
									/>

									{/* Floating decorative elements */}
									<div className="absolute -top-6 -left-6 w-12 h-12 bg-gold/20 rounded-full blur-xl animate-float" />
									<div
										className="absolute top-1/2 -right-8 w-8 h-8 bg-accent/30 rounded-full blur-lg animate-float"
										style={{ animationDelay: "1s" }}
									/>
								</figure>
							</div>
						</div>
					</section>

					{/* Introduction */}
					<section
						ref={introRef}
						className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-20 relative z-10"
					>
						<div
							className={`max-w-4xl mx-auto transition-all duration-700 delay-100 ${
								introInView
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-8"
							}`}
						>
							<div className="grid md:grid-cols-2 gap-8 items-center">
								<article className="card-soft">
									<div className="flex items-center gap-3 mb-4">
										<div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
											<Moon className="w-5 h-5 text-accent" />
										</div>
										<h2 className="font-display text-xl text-foreground">
											Un merveilleux support
										</h2>
									</div>
									<p className="text-muted-foreground leading-relaxed">
										Vieille de plus de{" "}
										<strong className="text-foreground">
											4000 ans
										</strong>
										, son nom dérivé du Latin « astrologia »
										et du grec ancien signifie littéralement
										le «{" "}
										<strong className="text-foreground">
											discours des astres
										</strong>{" "}
										». Par le mouvement des planètes de
										notre système solaire, l'astrologie
										interprète les alignements et les cycles
										célestes.
									</p>
								</article>

								<article className="card-soft bg-gradient-sand-center/30">
									<div className="flex items-center gap-3 mb-4">
										<div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
											<Sun className="w-5 h-5 text-gold" />
										</div>
										<h2 className="font-display text-xl text-foreground">
											Carl Gustav Jung
										</h2>
									</div>
									<p className="text-muted-foreground leading-relaxed">
										Fondateur de la psychologie analytique,
										il fut le premier à intégrer
										l'astrologie dans sa psychanalyse. Elle
										permet de comprendre la personnalité et
										la psychologie d'une personne : son
										fonctionnement, ses réactions, ses
										blocages et problématiques.
									</p>
								</article>
							</div>
						</div>
					</section>

					{/* Quote Section */}
					<section
						ref={historyRef}
						className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-20 relative z-10"
					>
						<div
							className={`max-w-3xl mx-auto transition-all duration-700 delay-150 ${
								historyInView
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-8"
							}`}
						>
							<blockquote className="relative bg-gradient-to-br from-accent/5 via-card to-gold/5 rounded-3xl p-8 md:p-12 border border-border/30 shadow-soft">
								<Quote className="absolute top-4 left-4 w-8 h-8 text-accent/20" />
								<p className="text-lg sm:text-xl md:text-2xl text-foreground font-display leading-relaxed text-center italic">
									C'est un guide afin d'y voir plus clair à un
									moment donné de sa vie, de retrouver une
									direction lors d'une période de changement
									ou d'évolution, de retrouver la voie de son
									âme.
								</p>
								<Quote className="absolute bottom-4 right-4 w-8 h-8 text-gold/20 rotate-180" />
							</blockquote>
						</div>
					</section>

					{/* Comment je procède */}
					<section
						ref={processRef}
						className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-20 relative z-10"
					>
						<div
							className={`max-w-5xl mx-auto transition-all duration-700 delay-200 ${
								processInView
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-8"
							}`}
						>
							<div className="text-center mb-10">
								<p className="section-label">Ma méthode</p>
								<h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground">
									Comment je procède ?
								</h2>
							</div>

							<div className="grid md:grid-cols-2 gap-8 items-start">
								{/* Left - Process */}
								<article className="card-soft">
									<p className="text-muted-foreground leading-relaxed mb-6">
										Je vous demande toujours votre{" "}
										<strong className="text-foreground">
											date de naissance
										</strong>
										, l'
										<strong className="text-foreground">
											heure exacte
										</strong>{" "}
										et le{" "}
										<strong className="text-foreground">
											lieu
										</strong>
										. Par vos coordonnées de naissance,
										j'utilise votre Thème Astral qui
										m'apporte un réel éclairage sur votre
										personnalité intrinsèque.
									</p>

									<ul className="space-y-4">
										{[
											"J'identifie vos forces, dons, savoir-être, talents innés qui sont des leviers sur lesquels vous pouvez vous appuyer",
											"Je repère vos blocages, failles, difficultés à travailler pour évoluer",
											"Je porte un regard particulier pour la planète Mars, très importante car elle représente le moteur de votre mise en action",
											"Je travaille en phase avec les cycles astrologiques que vous vivez",
										].map((item, index) => (
											<li
												key={index}
												className="flex items-start gap-3"
											>
												<div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
													<Check className="w-3.5 h-3.5 text-accent" />
												</div>
												<span className="text-foreground/80 text-sm">
													{item}
												</span>
											</li>
										))}
									</ul>

									<p className="mt-6 text-accent font-display italic border-l-2 border-gold/40 pl-4">
										Votre Thème Astral n'est pas figé, c'est
										pourquoi vous êtes en perpétuelle
										évolution.
									</p>
								</article>

								{/* Right - Benefits */}
								<div className="space-y-6">
									<article className="bg-gradient-to-br from-accent/5 to-transparent rounded-2xl p-6 border border-accent/10">
										<div className="flex items-center gap-3 mb-3">
											<Sparkles className="w-5 h-5 text-accent" />
											<h3 className="font-display text-lg text-foreground">
												Conscience de soi
											</h3>
										</div>
										<p className="text-muted-foreground text-sm">
											Développez une meilleure
											compréhension de votre être
											intérieur et des influences qui vous
											entourent.
										</p>
									</article>

									<article className="bg-gradient-to-br from-gold/5 to-transparent rounded-2xl p-6 border border-gold/10">
										<div className="flex items-center gap-3 mb-3">
											<Star className="w-5 h-5 text-gold" />
											<h3 className="font-display text-lg text-foreground">
												Croissance personnelle
											</h3>
										</div>
										<p className="text-muted-foreground text-sm">
											En travaillant sur les défis révélés
											par l'astrologie, vous avez
											l'opportunité de croître et de
											ressentir une transformation
											profonde.
										</p>
									</article>

									<figure className="relative rounded-2xl overflow-hidden h-48">
										<Image
											src="/assets/astro-profondeurs.webp"
											alt="L'astrologie des profondeurs"
											fill
											className="object-cover opacity-80"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-4">
											<Link
												href="/blog?theme=astrologie"
												className="text-sm text-foreground hover:text-accent transition-colors flex items-center gap-2"
											>
												<BookOpen className="w-4 h-4" />
												Découvrez mes articles sur
												l'astrologie
												<ArrowRight className="w-3 h-3" />
											</Link>
										</div>
									</figure>
								</div>
							</div>
						</div>
					</section>

					{/* Services / Tarifs */}
					<section
						ref={servicesRef}
						className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-20 relative z-10"
					>
						<div
							className={`max-w-5xl mx-auto transition-all duration-700 delay-200 ${
								servicesInView
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-8"
							}`}
						>
							<div className="text-center mb-10">
								<p className="section-label">Consultations</p>
								<h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground mb-4">
									Mes prestations en Astrologie
								</h2>
								<p className="text-muted-foreground max-w-2xl mx-auto">
									Des consultations personnalisées pour
									éclairer votre chemin de vie
								</p>
							</div>

							<div className="grid md:grid-cols-2 gap-8 lg:gap-10">
								{/* Thème Natal */}
								<article className="group relative bg-gradient-to-br from-card via-card/95 to-card/80 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-border/30 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_60px_-15px_hsl(var(--gold)/0.35),0_0_40px_-10px_hsl(var(--accent)/0.2)] hover:border-gold/50 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500">
									{/* Glow effect on hover */}
									<div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

									{/* Icon Header */}
									<div className="relative pt-8 pb-4 px-6 flex justify-center">
										{/* Enhanced Halo with pulsing glow */}
										<div className="absolute inset-0 z-0 bg-gradient-to-b from-gold/15 via-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
										<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gold/20 rounded-full blur-2xl opacity-0 group-hover:opacity-60 group-hover:animate-gentle-pulse" />

										<div className="relative">
											<div className="w-20 h-20 lg:w-24 lg:h-24 rounded-[1.5rem] bg-gradient-to-br from-accent/25 via-gold/15 to-accent/10 flex items-center justify-center shadow-[0_8px_24px_-8px_hsl(var(--accent)/0.3)] group-hover:scale-110 group-hover:shadow-[0_12px_40px_-8px_hsl(var(--gold)/0.5),0_0_30px_-5px_hsl(var(--accent)/0.3)] group-hover:rotate-0 transition-all duration-500 rotate-6 relative overflow-hidden">
												{/* Inner glow gem effect */}
												<div className="absolute inset-0 bg-gradient-to-tl from-gold/30 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
												<Star className="w-10 h-10 lg:w-12 lg:h-12 text-accent relative z-10 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 drop-shadow-[0_0_8px_hsl(var(--accent)/0.5)]" />
											</div>
										</div>
									</div>

									<div className="px-6 lg:px-8 pb-6 lg:pb-8 text-center">
										<h3 className="font-display text-xl lg:text-2xl text-foreground mb-1 group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-gold group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
											Lecture de Thème Natal
										</h3>
										<div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-gold/10 via-accent/5 to-gold/10 border border-gold/20 rounded-full mb-4 shadow-[0_0_12px_-4px_hsl(var(--gold)/0.3)] group-hover:shadow-[0_0_20px_-4px_hsl(var(--gold)/0.5)] transition-all duration-300">
											<span className="text-xs uppercase tracking-widest text-gold font-semibold">
												Astrologie symbolique
											</span>
										</div>

										<p className="text-muted-foreground text-sm leading-relaxed mb-6">
											Une séance d'astrologie symbolique
											et psychologique pour explorer votre
											carte du ciel.
										</p>

										<ul className="space-y-2 mb-6 text-left">
											{[
												"Analyse de votre personnalité",
												"Identification de vos talents",
												"Compréhension de vos défis",
											].map((item, index) => (
												<li
													key={item}
													className="group/item flex items-center gap-3 text-sm text-foreground/70 hover:text-foreground transition-colors duration-300 p-2 rounded-lg hover:bg-accent/5"
													style={{
														transitionDelay: `${
															index * 50
														}ms`,
													}}
												>
													<div className="relative">
														<div className="absolute inset-0 bg-accent/30 rounded-full blur-md opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
														<Check className="w-4 h-4 text-accent flex-shrink-0 relative z-10 group-hover/item:scale-110 transition-transform duration-300" />
													</div>
													<span className="group-hover/item:translate-x-0.5 transition-transform duration-300">
														{item}
													</span>
												</li>
											))}
										</ul>

										<div className="pt-5 border-t border-gold/15">
											<div className="flex items-center justify-center gap-3 mb-4">
												<p className="font-display text-xl font-bold text-gold">
													90€ / 120€
												</p>
												<span className="text-xs text-muted-foreground">
													(support écrit)
												</span>
											</div>
											<div className="flex flex-wrap justify-center gap-3 text-xs text-muted-foreground mb-4">
												<span className="flex items-center gap-1">
													<Clock className="w-3.5 h-3.5 text-accent" />
													1h30-2h
												</span>
												<span className="flex items-center gap-1">
													<MapPin className="w-3.5 h-3.5 text-accent" />
													Présentiel/Distance
												</span>
											</div>
										</div>

										<Button
											variant="accent"
											className="w-full group/btn relative overflow-hidden shadow-[0_4px_20px_-4px_hsl(var(--accent)/0.3)] hover:shadow-[0_8px_30px_-4px_hsl(var(--accent)/0.5),0_0_20px_-4px_hsl(var(--gold)/0.3)] hover:scale-105 transition-all duration-300"
											onClick={() =>
												window.open(
													CALENDLY_URLS.THEME_NATAL,
													"_blank"
												)
											}
										>
											{/* Internal glow animation */}
											<span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 ease-out" />

											<Calendar className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform duration-300" />
											<span className="relative">
												Réserver
											</span>
											<ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-2 transition-transform duration-300" />
										</Button>
									</div>
								</article>

								{/* Transits */}
								<article className="group relative bg-gradient-to-br from-card via-card/95 to-card/80 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-border/30 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_60px_-15px_hsl(var(--gold)/0.35),0_0_40px_-10px_hsl(var(--accent)/0.2)] hover:border-gold/50 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500">
									{/* Glow effect on hover */}
									<div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

									{/* Icon Header */}
									<div className="relative pt-8 pb-4 px-6 flex justify-center">
										{/* Enhanced Halo with pulsing glow */}
										<div className="absolute inset-0 z-0 bg-gradient-to-b from-gold/15 via-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
										<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gold/20 rounded-full blur-2xl opacity-0 group-hover:opacity-60 group-hover:animate-gentle-pulse" />

										<div className="relative">
											<div className="w-20 h-20 lg:w-24 lg:h-24 rounded-[1.5rem] bg-gradient-to-br from-gold/25 via-accent/15 to-gold/10 flex items-center justify-center shadow-[0_8px_24px_-8px_hsl(var(--gold)/0.3)] group-hover:scale-110 group-hover:shadow-[0_12px_40px_-8px_hsl(var(--gold)/0.5),0_0_30px_-5px_hsl(var(--gold)/0.3)] group-hover:rotate-0 transition-all duration-500 rotate-6 relative overflow-hidden">
												{/* Inner glow gem effect */}
												<div className="absolute inset-0 bg-gradient-to-tl from-gold/30 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
												<Moon className="w-10 h-10 lg:w-12 lg:h-12 text-gold relative z-10 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 drop-shadow-[0_0_8px_hsl(var(--gold)/0.5)]" />
											</div>
										</div>
									</div>

									<div className="px-6 lg:px-8 pb-6 lg:pb-8 text-center">
										<h3 className="font-display text-xl lg:text-2xl text-foreground mb-1 group-hover:bg-gradient-to-r group-hover:from-gold group-hover:to-accent group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
											Lecture des Transits
										</h3>
										<div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-gold/10 via-accent/5 to-gold/10 border border-gold/20 rounded-full mb-4 shadow-[0_0_12px_-4px_hsl(var(--gold)/0.3)] group-hover:shadow-[0_0_20px_-4px_hsl(var(--gold)/0.5)] transition-all duration-300">
											<span className="text-xs uppercase tracking-widest text-gold font-semibold">
												Suivi des cycles
											</span>
										</div>

										<p className="text-muted-foreground text-sm leading-relaxed mb-6 text-left">
											Une séance de suivi pour analyser
											les transits actuels et comprendre
											les énergies du moment.
										</p>

										<ul className="space-y-2 mb-6 text-left">
											{[
												"Analyse des transits en cours",
												"Périodes clés à venir",
												"Synchronicité avec vos cycles",
											].map((item, index) => (
												<li
													key={item}
													className="group/item flex items-center gap-3 text-sm text-foreground/70 hover:text-foreground transition-colors duration-300 p-2 rounded-lg hover:bg-gold/5"
													style={{
														transitionDelay: `${
															index * 50
														}ms`,
													}}
												>
													<div className="relative">
														<div className="absolute inset-0 bg-gold/30 rounded-full blur-md opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
														<Check className="w-4 h-4 text-gold flex-shrink-0 relative z-10 group-hover/item:scale-110 transition-transform duration-300" />
													</div>
													<span className="group-hover/item:translate-x-0.5 transition-transform duration-300">
														{item}
													</span>
												</li>
											))}
										</ul>

										<div className="pt-5 border-t border-gold/15">
											<div className="flex items-center justify-center gap-3 mb-4">
												<p className="font-display text-xl font-bold text-gold">
													60€
												</p>
												<span className="text-xs text-muted-foreground bg-accent/10 px-2 py-0.5 rounded-full">
													Clients thème natal
												</span>
											</div>
											<div className="flex flex-wrap justify-center gap-3 text-xs text-muted-foreground mb-4">
												<span className="flex items-center gap-1">
													<Clock className="w-3.5 h-3.5 text-gold" />
													1h
												</span>
												<span className="flex items-center gap-1">
													<MapPin className="w-3.5 h-3.5 text-gold" />
													Présentiel/Distance
												</span>
											</div>
										</div>

										<Button
											variant="accent"
											className="w-full group/btn relative overflow-hidden shadow-[0_4px_20px_-4px_hsl(var(--gold)/0.3)] hover:shadow-[0_8px_30px_-4px_hsl(var(--gold)/0.5),0_0_20px_-4px_hsl(var(--accent)/0.3)] hover:scale-105 transition-all duration-300"
											onClick={() =>
												window.open(
													CALENDLY_URLS.TRANSITS,
													"_blank"
												)
											}
										>
											{/* Internal glow animation */}
											<span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 ease-out" />

											<Calendar className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform duration-300" />
											<span className="relative">
												Réserver
											</span>
											<ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-2 transition-transform duration-300" />
										</Button>
									</div>
								</article>
							</div>
						</div>
					</section>

					{/* Mini FAQ Section */}
					<section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-20 relative z-10">
						<div className="max-w-3xl mx-auto">
							<div className="text-center mb-8">
								<div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-4">
									<HelpCircle className="w-4 h-4 text-accent" />
									<span className="text-sm text-accent font-medium">
										Questions fréquentes
									</span>
								</div>
								<h2 className="font-display text-xl sm:text-2xl text-foreground">
									L'astrologie en quelques questions
								</h2>
							</div>

							<Accordion
								type="single"
								collapsible
								className="space-y-3"
							>
								<AccordionItem
									value="item-1"
									className="bg-card/60 backdrop-blur-sm rounded-xl border border-border/30 px-5"
								>
									<AccordionTrigger className="text-left font-display text-base text-foreground hover:text-accent py-4">
										Qu'est-ce qu'un thème astral ?
									</AccordionTrigger>
									<AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
										Le thème astral est une photographie du
										ciel au moment précis de votre
										naissance. Il révèle la position des
										planètes dans les signes du zodiaque.
										C'est un outil puissant de connaissance
										de soi qui éclaire vos talents, défis et
										chemins d'évolution.
									</AccordionContent>
								</AccordionItem>

								<AccordionItem
									value="item-2"
									className="bg-card/60 backdrop-blur-sm rounded-xl border border-border/30 px-5"
								>
									<AccordionTrigger className="text-left font-display text-base text-foreground hover:text-accent py-4">
										Ai-je besoin de connaître mon heure de
										naissance ?
									</AccordionTrigger>
									<AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
										L'heure exacte de naissance est
										essentielle pour une analyse complète
										car elle détermine l'Ascendant et les
										maisons astrologiques. Vous pouvez aussi
										demander votre acte de naissance complet
										à la mairie de votre lieu de naissance.
									</AccordionContent>
								</AccordionItem>

								<AccordionItem
									value="item-3"
									className="bg-card/60 backdrop-blur-sm rounded-xl border border-border/30 px-5"
								>
									<AccordionTrigger className="text-left font-display text-base text-foreground hover:text-accent py-4">
										Comment se déroule une consultation ?
									</AccordionTrigger>
									<AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
										La séance dure environ 1h30. Je prépare
										votre thème avant notre rendez-vous.
										Pendant la consultation, nous explorons
										ensemble votre personnalité profonde,
										vos besoins et vos talents. Vous
										repartez avec un enregistrement audio.
									</AccordionContent>
								</AccordionItem>
							</Accordion>

							<p className="text-center mt-6 text-muted-foreground text-sm">
								Plus de questions ?{" "}
								<Link
									href="/faq"
									className="text-accent hover:text-gold transition-colors duration-300 underline decoration-accent/30 hover:decoration-gold/50 underline-offset-2"
								>
									Consulter la FAQ
								</Link>
							</p>
						</div>
					</section>

					{/* Articles Section */}
					<section
						ref={articlesRef}
						className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
					>
						<div
							className={`max-w-4xl mx-auto transition-all duration-700 delay-300 ${
								articlesInView
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-8"
							}`}
						>
							<article className="bg-gradient-to-br from-sand/50 via-card to-accent/5 rounded-3xl p-8 md:p-12 border border-border/30 text-center">
								<div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
									<BookOpen className="w-8 h-8 text-accent" />
								</div>
								<h2 className="font-display text-2xl sm:text-3xl text-foreground mb-4">
									Explorez mes articles sur l'Astrologie
								</h2>
								<p className="text-muted-foreground text-left mb-8 max-w-xl mx-auto">
									Découvrez les secrets des astres à travers
									mes articles sur les dominantes planétaires,
									les transits, l'histoire de l'astrologie et
									bien plus encore.
								</p>
								<div className="flex flex-col sm:flex-row gap-4 justify-center">
									<Link href="/blog?theme=astrologie">
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
							</article>
						</div>
					</section>
				</main>

				<Footer />
			</div>
		</>
	);
};

export default Astrologie;
