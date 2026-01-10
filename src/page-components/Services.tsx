"use client";

import Link from "next/link";
import Image from "next/image";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ArrowRight, Star, Heart, Compass } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { useParallax } from "@/hooks/useParallax";

const services = [
	{
		id: "astrologie",
		icon: Star,
		image: "/assets/seance-astro.webp",
		imageAlt: "Symbole astrologique avec roue du zodiaque",
		title: "Astrologie",
		subtitle: "Consultation Thème Natal & Transits",
		description:
			"Découvrez ce qui vous lie aux étoiles. Lecture approfondie de votre thème natal pour éclairer votre chemin de vie, comprendre vos cycles et accueillir vos transformations.",
		price: "À partir de 60€",
		href: "/astrologie-toulouse",
	},
	{
		id: "reiki",
		icon: Heart,
		image: "/assets/seance-reiki.webp",
		imageAlt: "Symbole Reiki avec lotus et mains énergétiques",
		title: "Thérapie Énergétique",
		subtitle: "Séances de Reiki",
		description:
			"Soin énergétique doux pour libérer les tensions, apaiser le mental et retrouver votre équilibre intérieur. Une pause régénérante pour votre être.",
		price: "À partir de 50€",
		href: "/reiki-toulouse",
	},
	{
		id: "accompagnement",
		icon: Compass,
		image: "/assets/seance-accompagnement.webp",
		imageAlt: "Symbole d'accompagnement avec spirale et couleurs douces",
		title: "Accompagnement",
		subtitle: "Transitions & Évolution",
		description:
			"Accompagnement personnalisé pour traverser vos transitions professionnelles et personnelles avec clarté, douceur et confiance en vous.",
		price: "Sur mesure",
		href: "/accompagnement-toulouse",
	},
];

