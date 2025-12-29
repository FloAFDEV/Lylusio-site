"use client";

import { memo, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, MapPin } from "lucide-react";
import Image from "next/image";
import { useParallax } from "@/hooks/useParallax";
// import emilieHero from "@/assets/emilie-hero.webp"; // Now using /assets/emilie-hero.webp
// import plantDecoration from "@/assets/plant-decoration.webp"; // Now using /assets/plant-decoration.webp

// CelestialStars - Étoiles scintillantes améliorées (Lovable)
const CelestialStars = memo(() => {
	const stars = useMemo(
		() => [
			{ id: 0, left: "15%", top: "10%", size: 2, delay: "0s", duration: "3s" },
			{ id: 1, left: "85%", top: "20%", size: 1, delay: "0.5s", duration: "3.5s" },
			{ id: 2, left: "25%", top: "35%", size: 3, delay: "1s", duration: "2.8s" },
			{ id: 3, left: "70%", top: "45%", size: 1, delay: "1.5s", duration: "4s" },
			{ id: 4, left: "50%", top: "15%", size: 2, delay: "2s", duration: "3.2s" },
			{ id: 5, left: "10%", top: "60%", size: 1, delay: "2.5s", duration: "3.8s" },
			{ id: 6, left: "90%", top: "70%", size: 3, delay: "3s", duration: "2.5s" },
			{ id: 7, left: "40%", top: "80%", size: 2, delay: "3.5s", duration: "3.6s" },
			{ id: 8, left: "65%", top: "25%", size: 1, delay: "0.8s", duration: "4.2s" },
			{ id: 9, left: "30%", top: "50%", size: 2, delay: "1.2s", duration: "3.4s" },
			{ id: 10, left: "80%", top: "65%", size: 1, delay: "1.8s", duration: "3s" },
			{ id: 11, left: "20%", top: "75%", size: 3, delay: "2.2s", duration: "3.7s" },
			{ id: 12, left: "55%", top: "40%", size: 2, delay: "2.8s", duration: "2.9s" },
			{ id: 13, left: "75%", top: "55%", size: 1, delay: "3.2s", duration: "3.3s" },
			{ id: 14, left: "35%", top: "20%", size: 2, delay: "0.3s", duration: "3.9s" },
			{ id: 15, left: "60%", top: "85%", size: 1, delay: "0.7s", duration: "3.1s" },
			{ id: 16, left: "45%", top: "30%", size: 3, delay: "1.3s", duration: "2.7s" },
			{ id: 17, left: "12%", top: "42%", size: 2, delay: "1.7s", duration: "3.5s" },
			{ id: 18, left: "88%", top: "52%", size: 1, delay: "2.3s", duration: "4.1s" },
			{ id: 19, left: "52%", top: "68%", size: 2, delay: "2.9s", duration: "2.6s" },
		],
		[]
	);

	return (
		<div className="absolute inset-0 pointer-events-none" aria-hidden="true">
			{stars.map((star) => (
				<div
					key={star.id}
					className="absolute rounded-full bg-gold/40 animate-twinkle will-change-opacity"
					style={{
						left: star.left,
						top: star.top,
						width: `${star.size}px`,
						height: `${star.size}px`,
						animationDelay: star.delay,
						animationDuration: star.duration,
						boxShadow:
							star.size > 2
								? "0 0 6px hsl(var(--gold) / 0.5)"
								: "none",
					}}
				/>
			))}
		</div>
	);
});

CelestialStars.displayName = "CelestialStars";

// SoftClouds - Nuages flottants avec parallax (Lovable)
const SoftClouds = memo(({ parallaxOffset }: { parallaxOffset: number }) => (
	<div
		className="absolute inset-0 pointer-events-none overflow-hidden"
		aria-hidden="true"
	>
		{/* Cloud 1 - top right */}
		<div
			className="absolute -top-10 right-[10%] w-80 h-40 bg-white/30 rounded-full blur-3xl will-change-transform"
			style={{ transform: `translate3d(0, ${parallaxOffset * 0.2}px, 0)` }}
		/>
		{/* Cloud 2 - top left */}
		<div
			className="absolute top-[5%] -left-10 w-60 h-32 bg-white/25 rounded-full blur-3xl will-change-transform"
			style={{ transform: `translate3d(0, ${parallaxOffset * 0.3}px, 0)` }}
		/>
		{/* Cloud 3 - middle */}
		<div
			className="absolute top-[30%] right-[30%] w-48 h-24 bg-sky/40 rounded-full blur-2xl will-change-transform hidden md:block"
			style={{
				transform: `translate3d(0, ${parallaxOffset * 0.15}px, 0)`,
			}}
		/>
	</div>
));

