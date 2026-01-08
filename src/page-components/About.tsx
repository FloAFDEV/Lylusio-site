"use client";

import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import FloatingParticles from "@/components/FloatingParticles";
import GoldenPlantBadge from "@/components/GoldenPlantBadge";
import { useInView } from "@/hooks/useInView";
import { useParallax } from "@/hooks/useParallax";
import { useMemo, useState, useEffect } from "react";

// Astro stars decoration component
const AstroStars = ({ count = 15 }: { count?: number }) => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const stars = useMemo(
		() =>
			[...Array(count)].map((_, i) => ({
				id: i,
				top: `${10 + Math.random() * 80}%`,
				left: `${5 + Math.random() * 90}%`,
				animationDelay: `${Math.random() * 5}s`,
			})),
		[count]
	);

	if (!mounted) {
		return (
			<div className="absolute inset-0 overflow-hidden pointer-events-none" />
		);
	}

	return (
		<div className="absolute inset-0 overflow-hidden pointer-events-none">
			{stars.map((star) => (
				<div
					key={star.id}
					className="absolute w-0.5 h-0.5 bg-accent/30 rounded-full animate-gentle-pulse"
					style={{
						top: star.top,
						left: star.left,
						animationDelay: star.animationDelay,
						boxShadow: "0 0 4px hsl(var(--accent) / 0.3)",
					}}
				/>
			))}
		</div>
	);
};

