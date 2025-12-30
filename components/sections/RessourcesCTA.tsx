"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";
import { FaYoutube, FaInstagram, FaFacebook } from "react-icons/fa";
import { BookOpen, ArrowRight, Sparkles } from "lucide-react";
import { memo, useMemo } from "react";

// 🌟 Étoiles scintillantes dynamiques
const CelestialStars = memo(() => {
	const stars = useMemo(
		() =>
			Array.from({ length: 20 }).map((_, i) => ({
				id: i,
				left: `${Math.random() * 100}%`,
				top: `${Math.random() * 100}%`,
				size: Math.floor(Math.random() * 4) + 1,
				delay: `${Math.random() * 3}s`,
				duration: `${Math.random() * 2 + 2}s`,
			})),
		[]
	);

	return (
		<div
			className="absolute inset-0 pointer-events-none"
			aria-hidden="true"
		>
			{stars.map((star) => (
				<div
					key={star.id}
					className="absolute rounded-full bg-gold/80 animate-twinkle will-change-opacity"
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
			label: "Facebook",
			color: "text-blue-600",
			href: "https://www.facebook.com/share/16cEgpLgk9/",
		},
		{
			icon: FaYoutube,
			label: "Vidéos pédagogiques",
			color: "text-red-500",
			href: "https://www.youtube.com/@emilielylusio6206",
		},
		{
			icon: BookOpen,
			label: "Articles approfondis",
			color: "text-accent",
			href: "/blog",
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
				className="absolute top-10 right-10 w-48 h-48 bg-gold/10 rounded-full blur-3xl"
				aria-hidden="true"
			/>
			<div
				className="absolute bottom-10 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl"
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
					<div
						role="region"
						aria-labelledby="free-resources-title"
						className="relative bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-md rounded-3xl md:rounded-[2rem] p-8 md:p-12 lg:p-16 text-center border-2 border-accent/20 shadow-lg overflow-hidden"
					>
						{/* Decorative glow effects */}
						<div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl" aria-hidden="true" />
						<div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gold/15 rounded-full blur-3xl" aria-hidden="true" />
						{/* Icon badge */}
						<div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gold/20 to-accent/20 rounded-2xl mb-6 shadow-lg ring-2 ring-accent/30 relative">
							<Sparkles
								className="w-10 h-10 text-gold drop-shadow-md"
								aria-hidden="true"
							/>
							<span className="sr-only">
								Badge Contenus gratuits
							</span>
						</div>

						<h2
							id="free-resources-title"
							className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground mb-5 relative"
						>
							{renderTitle("Découvrez mes contenus gratuits")}
						</h2>

						<p className="text-muted-foreground mb-10 max-w-2xl mx-auto text-base md:text-lg lg:text-xl leading-relaxed relative">
							Vidéos pédagogiques, ateliers lives et articles
							approfondis pour enrichir votre chemin
						</p>

						{/* Features badges */}
						<div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8">
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

						{/* CTA Button */}
						<Button
							asChild
							size="lg"
							className="group w-full md:w-auto"
						>
							<Link
								href="/ressources"
								className="inline-flex items-center justify-center gap-2 text-white font-medium rounded-md px-6 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 transition-transform motion-safe:hover:-translate-y-1 hover:shadow-lg"
							>
								<span>Voir toutes les ressources</span>
								<ArrowRight
									className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