const Services = () => {
	const { ref: heroRef, isInView: heroInView } = useInView({
		threshold: 0.1,
	});
	const { ref: servicesRef, isInView: servicesInView } = useInView({
		threshold: 0.1,
	});
	const parallaxOffset = useParallax(0.1);

	const structuredData = {
		"@context": "https://schema.org",
		"@type": "ItemList",
		itemListElement: services.map((service, index) => ({
			"@type": "ListItem",
			position: index + 1,
			item: {
				"@type": "Service",
				name: service.title,
				description: service.description,
				provider: {
					"@type": "LocalBusiness",
					name: "Lylusio - Émilie Perez",
				},
				areaServed: "Toulouse",
			},
		})),
	};

	return (
		<>
			{/* SEO metadata handled by Next.js Metadata API */}

			<div className="min-h-screen bg-background relative">
				<a href="#main-content" className="skip-link">
					Aller au contenu principal
				</a>
				<Header />
				<Breadcrumbs />

				{/* Decorative shapes */}
				<div
					className="absolute inset-0 pointer-events-none overflow-hidden"
					aria-hidden="true"
				>
					<div
						className="absolute top-32 -right-20 w-64 h-64 bg-accent/6 rounded-full blur-3xl"
						style={{ transform: `translateY(${parallaxOffset}px)` }}
					/>
					<div
						className="absolute bottom-1/3 -left-20 w-48 h-48 bg-gold/8 rounded-full blur-3xl"
						style={{
							transform: `translateY(${-parallaxOffset * 0.5}px)`,
						}}
					/>
				</div>

				<main
					id="main-content"
					className="pt-20 sm:pt-24 md:pt-28 pb-16 md:pb-20 relative z-10"
				>
					{/* Hero */}
					<section
						ref={heroRef}
						className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-16"
						aria-labelledby="services-title"
					>
						<div
							className={`max-w-3xl mx-auto text-center transition-all duration-700 ${
								heroInView
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-8"
							}`}
						>
							<p className="section-label">Services</p>
							<h1
								id="services-title"
								className="text-foreground mb-6 md:mb-8 text-center"
							>
								<span className="font-calligraphic text-accent inline-block align-baseline  ">
									C
								</span>
								onsultations
							</h1>

							<p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
								Chaque accompagnement est pensé pour répondre à
								vos besoins spécifiques. Que vous cherchiez à
								comprendre vos cycles, à vous apaiser ou à
								traverser une transition, je vous propose un
								espace de confiance et de bienveillance.
							</p>
							<p className="text-sm text-muted-foreground/80 mt-4">
								Découvrez{" "}
								<Link
									href="/approche-therapeutique"
									className="text-accent hover:underline"
								>
									mon approche thérapeutique
								</Link>{" "}
								pour mieux comprendre ma philosophie
								d'accompagnement. Une question ? Consultez la{" "}
								<Link
									href="/faq"
									className="text-accent hover:underline"
								>
									FAQ
								</Link>
								.
							</p>
						</div>
					</section>

					{/* Services Grid */}
					<section
						ref={servicesRef}
						className="container mx-auto px-4 sm:px-6 lg:px-8"
					>
						<div className="grid md:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto">
							{services.map((service, index) => (
								<Link
									key={service.id}
									href={service.href}
									className={`group block transition-all duration-700 ${
										servicesInView
											? "opacity-100 translate-y-0"
											: "opacity-0 translate-y-12"
									}`}
									style={{
										transitionDelay: `${index * 150}ms`,
									}}
								>
									<article className="relative h-full group transform-gpu">
										{/* Glow derrière la carte */}
										<div className="absolute -inset-4 rounded-[2.5rem] opacity-0 group-hover:opacity-100 bg-gradient-to-br from-gold/20 via-gold/10 to-accent/10 blur-2xl transition-all duration-700 pointer-events-none" />

										{/* Carte principale */}
										<div className="relative bg-gradient-to-b from-card/90 to-card/60 backdrop-blur-md rounded-[2rem] overflow-hidden border border-border/20 shadow-soft group-hover:border-gold/40 group-hover:shadow-[0_20px_50px_-15px_hsl(var(--gold)/0.25)] group-hover:-translate-y-3 transition-all duration-500">
											{/* Image Header */}
											<div className="relative pt-8 pb-4 px-6 flex justify-center">
												<div className="relative">
													<div className="relative w-24 h-24 lg:w-28 lg:h-28 rounded-[2rem] overflow-hidden border-2 border-gold/25 shadow-elegant transition-all duration-500 rotate-3 group-hover:scale-105 group-hover:border-gold/50 group-hover:shadow-[0_8px_30px_-8px_hsl(var(--gold)/0.4)] group-hover:rotate-0">
														<Image
															src={service.image}
															alt={
																service.imageAlt
															}
															fill
															className="object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
														/>
													</div>
													{/* Icon badge */}
													<div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-background border-2 border-gold/30 shadow-soft flex items-center justify-center transition-all duration-300 group-hover:bg-accent/10 group-hover:border-gold/50">
														<service.icon className="w-4 h-4 text-accent" />
													</div>
												</div>
											</div>

											{/* Content */}
											<div className="px-6 lg:px-8 pb-6 lg:pb-8 text-center">
												<h2 className="font-display text-xl lg:text-2xl text-foreground mb-1 transition-colors duration-300">
													{service.title}
												</h2>
												<p className="text-xs uppercase tracking-widest text-gold/80 mb-4 font-medium">
													{service.subtitle}
												</p>
												<p className="text-muted-foreground text-sm leading-relaxed mb-6">
													{service.description}
												</p>

												{/* Footer */}
												<div className="pt-5 border-t border-gold/15">
													<div className="flex items-center justify-center gap-4">
														<p className="font-display text-lg text-gold">
															{service.price}
														</p>
														<span className="w-px h-4 bg-border/50" />
														<span className="text-sm text-muted-foreground flex items-center gap-1.5">
															Découvrir
															<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
														</span>
													</div>
												</div>
											</div>
										</div>
									</article>
								</Link>
							))}
						</div>
					</section>
				</main>

				<Footer />
			</div>
		</>
	);
};

export default Services;
