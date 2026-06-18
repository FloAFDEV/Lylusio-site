"use client";

import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";
import { useParallax } from "@/hooks/useParallax";
import Link from "next/link";
import Image from "next/image";
import { Quote } from "lucide-react";
import GoldenPlantBadge from "@/components/GoldenPlantBadge";

const ApprochSection = () => {
	const { ref, isInView } = useInView({ threshold: 0.1 });
	const parallaxOffset = useParallax(0.08);

	return (
		<section
			id="approche"
			ref={ref}
			className="relative overflow-hidden min-h-[700px] md:min-h-[750px] py-16 md:py-24 lg:py-32 scroll-mt-20"
			style={{
				background:
					"linear-gradient(180deg, hsl(225 33% 97%) 0%, hsl(210 50% 96%) 30%, hsl(32 100% 97%) 100%)",
			}}
			aria-labelledby="approche-title"
		>
			{/* Image d'arrière-plan avec parallax - Responsive avec srcSet */}
			<div className="absolute inset-0 lg:w-1/2" aria-hidden="true">
				<div className="relative w-full h-[110%] -mt-[5%] overflow-hidden">
					{/* Version mobile optimisée - background décoratif sous overlay */}
					<Image
						src="/assets/approche-arbre-mobile.webp"
						alt=""
						fill
						quality={65}
						sizes="(max-width: 1024px) 100vw, 50vw"
						className="object-cover lg:hidden"
						loading="lazy"
						aria-hidden="true"
						style={{
							transform: `translate3d(0, ${parallaxOffset}px, 0)`,
							willChange: "transform",
						}}
					/>
					<Image
						src="/assets/approche-arbre.webp"
						alt=""
						fill
						quality={75}
						sizes="(max-width: 1024px) 0vw, 50vw"
						className="hidden lg:block object-cover"
						loading="lazy"
						aria-hidden="true"
						style={{
							transform: `translate3d(0, ${parallaxOffset}px, 0)`,
							willChange: "transform",
						}}
					/>
				</div>

				{/* Gradient overlays */}
				<div className="absolute inset-0 bg-gradient-to-r from-background/40 via-background/70 to-background lg:from-transparent lg:via-background/40 lg:to-background" />
				<div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/30 lg:from-background/80 lg:via-transparent lg:to-transparent" />
			</div>

			{/* Decorative floating shapes */}
			<div
				className="absolute inset-0 overflow-hidden pointer-events-none"
				aria-hidden="true"
			>
				<div className="absolute top-10 right-10 w-24 h-24 border border-gold rounded-full opacity-30 animate-float" />
				<GoldenPlantBadge
					size="lg"
					className="absolute top-20 right-8 lg:right-1/4 opacity-50"
				/>
			</div>

			{/* Main Content */}
			<div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center min-h-[450px] md:min-h-[500px] lg:min-h-[550px]">
					<div className="hidden lg:block lg:w-[45%]" />

					<article className="w-full lg:w-[55%]">
						<div
							className="sm:bg-opacity-93 lg:bg-opacity-90 backdrop-blur-lg rounded-2xl lg:rounded-3xl p-6 sm:p-8 md:p-10 shadow-medium border border-border/40 lg:border-border/30 hover:border-gold/30 motion-safe:transition-all duration-500"
							style={{
								backgroundColor: "rgba(255, 252, 251, 0.95)",
							}}
						>
							<p
								className={`section-label text-left opacity-0 animate-fade-in-up delay-100 ${
									isInView ? "" : "!opacity-0"
								}`}
							>
								Ma philosophie
							</p>

							<h2
								id="approche-title"
								className={`text-foreground mb-5 md:mb-6 text-left text-2xl sm:text-3xl md:text-4xl opacity-0 animate-fade-in-up delay-200 ${
									isInView ? "" : "!opacity-0"
								}`}
							>
								<span className="font-calligraphic text-accent text-3xl sm:text-4xl md:text-5xl inline-block align-baseline">
									M
								</span>
								on approche
							</h2>

							<div
								className={`space-y-4 mb-8 opacity-0 animate-fade-in-up delay-300 ${
									isInView ? "" : "!opacity-0"
								}`}
							>
								<div className="space-y-5 text-foreground/90 font-body leading-relaxed max-w-prose mx-auto lg:mx-0">
									<p>
										Mon approche est née de ce que j'ai
										moi-même traversé. Elle mêle{" "}
										<span className="font-semibold">
											astrologie symbolique et
											psychologique
										</span>
										,{" "}
										<span className="font-semibold">
											thérapie énergétique Reiki
										</span>{" "}
										et{" "}
										<span className="font-semibold">
											écoute profonde
										</span>
										.
									</p>

									<p>
										Mon intention est simple : offrir un
										espace où l'on peut déposer ce que l'on
										vit sans peur du jugement, pour se
										comprendre autrement et retrouver du
										sens à ce que l'on traverse.
									</p>

									<p className="text-primary font-medium">
										Je ne promets pas de miracles.
									</p>

									<blockquote className="relative py-5 my-8 border-l-2 border-accent/40 pl-5">
										<Quote className="absolute -top-2 -left-3 w-6 h-6 text-accent/30" />
										<p className="font-display text-lg sm:text-xl md:text-2xl italic text-foreground/90 text-left">
											"On ne se change pas, on s'ajuste à
											ce qui est déjà là."
										</p>
									</blockquote>

									<p>
										Je crée des espaces où la parole devient
										action, où la compréhension ouvre sur le
										mouvement et où la lucidité mène vers
										l'apaisement. Parce que la lucidité sur
										soi-même et sur son parcours, c'est pour
										moi le début de la liberté. Et que
										chaque étape de vie, même les plus
										inconfortables, peut devenir un tremplin
										pour la suite.
									</p>

									<p className="text-lg font-medium text-primary">
										"La vérité, quand elle est dite avec
										justesse, ouvre toutes les portes."
									</p>
								</div>
							</div>

							{/* CTA */}
							<div
								className={`flex flex-wrap gap-3 text-left opacity-0 animate-fade-in-up delay-400 ${
									isInView ? "" : "!opacity-0"
								}`}
							>
								<Link
									href="/approche-therapeutique"
									aria-label="Découvrir mon approche thérapeutique"
								>
									<Button
										variant="elegant"
										size="lg"
										className="w-full sm:w-auto"
									>
										Découvrir mon approche
									</Button>
								</Link>
							</div>
						</div>
					</article>
				</div>
			</div>
		</section>
	);
};

export default ApprochSection;
