"use client";

import { memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, MapPin } from "lucide-react";
import Image from "next/image";
import { PHONE_TEL_HREF } from "@/lib/contact";

// ===========================
// DECORATIVE CIRCLES
// ===========================
// Cercles statiques décalés autour de la photo
const DecorativeCircles = memo(() => (
	<div className="hidden sm:block">
		<div
			className="absolute -inset-12 -z-20 w-full h-full border border-gold/25 rounded-[50%_45%_55%_50%] rotate-6 opacity-50"
			aria-hidden="true"
		/>
		<div
			className="absolute -inset-16 -z-30 w-full h-full border border-gold-light/25 rounded-[55%_50%_50%_55%] -rotate-6 opacity-80"
			aria-hidden="true"
		/>
	</div>
));

DecorativeCircles.displayName = "DecorativeCircles";

// ===========================
// MAIN HERO SECTION
// ===========================
const HeroSection = () => {
	const scrollToNext = useCallback(() => {
		const element = document.querySelector("#approche");
		if (element) {
			// scrollIntoView évite le forced reflow
			// scroll-margin-top gère l'offset du header
			element.scrollIntoView({
				behavior: "smooth",
				block: "start",
				inline: "nearest",
			});
		}
	}, []);

	return (
		<section
			id="accueil"
			className="relative min-h-[80svh] sm:min-h-[90svh] lg:min-h-[100svh] flex items-center overflow-hidden"
			style={{
				background:
					"linear-gradient(180deg, hsl(225 33% 97%) 0%, hsl(210 50% 96%) 30%, hsl(32 100% 97%) 100%)",
			}}
			aria-labelledby="hero-title"
		>
			{/* Contenu principal */}
			<div className="relative z-10 container-wide section-padding grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
				{/* Contenu textuel - Gauche */}
				<div className="lg:col-span-7 max-w-2xl mx-auto lg:mx-0 text-center lg:text-left order-2 lg:order-1">
					<p className="font-body text-xs text-muted-foreground uppercase tracking-[0.3em] mb-4">
						À Cépet · Toulouse & en ligne
					</p>

					<div>
						<h1
							id="hero-title"
							className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.1] mb-4 sm:mb-6"
						>
							<span className="font-calligraphic text-accent text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block align-baseline motion-safe:transition-transform duration-300 hover:scale-110">
								É
							</span>
							milie Perez
							<br />
							<span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-accent">
								Astrologue & Reiki à Cépet
							</span>
						</h1>
					</div>

					<div className="space-y-4 mb-8 text-left">
						<p className="text-foreground font-medium text-base md:text-lg lg:text-xl leading-relaxed max-w-prose mx-auto lg:mx-0">
							Vous n'avez pas besoin d'aller bien pour être ici.
						</p>

						<p className="text-muted-foreground text-sm md:text-base lg:text-lg leading-relaxed max-w-prose mx-auto lg:mx-0">
							Un{" "}
							<span className="text-accent font-semibold">burn-out</span>, une{" "}
							<span className="text-accent font-semibold">séparation</span>, un{" "}
							<span className="text-accent font-semibold">
								virage de vie
							</span>
							… ou simplement un moment où ce que vous pensiez solide
							vacille. Si vous lisez ces lignes, quelque chose en vous
							sait déjà que{" "}
							<strong className="font-semibold lg:font-bold">
								ça ne peut plus continuer comme avant
							</strong>
							.
						</p>

						<p className="text-muted-foreground/80 text-sm md:text-base lg:text-lg leading-relaxed max-w-prose mx-auto lg:mx-0">
							Je suis{" "}
							<strong className="font-semibold lg:font-bold">
								Émilie
							</strong>
							, astrologue et praticienne Reiki à{" "}
							<strong className="font-semibold lg:font-bold">
								Cépet
							</strong>
							. J'ai passé presque 10 ans à accompagner des personnes en
							insertion et j'ai moi aussi traversé mes propres tempêtes.
							L'astrologie m'accompagne depuis mon adolescence et le Reiki
							depuis maintenant 6 ans. Ils m'ont aidée à comprendre et à
							me remettre debout.
						</p>

						<p className="text-muted-foreground/70 text-sm md:text-base lg:text-lg leading-relaxed max-w-prose mx-auto lg:mx-0">
							Ici, pas de pensée positive ni de blabla : je vous dis ce
							que je vois{" "}
							<span className="text-accent font-semibold">
								avec justesse
							</span>{" "}
							mais toujours{" "}
							<span className="text-accent font-semibold">
								sans jugement
							</span>
							. Vous n'aurez pas à jouer un rôle,{" "}
							<strong className="font-semibold lg:font-bold">
								vous arrivez comme vous êtes
							</strong>
							, avec vos contradictions, et c'est de là qu'on part. De
							votre histoire, de votre thème astral et de ce que vous
							ressentez, pour comprendre pourquoi vous tournez en rond.
							Puis on cherche ce qui peut bouger, et comment.
						</p>

						<p className="text-primary italic text-sm md:text-base leading-relaxed max-w-prose mx-auto lg:mx-0">
							Je ne prédis pas l'avenir et je ne décide pas à votre place.
							Je vous aide à voir clair, pour que vous choisissiez en
							connaissance de cause.
						</p>
					</div>

					{/* CTA Principal */}
					<div className="flex justify-center lg:justify-start">
						<Button
							asChild
							size="lg"
							className="bg-gold-light text-foreground hover:bg-navy hover:text-white font-medium px-8 motion-safe:transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
							aria-label="Réserver une séance par téléphone"
						>
							<a href={PHONE_TEL_HREF}>
								Réserver une séance
							</a>
						</Button>
					</div>

					{/* Signature */}
					<p
						className="mt-8 sm:mt-10 max-sm:mb-6 font-calligraphic text-xl sm:text-2xl md:text-3xl text-navy/90 dark:text-gold/50"
						aria-hidden="true"
					>
						— Émilie Perez —
					</p>
				</div>

				{/* Photo avec décoration - Droite */}
				<div className="lg:col-span-5 relative order-1 lg:order-2 pt-4 sm:pt-6 md:pt-8 lg:pt-0">
					{/* Container SSR-safe avec dimensions fixes */}
					<div className="relative mx-auto w-[280px] sm:w-[240px] h-[280px] sm:h-[240px]">
						{/* Photo principale avec Next.js Image optimisé */}
						<div className="aspect-square rounded-full overflow-hidden shadow-gold relative group">
							<Image
								src="/assets/emilie-hero.webp"
								alt="Émilie Perez - Astrologue et praticienne Reiki 3ème degré à Toulouse"
								fill
								sizes="(max-width: 640px) 280px, (max-width: 1024px) 240px, 240px"
								className="object-cover opacity-90 motion-safe:transition-transform duration-700 group-hover:scale-105"
								quality={90}
								priority
								fetchPriority="high"
								loading="eager"
								unoptimized={false}
							/>
							{/* Gradient overlay */}
							<div
								className="absolute inset-0 bg-gradient-to-t from-background/15 via-transparent to-cream/8 pointer-events-none"
								aria-hidden="true"
							/>
						</div>

						{/* Cercles décoratifs */}
						<DecorativeCircles />

						{/* Badge décoratif plante */}
						<div
							className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-background rounded-full flex items-center justify-center overflow-hidden border-2 border-gold/30 shadow-soft hover:scale-110 motion-safe:transition-transform duration-300"
							aria-hidden="true"
						>
							<div
								className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full bg-cover bg-center"
								style={{
									backgroundImage:
										"url('/assets/plant-decoration.webp')",
								}}
								aria-hidden="true"
							/>
						</div>

						{/* Badge localisation */}
						<div
							className="hidden sm:flex absolute -top-2 -right-2 sm:-top-3 sm:-right-3 px-2 py-1 sm:px-3 sm:py-1.5 bg-background rounded-full shadow-soft border border-gold/25 items-center gap-1.5 hover:scale-105 motion-safe:transition-transform duration-300"
							aria-hidden="true"
						>
							<MapPin
								className="w-3 h-3 text-accent"
								aria-hidden="true"
							/>
							<span className="text-[9px] sm:text-[10px] text-muted-foreground font-medium">
								Toulouse & en ligne
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Indicateur de scroll */}
			<button
				onClick={scrollToNext}
				className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-muted-foreground/70 hover:text-accent motion-safe:transition-all duration-300 motion-safe:animate-fade-in group focus:outline-none focus:ring-2 focus:ring-accent/50 rounded-lg p-2"
				aria-label="Défiler vers la section suivante"
			>
				<span className="text-[10px] uppercase tracking-widest font-medium group-hover:tracking-[0.25em] motion-safe:transition-all duration-300">
					Découvrir
				</span>
				<ChevronDown
					className="w-5 h-5 motion-safe:animate-bounce group-hover:translate-y-1 motion-safe:transition-transform"
					aria-hidden="true"
				/>
			</button>
		</section>
	);
};

export default memo(HeroSection);
