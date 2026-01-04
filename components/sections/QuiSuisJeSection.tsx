"use client";

import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

const QuiSuisJeSection = () => {
	const { ref, isInView } = useInView({ threshold: 0.1 });

	return (
		<section
			ref={ref}
			className="py-16 md:py-24 overflow-hidden bg-gradient-cream-to-bg"
			aria-labelledby="qui-suis-je-title"
		>
			<div className="absolute inset-0 pointer-events-none" aria-hidden="true">
				{[...Array(5)].map((_, i) => (
					<div
						key={i}
						className="absolute w-1 h-1 bg-gold/30 rounded-full animate-twinkle"
						style={{
							top: `${20 + i * 15}%`,
							left: `${10 + i * 20}%`,
							animationDelay: `${i * 0.6}s`,
						}}
					/>
				))}
				<div className="absolute top-10 right-[20%] w-40 h-24 bg-white/20 rounded-full blur-3xl hidden md:block" />
			</div>

			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
					{/* Image */}
					<div
						className={`relative motion-safe:transition-all duration-1000 ${
							isInView
								? "opacity-100 translate-x-0"
								: "opacity-0 -translate-x-12"
						}`}
					>
						<div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 flex-shrink-0">
							{/* Decorative gradient blur */}
							<div
								className="absolute inset-0 bg-gradient-to-br from-gold/20 to-navy/10 rounded-full blur-2xl"
								aria-hidden="true"
							/>

							<div className="relative w-full h-full rounded-full overflow-hidden border-4 border-card shadow-gold">
								<Image
									src="/assets/emilie-about.webp"
									alt="Émilie Perez, thérapeute en astrologie et Reiki à Toulouse"
									fill
									sizes="(max-width: 768px) 192px, (max-width: 1024px) 256px, 288px"
									className="object-cover"
									quality={95}
									priority
								/>
							</div>

							{/* Decorative sparkle */}
							<div className="absolute -top-2 -right-2 w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center animate-gentle-pulse">
								<Sparkles className="w-4 h-4 text-gold" />
							</div>
							{/* Small stars around image */}
							<div className="absolute top-4 -left-2 w-1.5 h-1.5 bg-gold/40 rounded-full animate-twinkle" style={{ animationDelay: '0.3s' }} />
							<div className="absolute bottom-8 -right-3 w-1 h-1 bg-gold/30 rounded-full animate-twinkle" style={{ animationDelay: '1s' }} />
						</div>
					</div>

					{/* Content */}
					<div
						className={`flex-1 text-center md:text-left motion-safe:transition-all duration-1000 delay-200 ${
							isInView
								? "opacity-100 translate-x-0"
								: "opacity-0 translate-x-12"
						}`}
					>
						<p className="section-label mb-2">Qui suis-je</p>

						<h2
							id="qui-suis-je-title"
							className="font-display text-2xl sm:text-3xl lg:text-4xl text-foreground mb-4"
						>
							<span className="font-calligraphic text-gold">Émilie</span> Perez
						</h2>

						<div className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
							<p>
								<span className="font-calligraphic text-accent text-2xl md:text-3xl inline-block align-baseline">
									N
								</span>
								ée sous le signe des{" "}
								<strong className="text-foreground">
									Gémeaux avec Soleil et Mercure conjoint à
									Chiron
								</strong>{" "}
								en Maison 8 et un{" "}
								<strong className="text-foreground">
									ascendant Scorpion conjoint à Pluton
								</strong>
								, la transformation a toujours fait partie de
								mon ADN.
							</p>
							<p>
								Tel un Phœnix, j'ai appris que chaque fin porte
								en elle une renaissance. Mon parcours m'a guidée
								de la{" "}
								<strong className="text-foreground">
									psychologie à l'énergétique
								</strong>
								, du{" "}
								<strong className="text-foreground">
									coaching professionnel
								</strong>{" "}
								à l'astrologie symbolique.
							</p>
							<p>
								<strong className="text-foreground">
									Ce que j'ai vécu m'a façonnée : aujourd'hui,
									je transforme ces expériences en un espace
									sûr où vous pouvez vous déposer, vous
									comprendre et vous réinventer.
								</strong>
							</p>
						</div>

						<Link
							href="/emilie-perez"
							aria-label="Découvrir mon parcours complet"
						>
							<Button
								variant="elegant"
								size="lg"
								className="group/btn"
							>
								Découvrir mon histoire
								<ArrowRight className="w-4 h-4 ml-2 motion-safe:transition-transform group-hover/btn:translate-x-1" />
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default QuiSuisJeSection;
