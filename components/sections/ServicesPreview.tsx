"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";
import { useAnalyticsEvent } from "@/hooks/useAnalytics";
import {
	Star,
	Moon,
	Zap,
	Clock,
	MapPin,
	ArrowRight,
	Calendar,
	Sparkles,
} from "lucide-react";

const services = [
	{
		image: "/assets/seance-astro-zen.webp",
		icon: Star,
		title: "Consultation Astrologique",
		alt: "Symbole astrologique avec roue du zodiaque et livre ouvert",
		description:
			"Lecture de votre thème natal, transits et cycles de vie pour éclairer votre chemin.",
		price: "À partir de 70€",
		duration: "1h30 à 2h",
		format: "Présentiel ou distance",
		href: "/astrologie-toulouse",
		calendlyLink:
			"https://calendly.com/lylusio-fr/themenatal?month=2025-12",
	},
	{
		image: "/assets/seance-reiki-zen.webp",
		icon: Zap,
		title: "Séance Reiki",
		alt: "Symbole Reiki avec lotus et mains énergétiques",
		description:
			"Soin énergétique pour libérer les tensions et retrouver l'harmonie intérieure.",
		price: "60€ / séance",
		duration: "1h15 à 1h30",
		format: "Présentiel ou distance",
		href: "/reiki-toulouse",
		calendlyLink:
			"https://calendly.com/lylusio-fr/soin-energetique-reiki?month=2025-12",
	},
	{
		image: "/assets/seance-accompagnement.webp",
		icon: Moon,
		title: "Accompagnement",
		alt: "Symbole d'accompagnement avec spirale et couleurs douces",
		description:
			"Coaching personnalisé pour traverser vos transitions avec clarté et confiance.",
		price: "À partir de 75€",
		duration: "Variable",
		format: "Présentiel ou distance",
		href: "/accompagnement-toulouse",
		calendlyLink: "https://calendly.com/lylusio-fr",
	},
];

