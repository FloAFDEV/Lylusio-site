"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import GoldenPlantBadge from "@/components/GoldenPlantBadge";
import FloatingParticles from "@/components/FloatingParticles";
import { Button } from "@/components/ui/button";
import {
	ArrowRight,
	Heart,
	Sparkles,
	Eye,
	Leaf,
	Quote,
	Shield,
	Key,
	Target,
} from "lucide-react";
import { useParallax } from "@/hooks/useParallax";
import { useInView } from "@/hooks/useInView";
import { PHONE_TEL_HREF } from "@/lib/contact";

const MonApproche = () => {
	// FIX HYDRATION: Track if component is mounted (client-side only)
	const [mounted, setMounted] = useState(false);

	const parallaxOffset = useParallax(0.12);
	const parallaxOffsetSlow = useParallax(0.06);
	const { ref: heroRef, isInView: heroInView } = useInView({
		threshold: 0.1,
	});
	const { ref: pillarsRef, isInView: pillarsInView } = useInView({
		threshold: 0.1,
	});
	const { ref: quoteRef, isInView: quoteInView } = useInView({
		threshold: 0.2,
	});
	const { ref: deontologyRef, isInView: deontologyInView } = useInView({
		threshold: 0.1,
	});
	const { ref: objectivesRef, isInView: objectivesInView } = useInView({
		threshold: 0.1,
	});
	const { ref: ctaRef, isInView: ctaInView } = useInView({ threshold: 0.2 });

	// FIX HYDRATION: Set mounted after first render
	useEffect(() => {
		setMounted(true);
	}, []);

	const pillars = [
		{
			icon: Heart,
			title: "Écoute",
			description:
				"Un espace sans jugement pour déposer ce que vous vivez.",
		},
		{
			icon: Eye,
			title: "Lucidité",
			description: "Comprendre vos schémas pour vous en libérer.",
		},
		{
			icon: Sparkles,
			title: "Transformation",
			description: "Chaque étape inconfortable devient un tremplin.",
		},
		{
			icon: Leaf,
			title: "Authenticité",
			description: "Du contact humain",
		},
	];

	const objectives = [
		{
			icon: Key,
			text: "Apprendre à vous exprimer sans attendre l'explosion",
		},
		{
			icon: Heart,
			text: "Mettre des mots sur vos émotions et vos besoins",
		},
		{
			icon: Target,
			text: "Assumer vos actes plutôt que vous positionner en victime",
		},
		{
			icon: Sparkles,
			text: "Croire en votre capacité d'évolution",
		},
	];

	const deontologyItems = [
		{
			title: "Une confidentialité totale.",
			text: "Je suis tenue au secret professionnel.",
		},
		{
			title: "Trouver le bon rythme.",
			text: 'Je ne fais pas de "vite fait bien fait", on prend le temps qu\'il faut.',
		},
		{
			title: "Une posture neutre.",
			text: "Je n'utilise l'astrologie que pour éclairer votre parcours, jamais pour projeter les miens.",
		},
		{
			title: "L'orientation quand c'est nécessaire.",
			text: "Si votre besoin dépasse mon champ de compétence, je vous adresse à un autre professionnel.",
		},
	];

	return (
		<>

			<Header />
			<main
				id="main-content"
				className="min-h-screen bg-background relative overflow-hidden"
			>
				{/* Floating Particles for mystical atmosphere */}
				<FloatingParticles count={15} />

				<Breadcrumbs />

				{/* Hero Section with Parallax Background - Continuity from ApprochSection */}
				<section
					ref={heroRef}
					className="relative min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] flex items-center overflow-hidden"
				>
					{/* Background image with parallax */}
					<div className="absolute inset-0" aria-hidden="true">
						<div className="relative w-full h-[110%] -mt-[5%] overflow-hidden">
							<Image
								src="/assets/approche-arbre.webp"
								alt=""
								fill
								className="object-cover"
								style={{
									transform: `translate3d(0, ${parallaxOffset}px, 0)`,
								}}
								priority
								quality={65}
								aria-hidden="true"
							/>
						</div>
						{/* Gradient overlays for readability */}
						<div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
						<div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
						{/* Badge positioned on the image - smaller on mobile */}
						<GoldenPlantBadge
							size="md"
							className="absolute bottom-8 right-4 sm:bottom-12 sm:right-12 md:bottom-16 md:right-16 z-10 opacity-70 sm:opacity-90"
						/>
					</div>

					{/* Enhanced decorative elements with parallax - hidden on mobile for performance */}
					<div
						className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block"
						aria-hidden="true"
					>
						<div
							className="absolute top-20 right-10 w-24 md:w-32 h-24 md:h-32 border border-gold/10 rounded-full opacity-30 animate-float"
							style={{
								transform: `translateY(${
									parallaxOffsetSlow * 0.8
								}px)`,
							}}
						/>
						<div
							className="absolute bottom-32 left-1/4 w-16 md:w-20 h-16 md:h-20 border border-accent/10 rotate-12 opacity-25 animate-float-delayed"
							style={{
								transform: `translateY(${
									-parallaxOffsetSlow * 0.5
								}px)`,
							}}
						/>
						<div
							className="absolute top-1/3 left-10 w-32 md:w-48 h-32 md:h-48 bg-accent/5 rounded-full blur-3xl"
							style={{
								transform: `translateY(${
									parallaxOffset * 0.6
								}px)`,
							}}
						/>
						<div
							className="absolute bottom-1/4 right-1/4 w-48 md:w-64 h-48 md:h-64 bg-gold/5 rounded-full blur-3xl"
							style={{
								transform: `translateY(${
									-parallaxOffset * 0.4
								}px)`,
							}}
						/>
					</div>

					{/* Content */}
					<div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
						<div
							className={`max-w-2xl transition-all duration-1000 delay-150 ${
								mounted && heroInView
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-12"
							}`}
						>
							<p className="section-label text-left">
								Ma philosophie
							</p>

							<h1 className="text-foreground mb-4 sm:mb-6 text-left text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight">
								<span className="font-calligraphic text-accent inline-block align-baseline  ">
									M
								</span>
								on Approche
							</h1>

							<div className="space-y-5 text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed mb-8 text-left">
								<p>
									<span className="font-calligraphic text-gold text-md inline-block align-baseline  ">
										J
									</span>
									’accompagne les{" "}
									<strong className="text-foreground">
										femmes
									</strong>{" "}
									en période de transition.
									<br />
									Celles qui sentent que quelque chose doit
									changer, mais qui ne savent plus par où
									commencer.
									<br />
									<strong className="text-foreground">
										Celles qui veulent du sens, du concret,
										de la cohérence.
									</strong>
									<br />
									<strong className="text-foreground">
										Celles qui veulent se transformer sans
										renier qui elles sont.
									</strong>
									<br />
									<strong className="text-foreground">
										Celles qui, après un burn-out, une
										séparation ou un changement de vie, se
										retrouvent à la croisée des chemins.
									</strong>
								</p>

								<p>
									J'utilise trois outils&nbsp;:{" "}
									<Link
										href="/astrologie-toulouse"
										className="text-foreground font-medium hover:text-accent transition-colors"
									>
										l'astrologie thérapeutique
									</Link>{" "}
									pour éclairer vos schémas, le{" "}
									<Link
										href="/reiki-toulouse"
										className="text-foreground font-medium hover:text-accent transition-colors"
									>
										Reiki
									</Link>{" "}
									pour réaligner le corps et l'esprit, et la{" "}
									<strong className="text-foreground font-medium">
										parole consciente
									</strong>{" "}
									pour mettre des mots justes sur ce que vous
									vivez. En cabinet à Cépet (Toulouse Nord) ou
									à distance, pour Toulouse ou Montauban.
								</p>
							</div>

							{/* Signature quote - continuity with ApprochSection */}
							<blockquote className="relative py-5 my-8 border-l-2 border-accent/40 pl-5">
								<Quote className="absolute -top-2 -left-3 w-6 h-6 text-accent/30" />
								<p className="font-display text-lg sm:text-xl md:text-2xl italic text-foreground/90 text-left">
									"On ne se change pas, on s'ajuste à ce qui
									est déjà là."
								</p>
							</blockquote>

							<div className="flex flex-wrap gap-4">
								<Link href="/accompagnement">
									<Button variant="elegant" size="lg">
										Découvrir mes prestations
										<ArrowRight className="ml-2 w-4 h-4" />
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</section>
				{/* Quote Section with Reveal Image Effect */}
				<section
					ref={quoteRef}
					className="relative py-24 md:py-32 overflow-hidden"
				>
					{/* Animated gradient background */}
					<div
						className="absolute inset-0 pointer-events-none overflow-hidden"
						aria-hidden="true"
					>
						<div
							className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-40"
							style={{
								background:
									"radial-gradient(circle, hsl(var(--accent) / 0.15) 0%, transparent 70%)",
								transform: `translateY(${parallaxOffsetSlow}px)`,
							}}
						/>
						<div
							className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full blur-3xl opacity-40"
							style={{
								background:
									"radial-gradient(circle, hsl(var(--gold) / 0.15) 0%, transparent 70%)",
								transform: `translateY(${
									-parallaxOffsetSlow * 0.7
								}px)`,
							}}
						/>
					</div>

					<div className="container mx-auto px-6 sm:px-6 lg:px-12 relative z-10">
						<div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
							{/* Image with cinematic reveal effect */}
							<figure
								className={`relative order-2 lg:order-1 transition-all duration-&lsqb;1.5s&rsqb; ease-out ${
									mounted && quoteInView
										? "opacity-100 scale-100"
										: "opacity-0 scale-95"
								}`}
							>
								{/* Outer glow ring */}
								<div
									className={`absolute -inset-3 bg-gradient-to-br from-gold/20 via-accent/10 to-transparent rounded-3xl blur-xl transition-opacity duration-1000 ${
										mounted && quoteInView
											? "opacity-100"
											: "opacity-0"
									}`}
								/>

								{/* Image container with mask reveal */}
								<div
									className="relative overflow-hidden rounded-2xl shadow-2xl"
									style={{
										clipPath:
											mounted && quoteInView
												? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
												: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)",
										transition:
											"clip-path 1.2s cubic-bezier(0.65, 0, 0.35, 1)",
									}}
								>
									<div className="relative w-full aspect-[4/3]">
										<Image
											src="/assets/approche-lunettes.webp"
											alt="Un lever de soleil au travers de lunettes de vue - métaphore d'une nouvelle perspective"
											fill
											sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
											className="object-cover transition-transform duration-&lsqb;2s&rsqb; ease-out hover:scale-105"
											style={{
												transform:
													mounted && quoteInView
														? "scale(1)"
														: "scale(1.15)",
											}}
										/>
									</div>
									{/* Subtle overlay gradient */}
									<div className="absolute inset-0 bg-gradient-to-t from-navy/20 via-transparent to-transparent" />
								</div>

								{/* Floating golden accent */}
								<div
									className={`absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br from-gold/30 to-accent/20 blur-2xl transition-all duration-1000 delay-500 ${
										mounted && quoteInView
											? "opacity-100 scale-100"
											: "opacity-0 scale-50"
									}`}
								/>

								{/* Corner accent line */}
								<div
									className={`absolute -top-2 -left-2 w-16 h-16 border-l-2 border-t-2 border-gold/40 rounded-tl-xl transition-all duration-700 delay-700 ${
										mounted && quoteInView
											? "opacity-100"
											: "opacity-0"
									}`}
								/>
							</figure>

							{/* Content with staggered animation */}
							<div className="order-1 lg:order-2 space-y-6">
								<blockquote
									className={`relative transition-all duration-700 delay-100 ${
										mounted && quoteInView
											? "opacity-100 translate-y-0"
											: "opacity-0 translate-y-4"
									}`}
								>
									<Quote className="absolute -top-4 -left-2 w-10 h-10 text-accent/20" />
									<p className="font-display text-2xl sm:text-3xl lg:text-4xl text-navy leading-snug pl-6">
										Mon travail est d'essayer de relier la
										compréhension de ce que vous traversez
										et la mise en mouvement.
									</p>
								</blockquote>
							</div>
						</div>
					</div>
				</section>

				{/* Philosophy Section with Pillars */}
				<section
					ref={pillarsRef}
					className="relative py-20 md:py-28 bg-sand/30"
				>
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<div
							className={`max-w-3xl mx-auto text-center mb-14 transition-all duration-700 ${
								mounted && pillarsInView
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-8"
							}`}
						>
							<h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-navy">
								Mes 4 piliers
							</h2>
						</div>

						<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
							{pillars.map((pillar, index) => (
								<article
									key={pillar.title}
									className={`group bg-card/80 backdrop-blur-sm rounded-2xl p-8 text-center border border-border/20 hover:border-gold/30 hover:shadow-medium transition-all duration-500 ${
										mounted && pillarsInView
											? "opacity-100 translate-y-0"
											: "opacity-0 translate-y-12"
									}`}
									style={{
										transitionDelay:
											mounted && pillarsInView
												? `${200 + index * 100}ms`
												: "0ms",
										transform:
											mounted && pillarsInView
												? `translateY(0)`
												: `translateY(${
														20 + index * 5
												  }px)`,
									}}
								>
									<div className="w-16 h-16 mx-auto mb-5 rounded-full bg-sand/60 flex items-center justify-center shadow-soft group-hover:scale-110 group-hover:bg-gold/10 transition-all duration-500">
										<pillar.icon
											className="w-7 h-7 text-accent group-hover:text-gold transition-colors duration-500"
											strokeWidth={1.5}
										/>
									</div>
									<h3 className="font-display text-lg text-navy mb-3">
										<span className="font-calligraphic text-accent text-3xl inline-block align-baseline ">
											{pillar.title.charAt(0)}
										</span>
										{pillar.title.slice(1)}
									</h3>
									<p className="text-sm text-muted-foreground leading-relaxed">
										{pillar.description}
									</p>
								</article>
							))}
						</div>
					</div>
				</section>

				{/* Objectives Section */}
				<section
					ref={objectivesRef}
					className="relative py-20 md:py-28 bg-gradient-to-b from-sand/20 to-background"
				>
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
							{/* Content */}
							<div
								className={`transition-all duration-1000 ${
									mounted && objectivesInView
										? "opacity-100 translate-x-0"
										: "opacity-0 -translate-x-12"
								}`}
							>
								<h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-navy mb-6">
									Ce que ça change concrètement
								</h2>

								<div className="space-y-4">
									{objectives.map((obj, index) => (
										<div
											key={obj.text}
											className={`flex items-center gap-4 p-4 bg-card/50 rounded-xl border border-border/20 transition-all duration-500 ${
												mounted && objectivesInView
													? "opacity-100 translate-y-0"
													: "opacity-0 translate-y-4"
											}`}
											style={{
												transitionDelay: `${
													200 + index * 100
												}ms`,
											}}
										>
											<div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
												<obj.icon className="w-5 h-5 text-accent" />
											</div>
											<p className="font-display text-lg md:text-xl text-foreground">
												{obj.text}
											</p>
										</div>
									))}
								</div>
							</div>

							{/* Image with floating card effect */}
							<figure
								className={`relative transition-all duration-1000 delay-200 ${
									mounted && objectivesInView
										? "opacity-100 translate-y-0"
										: "opacity-0 translate-y-12"
								}`}
							>
								{/* Ambient glow behind */}
								<div className="absolute inset-4 bg-gradient-to-br from-gold/15 via-accent/10 to-transparent rounded-3xl blur-2xl" />

								{/* Floating card container */}
								<div
									className="relative group"
									style={{
										transform: `translateY(${
											Math.sin(parallaxOffset * 0.02) * 8
										}px)`,
										transition: "transform 0.3s ease-out",
									}}
								>
									{/* Shadow layer */}
									<div className="absolute inset-0 bg-navy/20 rounded-2xl blur-xl translate-y-4 scale-95 group-hover:translate-y-6 transition-transform duration-500" />

									{/* Image container */}
									<div className="relative overflow-hidden rounded-2xl border border-gold/10 shadow-xl h-[400px]">
										<Image
											src="/assets/main-tendue.webp"
											alt="Une main tendue vers une autre - symbole d'accompagnement"
											fill
											sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
											className="object-cover transition-transform duration-700 group-hover:scale-105"
										/>
										{/* Subtle overlay */}
										<div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent opacity-60" />
									</div>

									{/* Golden badge positioned elegantly */}
									<div className="absolute -bottom-4 -right-4 z-10">
										<GoldenPlantBadge
											size="sm"
											className="shadow-lg"
										/>
									</div>

									{/* Decorative corner */}
									<div
										className={`absolute -top-2 -right-2 w-12 h-12 border-r-2 border-t-2 border-gold/30 rounded-tr-xl transition-opacity duration-500 ${
											mounted && objectivesInView
												? "opacity-100"
												: "opacity-0"
										}`}
									/>
								</div>
							</figure>
						</div>
					</div>
				</section>
				{/* Large full-width card under the objectives section */}
				<section className="relative w-full">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<div
							className={`relative bg-white/90 dark:bg-navy/5 border border-border/20 rounded-2xl p-6 sm:p-8 overflow-hidden transition-all duration-1000 ${
								mounted && objectivesInView
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-4"
							}`}
						>
							{/* Decorative vertical accent - adjusted height */}
							<div className="absolute top-6 bottom-6 left-4 w-1 bg-gold/20 rounded-full pointer-events-none" />

							{/* Decorative top-right corner */}
							<div className="absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-gold/30 rounded-tr-xl transition-opacity duration-500" />

							{/* Optional floating icon (like a small sparkle) */}
							<Sparkles className="absolute top-6 right-6 w-7 h-7 text-gold/70 animate-float pointer-events-none" />

							{/* Content */}
							<p className="text-gold text-md sm:text-base leading-relaxed max-w-6xl mx-auto pr-8 sm:pr-10 relative z-10">
								<span className="font-calligraphic text-gold text-xl sm:text-md inline-block align-baseline">
									L
								</span>
								'objectif&nbsp;: que vous développiez la
								capacité à mobiliser vos propres ressources pour
								ne pas dépendre d'un accompagnement en
								permanence.
							</p>
						</div>
					</div>
				</section>

				{/* Deontology Section */}
				<section
					ref={deontologyRef}
					className="relative py-20 md:py-28"
				>
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<div
							className={`max-w-3xl mx-auto transition-all duration-700 ${
								mounted && deontologyInView
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-8"
							}`}
						>
							<div className="text-center mb-10">
								<div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
									<Shield className="w-8 h-8 text-accent" />
								</div>
								<h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-navy">
									Ce que vous pouvez attendre de moi
								</h2>
							</div>

							<p className="text-center text-muted-foreground text-base sm:text-lg leading-relaxed mb-6">
								Je ne prédis pas l'avenir et je ne fais pas de
								miracles car je ne suis ni magicienne, ni médium,
								ni voyante.
							</p>

							<p className="text-center text-foreground font-medium mb-6">
								Ce que je vous garantis&nbsp;:
							</p>

							<div className="space-y-4">
								{deontologyItems.map((item, index) => (
									<div
										key={item.title}
										className={`flex items-start gap-4 p-5 bg-card/50 rounded-xl border border-border/20 transition-all duration-500 ${
											mounted && deontologyInView
												? "opacity-100 translate-y-0"
												: "opacity-0 translate-y-4"
										}`}
										style={{
											transitionDelay: `${
												100 + index * 80
											}ms`,
										}}
									>
										<span className="text-accent font-bold text-lg">
											📍
										</span>
										<p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
											<strong className="text-foreground">
												{item.title}
											</strong>{" "}
											{item.text}
										</p>
									</div>
								))}
							</div>

							<p className="mt-8 text-center text-foreground font-medium italic">
								<strong>
									Vous êtes actrice de votre transformation,
								</strong>{" "}
								je vous accompagne mais je ne décide pas à
								votre place.
							</p>
						</div>
					</div>
				</section>

				{/* Final CTA Section */}
				<section
					ref={ctaRef}
					className="relative pt-10 md:pt-14 pb-20 md:pb-28 bg-gradient-to-b from-background via-sand/20 to-background"
				>
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<div
							className={`max-w-2xl mx-auto text-center transition-all duration-700 ${
								mounted && ctaInView
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-8"
							}`}
						>
							<GoldenPlantBadge
								size="lg"
								className="mx-auto mb-8 animate-gentle-pulse drop-shadow-[0_0_6px_rgba(212,175,55,0.45)]"
							/>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Button
									asChild
									variant="accent"
									size="lg"
									className="w-full sm:w-auto"
								>
									<a href={PHONE_TEL_HREF}>
										Réservez votre première séance
										<ArrowRight className="ml-2 w-4 h-4" />
									</a>
								</Button>
							</div>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
};

export default MonApproche;
