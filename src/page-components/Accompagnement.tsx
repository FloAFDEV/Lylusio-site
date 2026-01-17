"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import GoldenPlantBadge from "@/components/GoldenPlantBadge";
import FloatingParticles from "@/components/FloatingParticles";
import MobileServiceCarousel from "@/components/MobileServiceCarousel";
import { Button } from "@/components/ui/button";
import {
	Clock,
	MapPin,
	Check,
	Calendar,
	Phone,
	Video,
	Sparkles,
	Star,
	Heart,
	Sun,
	Moon,
	Compass,
	Infinity,
	ArrowRight,
	Zap,
	CreditCard,
} from "lucide-react";
import { useParallax } from "@/hooks/useParallax";
import { useInView } from "@/hooks/useInView";
import { useIsMobile } from "@/hooks/use-mobile";

import CALENDLY_URLS from "@/lib/calendly";

const Accompagnement = () => {
	const isMobile = useIsMobile();
	const parallaxOffset = useParallax(0.15);
	const parallaxOffsetSlow = useParallax(0.08);

	// Hydration fix: only show decorative elements after mount
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);
	const { ref: heroRef, isInView: heroInView } = useInView({
		threshold: 0.1,
	});
	const { ref: astroRef, isInView: astroInView } = useInView({
		threshold: 0.1,
	});
	const { ref: reikiRef, isInView: reikiInView } = useInView({
		threshold: 0.1,
	});
	const { ref: accompRef, isInView: accompInView } = useInView({
		threshold: 0.1,
	});
	const { ref: bilanRef, isInView: bilanInView } = useInView({
		threshold: 0.1,
	});
	const { ref: quoteRef, isInView: quoteInView } = useInView({
		threshold: 0.2,
	});

	// Services data for carousel
	const astroServices = [
		{
			id: "theme-natal",
			icon: <Star className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />,
			image: "/assets/tarif-theme-natal.webp",
			title: "Thème Natal",
			subtitle: "Votre carte du ciel",
			description:
				"Une séance d'astrologie symbolique et psychologique pour explorer votre carte du ciel comme une boussole intérieure. Ensemble, nous mettons en lumière vos dynamiques profondes.",
			price: "90€ / 120€",
			priceNote: "avec support écrit",
			duration: "1h30 à 2h",
			format: "Présentiel / Distance",
			features: [
				"Analyse complète écrite",
				"Échange approfondi",
				"Délai de préparation",
			],
			calendlyLink: CALENDLY_URLS.THEME_NATAL,
		},
		{
			id: "transits",
			icon: <Moon className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />,
			image: "/assets/tarif-transits.webp",
			title: "Lecture de Transits",
			subtitle: "Reconnexion au Présent",
			description:
				"Si vous sentez que « quelque chose » bouge en vous, sans forcément savoir quoi… Si vous traversez une période où tout semble s'effondrer.",
			price: "70€ / 90€",
			priceNote: "avec support écrit",
			duration: "1h30 à 2h",
			format: "Présentiel / Distance",
			isSecond: true,
			features: [
				"Identifier les cycles",
				"Mettre du sens",
				"Ressources cachées",
			],
			calendlyLink: CALENDLY_URLS.TRANSITS,
		},
	];

	const reikiService = {
		id: "reiki",
		icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />,
		image: "/assets/tarif-reiki.webp",
		title: "Soin Reiki",
		subtitle: "Rééquilibrage énergétique",
		description:
			"Un soin énergétique complet favorisant l'apaisement mental, émotionnel et physique. Le Reiki rétablit la circulation de l'énergie vitale.",
		price: "60€ / 50€",
		priceNote: "à distance",
		duration: "1h15 à 1h30",
		format: "Présentiel / Distance",
		features: [
			"Rééquilibrage global",
			"Libération blocages",
			"Relaxation profonde",
		],
		calendlyLink: CALENDLY_URLS.REIKI,
		isHighlighted: true,
	};

	const bilanService = {
		id: "bilan-pro",
		icon: <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />,
		image: "/assets/tarif-bilan-pro.webp",
		title: "Bilan Astro-Orientation",
		subtitle: "Vie pro alignée",
		description:
			"Tu te poses des questions sur ta vie professionnelle ? Tu envisages une reconversion, tu veux reprendre des études ou te lancer dans l'entrepreneuriat ?",
		price: "290€",
		duration:
			"4 séances d'1h30 complétées par des rdv téléphoniques réguliers",
		format: "Présentiel / Distance",
		features: [
			"Talents innés",
			"Aspirations profondes",
			"Plan d'action aligné",
		],
		calendlyLink: CALENDLY_URLS.BILAN_PRO,
		paymentInfo: {
			phone: "+33619151959",
			email: "contact@lylusio.fr",
		},
	};

	const structuredData = {
		"@context": "https://schema.org",
		"@type": "Service",
		name: "Consultations & Accompagnements",
		description:
			"Consultations d'astrologie, soins Reiki et accompagnement personnalisé.",
		provider: {
			"@type": "LocalBusiness",
			name: "Lylusio - Émilie Perez",
			address: {
				"@type": "PostalAddress",
				addressLocality: "Toulouse",
				addressRegion: "Occitanie",
				addressCountry: "FR",
			},
		},
		areaServed: "Toulouse",
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

			<div className="min-h-screen bg-background relative overflow-hidden">
				<FloatingParticles count={120} />
				<a href="#main-content" className="skip-link">
					Aller au contenu principal
				</a>
				<Header />
				<Breadcrumbs />

				<main id="main-content" className="relative">
					{/* Decorative background shapes - reduced on mobile */}
					{mounted && !isMobile && (
						<div
							className="fixed inset-0 pointer-events-none overflow-hidden"
							aria-hidden="true"
						>
							<div
								className="absolute top-20 -right-32 w-96 h-96 bg-gradient-to-br from-gold/5 to-accent/5 rounded-full blur-3xl"
								style={{
									transform: `translateY(${parallaxOffset}px)`,
								}}
							/>
							<div
								className="absolute top-1/3 -left-24 w-72 h-72 bg-gradient-sky-center/20 rounded-full blur-3xl"
								style={{
									transform: `translateY(${
										-parallaxOffset * 0.6
									}px)`,
								}}
							/>
						</div>
					)}

					{/* ===== HERO SECTION ===== */}
					<section
						ref={heroRef}
						className="relative min-h-[50vh] sm:min-h-[60vh] lg:min-h-[70vh] flex items-center justify-center py-12 sm:py-16 md:py-24"
					>
						{/* Background image with parallax - reduced effect on mobile */}
						<div
							className="absolute inset-0 z-0"
							style={{
								transform:
									!mounted || isMobile
										? "none"
										: `translateY(${
												parallaxOffset * 0.5
										  }px)`,
							}}
						>
							<div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
							<div className="relative w-full h-full">
								<Image
									src="/assets/cascade-zen.webp"
									alt=""
									fill
									className="object-cover opacity-15 sm:opacity-20"
									aria-hidden="true"
									priority
								/>
							</div>
						</div>

						<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
							<div
								className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
									heroInView
										? "opacity-100 translate-y-0"
										: "opacity-0 translate-y-8"
								}`}
							>
								{/* Decorative icons - simplified on mobile */}
								<div className="flex justify-center items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
									<Star className="w-4 h-4 sm:w-5 sm:h-5 text-gold/60 animate-float hidden sm:block" />
									<Moon className="w-5 h-5 sm:w-6 sm:h-6 text-accent/70 animate-float-delayed" />
									<div className="relative">
										<div className="relative w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden shadow-medium border-2 border-gold/30 opacity-90">
											<Image
												src="/assets/seance-accompagnement.webp"
												alt="Symbole d'accompagnement"
												fill
												className="object-cover"
												priority
											/>
										</div>
										<GoldenPlantBadge
											size="sm"
											className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2"
										/>
									</div>
									<Sun className="w-5 h-5 sm:w-6 sm:h-6 text-gold/70 animate-float-delayed" />
									<Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-accent/60 animate-float hidden sm:block" />
								</div>

								<p className="section-label text-md sm:text-lg mb-2 sm:mb-3 px-2">
									Prestations & Tarifs
								</p>
								<h1 className="text-foreground text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 px-2">
									<span className="font-calligraphic text-accent text-3xl sm:text-4xl md:text-5xl inline-block align-baseline  ">
										C
									</span>
									onsultations & Accompagnements
								</h1>

								<p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed mb-6 max-w-2xl mx-auto px-2">
									Un espace d'écoute et de transformation pour
									traverser vos transitions de vie
								</p>

								{/* Tags - stacked on mobile */}
								<div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-2">
									<span className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-card/80 backdrop-blur-sm rounded-full border border-border/30 text-xs sm:text-sm text-muted-foreground shadow-soft">
										<Video className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent flex-shrink-0" />
										<span>Visio</span>
									</span>
									<span className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-card/80 backdrop-blur-sm rounded-full border border-border/30 text-xs sm:text-sm text-muted-foreground shadow-soft">
										<Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent flex-shrink-0" />
										<span>Téléphone</span>
									</span>
									<span className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-card/80 backdrop-blur-sm rounded-full border border-border/30 text-xs sm:text-sm text-muted-foreground shadow-soft">
										<MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent flex-shrink-0" />
										<span>Toulouse</span>
									</span>
								</div>
							</div>
						</div>
					</section>

					{/* ===== ASTROLOGIE SECTION ===== */}
					<section
						ref={astroRef}
						className="relative py-12 sm:py-16 md:py-24 bg-gradient-to-b from-transparent via-secondary/20 to-transparent"
					>
						<div className="container mx-auto px-4 sm:px-6 lg:px-8">
							{/* Section Header */}
							<div
								className={`flex flex-col items-center gap-6 lg:flex-row lg:gap-12 mb-10 sm:mb-14 transition-all duration-1000 ${
									astroInView
										? "opacity-100 translate-y-0"
										: "opacity-0 translate-y-8"
								}`}
							>
								{/* Image - smaller on mobile, does not overflow */}
								<div
									className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-56 lg:h-56 flex-shrink-0"
									style={{
										transform:
											!mounted || isMobile
												? "none"
												: `translateY(${-parallaxOffsetSlow}px)`,
									}}
								>
									<div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/20 to-accent/10 animate-gentle-pulse" />
									<div className="absolute inset-1 sm:inset-2 rounded-full overflow-hidden border-2 border-gold/20 shadow-elegant">
										<Image
											src="/assets/seance-astro-zen.webp"
											alt="Consultation astrologique"
											fill
											className="object-cover"
										/>
									</div>
									<div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-8 h-8 sm:w-10 sm:h-10 bg-card/90 backdrop-blur-sm rounded-full border border-gold/30 flex items-center justify-center shadow-soft">
										<Compass className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
									</div>
								</div>

								<div className="text-center lg:text-left flex-1">
									<p className="section-label">
										Astrologie Symbolique
									</p>
									<h2 className="font-display text-xl sm:text-2xl lg:text-3xl text-navy mb-3">
										<span className="font-calligraphic text-accent text-2xl sm:text-3xl lg:text-4xl inline-block align-baseline">
											C
										</span>
										onsultations Astrologiques
									</h2>
									<p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
										L'astrologie comme une boussole
										intérieure pour explorer vos dynamiques
										profondes.
									</p>
								</div>
							</div>

							{/* Note importante */}
							<div
								className={`max-w-xl mx-auto mb-8 sm:mb-10 p-4 bg-card/60 backdrop-blur-sm rounded-xl border border-accent/20 text-center transition-all duration-700 delay-200 ${
									astroInView
										? "opacity-100 translate-y-0"
										: "opacity-0 translate-y-6"
								}`}
							>
								<p className="text-muted-foreground text-xs sm:text-sm italic">
									<span className="text-accent font-medium">
										NB :
									</span>{" "}
									L'Astrologie nécessite un délai de plusieurs
									jours après la prise de RDV.
								</p>
							</div>

							{/* Mobile carousel / Desktop grid */}
							<div className="lg:hidden">
								<MobileServiceCarousel
									services={astroServices}
								/>
							</div>

							<div className="hidden lg:grid lg:grid-cols-2 gap-12 lg:gap-14 max-w-5xl mx-auto py-4">
								{astroServices.map((service, idx) => (
									<article
										key={service.id}
										className={`group relative transform-gpu ${
											astroInView
												? "opacity-100 translate-y-0"
												: "opacity-0 translate-y-12"
										}`}
										style={{
											transitionDelay: `${
												200 + idx * 150
											}ms`,
											transition:
												"opacity 0.7s, transform 0.7s",
										}}
									>
										{/* Glow effect - outside card for no clipping */}
										<div className="absolute -inset-4 rounded-[2.5rem] opacity-0 group-hover:opacity-100 bg-gradient-to-br from-gold/20 via-gold/10 to-accent/10 blur-2xl transition-all duration-700 pointer-events-none" />

										{/* Card container - removed overflow-hidden to prevent clipping */}
										<div className="relative bg-gradient-to-b from-card/90 to-card/60 backdrop-blur-md rounded-[2rem] border border-border/20 shadow-soft group-hover:border-gold/40 group-hover:-translate-y-3 transition-all duration-500">
											{/* Animated border glow */}
											<div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 shadow-[0_20px_50px_-15px_hsl(var(--gold)/0.3)] transition-opacity duration-500 pointer-events-none" />
											{/* Image Header */}
											{service.image && (
												<div className="relative h-48 overflow-hidden rounded-t-[2rem]">
													<Image
														src={service.image}
														alt={service.title}
														fill
														className={`object-cover transition-transform duration-700 ${
															service.isSecond
																? "object-bottom"
																: ""
														}`}
													/>
													<div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
													{/* Icon badge */}
													<div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-card/90 backdrop-blur-sm border-2 border-gold/30 flex items-center justify-center shadow-elegant group-hover:shadow-[0_8px_30px_-8px_hsl(var(--gold)/0.4)] transition-all duration-500">
														{service.icon}
													</div>
												</div>
											)}

											<div className="px-6 lg:px-8 pb-6 lg:pb-8 text-center pt-4">
												<h3 className="font-display text-xl lg:text-2xl text-foreground mb-1 group-hover:text-accent transition-colors duration-300">
													{service.title}
												</h3>
												{service.subtitle && (
													<p className="text-xs uppercase tracking-widest text-gold/80 mb-4 font-medium">
														{service.subtitle}
													</p>
												)}

												<p className="text-muted-foreground text-sm leading-relaxed mb-6">
													{service.description}
												</p>

												{service.features && (
													<ul className="space-y-2 mb-6 text-left">
														{service.features.map(
															(f, i) => (
																<li
																	key={i}
																	className="flex items-center gap-2 text-sm text-foreground/70"
																>
																	<Check className="w-4 h-4 text-accent flex-shrink-0" />
																	<span>
																		{f}
																	</span>
																</li>
															)
														)}
													</ul>
												)}

												<div className="pt-5 border-t border-gold/15">
													<div className="flex items-center justify-center gap-3 mb-4">
														<p className="font-display text-xl text-gold">
															{service.price}
														</p>
														{service.priceNote && (
															<span className="text-xs text-muted-foreground font-bold">
																(
																{
																	service.priceNote
																}
																)
															</span>
														)}
													</div>
													<div className="flex flex-wrap justify-center gap-x-3 gap-y-2 text-xs text-muted-foreground mb-4">
														<span className="flex items-center gap-1">
															<Clock className="w-3.5 h-3.5 text-accent flex-shrink-0" />
															<span>{service.duration}</span>
														</span>
														<span className="flex items-center gap-1 whitespace-nowrap">
															<MapPin className="w-3.5 h-3.5 text-accent flex-shrink-0" />
															<span>{service.format}</span>
														</span>
													</div>
												</div>

												<Button
													variant="accent"
													className="w-full group/btn"
													onClick={() =>
														window.open(
															service.calendlyLink,
															"_blank"
														)
													}
												>
													<Calendar className="w-4 h-4 mr-2" />
													Réserver
													<ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
												</Button>
											</div>
										</div>
									</article>
								))}
							</div>
						</div>
					</section>

					{/* ===== REIKI SECTION ===== */}
					<section
						ref={reikiRef}
						className="relative py-12 sm:py-16 md:py-24"
					>
						<div className="container mx-auto px-4 sm:px-6 lg:px-8">
							{/* Section Header - même format que Astrologie */}
							<div
								className={`flex flex-col items-center gap-6 lg:flex-row-reverse lg:gap-12 mb-10 sm:mb-14 transition-all duration-1000 ${
									reikiInView
										? "opacity-100 translate-y-0"
										: "opacity-0 translate-y-8"
								}`}
							>
								{/* Image ronde comme Astrologie */}
								<div
									className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-56 lg:h-56 flex-shrink-0"
									style={{
										transform:
											!mounted || isMobile
												? "none"
												: `translateY(${-parallaxOffsetSlow}px)`,
									}}
								>
									<div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/20 to-accent/10 animate-gentle-pulse" />
									<div className="absolute inset-1 sm:inset-2 rounded-full overflow-hidden border-2 border-gold/20 shadow-elegant">
										<Image
											src="/assets/seance-reiki-zen.webp"
											alt="Soin Reiki"
											fill
											className="object-cover"
										/>
									</div>
									<div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-8 h-8 sm:w-10 sm:h-10 bg-card/90 backdrop-blur-sm rounded-full border border-gold/30 flex items-center justify-center shadow-soft">
										<Heart className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
									</div>
								</div>

								<div className="text-center lg:text-right flex-1">
									<p className="section-label">Énergie</p>
									<h2 className="font-display text-xl sm:text-2xl lg:text-3xl text-navy mb-3">
										<span className="font-calligraphic text-accent text-2xl sm:text-3xl lg:text-4xl inline-block align-baseline">
											S
										</span>
										oin Énergétique Reiki
									</h2>
									<p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:ml-auto lg:mr-0">
										Un soin favorisant l'apaisement mental,
										émotionnel et physique pour retrouver
										équilibre et alignement.
									</p>
								</div>
							</div>

							{/* Mobile: Carousel */}
							<div className="md:hidden">
								<MobileServiceCarousel
									services={[reikiService]}
								/>
							</div>

							{/* Desktop: Single card */}
							<div className="hidden md:block max-w-4xl mx-auto">
								<article
									className={`group relative bg-gradient-to-b from-card/90 to-card/60 backdrop-blur-md rounded-[2rem] border border-border/20 shadow-soft hover:shadow-[0_20px_50px_-15px_hsl(var(--gold)/0.25)] hover:border-gold/40 hover:-translate-y-3 transition-all duration-500 ${
										reikiInView
											? "opacity-100 translate-y-0"
											: "opacity-0 translate-y-8"
									}`}
									style={{ transitionDelay: "200ms" }}
								>
									{/* Image Header */}
									<div className="relative h-56 overflow-hidden rounded-t-[2rem]">
										<Image
											src="/assets/tarif-reiki.webp"
											alt="Soin Reiki"
											fill
											className="object-cover transition-transform duration-700"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
										{/* Icon badge */}
										<div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-20 h-20 rounded-2xl bg-card/90 backdrop-blur-sm border-2 border-gold/30 flex items-center justify-center shadow-elegant group-hover:shadow-[0_8px_30px_-8px_hsl(var(--gold)/0.4)] transition-all duration-500">
											<Zap className="w-10 h-10 text-gold" />
										</div>
									</div>

									<div className="px-8 pb-8 text-center pt-4">
										<h3 className="font-display text-2xl text-foreground mb-1 group-hover:text-accent transition-colors duration-300">
											Soin Reiki
										</h3>
										<p className="text-xs uppercase tracking-widest text-gold/80 mb-4 font-medium">
											Rééquilibrage énergétique
										</p>

										<p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xl mx-auto">
											Un soin énergétique complet
											favorisant l'apaisement mental,
											émotionnel et physique. Le Reiki
											rétablit la circulation de l'énergie
											vitale.
										</p>

										<ul className="space-y-2 mb-6 text-left max-w-md mx-auto">
											{[
												"Rééquilibrage énergétique global",
												"Libération des blocages émotionnels",
												"Relaxation profonde",
											].map((item, idx) => (
												<li
													key={idx}
													className="flex items-center gap-2 text-sm text-foreground/70"
												>
													<Check className="w-4 h-4 text-accent flex-shrink-0" />
													<span>{item}</span>
												</li>
											))}
										</ul>

										<div className="pt-5 border-t border-gold/15">
											<div className="flex items-center justify-center gap-3 mb-4">
												<p className="font-display text-xl font-bold text-gold">
													60€ / 50€
												</p>
												<span className="text-xs text-muted-foreground">
													(à distance)
												</span>
											</div>
											<div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-muted-foreground mb-4">
												<span className="flex items-center gap-1 whitespace-nowrap">
													<Clock className="w-3.5 h-3.5 text-accent flex-shrink-0" />
													<span>1h15-1h30</span>
												</span>
												<span className="flex items-center gap-1 whitespace-nowrap">
													<MapPin className="w-3.5 h-3.5 text-accent flex-shrink-0" />
													<span>
														Présentiel / Distance
													</span>
												</span>
											</div>
										</div>

										<Button
											variant="accent"
											className="w-full max-w-sm mx-auto group/btn"
											onClick={() =>
												window.open(
													CALENDLY_URLS.REIKI,
													"_blank"
												)
											}
										>
											<Calendar className="w-4 h-4 mr-2" />
											Réserver mon soin Reiki
											<ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
										</Button>
									</div>
								</article>
							</div>
						</div>
					</section>

					{/* ===== QUOTE DIVIDER ===== */}
					<section
						ref={quoteRef}
						className="py-10 sm:py-14 md:py-20 bg-gradient-to-r from-transparent via-secondary/20 to-transparent"
					>
						<div
							className={`container mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${
								quoteInView
									? "opacity-100 scale-100"
									: "opacity-0 scale-95"
							}`}
						>
							<Infinity className="w-8 h-8 sm:w-10 sm:h-10 text-gold/60 mx-auto mb-4 sm:mb-6" />
							<blockquote className="font-display text-lg sm:text-xl md:text-2xl lg:text-3xl text-foreground/80 italic max-w-2xl mx-auto px-2">
								« Un espace pour déposer ce que vous vivez, sans
								filtre, vrai, humain. »
							</blockquote>
						</div>
					</section>

					{/* ===== ACCOMPAGNEMENT GLOBAL SECTION ===== */}
					<section
						ref={accompRef}
						className="relative py-12 sm:py-16 md:py-24 bg-gradient-to-b from-transparent via-secondary/20 to-transparent"
					>
						<div className="container mx-auto px-4 sm:px-6 lg:px-8">
							{/* Section Header avec image ronde et parallax */}
							<div
								className={`flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:gap-12 mb-10 sm:mb-14 transition-all duration-1000 ${
									accompInView
										? "opacity-100 translate-y-0"
										: "opacity-0 translate-y-8"
								}`}
							>
								{/* Image ronde avec effet parallax - alignée avec le titre */}
								<div
									className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-56 lg:h-56 flex-shrink-0 lg:mt-12"
									style={{
										transform:
											!mounted || isMobile
												? "none"
												: `translateY(${-parallaxOffsetSlow}px)`,
									}}
								>
									<div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/20 to-accent/10 animate-gentle-pulse" />
									<div className="absolute inset-1 sm:inset-2 rounded-full overflow-hidden border-2 border-gold/20 shadow-elegant">
										<Image
											src="/assets/seance-accompagnement.webp"
											alt="Symbole d'accompagnement"
											fill
											sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 224px"
											className="object-cover"
										/>
									</div>
									<div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-8 h-8 sm:w-10 sm:h-10 bg-card/90 backdrop-blur-sm rounded-full border border-gold/30 flex items-center justify-center shadow-soft">
										<Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
									</div>
								</div>

								<div className="text-center flex-1">
									<p className="section-label">
										Accompagnement Complet
									</p>
									<h2 className="font-display text-xl sm:text-2xl lg:text-3xl text-navy mb-3">
										<span className="font-calligraphic text-accent text-2xl sm:text-3xl lg:text-4xl inline-block align-baseline">
											A
										</span>
										ccompagnement Global
									</h2>
									<p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
										Astrologie • Reiki • Thérapie pour traverser vos transitions de vie
									</p>
								</div>
							</div>

							{/* Format uniforme avec les autres cartes */}
							<div className="max-w-4xl mx-auto">
								<article
									className={`group relative bg-card/80 backdrop-blur-sm rounded-3xl border border-border/30 shadow-soft hover:shadow-elegant hover:border-gold/30 transition-all duration-700 ${
										accompInView
											? "opacity-100 translate-y-0"
											: "opacity-0 translate-y-8"
									}`}
									style={{ transitionDelay: "200ms" }}
								>
									<div className="flex flex-col lg:flex-row">
										{/* Image side */}
										<div className="relative lg:w-72 h-48 lg:h-auto overflow-hidden rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none">
											<Image
												src="/assets/tarif-accompagnement.webp"
												alt="Accompagnement global"
												fill
												className="object-cover transition-transform duration-700 group-hover:scale-110"
											/>
											<div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-card lg:bg-gradient-to-l" />
											<div className="lg:hidden absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
										</div>

										{/* Icon badge hors du overflow-hidden */}
										<div className="lg:-ml-7 lg:translate-y-1/2 w-14 h-14 rounded-xl bg-card/90 backdrop-blur-sm border-2 border-gold/30 flex items-center justify-center shadow-elegant">
											<Heart className="w-7 h-7 text-gold" />
										</div>

										{/* Content side */}
										<div className="flex-1 p-6 sm:p-8 lg:p-10">
											<div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gold/15 text-gold text-xs font-medium rounded-full mb-3 border border-gold/20">
												<Sparkles className="w-3 h-3 flex-shrink-0" />
												<span>Transition</span>
											</div>
											<h3 className="font-display text-xl sm:text-2xl text-foreground mb-1">
												Retrouver du sens
											</h3>
											<p className="text-accent text-sm font-medium mb-4">
												Accompagnement global
											</p>

											<p className="text-muted-foreground text-sm leading-relaxed mb-6">
												Cet accompagnement est fait pour
												vous si vous ressentez le besoin
												d'être écoutée vraiment, sans
												jugement, si vous sortez d'une
												rupture, d'un burn-out ou d'un
												effondrement personnel.
											</p>

											{/* Features */}
											<ul className="space-y-2 mb-6">
												{[
													"Un espace pour déposer ce que vous vivez sans filtre",
													"On regarde ce que vous traversez sous un autre angle",
													"Mini-analyse astrologique des énergies du moment",
													"Soin Reiki ciblé pour un rééquilibrage",
												].map((item, idx) => (
													<li
														key={idx}
														className="flex items-center gap-2 text-sm text-foreground/80"
													>
														<Check className="w-4 h-4 text-accent flex-shrink-0" />
														<span>{item}</span>
													</li>
												))}
											</ul>

											{/* Price & CTA */}
											<div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-5 border-t border-gold/15">
												<div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
													<span className="font-display text-xl font-bold text-gold">
														75€
													</span>
													<span className="flex items-center gap-1">
														<Clock className="w-4 h-4 text-accent flex-shrink-0" />
														<span>1h30</span>
													</span>
													<span className="flex items-center gap-1 whitespace-nowrap">
														<MapPin className="w-4 h-4 text-accent flex-shrink-0" />
														<span>Présentiel</span>
													</span>
												</div>
												<Button
													variant="accent"
													className="sm:ml-auto group/btn"
													onClick={() =>
														window.open(
															CALENDLY_URLS.ACCOMPAGNEMENT_GLOBAL,
															"_blank"
														)
													}
												>
													<Calendar className="w-4 h-4 mr-2" />
													Réserver
													<ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
												</Button>
											</div>
										</div>
									</div>
								</article>
							</div>
						</div>
					</section>

					{/* ===== BILAN PRO SECTION ===== */}
					<section
						ref={bilanRef}
						className="relative py-12 sm:py-16 md:py-24 bg-gradient-to-b from-transparent via-secondary/20 to-transparent"
					>
						<div className="container mx-auto px-4 sm:px-6 lg:px-8">
							<div
								className={`text-center mb-8 sm:mb-10 transition-all duration-1000 ${
									bilanInView
										? "opacity-100 translate-y-0"
										: "opacity-0 translate-y-8"
								}`}
							>
								<p className="section-label">Orientation</p>
								<h2 className="font-display text-xl sm:text-2xl lg:text-3xl text-navy mb-2">
									<span className="font-calligraphic text-accent text-2xl sm:text-3xl lg:text-4xl inline-block align-baseline">
										B
									</span>
									ilan & Orientation Pro
								</h2>
								<p className="text-muted-foreground text-sm">
									Astrologie • Coaching • Reconversion
								</p>
							</div>

							{/* Mobile: Carousel / Desktop: Card */}
							<div className="md:hidden">
								<MobileServiceCarousel
									services={[bilanService]}
								/>
							</div>

							{/* Desktop */}
							<div className="hidden md:block max-w-4xl mx-auto">
								<article
									className={`group relative bg-card/80 backdrop-blur-sm rounded-3xl border border-border/30 shadow-soft hover:shadow-elegant hover:border-accent/30 transition-all duration-700 ${
										bilanInView
											? "opacity-100 translate-y-0"
											: "opacity-0 translate-y-8"
									}`}
									style={{ transitionDelay: "200ms" }}
								>
									<div className="flex flex-col lg:flex-row-reverse">
										{/* Image side */}
										<div className="relative lg:w-72 h-48 lg:h-auto overflow-hidden rounded-t-3xl lg:rounded-r-3xl lg:rounded-tl-none">
											<Image
												src="/assets/tarif-bilan-pro.webp"
												alt="Bilan et Orientation Professionnelle"
												fill
												className="object-cover transition-transform duration-700 group-hover:scale-110"
											/>
											<div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-card lg:bg-gradient-to-r" />
											<div className="lg:hidden absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
										</div>

										{/* Icon badge hors du overflow-hidden */}
										<div className="lg:-mr-7 lg:translate-y-1/2 w-14 h-14 rounded-xl bg-card/90 backdrop-blur-sm border-2 border-accent/30 flex items-center justify-center shadow-elegant">
											<Compass className="w-7 h-7 text-accent" />
										</div>

										{/* Content side */}
										<div className="flex-1 p-6 sm:p-8 lg:p-10">
											<h3 className="font-display text-xl sm:text-2xl text-foreground mb-1">
												Bilan Astro-Orientation
											</h3>
											<p className="text-accent text-sm font-medium mb-4">
												Pour une vie pro alignée
											</p>

											<p className="text-muted-foreground text-sm leading-relaxed mb-6">
												Vous vous posez des questions
												sur votre vie professionnelle ?
												Vous envisagez une reconversion,
												vous voulez reprendre des études
												ou vous lancer dans
												l'entrepreneuriat ?
											</p>

											<ul className="space-y-2 mb-6">
												{[
													"Identifier tes talents innés via ton thème natal",
													"Clarifier tes aspirations profondes",
													"Définir un plan d'action aligné",
												].map((item, idx) => (
													<li
														key={idx}
														className="flex items-center gap-2 text-sm text-foreground/80"
													>
														<Check className="w-4 h-4 text-accent flex-shrink-0" />
														<span>{item}</span>
													</li>
												))}
											</ul>

											{/* Price & CTA */}
											<div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-5 border-t border-accent/15">
												<div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
													<span className="font-display text-xl font-bold text-gold">
														290€
													</span>
													<span className="flex items-center gap-1">
														<Clock className="w-4 h-4 text-accent flex-shrink-0" />
														<span>4 séances d'1h30 complétées par des rdv téléphoniques réguliers</span>
													</span>
													<span className="flex items-center gap-1 whitespace-nowrap">
														<MapPin className="w-4 h-4 text-gold flex-shrink-0" />
														<span>Présentiel / Distance</span>
													</span>
												</div>

												<Button
													variant="accent"
													className="w-full sm:w-auto flex-shrink-0 group/btn"
													onClick={() =>
														window.open(
															CALENDLY_URLS.BILAN_PRO,
															"_blank"
														)
													}
												>
													<Calendar className="w-4 h-4 mr-2" />
													Réserver
													<ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
												</Button>
											</div>
											{/* Payment information */}
											<div className="mt-4 pt-4 border-t border-gold/10">
												<div className="flex items-start gap-2 text-sm text-muted-foreground/90">
													<CreditCard className="w-4 h-4 mt-0.5 text-gold flex-shrink-0" />
													<p className="leading-relaxed">
														Il est possible de payer
														en 3 fois. Si c'est le
														cas, veuillez me
														contacter directement
														par{" "}
														<a
															href="tel:+33619151959"
															className="text-accent hover:text-gold transition-colors underline underline-offset-2"
														>
															téléphone
														</a>{" "}
														ou par{" "}
														<a
															href="mailto:contact@lylusio.fr"
															className="text-accent hover:text-gold transition-colors underline underline-offset-2"
														>
															mail
														</a>
														.
													</p>
												</div>
											</div>
										</div>
									</div>
								</article>
							</div>
						</div>
					</section>

					{/* FAQ CTA Section */}
					<section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
						<div className="max-w-2xl mx-auto text-center">
							<p className="text-muted-foreground text-sm sm:text-base">
								Vous avez des questions sur mes prestations ?{" "}
								<Link
									href="/faq"
									className="text-accent hover:text-gold transition-colors duration-300 underline decoration-accent/30 hover:decoration-gold/50 underline-offset-2 font-medium"
								>
									Consultez la FAQ
								</Link>{" "}
								ou{" "}
								<Link
									href="/contact"
									className="text-accent hover:text-gold transition-colors duration-300 underline decoration-accent/30 hover:decoration-gold/50 underline-offset-2 font-medium"
								>
									contactez-moi
								</Link>
							</p>
						</div>
					</section>
				</main>

				<Footer />
			</div>
		</>
	);
};

export default Accompagnement;