const ServicesPreview = () => {
	const { ref, isInView } = useInView({ threshold: 0.1 });
	const { trackServiceView, trackBookingClick } = useAnalyticsEvent();

	return (
		<section
			id="services-preview"
			ref={ref}
			className="py-20 md:py-28 lg:py-32 overflow-hidden relative bg-gradient-sky-center"
			aria-labelledby="services-title"
		>
			{/* Decorative abstract shapes with floating animation */}
			<div
				className="absolute inset-0 overflow-hidden pointer-events-none"
				aria-hidden="true"
			>
				<div className="absolute top-10 sm:top-20 -left-10 sm:-left-20 w-48 sm:w-64 h-48 sm:h-64 bg-accent/8 rounded-full blur-3xl animate-float" />
				<div className="absolute bottom-5 sm:bottom-10 -right-10 sm:-right-16 w-36 sm:w-48 h-36 sm:h-48 bg-gold/8 rounded-full blur-2xl animate-float-delayed" />
				<div className="absolute top-1/2 left-1/4 w-20 sm:w-32 h-20 sm:h-32 border border-accent/12 rounded-full opacity-40 animate-float-slow" />
				<div className="absolute bottom-1/3 right-1/3 w-14 sm:w-20 h-14 sm:h-20 border border-gold/12 rotate-45 opacity-30 animate-float-delayed" />
			</div>

			<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				{/* Header */}
				<header
					className={`text-center max-w-xl mx-auto mb-10 md:mb-16 transition-all duration-1000 ${
						isInView
							? "opacity-100 translate-y-0"
							: "opacity-0 translate-y-8"
					}`}
				>
					<p className="section-label">Services</p>
					<h2
						id="services-title"
						className="text-foreground mb-4 md:mb-6"
					>
						<span className="font-calligraphic text-accent text-4xl sm:text-5xl md:text-6xl inline-block align-baseline">
							U
						</span>
						n accompagnement sur mesure
					</h2>
					<p className="text-muted-foreground text-sm md:text-lg leading-relaxed">
						Chaque parcours est unique. Découvrez les différentes
						formes d'accompagnement que je propose.
					</p>
				</header>

				{/* Services Grid */}
				<div className="max-w-5xl mx-auto">
					<div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 mb-8 md:mb-10">
						{services.map((service, index) => {
							const IconComponent = service.icon;

							return (
								<article
									key={service.title}
									className={`group relative card-celestial hover:border-gold/40 transition-all duration-700 hover:-translate-y-2 hover:shadow-glow transform-gpu ${
										isInView
											? "opacity-100 translate-y-0"
											: "opacity-0 translate-y-12"
									}`}
									style={{
										transitionDelay: `${index * 150}ms`,
										willChange: "transform",
									}}
								>
									{/* Glow effect - outside overflow container */}
									<div className="absolute -inset-4 rounded-[2rem] md:rounded-[2.5rem] opacity-0 group-hover:opacity-100 bg-gradient-to-br from-gold/15 via-transparent to-accent/10 blur-2xl transition-opacity duration-700 pointer-events-none" />

									{/* Card inner container */}
									<div className="relative rounded-2xl md:rounded-3xl overflow-hidden">
										{/* Animated golden border on hover - using box-shadow inset */}
										<div
											className="absolute inset-0 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
											style={{
												boxShadow:
													"inset 0 0 0 2px hsl(var(--gold) / 0.3)",
											}}
										/>

										{/* Shadow on hover */}
										<div className="absolute inset-0 rounded-2xl md:rounded-3xl shadow-[0_16px_48px_-12px_hsl(var(--gold)/0.25)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

										{/* Image section */}
										<div className="relative h-36 sm:h-40 md:h-44 lg:h-48 overflow-hidden rounded-t-2xl md:rounded-t-3xl">
											<div className="absolute inset-0 overflow-hidden">
												<Image
													src={service.image}
													alt={service.alt}
													className="block object-cover transition-transform duration-700 ease-out group-hover:scale-105 transform-gpu"
													style={{
														transformOrigin:
															"center center",
														willChange: "transform",
														backfaceVisibility:
															"hidden",
														WebkitBackfaceVisibility:
															"hidden",
													}}
													fill
													sizes="(max-width: 768px) 100vw, 50vw"
													quality={85}
												/>
											</div>
											<div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent pointer-events-none" />

											{/* Icon badge */}
											<div
												className="absolute bottom-4 left-4 w-12 h-12 bg-card/90 backdrop-blur-sm rounded-xl border border-gold/30 flex items-center justify-center shadow-soft group-hover:scale-110 group-hover:border-gold/50 transition-all duration-500 transform-gpu"
												style={{
													willChange: "transform",
													backfaceVisibility:
														"hidden",
												}}
											>
												<IconComponent className="w-6 h-6 text-gold" />
											</div>
										</div>

										{/* Content section */}
										<div className="relative p-6 md:p-7 lg:p-8 pt-3 md:pt-4">
											<h3 className="font-display text-lg md:text-xl text-foreground mb-1.5 md:mb-2 group-hover:text-gold/90 transition-colors duration-500">
												{service.title}
											</h3>

											<p className="text-muted-foreground text-xs md:text-sm leading-relaxed mb-3 md:mb-4 line-clamp-2">
												{service.description}
											</p>

											{/* Meta info */}
											<div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
												<span className="inline-flex items-center gap-1 px-2 py-0.5 md:px-2.5 md:py-1 bg-gradient-sky-center/50 rounded-full text-[10px] md:text-xs text-muted-foreground">
													<Clock className="w-2.5 h-2.5 md:w-3 md:h-3" />
													{service.duration}
												</span>
												<span className="inline-flex items-center gap-1 px-2 py-0.5 md:px-2.5 md:py-1 bg-gradient-sky-center/50 rounded-full text-[10px] md:text-xs text-muted-foreground">
													<MapPin className="w-2.5 h-2.5 md:w-3 md:h-3" />
													{service.format}
												</span>
											</div>

											{/* Price */}
											<div className="text-gold font-display font-semibold text-lg mb-3 md:mb-4">
												{service.price}
											</div>

											{/* Actions */}
											<div className="flex gap-2 md:gap-3">
												<Link
													href={service.href}
													onClick={() =>
														trackServiceView(
															service.title
														)
													}
													className="flex-1"
												>
													<Button
														variant="elegant"
														size="sm"
														className="w-full group/btn text-xs md:text-sm h-8 md:h-9"
													>
														Découvrir
														<ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
													</Button>
												</Link>
												<Button
													variant="accent"
													size="sm"
													onClick={() => {
														trackBookingClick(
															service.title
														);
														window.open(
															service.calendlyLink,
															"_blank"
														);
													}}
													className="px-2.5 md:px-3 h-8 md:h-9"
													aria-label={`Réserver ${service.title}`}
												>
													<Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
												</Button>
											</div>
										</div>
									</div>
								</article>
							);
						})}
					</div>

					{/* Teaser Thérapie Holistique */}
					<Link
						href="/therapie-holistique"
						onClick={() => trackServiceView("Thérapie Holistique")}
					>
						<article
							className={`group relative card-celestial hover:border-gold/40 transition-all duration-700 hover:-translate-y-2 hover:shadow-glow transform-gpu overflow-hidden ${
								isInView
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-12"
							}`}
							style={{
								transitionDelay: "450ms",
							}}
						>
							{/* Glow effect */}
							<div className="absolute -inset-4 rounded-[2rem] md:rounded-[2.5rem] opacity-0 group-hover:opacity-100 bg-gradient-to-br from-gold/15 via-transparent to-accent/10 blur-2xl transition-opacity duration-700 pointer-events-none" />

							{/* Card inner container */}
							<div className="relative rounded-2xl md:rounded-3xl overflow-hidden">
								{/* Animated golden border on hover */}
								<div
									className="absolute inset-0 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
									style={{
										boxShadow:
											"inset 0 0 0 2px hsl(var(--gold) / 0.3)",
									}}
								/>

								{/* Shadow on hover */}
								<div className="absolute inset-0 rounded-2xl md:rounded-3xl shadow-[0_16px_48px_-12px_hsl(var(--gold)/0.25)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

								{/* Flex layout: horizontal on desktop, vertical on mobile */}
								<div className="flex flex-col md:flex-row items-center gap-6 p-6 md:p-8">
									{/* Image section */}
									<div className="relative w-full md:w-1/3 aspect-square md:aspect-auto md:h-48 overflow-hidden rounded-xl flex-shrink-0">
										<Image
											src="/assets/therapie-holistique-card.webp"
											alt=""
											fill
											className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 transform-gpu"
											sizes="(max-width: 768px) 100vw, 300px"
											quality={85}
											aria-hidden="true"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-card/40 via-transparent to-transparent pointer-events-none" />
									</div>

									{/* Content section */}
									<div className="flex-1 text-center md:text-left space-y-4">
										<div className="flex items-center justify-center md:justify-start gap-2">
											<Sparkles className="w-5 h-5 text-gold" />
											<h3 className="font-display text-xl md:text-2xl text-foreground group-hover:text-gold/90 transition-colors duration-500">
												Thérapie Holistique
											</h3>
										</div>

										<p className="text-muted-foreground text-sm md:text-base leading-relaxed">
											Approche globale combinant Reiki,
											astrologie et accompagnement
											personnalisé pour un bien-être
											corps-esprit profond.
										</p>

										<div className="flex items-center justify-center md:justify-start">
											<Button
												variant="elegant"
												size="sm"
												className="group/btn"
												asChild
											>
												<span className="inline-flex items-center">
													En savoir plus
													<ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
												</span>
											</Button>
										</div>
									</div>
								</div>
							</div>
						</article>
					</Link>

					{/* CTA */}
					<div
						className={`text-center mt-10 md:mt-14 transition-all duration-1000 delay-600 ${
							isInView
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-8"
						}`}
					>
						<Link
							href="/accompagnement-toulouse"
							aria-label="Voir tous les services proposés"
						>
							<Button
								variant="elegant"
								size="lg"
								className="w-full sm:w-auto group/btn"
							>
								Voir tous les tarifs
								<ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ServicesPreview;
