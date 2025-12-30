"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";
import { Youtube, Instagram, BookOpen, ArrowRight, Sparkles } from "lucide-react";

/**
 * CTA Banner for resources page
 * Positioned between "Qui suis-je" section and Footer on homepage
 */
const RessourcesCTA = () => {
	const { ref, isInView } = useInView({ threshold: 0.2 });

	const features = [
		{
			icon: Youtube,
			label: "Vidéos pédagogiques",
			color: "text-red-500",
		},
		{
			icon: Instagram,
			label: "Ateliers & Lives",
			color: "text-pink-500",
		},
		{
			icon: BookOpen,
			label: "Articles approfondis",
			color: "text-accent",
		},
	];

	return (
		<section
			ref={ref}
			className="relative py-16 md:py-20 overflow-hidden bg-gradient-sand-center"
		>
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
					<div className="bg-card/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-8 md:p-12 text-center border border-border/30 shadow-medium">
						{/* Icon badge */}
						<div className="inline-flex items-center justify-center w-16 h-16 bg-gold/10 rounded-full mb-6">
							<Sparkles
								className="w-8 h-8 text-gold"
								aria-hidden="true"
							/>
						</div>

						<h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground mb-4">
							Découvrez mes contenus gratuits
						</h2>

						<p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
							Vidéos pédagogiques, ateliers lives et articles approfondis
							pour enrichir votre chemin
						</p>

						{/* Features grid */}
						<div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8">
							{features.map((feature, index) => (
								<div
									key={feature.label}
									className={`flex items-center gap-3 px-4 py-3 bg-gradient-sky-center/30 rounded-full transition-all duration-500 delay-${
										index * 100
									} ${
										isInView
											? "opacity-100 translate-y-0"
											: "opacity-0 translate-y-4"
									}`}
								>
									<feature.icon
										className={`w-5 h-5 ${feature.color}`}
										aria-hidden="true"
									/>
									<span className="text-sm md:text-base font-medium text-foreground">
										{feature.label}
									</span>
								</div>
							))}
						</div>

						{/* CTA Button */}
						<Button asChild size="lg" className="group">
							<Link
								href="/ressources"
								className="inline-flex items-center gap-2 bg-gold hover:brightness-110 text-white shadow-gold"
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
