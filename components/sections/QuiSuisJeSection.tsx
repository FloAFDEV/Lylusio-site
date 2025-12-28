"use client";

import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const QuiSuisJeSection = () => {
	const { ref, isInView } = useInView({ threshold: 0.1 });

	return (
		<section
			ref={ref}
			className="py-20 md:py-28 bg-gradient-to-b from-background via-cream/20 to-background overflow-hidden"
			aria-labelledby="qui-suis-je-title"
		>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center max-w-6xl mx-auto">
					{/* Image - Left on desktop */}
					<div
						className={`relative order-2 lg:order-1 transition-all duration-1000 ${
							isInView
								? "opacity-100 translate-x-0"
								: "opacity-0 -translate-x-12"
						}`}
					>
						<div className="relative aspect-square max-w-xs mx-auto lg:mx-0">
							{/* Decorative gradient blur */}
							<div
								className="absolute -inset-4 bg-gradient-to-br from-accent/20 to-gold/20 rounded-full blur-2xl"
								aria-hidden="true"
							/>

							<Image
								src="/assets/emilie-about.webp"
								alt="Émilie Perez, thérapeute en astrologie et Reiki à Toulouse"
								fill
								className="object-cover rounded-full shadow-lg"
								quality={85}
							/>

							{/* Decorative ring accent */}
							<div
								className="absolute -inset-3 border-2 border-accent/20 rounded-full"
								aria-hidden="true"
							/>
						</div>
					</div>

					{/* Content - Right on desktop */}
					<div
						className={`order-1 lg:order-2 transition-all duration-1000 delay-200 ${
							isInView
								? "opacity-100 translate-x-0"
								: "opacity-0 translate-x-12"
						}`}
					>
						<p className="section-label text-left">À propos</p>

						<h2
							id="qui-suis-je-title"
							className="text-foreground mb-6 text-left text-2xl sm:text-3xl md:text-4xl"
						>
							<span className="font-calligraphic text-accent text-3xl sm:text-4xl md:text-5xl inline-block align-baseline">
								Q
							</span>
							ui suis-je
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
								<ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default QuiSuisJeSection;
