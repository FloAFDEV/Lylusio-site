"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";
import { FaYoutube, FaInstagram, FaFacebook } from "react-icons/fa";
import { BookOpen, ArrowRight, Sparkles } from "lucide-react";
import { memo, useEffect, useState } from "react";

// seededRandom - fonction déterministe pour SSR/client sync
const seededRandom = (seed: number): number => {
	const x = Math.sin(seed) * 10000;
	return x - Math.floor(x);
};

// 🌟 Étoiles scintillantes avec positions déterministes (SSR-safe)
const CelestialStars = memo(() => {
	// Générer les étoiles de façon déterministe (même résultat SSR et client)
	const stars = Array.from({ length: 12 }).map((_, i) => {
		const r1 = seededRandom(i * 5 + 1);
		const r2 = seededRandom(i * 5 + 2);
		const r3 = seededRandom(i * 5 + 3);
		const r4 = seededRandom(i * 5 + 4);
		const r5 = seededRandom(i * 5 + 5);

		return {
			id: i,
			left: `${(r1 * 100).toFixed(4)}%`,
			top: `${(r2 * 100).toFixed(4)}%`,
			size: Math.floor(r3 * 4) + 1,
			delay: `${(r4 * 3).toFixed(2)}s`,
			duration: `${(r5 * 2 + 2).toFixed(2)}s`,
		};
	});

	return (
		<div
			className="absolute inset-0 pointer-events-none"
			aria-hidden="true"
		>
			{stars.map((star) => (
				<div
					key={star.id}
					className="absolute rounded-full bg-gold/80 motion-safe:animate-twinkle"
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

const RessourcesCTA = () => {
	const { ref, isInView } = useInView({ threshold: 0.2 });

	const features = [
		{
			icon: FaInstagram,
			label: "Ateliers & Lives",
			color: "text-pink-500",
			href: "https://www.instagram.com/emilie.perez_astroreiki_/",
		},
		{
			icon: FaFacebook,
			label: "Communauté",
			color: "text-blue-600",
			href: "https://www.facebook.com/share/16cEgpLgk9/",
		},
		{
			icon: FaYoutube,
			label: "Vidéos pédagogiques",
			color: "text-red-500",
			href: "https://www.youtube.com/@emilielylusio6206",
		},
	];

	const renderTitle = (text: string) => (
		<>
			<span className="font-calligraphic text-gold text-4xl md:text-5xl lg:text-6xl inline-block align-baseline">
				{text.charAt(0)}
			</span>
			{text.slice(1)}
		</>
	);

	return (
		<section
			ref={ref}
			className="relative py-16 md:py-20 overflow-hidden bg-gradient-sand-top-bottom"
		>
			{/* Étoiles */}
			<CelestialStars />

			{/* Background decoration */}
			<div
				className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/20 to-transparent"
				aria-hidden="true"
			/>
			<div
				className="absolute top-10 right-10 w-48 h-48 bg-gold/10 rounded-full blur-xl md:blur-3xl"
				aria-hidden="true"
			/>
			<div
				className="absolute bottom-10 left-10 w-64 h-64 bg-accent/10 rounded-full blur-xl md:blur-3xl"
				aria-hidden="true"
			/>

			<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<div
					className={`max-w-4xl mx-auto transition-all duration-700 ${
						isInView
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-8"
					}`}
				>
					{/* Card principale */}
					<div
						role="region"
						aria-labelledby="free-resources-title"
						className="relative bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 text-center border border-accent/15 shadow-md motion-safe:hover:shadow-lg motion-safe:hover:scale-[1.01] overflow-hidden mb-8 motion-safe:transition-all duration-300"
					>
						{/* Decorative glow effects - softer and smaller */}
						<div
							className="absolute -top-16 -right-16 w-32 h-32 bg-accent/15 rounded-full blur-xl md:blur-2xl motion-safe:group-hover:bg-accent/20 motion-safe:transition-colors duration-500"
							aria-hidden="true"
						/>
						<div
							className="absolute -bottom-16 -left-16 w-32 h-32 bg-gold/10 rounded-full blur-xl md:blur-2xl motion-safe:group-hover:bg-gold/15 motion-safe:transition-colors duration-500"
							aria-hidden="true"
						/>
						{/* Icon badge - smaller and more delicate with FREE tag */}
						<div className="inline-flex flex-col items-center gap-2 mb-5">
							<div className="relative inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-gold/15 to-accent/15 rounded-xl shadow-md ring-1 ring-accent/20">
								<Sparkles
									className="w-7 h-7 text-gold drop-shadow-sm"
									aria-hidden="true"
								/>
								<span className="sr-only">
									Badge Contenus gratuits
								</span>
							</div>
							{/* Badge "GRATUIT" visible */}
							<span className="inline-flex items-center px-3 py-1 text-xs font-semibold tracking-wide text-gold bg-gold/10 border border-gold/20 rounded-full shadow-sm">
								100% GRATUIT
							</span>
						</div>

						<h2
							id="free-resources-title"
							className="font-display text-xl md:text-2xl lg:text-3xl text-foreground mb-4 relative"
						>
							{renderTitle(
								"Ressources gratuites & contenus pratiques"
							)}
						</h2>

						<p className="text-muted-foreground mb-8 max-w-xl mx-auto text-sm md:text-base lg:text-lg leading-relaxed relative">
							Vidéos pédagogiques, ateliers lives et contenus
							pratiques pour enrichir votre chemin
						</p>

						{/* Features badges */}
						<div className="flex flex-wrap justify-center gap-3 md:gap-4">
							{features.map((feature, index) => {
								const Component = feature.href ? "a" : "div";
								return (
									<Component
										key={feature.label}
										href={feature.href}
										target={
											feature.href ? "_blank" : undefined
										}
										rel={
											feature.href
												? "noopener noreferrer"
												: undefined
										}
										className={`flex items-center gap-2 md:gap-3 px-4 py-3 bg-gradient-sky-center/30 rounded-full shadow-md transition-all duration-500 delay-${
											index * 100
										} ${
											isInView
												? "opacity-100 translate-y-0"
												: "opacity-0 translate-y-4"
										} hover:scale-105 hover:rotate-[3deg] hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2`}
									>
										<feature.icon
											className={`w-5 h-5 ${feature.color}`}
											aria-hidden="true"
										/>
										<span className="text-sm md:text-base font-medium text-foreground">
											{feature.label}
										</span>
									</Component>
								);
							})}
						</div>
					</div>

					{/* CTA Button - En dehors de la card */}
					<div className="text-center">
						<Button
							variant="elegant"
							size="lg"
							className="group"
							asChild
						>
							<Link
								href="/ressources"
								className="inline-flex items-center"
							>
								Voir toutes les ressources
								<ArrowRight
									className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
									aria-hidden="true"
								/>
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default RessourcesCTA;
