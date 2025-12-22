import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";
import { useParallax } from "@/hooks/useParallax";
import { Link } from "react-router-dom";
import GoldenPlantBadge from "@/components/GoldenPlantBadge";
import approcheArbre from "@/assets/approche-arbre.webp";

const ApprochSection = () => {
	const { ref, isInView } = useInView({ threshold: 0.1 });
	const parallaxOffset = useParallax(0.08);

	return (
		<section
			id="approche"
			className="relative overflow-hidden min-h-[600px] md:min-h-[700px] bg-gradient-to-br from-sand/30 via-cream/50 to-background"
			aria-labelledby="approche-title"
			ref={ref}
		>
			{/* Background image with parallax */}
			<div className="absolute inset-0 lg:w-1/2" aria-hidden="true">
				<div className="relative w-full h-[110%] -mt-[5%] overflow-hidden">
					<img
						src={approcheArbre}
						alt=""
						className="w-full h-full object-cover"
						style={{
							transform: `translate3d(0, ${parallaxOffset}px, 0)`,
						}}
						loading="lazy"
						decoding="async"
					/>
				</div>
				{/* Gradient overlay - stronger for better card visibility */}
				<div className="absolute inset-0 bg-gradient-to-r from-background/30 via-background/60 to-background lg:from-transparent lg:via-background/30 lg:to-background" />
				<div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20 lg:from-background/70 lg:via-transparent lg:to-transparent" />
			</div>

			{/* Decorative shapes with floating animation */}
			<div
				className="absolute inset-0 overflow-hidden pointer-events-none"
				aria-hidden="true"
			>
				<div className="absolute top-10 right-10 w-24 h-24 border border-gold/10 rounded-full opacity-30 animate-float" />
				<div className="absolute bottom-20 right-1/4 w-16 h-16 border border-accent/10 rotate-12 opacity-25 animate-float-delayed" />
				{/* Golden plant badge decoration */}
				<GoldenPlantBadge
					size="lg"
					className="absolute top-20 right-8 lg:right-1/4 opacity-50"
				/>
			</div>

			{/* Content container */}
			<div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
				<div className="flex items-center min-h-[400px] md:min-h-[500px]">
					{/* Spacer for image on desktop */}
					<div className="hidden lg:block lg:w-[45%]" />

					{/* Content card - more opaque for better readability */}
					<article
						className={`w-full lg:w-[55%] transition-all duration-1000 delay-150 ${
							isInView
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-12"
						}`}
					>
						<div className="bg-background/90 sm:bg-background/85 lg:bg-background/80 backdrop-blur-lg rounded-2xl lg:rounded-3xl p-6 sm:p-8 md:p-10 shadow-medium border border-border/30 lg:border-border/20">
							<p className="section-label text-left">
								Ma philosophie
							</p>

							<h2
								id="approche-title"
								className="text-foreground mb-5 md:mb-6 text-left text-2xl sm:text-3xl md:text-4xl"
							>
								<span className="font-calligraphic text-accent text-3xl sm:text-4xl md:text-5xl inline-block align-baseline">
									M
								</span>
								on approche
							</h2>

							<div className="space-y-4 text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed mb-6 text-left">
								<p>
									<span className="font-calligraphic text-accent text-xl sm:text-2xl md:text-3xl inline-block align-baseline mr-1">
										J
									</span>
									'accompagne les{" "}
									<strong className="text-foreground">
										femmes
									</strong>{" "}
									dans leurs périodes de transition et de
									transformation intérieure. Celles qui
									sentent que quelque chose doit évoluer mais
									qui ne savent plus par où commencer.
								</p>
								<p>
									Mon approche est née de ce que j'ai moi-même
									traversé. Elle mêle{" "}
									<Link
										to="/astrologie-toulouse"
										className="text-foreground font-medium hover:text-accent transition-colors"
									>
										astrologie symbolique et psychologique
									</Link>
									,{" "}
									<Link
										to="/reiki-toulouse"
										className="text-foreground font-medium hover:text-accent transition-colors"
									>
										thérapie énergétique Reiki
									</Link>{" "}
									et{" "}
									<strong className="text-foreground font-medium">
										écoute profonde
									</strong>
									.
								</p>
								<p>
									Mon intention : offrir un espace où l'on
									peut déposer ce que l'on vit sans peur du
									jugement, pour se comprendre autrement et
									retrouver du sens.
								</p>
							</div>

							{/* Quote */}
							<blockquote className="relative py-4 md:py-5 my-5 md:my-6 border-l-2 border-accent/40 pl-4 md:pl-5">
								<p className="font-display text-base sm:text-lg md:text-xl italic text-foreground/85 text-left">
									"On ne se change pas, on s'ajuste à ce qui
									est déjà là."
								</p>
							</blockquote>

							<p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed mb-6 text-left">
								<strong className="text-foreground">
									La vérité, quand elle est dite avec
									justesse, ouvre toutes les portes.
								</strong>
							</p>

							<div className="flex flex-wrap gap-3 text-left">
								<Link
									to="/approche-therapeutique"
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
								<Link
									to="/emilie-perez"
									aria-label="En savoir plus sur mon parcours"
								>
									<Button
										variant="outline"
										size="lg"
										className="w-full sm:w-auto border-border/50"
									>
										Qui suis-je
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