SoftClouds.displayName = "SoftClouds";

// Signature SVG mémorisée pour optimisation
const HandwrittenSignature = memo(
	({ parallaxOffset }: { parallaxOffset: number }) => (
		<div
			className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden sm:flex"
			aria-hidden="true"
			style={{
				transform: `translate3d(0, ${parallaxOffset * 0.3}px, 0)`,
			}}
		>
			<svg
				viewBox="0 0 800 200"
				className="w-[140%] lg:w-[120%] h-auto opacity-[0.12] dark:opacity-[0.10]"
				preserveAspectRatio="xMidYMid meet"
			>
				<defs>
					<filter id="signature-blur">
						<feGaussianBlur stdDeviation="0.4" />
					</filter>
				</defs>
				<text
					x="50%"
					y="50%"
					textAnchor="middle"
					dominantBaseline="middle"
					filter="url(#signature-blur)"
					className="fill-navy/30 dark:fill-gold/20 animate-handwriting"
					style={{
						fontSize: "100px",
						fontFamily: "Dancing Script, cursive",
						animationDelay: "1.5s",
					}}
					stroke="currentColor"
					strokeWidth="0.5"
					strokeOpacity="0.12"
				>
					Émilie Perez
				</text>
			</svg>
		</div>
	)
);

HandwrittenSignature.displayName = "HandwrittenSignature";

// Formes organiques d'arrière-plan
const OrganicShapes = memo(({ parallaxOffset }: { parallaxOffset: number }) => (
	<div
		className="absolute inset-0 pointer-events-none hidden sm:block"
		aria-hidden="true"
	>
		<div
			className="absolute -top-32 -right-32 w-72 md:w-96 h-72 md:h-96 bg-gold/4 rounded-full blur-3xl will-change-transform"
			style={{
				transform: `translate3d(0, ${parallaxOffset * 0.5}px, 0)`,
			}}
		/>
		<div
			className="absolute -bottom-32 -left-32 w-60 md:w-80 h-60 md:h-80 bg-accent/4 rounded-full blur-3xl will-change-transform"
			style={{
				transform: `translate3d(0, ${-parallaxOffset * 0.3}px, 0)`,
			}}
		/>
	</div>
));

OrganicShapes.displayName = "OrganicShapes";

// DecorativeCircles - Cercles tournants autour de la photo (Lovable)
const DecorativeCircles = memo(() => (
	<div className="hidden sm:block">
		<div
			className="absolute -inset-12 -z-20 w-full h-full border-2 border-gold/25 rounded-[50%_45%_55%_50%] rotate-6 opacity-40 will-change-transform"
			style={{ animation: "spin 40s linear infinite" }}
		/>
		<div
			className="absolute -inset-16 -z-30 w-full h-full border-2 border-gold-light/20 rounded-[55%_50%_50%_55%] -rotate-6 opacity-30 will-change-transform"
			style={{ animation: "spin 50s linear infinite reverse" }}
		/>
	</div>
));

DecorativeCircles.displayName = "DecorativeCircles";

