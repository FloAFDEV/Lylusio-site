import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import GoldenPlantBadge from "@/components/GoldenPlantBadge";
import FloatingParticles from "@/components/FloatingParticles";
import { Button } from "@/components/ui/button";
import {
	ArrowRight,
	Heart,
	Sparkles,
	Eye,
	Leaf,
	Quote,
	Shield,
	Key,
	Target,
} from "lucide-react";
import approcheArbre from "@/assets/approche-arbre.webp";
import approcheLunettes from "@/assets/approche-lunettes.webp";
import mainTendue from "@/assets/main-tendue.webp";
import youAreImportant from "@/assets/you-are-important.webp";
import { useParallax } from "@/hooks/useParallax";
import { useInView } from "@/hooks/useInView";

const MonApproche = () => {
	const parallaxOffset = useParallax(0.12);
	const parallaxOffsetSlow = useParallax(0.06);
	const { ref: heroRef, isInView: heroInView } = useInView({
		threshold: 0.1,
	});
	const { ref: pillarsRef, isInView: pillarsInView } = useInView({
		threshold: 0.1,
	});
	const { ref: quoteRef, isInView: quoteInView } = useInView({
		threshold: 0.2,
	});
	const { ref: deontologyRef, isInView: deontologyInView } = useInView({
		threshold: 0.1,
	});
	const { ref: objectivesRef, isInView: objectivesInView } = useInView({
		threshold: 0.1,
	});
	const { ref: ctaRef, isInView: ctaInView } = useInView({ threshold: 0.2 });

	const structuredData = {
		"@context": "https://schema.org",
		"@type": "WebPage",
		"@id": "https://lylusio.fr/approche-therapeutique#page",
		name: "Mon Approche Thérapeutique - Astrologie & Reiki Toulouse Cépet",
		description:
			"Approche thérapeutique unique mêlant astrologie symbolique et psychologique, Reiki Usui et accompagnement émotionnel à Toulouse et Cépet. Pour les femmes en transition de vie.",
		url: "https://lylusio.fr/approche-therapeutique",
		isPartOf: {
			"@id": "https://lylusio.fr/#website",
		},
		about: {
			"@type": "Thing",
			name: "Accompagnement thérapeutique holistique",
		},
		mentions: [
			{ "@type": "Thing", name: "Astrologie symbolique" },
			{ "@type": "Thing", name: "Reiki Usui" },
			{ "@type": "Thing", name: "Développement personnel" },
		],
	};

	const pillars = [
		{
			icon: Heart,
			title: "Écoute Bienveillante",
			description:
				"Un espace sans jugement pour déposer ce que vous vivez, où chaque mot a sa place.",
		},
		{
			icon: Eye,
			title: "Lucidité",
			description:
				"Comprendre vos schémas pour mieux vous en libérer. La clarté comme premier pas vers la liberté.",
		},
		{
			icon: Sparkles,
			title: "Transformation",
			description:
				"Chaque étape de vie, même les plus inconfortables, peut devenir un tremplin pour la suite.",
		},
		{
			icon: Leaf,
			title: "Authenticité",
			description:
				"Du vrai, du concret et du lien. Pas de blabla, pas de faux-semblants.",
		},
	];

	const objectives = [
		{
			icon: Key,
			title: "Apprendre à se connaître",
			description: "Pour s'affirmer sans attendre l'explosion",
		},
		{
			icon: Heart,
			title: "Exprimer ses émotions",
			description:
				"Ressentis, besoins, difficultés, envies : mettre en avant ses propres valeurs",
		},
		{
			icon: Target,
			title: "Être cohérente dans ses actes",
			description:
				"Assumer SES responsabilités. C'est accepter de ne plus se positionner en victime",
		},
		{
			icon: Sparkles,
			title: "Croire en ses capacités",
			description: "D'évolution et de réussite",
		},
	];

	const deontologyItems = [
		"Je ne suis pas magicienne, ni médium, ni voyante. Je ne promets rien, je ne prédis pas l'avenir. VOUS avez votre libre arbitre.",
		"Je suis tenue au secret professionnel. Je ne rends compte d'un accompagnement qu'à la personne concernée, et non à une tierce personne.",
		"J'ai le recul nécessaire pour ne pas projeter sur vous des problèmes non résolus de ma vie personnelle. Je n'utilise l'astrologie que dans la compréhension de votre parcours.",
		"Ça ne m'intéresse pas de faire du « vite fait bien fait ». Je crois qu'il faut se laisser le temps de se comprendre et de laisser du temps au corps pour guérir.",
		"En cas de besoins spécifiques qui dépassent mon champ de compétence, je vous oriente vers d'autres professionnels.",
	];

	return (
		<>
			<Helmet>
				<title>
					Approche Thérapeutique Toulouse Cépet | Astrologie & Reiki –
					Lylusio
				</title>
				<meta
					name="description"
					content="Approche thérapeutique unique à Toulouse et Cépet (31). Astrologie symbolique, Reiki Usui et écoute profonde pour accompagner les femmes dans leurs transitions de vie. Émilie Perez."
				/>
				<meta
					name="robots"
					content="index, follow, max-image-preview:large"
				/>
				<link
					rel="canonical"
					href="https://lylusio.fr/approche-therapeutique"
				/>
				<meta
					property="og:title"
					content="Approche Thérapeutique Toulouse Cépet | Lylusio"
				/>
				<meta
					property="og:description"
					content="Astrologie symbolique, Reiki et accompagnement émotionnel pour traverser vos transitions de vie avec lucidité."
				/>
				<meta
					property="og:url"
					content="https://lylusio.fr/approche-therapeutique"
				/>
				<meta property="og:type" content="website" />
				<meta
					property="og:image"
					content="https://lylusio.fr/og-image.jpg"
				/>
				<meta name="geo.region" content="FR-31" />
				<meta name="geo.placename" content="Toulouse, Cépet" />
				<script type="application/ld+json">
					{JSON.stringify(structuredData)}
				</script>
			</Helmet>

			<Header />
			<main
				id="main-content"
				className="min-h-screen bg-background relative overflow-hidden"
			>
				{/* Floating Particles for mystical atmosphere */}
				<FloatingParticles count={15} />

				<Breadcrumbs />

				{/* Hero Section with Parallax Background - Continuity from ApprochSection */}
				<section
					ref={heroRef}
					className="relative min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] flex items-center overflow-hidden"
				>
					{/* Background image with parallax */}
					<div className="absolute inset-0" aria-hidden="true">
						<div className="relative w-full h-[110%] -mt-[5%] overflow-hidden">
							<img
								src={approcheArbre}
								alt=""
								className="w-full h-full object-cover"
								style={{
									transform: `translate3d(0, ${parallaxOffset}px, 0)`,
								}}
								loading="eager"
							/>
						</div>
						{/* Gradient overlays for readability */}
						<div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
						<div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
						{/* Badge positioned on the image - smaller on mobile */}
						<GoldenPlantBadge
							size="md"
							className="absolute bottom-8 right-4 sm:bottom-12 sm:right-12 md:bottom-16 md:right-16 z-10 opacity-70 sm:opacity-90"
						/>
					</div>

					{/* Enhanced decorative elements with parallax - hidden on mobile for performance */}
					<div
						className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block"
						aria-hidden="true"
					>
						<div
							className="absolute top-20 right-10 w-24 md:w-32 h-24 md:h-32 border border-gold/10 rounded-full opacity-30 animate-float"
							style={{
								transform: `translateY(${
									parallaxOffsetSlow * 0.8
								}px)`,
							}}
						/>
						<div
							className="absolute bottom-32 left-1/4 w-16 md:w-20 h-16 md:h-20 border border-accent/10 rotate-12 opacity-25 animate-float-delayed"
							style={{
								transform: `translateY(${
									-parallaxOffsetSlow * 0.5
								}px)`,
							}}
						/>
						<div
							className="absolute top-1/3 left-10 w-32 md:w-48 h-32 md:h-48 bg-accent/5 rounded-full blur-3xl"
							style={{
								transform: `translateY(${
									parallaxOffset * 0.6
								}px)`,
							}}
						/>
						<div
							className="absolute bottom-1/4 right-1/4 w-48 md:w-64 h-48 md:h-64 bg-gold/5 rounded-full blur-3xl"
							style={{
								transform: `translateY(${
									-parallaxOffset * 0.4
								}px)`,
							}}
						/>
					</div>

					{/* Content */}
					<div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-24">
						<div
							className={`max-w-2xl transition-all duration-1000 delay-150 ${
								heroInView
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-12"
							}`}
						>
							<p className="section-label text-left">
								Ma philosophie
							</p>

							<h1 className="text-foreground mb-4 sm:mb-6 text-left text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight">
								<span className="font-calligraphic text-accent inline-block align-baseline  ">
									M
								</span>
								on Approche
							</h1>

							<div className="space-y-5 text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed mb-8 text-left">
								<p>
									<span className="font-calligraphic text-accent inline-block align-baseline  ">
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
									<strong className="text-foreground">
										{" "}
										Celles qui veulent du sens, du concret
										et de la cohérence.
									</strong>
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
							</div>

							{/* Signature quote - continuity with ApprochSection */}
							<blockquote className="relative py-5 my-8 border-l-2 border-accent/40 pl-5">
								<Quote className="absolute -top-2 -left-3 w-6 h-6 text-accent/30" />
								<p className="font-display text-lg sm:text-xl md:text-2xl italic text-foreground/90 text-left">
									"On ne se change pas, on s'ajuste à ce qui
									est déjà là."
								</p>
							</blockquote>

							<div className="flex flex-wrap gap-4">
								<Link to="/therapie-energetique">
									<Button variant="elegant" size="lg">
										Découvrir mes prestations
										<ArrowRight className="ml-2 w-4 h-4" />
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</section>

				{/* Philosophy Section with Pillars */}
				<section
					ref={pillarsRef}
					className="relative py-20 md:py-28 bg-sand/30"
				>
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<div
							className={`max-w-3xl mx-auto text-center mb-14 transition-all duration-700 ${
								pillarsInView
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-8"
							}`}
						>
							<p className="section-label text-xl">
								Les fondements
							</p>
							<h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-navy mb-6">
								Mes Piliers
							</h2>
							<p className="text-lg text-muted-foreground leading-relaxed">
								Je crée des espaces où la parole devient action,
								où la compréhension ouvre sur le mouvement et où
								la lucidité mène vers l'apaisement.
							</p>
						</div>

						<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
							{pillars.map((pillar, index) => (
								<article
									key={pillar.title}
									className={`group ml-4 mr-4 bg-card/80 backdrop-blur-sm rounded-2xl p-8 text-center border border-border/20 hover:border-gold/30 hover:shadow-medium transition-all duration-500 ${
										pillarsInView
											? "opacity-100 translate-y-0"
											: "opacity-0 translate-y-12"
									}`}
									style={{
										transitionDelay: pillarsInView
											? `${100 + index * 100}ms`
											: "0ms",
										transform: pillarsInView
											? `translateY(0)`
											: `translateY(${20 + index * 5}px)`,
									}}
								>
									<div className="w-16 h-16 mx-auto mb-5 rounded-full bg-sand/60 flex items-center justify-center shadow-soft group-hover:scale-110 group-hover:bg-gold/10 transition-all duration-500">
										<pillar.icon
											className="w-7 h-7 text-accent group-hover:text-gold transition-colors duration-500"
											strokeWidth={1.5}
										/>
									</div>
									<h3 className="font-display text-lg text-navy mb-3">
										<span className="font-calligraphic text-accent text-3xl inline-block align-baseline">
											{pillar.title.charAt(0)}
										</span>
										{pillar.title.slice(1)}
									</h3>
									<p className="text-sm text-muted-foreground leading-relaxed">
										{pillar.description}
									</p>
								</article>
							))}
						</div>
					</div>
				</section>

				{/* Quote Section with Reveal Image Effect */}
				<section
					ref={quoteRef}
					className="relative py-24 md:py-32 overflow-hidden"
				>
					{/* Animated gradient background */}
					<div
						className="absolute inset-0 pointer-events-none overflow-hidden"
						aria-hidden="true"
					>
						<div
							className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-40"
							style={{
								background:
									"radial-gradient(circle, hsl(var(--accent) / 0.15) 0%, transparent 70%)",
								transform: `translateY(${parallaxOffsetSlow}px)`,
							}}
						/>
						<div
							className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full blur-3xl opacity-40"
							style={{
								background:
									"radial-gradient(circle, hsl(var(--gold) / 0.15) 0%, transparent 70%)",
								transform: `translateY(${
									-parallaxOffsetSlow * 0.7
								}px)`,
							}}
						/>
					</div>

					<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
						<div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
							{/* Image with cinematic reveal effect */}
							<figure
								className={`relative order-2 lg:order-1 transition-all duration-[1.5s] ease-out ${
									quoteInView
										? "opacity-100 scale-100"
										: "opacity-0 scale-95"
								}`}
							>
								{/* Outer glow ring */}
								<div
									className={`absolute -inset-3 bg-gradient-to-br from-gold/20 via-accent/10 to-transparent rounded-3xl blur-xl transition-opacity duration-1000 ${
										quoteInView
											? "opacity-100"
											: "opacity-0"
									}`}
								/>

								{/* Image container with mask reveal */}
								<div
									className="relative overflow-hidden rounded-2xl shadow-2xl"
									style={{
										clipPath: quoteInView
											? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
											: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)",
										transition:
											"clip-path 1.2s cubic-bezier(0.65, 0, 0.35, 1)",
									}}
								>
									<img
										src={approcheLunettes}
										alt="Un lever de soleil au travers de lunettes de vue - métaphore d'une nouvelle perspective"
										className="w-full aspect-[4/3] object-cover transition-transform duration-[2s] ease-out hover:scale-105"
										loading="lazy"
										decoding="async"
										style={{
											transform: quoteInView
												? "scale(1)"
												: "scale(1.15)",
										}}
									/>
									{/* Subtle overlay gradient */}
									<div className="absolute inset-0 bg-gradient-to-t from-navy/20 via-transparent to-transparent" />
								</div>

								{/* Floating golden accent */}
								<div
									className={`absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br from-gold/30 to-accent/20 blur-2xl transition-all duration-1000 delay-500 ${
										quoteInView
											? "opacity-100 scale-100"
											: "opacity-0 scale-50"
									}`}
								/>

								{/* Corner accent line */}
								<div
									className={`absolute -top-2 -left-2 w-16 h-16 border-l-2 border-t-2 border-gold/40 rounded-tl-xl transition-all duration-700 delay-700 ${
										quoteInView
											? "opacity-100"
											: "opacity-0"
									}`}
								/>
							</figure>

							{/* Content with staggered animation */}
							<div className="order-1 lg:order-2 space-y-6">
								<p
									className={`section-label transition-all duration-700 ${
										quoteInView
											? "opacity-100 translate-y-0"
											: "opacity-0 translate-y-4"
									}`}
								>
									Ma conviction
								</p>

								<blockquote
									className={`relative transition-all duration-700 delay-100 ${
										quoteInView
											? "opacity-100 translate-y-0"
											: "opacity-0 translate-y-4"
									}`}
								>
									<Quote className="absolute -top-4 -left-2 w-10 h-10 text-accent/20" />
									<p className="font-display text-2xl sm:text-3xl lg:text-4xl text-navy leading-snug pl-6">
										La vérité, quand elle est dite avec
										justesse, ouvre toutes les portes.
									</p>
								</blockquote>

								<p
									className={`text-muted-foreground text-base sm:text-lg leading-relaxed transition-all duration-700 delay-200 ${
										quoteInView
											? "opacity-100 translate-y-0"
											: "opacity-0 translate-y-4"
									}`}
								>
									Mon intention est simple : offrir un espace
									où l'on peut déposer ce que l'on vit sans
									peur du jugement, pour se comprendre
									autrement et retrouver du sens à ce que l'on
									traverse.
								</p>

								<p
									className={`text-muted-foreground text-base sm:text-lg leading-relaxed transition-all duration-700 delay-300 ${
										quoteInView
											? "opacity-100 translate-y-0"
											: "opacity-0 translate-y-4"
									}`}
								>
									Chaque accompagnement est unique. Je vous
									accueille telle que vous êtes, avec votre
									histoire, vos émotions, vos contradictions,
									et c'est à partir de là que nous avançons
									ensemble.
								</p>

								<p
									className={`text-foreground font-medium text-lg transition-all duration-700 delay-400 ${
										quoteInView
											? "opacity-100 translate-y-0"
											: "opacity-0 translate-y-4"
									}`}
								>
									Parce que la lucidité sur soi-même et sur
									son parcours, c'est pour moi le début de la
									liberté.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Objectives Section */}
				<section
					ref={objectivesRef}
					className="relative py-20 md:py-28 bg-gradient-to-b from-sand/20 to-background"
				>
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
							{/* Content */}
							<div
								className={`transition-all duration-1000 ${
									objectivesInView
										? "opacity-100 translate-x-0"
										: "opacity-0 -translate-x-12"
								}`}
							>
								<p className="section-label">Les objectifs</p>
								<h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-navy mb-6">
									Me faire accompagner, dans quel but ?
								</h2>

								<div className="space-y-4 mb-8">
									{objectives.map((obj, index) => (
										<div
											key={obj.title}
											className={`flex items-start gap-4 p-4 bg-card/50 rounded-xl border border-border/20 transition-all duration-500 ${
												objectivesInView
													? "opacity-100 translate-y-0"
													: "opacity-0 translate-y-4"
											}`}
											style={{
												transitionDelay: `${
													200 + index * 100
												}ms`,
											}}
										>
											<div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
												<obj.icon className="w-5 h-5 text-accent" />
											</div>
											<div>
												<h3 className="font-display text-foreground mb-1">
													{obj.title}
												</h3>
												<p className="text-sm text-muted-foreground">
													{obj.description}
												</p>
											</div>
										</div>
									))}
								</div>

								<div className="bg-gold/5 border border-gold/20 rounded-xl p-5">
									<p className="text-foreground font-medium mb-2">
										Tout ceci développe et amène l'estime de
										soi et permet d'oser :
									</p>
									<ul className="text-sm text-muted-foreground space-y-1">
										<li>📍 Oser s'exprimer</li>
										<li>📍 Oser agir</li>
										<li>📍 Oser être soi-même</li>
										<li>📍 Oser se surpasser</li>
									</ul>
								</div>

								<p className="mt-6 text-muted-foreground text-sm sm:text-base leading-relaxed">
									L'objectif de cet accompagnement est de vous
									conduire vers une{" "}
									<strong className="text-foreground">
										autonomie
									</strong>{" "}
									telle qu'à la fin vous n'ayez plus à
									systématiquement faire appel à un coach ou à
									un thérapeute lors des moments difficiles.
									<strong className="text-foreground">
										{" "}
										Vous développerez la capacité à
										mobiliser vos propres ressources en cas
										de besoin.
									</strong>
								</p>
							</div>

							{/* Image with floating card effect */}
							<figure
								className={`relative transition-all duration-1000 delay-200 ${
									objectivesInView
										? "opacity-100 translate-y-0"
										: "opacity-0 translate-y-12"
								}`}
							>
								{/* Ambient glow behind */}
								<div className="absolute inset-4 bg-gradient-to-br from-gold/15 via-accent/10 to-transparent rounded-3xl blur-2xl" />

								{/* Floating card container */}
								<div
									className="relative group"
									style={{
										transform: `translateY(${
											Math.sin(parallaxOffset * 0.02) * 8
										}px)`,
										transition: "transform 0.3s ease-out",
									}}
								>
									{/* Shadow layer */}
									<div className="absolute inset-0 bg-navy/20 rounded-2xl blur-xl translate-y-4 scale-95 group-hover:translate-y-6 transition-transform duration-500" />

									{/* Image container */}
									<div className="relative overflow-hidden rounded-2xl border border-gold/10 shadow-xl">
										<img
											src={mainTendue}
											alt="Une main tendue vers une autre - symbole d'accompagnement"
											className="w-full max-h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
											loading="lazy"
											decoding="async"
										/>
										{/* Subtle overlay */}
										<div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent opacity-60" />
									</div>

									{/* Golden badge positioned elegantly */}
									<div className="absolute -bottom-4 -right-4 z-10">
										<GoldenPlantBadge
											size="sm"
											className="shadow-lg"
										/>
									</div>

									{/* Decorative corner */}
									<div
										className={`absolute -top-2 -right-2 w-12 h-12 border-r-2 border-t-2 border-gold/30 rounded-tr-xl transition-opacity duration-500 ${
											objectivesInView
												? "opacity-100"
												: "opacity-0"
										}`}
									/>
								</div>
							</figure>
						</div>
					</div>
				</section>

				{/* Deontology Section */}
				<section
					ref={deontologyRef}
					className="relative py-20 md:py-28"
				>
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<div
							className={`max-w-3xl mx-auto transition-all duration-700 ${
								deontologyInView
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-8"
							}`}
						>
							<div className="text-center mb-10">
								<div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
									<Shield className="w-8 h-8 text-accent" />
								</div>
								<p className="section-label">Engagement</p>
								<h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-navy">
									Ma Déontologie
								</h2>
							</div>

							<div className="space-y-4">
								{deontologyItems.map((item, index) => (
									<div
										key={index}
										className={`flex items-start gap-4 p-5 bg-card/50 rounded-xl border border-border/20 transition-all duration-500 ${
											deontologyInView
												? "opacity-100 translate-y-0"
												: "opacity-0 translate-y-4"
										}`}
										style={{
											transitionDelay: `${
												100 + index * 80
											}ms`,
										}}
									>
										<span className="text-accent font-bold text-lg">
											📍
										</span>
										<p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
											{item}
										</p>
									</div>
								))}
							</div>

							<p className="mt-8 text-center text-foreground font-medium italic">
								Je suis à vos côtés, en tant qu'accompagnante.
								Je ne fais pas à votre place ni ne vous dicte
								quoi faire !
								<br />
								<strong>
									Vous êtes actrice de votre transformation.
								</strong>
							</p>
						</div>
					</div>
				</section>

				{/* Final CTA Section */}
				<section
					ref={ctaRef}
					className="relative py-20 md:py-28 bg-gradient-to-b from-background via-sand/20 to-background"
				>
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<div
							className={`max-w-2xl mx-auto text-center transition-all duration-700 ${
								ctaInView
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-8"
							}`}
						>
							<GoldenPlantBadge
								size="lg"
								className="mx-auto mb-8 animate-pulse drop-shadow-[0_0_6px_rgba(212,175,55,0.45)]"
							/>
							<p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8">
								Découvrez mes différentes prestations ou
								apprenez-en plus sur mon parcours. Je serai
								ravie de vous accompagner dans votre
								cheminement.
							</p>

							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Link to="/therapie-energetique">
									<Button
										variant="hero"
										size="lg"
										className="w-full sm:w-auto"
									>
										Voir mes prestations
										<ArrowRight className="ml-2 w-4 h-4" />
									</Button>
								</Link>
								<Link to="/emilie-perez">
									<Button
										variant="elegant"
										size="lg"
										className="w-full sm:w-auto"
									>
										Qui suis-je
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
};

export default MonApproche;
