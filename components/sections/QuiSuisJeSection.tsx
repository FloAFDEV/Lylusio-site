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
									src="/assets/emilie-enfant.webp"
									alt="Émilie enfant - une petite fille rigoureuse et observatrice"
									fill
									sizes="(max-width: 768px) 160px, (max-width: 1024px) 208px, 224px"
									className="object-cover object-top"
									quality={85}
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
								nfant, j'observais tout : les silences, les
								regards, les mots qu'on n'osait pas dire. Très
								tôt, j'ai appris à tenir bon et à taire ce que
								je ressentais.
							</p>

							<p>
								Puis, à mes 13 ans, la vie s'est chargée de venir
								tout bousculer. Alors pendant des années, j'ai
								mis des pansements et j'ai performé, jusqu'au
								jour où je n'ai plus réussi à me mentir.
								J'avais besoin de{" "}
								<strong>vérité, d'alignement et de sens</strong>
								.
							</p>

							<p>
								Ce tournant m'a menée vers{" "}
								<strong>l'astrologie humaniste</strong> et le{" "}
								<strong>Reiki</strong>, après plus de dix ans
								passés à accompagner des personnes en insertion
								et en création d'entreprise. Aujourd'hui, je
								n'accompagne pas de l'extérieur mais avec tout
								ce que j'ai traversé. C’est ma manière d'être à
								vos côtés :{" "}
								<strong>
									sans jugement, sans faux-semblants, sans
									promesse de miracle
								</strong>
								.
							</p>

							<p>
								(Mon thème natal, avec Chiron et Pluton bien en
								vue, avait de quoi me prévenir 😉)
							</p>

							<p className="italic text-sm md:text-base">
								Oui, je suis Gémeaux ascendant Scorpion avec
								Pluton collé à l'ascendant. Ça explique pas mal
								de choses : le goût de la vérité, et une vie qui
								ne fait rien à moitié.
							</p>
						</div>

						<Link
							href="/emilie-perez"
							aria-label="Découvrir mon histoire"
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