// Animated section wrapper
const AnimatedSection = ({
	children,
	className = "",
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	const { ref, isInView } = useInView({ threshold: 0.1 });

	return (
		<div
			ref={ref}
			className={`transition-all duration-1000 ${
				isInView
					? "opacity-100 translate-y-0"
					: "opacity-0 translate-y-8"
			} ${className}`}
		>
			{children}
		</div>
	);
};

const About = () => {
	const parallaxOffset = useParallax(0.1);
	const structuredData = {
		"@context": "https://schema.org",
		"@type": "AboutPage",
		mainEntity: {
			"@type": "Person",
			name: "Émilie Perez",
			jobTitle: "Astrologue et Praticienne Reiki",
			description:
				"Astrologue humaniste et praticienne Reiki 3ème degré à Toulouse",
			url: "https://lylusio.fr/a-propos",
		},
	};

	return (
		<>
			{/* SEO metadata is handled by Next.js Metadata API in app/emilie-perez/page.tsx */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData),
				}}
			/>

			<div className="min-h-screen bg-background relative">
				<FloatingParticles count={35} />
				<AstroStars count={25} />

				<a href="#main-content" className="skip-link">
					Aller au contenu principal
				</a>
				<Header />
				<Breadcrumbs showPlant={false} />

				<main id="main-content" className="pb-16 md:pb-20">
					{/* Hero */}
					<section
						className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24 relative"
						aria-labelledby="about-title"
					>
						{/* Plant decoration with parallax */}
						<div className="absolute -bottom-4 -right-4 pointer-events-none">
							<GoldenPlantBadge size="md" animate />
						</div>

						<AnimatedSection>
							<header className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
								<p className="section-label">À propos</p>
								<h1
									id="about-title"
									className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.1] mb-4 sm:mb-6"
								>
									<span className="font-calligraphic text-accent text-5xl sm:text-6xl md:text-7xl inline-block align-baseline  ">
										J
									</span>
									e me livre ici à vous en toute intimité
								</h1>
								<p className="text-muted-foreground text-lg md:text-xl font-display">
									Alors commençons les présentations !
								</p>
							</header>
						</AnimatedSection>

						{/* Main story - card style */}
						<AnimatedSection className="delay-150">
							<article className="max-w-3xl mx-auto bg-card/60 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-soft border border-border/30">
								<figure className="float-none sm:float-left sm:mr-8 sm:mb-4 mb-8 flex justify-center relative">
									<div
										className="relative"
										style={{
											transform: `translate3d(0, ${
												parallaxOffset * 0.1
											}px, 0)`,
										}}
									>
										<div
											className="absolute -inset-3 bg-gradient-to-br from-accent/10 to-gold/10"
											style={{
												borderRadius:
													"55% 45% 50% 50% / 50% 50% 45% 55%",
											}}
											aria-hidden="true"
										/>
										<div
											className="relative w-40 sm:w-48 md:w-56 lg:w-52 aspect-[3/4] shadow-medium"
											style={{
												borderRadius:
													"45% 55% 50% 50% / 50% 50% 55% 45%",
											}}
										>
											<Image
												src="/assets/emilie-enfant.webp"
												alt="Émilie enfant - une petite fille rigoureuse et observatrice"
												fill
												className="object-cover"
												style={{
													borderRadius:
														"45% 55% 50% 50% / 50% 50% 55% 45%",
												}}
											/>
										</div>
										{/* Plant badge on photo */}
										<div className="absolute -bottom-4 -right-4 pointer-events-none">
											<GoldenPlantBadge
												size="sm"
												animate
												className="opacity-60"
											/>
										</div>
									</div>
								</figure>

								<div className="space-y-5 text-muted-foreground text-base md:text-lg leading-relaxed">
									<p>
										<span className="font-calligraphic text-accent text-lg sm:text-xl md:text-2xl inline-block align-baseline">
											J
										</span>
										e suis{" "}
										<strong className="text-foreground">
											Émilie
										</strong>
										, et pour me définir je dirais que je
										suis avant tout une communicante
										passionnée, profondément curieuse de
										l'humain et de ses infinies complexités.
									</p>
									<p>
										Née sous le signe des{" "}
										<strong className="text-foreground">
											Gémeaux
										</strong>{" "}
										avec le Soleil et Mercure conjoint à
										Chiron en Maison 8 et un ascendant
										Scorpion conjoint à Pluton… tel un
										Phœnix, la notion de transformation et
										de résilience a toujours fait partie de
										ma vie.
									</p>
									<p className="text-foreground leading-relaxed">
										Petite j’étais une enfant rigoureuse,
										sérieuse et déjà très exigeante avec
										moi-même. J’étais de celles qui
										observaient beaucoup les adultes. Je
										captais les silences, les regards, les
										gestes imperceptibles, les mots non
										dits.{" "}
										<strong>
											J’étais fascinée par ce décalage
											entre ce que les gens disaient… et
											ce qu’ils ressentaient vraiment et
											j’adorais comprendre <i>pourquoi</i>
										</strong>
										. Très tôt, j’ai compris que la vérité
										pouvait déranger, alors j’ai appris à me
										taire, à “tenir bon”, à{" "}
										<strong>contrôler mes émotions</strong>.
										Et pourtant, j’étais déjà celle à qui
										l’on se confiait, celle à qui on venait
										s’épancher, vider son sac, celle qui
										écoutait sans juger.
									</p>

									<p className="text-foreground font-medium italic border-l-2 border-accent/40 pl-4 mt-4">
										Avec le temps, j’ai compris que ma plus
										grande force n’était pas d’avoir les
										réponses, mais de{" "}
										<strong>
											savoir poser les bonnes questions
										</strong>
										.
									</p>
								</div>
							</article>
						</AnimatedSection>
					</section>

					{/* Journey section */}
					<section
						className="relative py-16 md:py-20 lg:py-24 overflow-hidden"
						aria-labelledby="journey-title"
					>
						{/* Background gradient */}
						<div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-secondary/20 to-transparent" />
						<AstroStars count={12} />
						{/* Plant decoration */}
						<div className="absolute bottom-8 right-6 pointer-events-none">
							<GoldenPlantBadge
								size="md"
								animate
								className="opacity-60"
							/>
						</div>

						<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
							<AnimatedSection>
								<div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center max-w-5xl mx-auto">
									<figure className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-none lg:w-5/12 mx-auto relative">
										<div className="relative group">
											<div
												className="absolute -inset-4 bg-gradient-to-br from-gold-light/15 to-accent/10 transition-all duration-500 group-hover:from-gold-light/20 group-hover:to-accent/15"
												style={{
													borderRadius:
														"50% 50% 45% 55% / 55% 55% 45% 45%",
												}}
												aria-hidden="true"
											/>
											<div
												className="relative w-full aspect-[3/4] shadow-medium transition-transform duration-500 group-hover:scale-[1.02]"
												style={{
													borderRadius:
														"50% 50% 45% 55% / 55% 55% 45% 45%",
												}}
											>
												<Image
													src="/assets/emilie-lumiere.webp"
													alt="Émilie baignée dans la lumière du soleil - moment de transformation"
													fill
													className="object-cover"
													style={{
														borderRadius:
															"50% 50% 45% 55% / 55% 55% 45% 45%",
													}}
												/>
											</div>
										</div>
										{/* Plant badge */}
										<div className="absolute -bottom-2 -right-4 pointer-events-none">
											<GoldenPlantBadge
												size="sm"
												animate
												className="opacity-60"
											/>
										</div>
									</figure>

									<article className="lg:w-7/12 bg-card/70 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 sm:p-8 shadow-soft border border-border/20">
										<h2
											id="journey-title"
											className="font-display text-2xl md:text-3xl text-foreground mb-6"
										>
											Un parcours de transformation
										</h2>
										<div className="space-y-5 text-muted-foreground text-base md:text-lg leading-relaxed">
											<p>
												<span className="font-calligraphic text-accent text-lg sm:text-xl md:text-2xl inline-block align-baseline">
													U
												</span>
												n événement familial, à mes 13
												ans, m'a fait grandir vite, trop
												vite, et m'a transformée à
												jamais. L'insouciance est partie
												ce jour-là.
											</p>

											<p className="text-foreground leading-relaxed">
												À partir de là, mon chemin n’a
												jamais été linéaire : j’ai
												traversé des relations toxiques
												et de la manipulation, des abus,
												des deuils difficiles, des
												trahisons de toutes sortes, des
												difficultés financières, la
												maladie… Je suis passée par
												toutes les émotions et tous les
												extrêmes, et pendant des années
												j’ai appris à mettre des
												pansements, à performer, à
												structurer, à tenir le cap pour
												continuer d’avancer… J’étais
												devenue maman et il m’était
												impossible de laisser « tomber
												». Je dis toujours que mon fils
												aîné m’a sauvée de moi-même, et
												je le pense encore aujourd’hui.
											</p>

											<p className="text-foreground font-medium text-lg md:text-xl font-display border-l-2 border-gold/40 pl-4">
												Mais de toutes ces tempêtes,
												j'ai tiré mes plus grandes
												forces.
											</p>
										</div>
									</article>
								</div>
							</AnimatedSection>
						</div>
					</section>

					{/* Professional journey */}
					<section
						className="py-16 md:py-20 lg:py-24 relative"
						aria-labelledby="professional-title"
					>
						<AstroStars count={8} />
						<div className="container mx-auto px-4 sm:px-6 lg:px-8">
							<AnimatedSection>
								<article className="max-w-3xl mx-auto bg-card/50 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-soft border border-border/20">
									<h2
										id="professional-title"
										className="font-display text-2xl md:text-3xl text-foreground text-center mb-8"
									>
										Mon parcours professionnel
									</h2>

									<div className="space-y-6 text-muted-foreground text-base md:text-lg leading-relaxed">
										<p>
											<span className="font-calligraphic text-accent text-lg sm:text-xl md:text-2xl inline-block align-baseline">
												D
											</span>
											ans la première partie de ma vie,
											avant d’oser suivre ma voie, j’ai
											donc eu un parcours « classique » où
											je suis entrée dans la vie active
											assez tôt : 14 ans de salariat, dont
											plus de 10 dans{" "}
											<strong className="text-foreground">
												l’accompagnement
											</strong>{" "}
											dans le domaine de la création
											d’entreprise et principalement dans{" "}
											<strong className="text-foreground">
												l’insertion sociale et
												professionnelle
											</strong>
											. J’y ai appris à écouter, à
											comprendre, à valoriser le potentiel
											humain.
										</p>

										<p>
											Formée à l’approche{" "}
											<a
												href="https://fr.wikipedia.org/wiki/Carl_Rogers"
												target="_blank"
												rel="noopener noreferrer"
												className="text-foreground font-medium link-elegant hover:text-accent transition-colors"
											>
												humaniste de Carl Rogers
											</a>{" "}
											et à certaines techniques de{" "}
											<strong>PNL</strong>, j’ai développé
											une{" "}
											<strong>
												posture d’accompagnement
											</strong>{" "}
											fondée sur{" "}
											<strong>l’empathie</strong>,{" "}
											<strong>l’acceptation</strong> et le{" "}
											<strong>non-jugement</strong>, des
											valeurs qui m’animent encore
											aujourd’hui dans mes séances.
										</p>

										<p>
											Pour autant,{" "}
											<strong>l’astrologie</strong> a
											toujours fait partie de ma vie
											depuis mes 17 ans… le jour où, en
											recherchant un livre de littérature
											dans la bibliothèque de ma mère,
											j’ai trouvé par “hasard” un vieux
											manuel. Ce fut alors un vrai coup de
											foudre et le début d’une longue
											histoire qui ne s’est jamais
											arrêtée… Depuis, je n’ai jamais
											cessé d’explorer ce langage
											symbolique et fascinant,{" "}
											<strong>
												miroir de notre monde intérieur
											</strong>
											. Je m’amusais à analyser et
											décortiquer les thèmes des membres
											de ma famille, des amis… Je pouvais
											passer des heures à décortiquer, à
											reformuler, déjà fascinée par les
											nuances du langage des astres et de
											sa psychologie.
										</p>

										<p>
											Après neuf années d’apprentissage
											autodidacte, j’ai eu la chance en
											2012 de me former auprès d’une
											enseignante passionnée (une ancienne
											professeure d’histoire à la retraite
											ayant étudié l’astrologie dans une
											école renommée à Paris, qui
											associait astrologie et psychologie.
											Merci Danielle). De là débute ma
											formation avec elle pendant presque
											2 ans, ne faisant que confirmer mon
											élan pour cet art qui, de mon point
											de vue, a toute sa place dans les{" "}
											<strong>sciences humaines</strong>.
										</p>

										<p>
											Inspirée par les travaux de{" "}
											<a
												href="https://fr.wikipedia.org/wiki/Carl_Gustav_Jung"
												target="_blank"
												rel="noopener noreferrer"
												className="text-foreground font-medium link-elegant hover:text-accent transition-colors"
											>
												Carl Gustav Jung
											</a>
											,{" "}
											<a
												href="https://en.wikipedia.org/wiki/Liz_Greene"
												target="_blank"
												rel="noopener noreferrer"
												className="text-foreground font-medium link-elegant hover:text-accent transition-colors"
											>
												Liz Greene
											</a>
											,{" "}
											<a
												href="https://fr.wikipedia.org/wiki/Dane_Rudhyar"
												target="_blank"
												rel="noopener noreferrer"
												className="text-foreground font-medium link-elegant hover:text-accent transition-colors"
											>
												Dane Rudhyar
											</a>{" "}
											ou encore{" "}
											<strong>Stephen Arroyo</strong>,
											j’ai trouvé dans{" "}
											<strong>
												l’astrologie humaniste
											</strong>{" "}
											une voie de compréhension, de
											guérison et d’évolution.
										</p>

										<p>
											Pendant longtemps, j’ai cherché à
											comprendre pourquoi certaines
											personnes réussissent à se
											transformer profondément et d’autres
											restent coincées dans les mêmes
											schémas, malgré toute leur bonne
											volonté. Et l’astrologie m’a apporté
											ces réponses. Elle m’a aidée à{" "}
											<strong>
												donner du sens à mes épreuves, à
												comprendre mes émotions, à
												accepter mes cycles intérieurs
											</strong>
											.
										</p>
									</div>
								</article>
							</AnimatedSection>
						</div>
					</section>

					{/* Lylusio story */}
					<section
						className="relative py-16 md:py-20 lg:py-24 overflow-hidden"
						aria-labelledby="lylusio-title"
					>
						<div className="absolute inset-0 bg-gradient-to-t from-secondary/25 via-secondary/15 to-transparent" />
						<AstroStars count={12} />
						<div className="absolute -bottom-4 -right-4 pointer-events-none">
							<GoldenPlantBadge
								size="sm"
								animate
								className="opacity-60"
							/>
						</div>

						<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
							<AnimatedSection>
								<div className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-16 items-center max-w-5xl mx-auto">
									<article className="lg:w-7/12 bg-card/70 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 sm:p-8 shadow-soft border border-border/20">
										<h2
											id="lylusio-title"
											className="font-display text-2xl md:text-3xl text-foreground mb-6"
										>
											Pourquoi Lylusio ?
										</h2>
										<div className="space-y-5 text-muted-foreground text-base md:text-lg leading-relaxed">
											<p>
												<span className="font-calligraphic text-accent text-lg sm:text-xl md:text-2xl inline-block align-baseline">
													D
												</span>
												epuis petite j'ai un lien
												particulier avec les indiens et
												leurs civilisations. Leur
												relation à la nature, à la
												terre, à l'Univers, aux étoiles,
												à leurs ancêtres…
											</p>
											<p>
												<strong className="text-foreground">
													Lusio veut dire Lumière en
													Amérindien
												</strong>{" "}
												(des peuples Zuni),
												<strong className="text-foreground">
													{" "}
													Lilou
												</strong>{" "}
												est mon surnom depuis mon
												adolescence.
											</p>
											<blockquote className="border-l-2 border-accent/50 pl-5 py-3 bg-accent/5 rounded-r-xl italic text-foreground/85 font-display text-lg md:text-xl">
												"Quand le dernier arbre aura été
												abattu... alors enfin nous
												saurons que l'argent ne se mange
												pas."
											</blockquote>
										</div>
									</article>

									<figure className="w-full max-w-md md:max-w-lg lg:max-w-none lg:w-5/12 mx-auto relative group">
										<div className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-medium">
											{/* Decorative organic border */}
											<div
												className="absolute -inset-1 bg-gradient-to-br from-gold/20 via-accent/10 to-gold/20 rounded-2xl md:rounded-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"
												style={{
													borderRadius: "1.5rem",
												}}
											/>
											<div className="relative w-full aspect-[4/3] rounded-2xl md:rounded-3xl transition-all duration-700 group-hover:scale-[1.02]">
												<Image
													src="/assets/arbre-lumiere.webp"
													alt="Grand arbre illuminé par un soleil couchant"
													fill
													className="object-cover rounded-2xl md:rounded-3xl"
												/>
											</div>
											{/* Soft vignette overlay */}
											<div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-t from-background/20 via-transparent to-transparent pointer-events-none" />
										</div>
										{/* Plant badge */}
										<div className="absolute -bottom-4 -right-4 pointer-events-none">
											<GoldenPlantBadge
												size="sm"
												animate
												className="opacity-60"
											/>
										</div>
									</figure>
								</div>
							</AnimatedSection>
						</div>
					</section>

					{/* Today */}
					<section
						className="py-16 md:py-20 lg:py-24 relative"
						aria-labelledby="today-title"
					>
						<AstroStars count={10} />
						<div className="container mx-auto px-4 sm:px-6 lg:px-8">
							<AnimatedSection>
								<div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center max-w-5xl mx-auto">
									<figure className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-none lg:w-5/12 mx-auto relative">
										<div className="relative group">
											<div
												className="absolute -inset-4 bg-gradient-to-br from-accent/10 to-gold/10 transition-all duration-500 group-hover:from-accent/15 group-hover:to-gold/15"
												style={{
													borderRadius:
														"50% 50% 45% 55% / 55% 55% 45% 45%",
												}}
												aria-hidden="true"
											/>
											<div
												className="relative w-full aspect-square shadow-medium transition-transform duration-500 group-hover:scale-[1.02]"
												style={{
													borderRadius:
														"50% 50% 45% 55% / 55% 55% 45% 45%",
												}}
											>
												<Image
													src="/assets/emilie-about.webp"
													alt="Émilie aujourd'hui - praticienne épanouie et rayonnante"
													fill
													className="object-cover"
													style={{
														borderRadius:
															"50% 50% 45% 55% / 55% 55% 45% 45%",
													}}
												/>
											</div>
										</div>
										{/* Plant badge */}
										<div className="absolute -bottom-4 -right-4 pointer-events-none">
											<GoldenPlantBadge
												size="sm"
												animate
												className="opacity-60"
											/>
										</div>
									</figure>

									<article className="lg:w-7/12 bg-card/60 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 sm:p-8 shadow-soft border border-border/20">
										<h2
											id="today-title"
											className="font-display text-2xl md:text-3xl text-foreground mb-6 "
										>
											Aujourd'hui
										</h2>
										<div className="space-y-5 text-muted-foreground text-base md:text-lg leading-relaxed ">
											<p>
												<span className="font-calligraphic text-accent text-lg sm:text-xl md:text-2xl inline-block align-baseline mr-1">
													À
												</span>
												40 ans, j'ai l'impression
												d'avoir vécu mille vies.
											</p>
											<p>
												J'ai l'énorme chance d'être
												mariée à mon grand amour et
												d'être maman de deux enfants qui
												sont autant ma force que ma
												déstabilisation quotidienne.
											</p>
											<p className="text-foreground font-medium border-l-2 border-gold/40 pl-4">
												Grâce à eux, je continue
												d'apprendre, d'aimer, de me
												transformer.
											</p>
											<p className="text-foreground font-medium text-lg md:text-xl font-display pt-2">
												L'amour sauve de tout, mais pour
												ma part, c'est vrai.
											</p>
										</div>
									</article>
								</div>
							</AnimatedSection>
						</div>
					</section>

					{/* Values */}
					<section
						className="relative py-16 md:py-20 lg:py-24 overflow-hidden"
						aria-labelledby="values-title"
					>
						<div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-secondary/40" />
						<AstroStars count={18} />
						<div className="absolute -bottom-4 -right-4 pointer-events-none">
							<GoldenPlantBadge
								size="sm"
								animate
								className="opacity-60"
							/>
						</div>

						<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
							<AnimatedSection>
								<header className="text-center mb-12 md:mb-16">
									<h2
										id="values-title"
										className="text-foreground mb-4"
									>
										<span className="font-calligraphic text-accent text-4xl md:text-5xl">
											M
										</span>
										es valeurs
									</h2>
									<p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
										Les piliers qui guident chacun de mes
										accompagnements.
									</p>
								</header>
							</AnimatedSection>

							<ul
								className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto"
								role="list"
							>
								{[
									{
										title: "Bienveillance",
										text: "Un accueil sans jugement de ce que vous traversez, un espace sécurisé où chacun peut s'exprimer librement.",
										badges: [
											"Écoute",
											"Douceur",
											"Respect",
										],
										delay: 0,
									},
									{
										title: "Authenticité",
										text: "Une pratique ancrée dans l'écoute et la vérité. Je ne promets pas de miracles, je cherche la justesse.",
										badges: [
											"Vérité",
											"Sincérité",
											"Intégrité",
										],
										delay: 100,
									},
									{
										title: "Transformation",
										text: "La conviction que chaque crise porte un renouveau. Chaque étape de vie peut devenir un tremplin.",
										badges: [
											"Évolution",
											"Renaissance",
											"Croissance",
										],
										delay: 200,
									},
								].map((value, valueIndex) => (
									<AnimatedSection
										key={value.title}
										className={`delay-&lsqb;${value.delay}ms&rsqb;`}
									>
										<li className="text-center bg-card/70 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-soft border border-border/20 h-full transition-all duration-300 hover:shadow-medium hover:border-accent/20 hover:-translate-y-1">
											<h3 className="font-display text-xl md:text-2xl text-foreground mb-3 text-center">
												<span className="font-calligraphic text-accent text-xl md:text-2xl inline-block align-baseline">
													{value.title.charAt(0)}
												</span>
												{value.title.slice(1)}
											</h3>
											<p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-5">
												{value.text}
											</p>

											{/* Badges with organic, slightly offset positioning */}
											<div className="flex flex-wrap justify-center gap-2 pt-3 border-t border-border/20">
												{value.badges.map(
													(badge, i) => {
														// Slight variations for organic feel
														const rotations = [
															[
																"-2deg",
																"1deg",
																"-1deg",
															],
															[
																"1deg",
																"-2deg",
																"2deg",
															],
															[
																"-1deg",
																"2deg",
																"-2deg",
															],
														];
														const margins = [
															[
																"0 0 0 0",
																"2px -4px 0 0",
																"-2px 0 0 4px",
															],
															[
																"-1px 0 0 2px",
																"0 2px 0 -2px",
																"1px -2px 0 0",
															],
															[
																"0 -2px 0 1px",
																"-2px 0 0 0",
																"2px 2px 0 -1px",
															],
														];

														return (
															<span
																key={badge}
																className="inline-block px-3 py-1.5 text-xs font-medium text-accent/75 bg-accent/8 border border-accent/20 transition-all duration-300 hover:bg-accent/15 hover:text-accent hover:scale-105 hover:-rotate-1"
																style={{
																	borderRadius:
																		i %
																			3 ===
																		0
																			? "1rem 0.5rem 1rem 0.5rem"
																			: i %
																					3 ===
																			  1
																			? "0.5rem 1rem 0.5rem 1rem"
																			: "0.75rem 0.4rem 0.75rem 0.4rem",
																	transform: `rotate(${
																		rotations[
																			valueIndex
																		]?.[
																			i
																		] ||
																		"0deg"
																	})`,
																	margin:
																		margins[
																			valueIndex
																		]?.[
																			i
																		] ||
																		"0",
																}}
															>
																{badge}
															</span>
														);
													}
												)}
											</div>
										</li>
									</AnimatedSection>
								))}
							</ul>
						</div>
					</section>
				</main>

				<Footer />
			</div>
		</>
	);
};

export default About;