const HeroSection = () => {
	const parallaxOffset = useParallax(0.15);

	const scrollToNext = useCallback(() => {
		const element = document.querySelector("#approche");
		if (element) {
			const headerOffset = 80;
			const elementPosition = element.getBoundingClientRect().top;
			const offsetPosition =
				elementPosition + window.scrollY - headerOffset;

			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth",
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
			{/* Éléments célestes */}
			<CelestialStars />
			<SoftClouds parallaxOffset={parallaxOffset} />
			<HandwrittenSignature parallaxOffset={parallaxOffset} />

			{/* Formes organiques d'arrière-plan */}
			<OrganicShapes parallaxOffset={parallaxOffset} />

			{/* Contenu principal */}
			<div className="relative z-10 container-wide section-padding grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
				{/* Contenu textuel - Gauche */}
				<div className="lg:col-span-7 max-w-2xl mx-auto lg:mx-0 text-center lg:text-left order-2 lg:order-1">
					<p
						className="font-body text-xs text-muted-foreground uppercase tracking-[0.3em] mb-4 animate-fade-up"
						style={{ animationDelay: "0.1s" }}
					>
						À Toulouse & en ligne
					</p>

					<div
						className="animate-fade-up"
						style={{ animationDelay: "0.2s" }}
					>
						<h1
							id="hero-title"
							className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.1] mb-4 sm:mb-6"
						>
							<span className="font-calligraphic text-accent text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block align-baseline transition-transform duration-300 hover:scale-110">
								A
							</span>
							strologie Consciente
							<br />
							<span className="text-accent">& Reiki</span>
						</h1>
					</div>

					<div
						className="space-y-4 mb-8 animate-fade-up"
						style={{ animationDelay: "0.3s" }}
					>
						<p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
							Vous traversez peut-être un moment de bascule, une
							période où les repères s'effritent, où ce que vous
							croyiez dépassé revient frapper à la porte.
						</p>
						<p className="text-muted-foreground/80 text-sm md:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
							Ici, vous trouverez un lieu pour{" "}
							<span className="text-accent font-semibold">
								déposer
							</span>
							,{" "}
							<span className="text-accent font-semibold">
								comprendre
							</span>{" "}
							et{" "}
							<span className="text-accent font-semibold">
								transmuter
							</span>{" "}
							ce que vous vivez.
						</p>
					</div>

					<div
						className="animate-fade-up flex justify-center lg:justify-start"
						style={{ animationDelay: "0.4s" }}
					>
						<Button
							asChild
							size="lg"
							className="bg-gold text-foreground hover:bg-gold-light font-medium px-8 shadow-gold transition-all duration-300 hover:scale-105 hover:shadow-glow active:scale-100 animate-gold-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
							aria-label="Réserver une séance de consultation sur Calendly"
						>
							<a
								href="https://calendly.com/lylusio-fr"
								target="_blank"
								rel="noopener noreferrer"
							>
								Réserver une séance
							</a>
						</Button>
					</div>

					<p
						className="mt-8 sm:mt-10 font-calligraphic text-xl sm:text-2xl md:text-3xl text-navy/40 dark:text-gold/40 animate-fade-up animate-handwriting"
						style={{
							animationDelay: "1.5s",
						}}
						aria-hidden="true"
					>
						— Émilie Perez —
					</p>
				</div>

				{/* Photo avec parallax - Droite */}
				<div
					className="lg:col-span-5 relative order-1 lg:order-2 animate-fade-up pt-4 sm:pt-6 md:pt-8 lg:pt-0"
					style={{
						animationDelay: "0.3s",
						transform: `translate3d(0, ${
							parallaxOffset * 0.2
						}px, 0)`,
					}}
				>
					<div className="relative mx-auto max-w-[200px] sm:max-w-[240px]">
						{/* Cercles décoratifs */}
						<DecorativeCircles />

						{/* Photo principale avec effet hover */}
						<div className="aspect-square rounded-full overflow-hidden shadow-gold border-2 border-gold/20 relative group">
							<Image
								src="/assets/emilie-hero.webp"
								alt="Émilie Perez - Astrologue et praticienne Reiki 3ème degré à Toulouse"
								fill
								sizes="(max-width: 640px) 200px, 240px"
								className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
								priority
								quality={95}
							/>
							<div
								className="absolute inset-0 bg-gradient-to-t from-background/15 via-transparent to-cream/8 pointer-events-none"
								aria-hidden="true"
							/>
						</div>

						{/* Badge décoratif plante - Coin inférieur gauche */}
						<div
							className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-background/95 rounded-full flex items-center justify-center animate-float overflow-hidden border-2 border-gold/30 shadow-[0_0_20px_rgba(212,175,55,0.2)] backdrop-blur-sm hover:scale-110 transition-transform duration-300"
							style={{ animationDelay: "0.8s" }}
							aria-hidden="true"
						>
							<Image
								src="/assets/plant-decoration.webp"
								alt=""
								className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full object-cover"
								width={40}
							height={40}
								aria-hidden="true"
							/>
						</div>

						{/* Badge localisation - Coin supérieur droit */}
						<div
							className="hidden sm:flex absolute -top-2 -right-2 sm:-top-3 sm:-right-3 px-2 py-1 sm:px-3 sm:py-1.5 bg-background/90 backdrop-blur-md rounded-full shadow-soft animate-float border border-gold/25 items-center gap-1.5 hover:scale-105 transition-transform duration-300"
							style={{ animationDelay: "1.2s" }}
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

			{/* Indicateur de scroll avec interactions améliorées */}
			<button
				onClick={scrollToNext}
				className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-muted-foreground/70 hover:text-accent transition-all duration-300 animate-fade-in group focus:outline-none focus:ring-2 focus:ring-accent/50 rounded-lg p-2"
				style={{ animationDelay: "1s" }}
				aria-label="Défiler vers la section suivante"
			>
				<span className="text-[10px] uppercase tracking-widest font-medium group-hover:tracking-[0.25em] transition-all duration-300">
					Découvrir
				</span>
				<ChevronDown
					className="w-5 h-5 animate-bounce group-hover:translate-y-1 transition-transform"
					aria-hidden="true"
				/>
			</button>
		</section>
	);
};

export default memo(HeroSection);
