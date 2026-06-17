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
			className="py-16 md:py-24 overflow-hidden bg-gradient-cream-to-bg"
			aria-labelledby="qui-suis-je-title"
		>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16">
					{/* Image */}
					<div
						className={`relative opacity-0 animate-fade-in-left delay-100 ${
							isInView ? "" : "!opacity-0"
						}`}
					>
						<div className="relative w-40 h-40 md:w-52 md:h-52 lg:w-56 lg:h-56 flex-shrink-0">
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
									sizes="(max-width: 768px) 160px, (max-width: 1024px) 208px, 224px"
									className="object-cover"
									quality={50}
									loading="lazy"
								/>
							</div>
						</div>
					</div>

					{/* Content */}
					<div
						className={`flex-1 text-center md:text-left opacity-0 animate-fade-in-right delay-200 ${
							isInView ? "" : "!opacity-0"
						}`}
					>
						<p className="section-label mb-2">Qui suis-je</p>

						<h2
							id="qui-suis-je-title"
							className="font-display text-2xl sm:text-3xl lg:text-4xl text-foreground mb-4"
						>
							<span className="font-calligraphic text-gold">
								J
							</span>
							e suis{" "}
							<span className="font-calligraphic text-gold">
								Émilie
							</span>
						</h2>

						<div className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed mb-8 text-left">
							<p>
								<span className="font-calligraphic text-accent text-2xl md:text-3xl inline-block align-baseline">
									E
								</span>
								t pour me définir je dirais que je suis avant
								tout une communicante passionnée, profondément
								curieuse de l'humain et de ses infinies
								complexités.
							</p>

							<p>
								Née sous le signe des <strong>Gémeaux</strong>{" "}
								avec le{" "}
								<strong>
									Soleil et Mercure conjoint à Chiron
								</strong>{" "}
								en Maison 8 et un{" "}
								<strong>
									ascendant Scorpion conjoint à Pluton
								</strong>
								… tel un Phœnix la notion de transformation et
								de résilience a toujours fait partie de ma vie
								du plus loin que je m'en souvienne.
							</p>

							<p>
								Comme si je devais expérimenter toujours dans
								une profondeur totale chacune des parties de ma
								vie.
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
								Lire mon histoire
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
