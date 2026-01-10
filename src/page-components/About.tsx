"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import FloatingParticles from "@/components/FloatingParticles";
import GoldenPlantBadge from "@/components/GoldenPlantBadge";
import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";
import { useParallax } from "@/hooks/useParallax";
import { useMemo, useState, useEffect } from "react";
import { ArrowRight, Quote } from "lucide-react";

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
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<div
			ref={ref}
			className={`transition-all duration-1000 ${
				mounted && isInView
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

				<main id="main-content" className="pt-20 sm:pt-24 md:pt-28 pb-16 md:pb-20">
					{/* Hero */}
					<section
						className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-24 relative"
						aria-labelledby="about-title"
					>
						<AnimatedSection>
							<header className="max-w-3xl mx-auto text-center mb-12 md:mb-16 pt-8 sm:pt-0">
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
												sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, (max-width: 1024px) 224px, 208px"
												className="object-cover"
												style={{
													borderRadius:
														"45% 55% 50% 50% / 50% 50% 55% 45%",
												}}
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
										avec le{" "}
										<strong className="text-foreground">
											Soleil et Mercure conjoint à Chiron
										</strong>{" "}
										en Maison 8 et un{" "}
										<strong className="text-foreground">
											ascendant Scorpion conjoint à Pluton
										</strong>
										… tel un Phœnix, la notion de
										transformation et de résilience a
										toujours fait partie de ma vie du plus
										loin que je m'en souvienne.{" "}
										<strong className="text-foreground">
											Comme si je devais expérimenter
											toujours dans une profondeur totale
											chacune des parties de ma vie.
										</strong>
									</p>
									<p className="text-foreground leading-relaxed">
										Petite j'étais une enfant rigoureuse,
										sérieuse et déjà très exigeante avec
										moi-même. J'étais de celles qui
										observaient beaucoup les adultes. Je
										captais les silences, les regards, les
										gestes imperceptibles, les mots non
										dits.{" "}
										<strong>
											J'étais fascinée par ce décalage
											entre ce que les gens disaient… et
											ce qu'ils ressentaient vraiment et
											j'adorais comprendre <i>pourquoi</i>
										</strong>
										. Très tôt, j'ai compris que la vérité
										pouvait déranger, alors j'ai appris à me
										taire, à "tenir bon", à{" "}
										<strong>contrôler mes émotions</strong>.
										Et pourtant, j'étais déjà celle à qui
										l'on se confiait, celle à qui on venait
										s'épancher, vider son sac, celle qui
										écoutait sans juger.
									</p>

									<p className="text-foreground font-medium italic border-l-2 border-accent/40 pl-4 mt-4">
										Avec le temps, j'ai compris que ma plus
										grande force n'était pas d'avoir les
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

						<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
							<AnimatedSection>
								<div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center max-w-5xl mx-auto">
									<figure
										className="
    relative
    mx-auto
    w-[240px]
    sm:w-[280px]
    md:w-[320px]
    lg:w-5/12
    group
  "
									>
										{" "}
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
													sizes="(max-width: 640px) 320px, (max-width: 768px) 384px, (max-width: 1024px) 448px, 40vw"
													className="object-cover"
													style={{
														borderRadius:
															"50% 50% 45% 55% / 55% 55% 45% 45%",
													}}
												/>
											</div>
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
												À partir de là, mon chemin n'a
												jamais été linéaire : j'ai
												traversé des relations toxiques
												et de la manipulation, des abus,
												des deuils difficiles, des
												trahisons de toutes sortes, des
												difficultés financières, la
												maladie… Je suis passée par
												toutes les émotions et tous les
												extrêmes, et pendant des années
												j'ai appris à mettre des
												pansements, à performer, à
												structurer, à tenir le cap pour
												continuer d'avancer… J'étais
												devenue maman et il m'était
												impossible de laisser « tomber
												». Je dis toujours que mon fils
												aîné m'a sauvée de moi-même, et
												je le pense encore aujourd'hui.
											</p>

											<p className="text-foreground font-medium text-lg md:text-xl font-display border-l-2 border-gold/40 pl-4">
												Mais de toutes ces tempêtes,
												j'ai tiré mes plus grandes
												forces. Aujourd'hui, je vois ces
												épreuves non comme des
												blessures, mais comme les{" "}
												<strong>
													pierres fondatrices
												</strong>{" "}
												de ce que je suis devenue.
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
											avant d'oser suivre ma voie, j'ai
											donc eu un parcours « classique » où
											je suis entrée dans la vie active
											assez tôt :{" "}
											<strong className="text-foreground">
												14 ans de salariat, dont plus de
												10 dans l'accompagnement
											</strong>{" "}
											dans le domaine de la création
											d'entreprise et principalement dans{" "}
											<strong className="text-foreground">
												l'insertion sociale et
												professionnelle
											</strong>
											. J'y ai appris à écouter, à
											comprendre, à valoriser le potentiel
											humain.
										</p>

										<p>
											Formée à l'approche{" "}
											<a
												href="https://fr.wikipedia.org/wiki/Carl_Rogers"
												target="_blank"
												rel="noopener noreferrer"
												className="text-foreground font-medium link-elegant hover:text-accent transition-colors"
											>
												humaniste de Carl Rogers
											</a>{" "}
											et à certaines techniques de{" "}
											<strong>PNL</strong>, j'ai développé
											une{" "}
											<strong>
												posture d'accompagnement
											</strong>{" "}
											fondée sur{" "}
											<strong>l'empathie</strong>,{" "}
											<strong>l'acceptation</strong> et le{" "}
											<strong>non-jugement</strong>, des
											valeurs qui m'animent encore
											aujourd'hui dans mes séances.
										</p>

										<p>
											Pour autant,{" "}
											<strong>l'astrologie</strong> a
											toujours fait partie de ma vie
											depuis mes 17 ans… le jour où, en
											recherchant un livre de littérature
											dans la bibliothèque de ma mère,
											j'ai trouvé par "hasard" un vieux
											manuel. Ce fut alors un vrai coup de
											foudre et le début d'une longue
											histoire qui ne s'est jamais
											arrêtée… Depuis, je n'ai jamais
											cessé d'explorer ce langage
											symbolique et fascinant,{" "}
											<strong>
												miroir de notre monde intérieur
											</strong>
											. Je m'amusais à analyser et
											décortiquer les thèmes des membres
											de ma famille, des amis… Je pouvais
											passer des heures à décortiquer, à
											reformuler, déjà fascinée par les
											nuances du langage des astres et de
											sa psychologie.
										</p>

										<p>
											Après neuf années d'apprentissage
											autodidacte, j'ai eu la chance en
											2012 de me former auprès d'une
											enseignante passionnée (une ancienne
											professeure d'histoire à la retraite
											ayant étudié l'astrologie dans une
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
											j'ai trouvé dans{" "}
											<strong>
												l'astrologie humaniste
											</strong>{" "}
											une voie de compréhension, de
											guérison et d'évolution.
										</p>

										<p>
											Pendant longtemps, j'ai cherché à
											comprendre pourquoi certaines
											personnes réussissent à se
											transformer profondément et d'autres
											restent coincées dans les mêmes
											schémas, malgré toute leur bonne
											volonté. Et l'astrologie m'a apporté
											ces réponses. Elle m'a aidée à{" "}
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

					{/* Transformation 2019 & Reiki Section */}
					<section
						className="relative py-16 md:py-20 lg:py-24 overflow-hidden"
						aria-labelledby="transformation-title"
					>
						<div className="absolute inset-0 bg-gradient-to-b from-secondary/25 via-secondary/15 to-transparent" />
						<AstroStars count={15} />
						<div className="absolute top-8 left-6 pointer-events-none">
							<GoldenPlantBadge
								size="sm"
								animate
								className="opacity-40"
							/>
						</div>

						<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
							<AnimatedSection>
								<div className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-16 items-center max-w-5xl mx-auto">
									<article className="lg:w-7/12 bg-card/70 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 sm:p-8 shadow-soft border border-border/20">
										<h2
											id="transformation-title"
											className="font-display text-2xl md:text-3xl text-foreground mb-6"
										>
											Ma transformation
										</h2>
										<div className="space-y-5 text-muted-foreground text-base md:text-lg leading-relaxed">
											<p>
												<span className="font-calligraphic text-accent text-lg sm:text-xl md:text-2xl inline-block align-baseline">
													À
												</span>{" "}
												force de vouloir tout maîtriser,
												je me suis éloignée de
												l'essentiel : ma sensibilité,
												mon intuition, ma vérité
												intérieure. En 2019, une
												profonde transformation
												intérieure, viscérale, s'est
												imposée à moi. Je{" "}
												<strong className="text-foreground">
													vivais
												</strong>{" "}
												une conjonction de Pluton sur ma
												Lune et mon Mars natal. Je ne
												pouvais plus me mentir :{" "}
												<strong className="text-foreground">
													j'avais besoin de vérité,
													d'alignement, de cohérence,
													de sens…
												</strong>
											</p>

											<p className="text-foreground leading-relaxed">
												Cette période a marqué un vrai
												tournant pour moi. J'ai
												rencontré des personnes clés et
												j'ai commencé une formation en{" "}
												<strong>
													Reiki Usui Shiki Ryoho
												</strong>{" "}
												(dans le respect de la
												déontologie et de l'enseignement
												traditionnel de Mikao Usui) et
												obtenu mon{" "}
												<strong>
													3ᵉ degré de praticienne
													thérapeute
												</strong>{" "}
												deux ans plus tard.
											</p>

											<p className="text-foreground leading-relaxed">
												Je décide alors de ne plus taire
												ma passion, mais au contraire de
												l'écouter et de m'en servir pour
												aider les autres. Je ressens le
												besoin de mettre à profit tout
												ce que mes différentes
												expériences de vie personnelle
												et professionnelle m'ont permis
												de travailler, de m'épanouir au
												travers de mes accompagnements,
												au travers des rencontres, car{" "}
												<strong>
													j'aime autant partager que
													transmettre
												</strong>
												, de revenir au « cœur » parce
												que{" "}
												<strong>
													le changement ne se décrète
													pas, il se vit et se ressent
													de l'intérieur
												</strong>
												. Je décide de créer{" "}
												<strong>Lylusio</strong> fin
												2021.
											</p>
										</div>
									</article>

									<figure
										className="
    relative
    mx-auto
    w-[240px]
    sm:w-[280px]
    md:w-[320px]
    lg:w-5/12
    group
  "
									>
										{" "}
										<div className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-medium">
											<div
												className="absolute -inset-1 bg-gradient-to-br from-accent/20 via-gold/10 to-accent/20 rounded-2xl md:rounded-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-500"
												aria-hidden="true"
											/>
											<div
												className="
    relative
    w-full
    max-w-[280px]
    sm:max-w-[320px]
    md:max-w-[360px]
    aspect-[3/4]
    mx-auto
    rounded-2xl
    md:rounded-3xl
    transition-transform
    duration-700
    group-hover:scale-[1.02]
  "
											>
												<Image
													src="/assets/emilie-portrait.webp"
													alt="Émilie rayonnante - praticienne Reiki épanouie"
													fill
													sizes="(max-width: 640px) 280px,
           (max-width: 768px) 320px,
           (max-width: 1024px) 360px,
           360px"
													className="object-cover rounded-2xl md:rounded-3xl"
												/>
											</div>
											<div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-t from-background/20 via-transparent to-transparent pointer-events-none" />
										</div>
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
											<h3 className="font-display text-xl text-foreground">
												Un lien profond avec les
												civilisations amérindiennes
											</h3>
											<p>
												<span className="font-calligraphic text-accent text-lg sm:text-xl md:text-2xl inline-block align-baseline">
													D
												</span>
												epuis petite j'ai un lien
												particulier avec les indiens et
												leurs civilisations. Tout me «
												parle » chez eux. Leur relation
												à la nature, à la terre, à
												l'Univers, aux étoiles, à leurs
												ancêtres, à leurs traditions,
												leurs cultures…détruites
												pourtant par les Européens. Leur
												adaptation à ce « nouveau »
												monde a été leur force et je me
												sens faire partie de cette «
												famille ».
											</p>
											<p>
												<strong className="text-foreground">
													Lusio veut dire Lumière en
													Amérindien
												</strong>{" "}
												(des peuples Zuni),{" "}
												<strong className="text-foreground">
													Lilou
												</strong>{" "}
												est mon surnom depuis mon
												adolescence.
											</p>
											<p>
												Finalement j'étais connectée aux
												étoiles depuis toute petite et
												ma passion n'a fait que grandir
												avec le temps.
											</p>
											<p>
												L'Astrologie faisait partie
												intégrante de la vie des
												indiens, les Mayas par exemple,
												observaient quotidiennement le
												ciel et arrivaient à prédire les
												éclipses (solaires et lunaires),
												les mouvements de chaque
												constellation, ils avaient même
												planifié le cycle de la planète
												Vénus.
											</p>
											<p>
												On ne va pas refaire un cours
												d'histoire, mais je suis
												toujours autant fascinée quand
												je vois qu'ils ont réussi à
												aligner leurs temples en
												direction exacte du lever ou
												coucher du soleil, ou en
												fonction des équinoxes ou des
												solstices, des planètes,…. Je
												sais que mon cœur et mon âme se
												rejoignent sur les grandes
												terres d'Amérique.
											</p>
											<blockquote className="border-l-2 border-accent/50 pl-5 py-3 bg-accent/5 rounded-r-xl italic text-foreground/85 font-display text-lg md:text-xl mt-6">
												"Quand le dernier arbre aura été
												abattu, quand la dernière
												rivière aura été empoisonnée,
												quand le dernier poisson aura
												été péché, alors enfin nous
												saurons que l'argent ne se mange
												pas."
												<footer className="mt-2 text-sm text-muted-foreground not-italic">
													— Amérindia
												</footer>
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
												aria-hidden="true"
											/>
											<div className="relative w-full aspect-[4/3] rounded-2xl md:rounded-3xl transition-all duration-700 group-hover:scale-[1.02]">
												<Image
													src="/assets/arbre-lumiere.webp"
													alt="Grand arbre illuminé par un soleil couchant"
													fill
													sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
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

					{/* Today & Gratitude */}
					<section
						className="py-16 md:py-20 lg:py-24 relative"
						aria-labelledby="today-title"
					>
						<AstroStars count={10} />
						<div className="container mx-auto px-4 sm:px-6 lg:px-8">
							<AnimatedSection>
								<div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center max-w-5xl mx-auto">
									<figure
										className="
    relative
    mx-auto
    w-[240px]
    sm:w-[280px]
    md:w-[320px]
    lg:w-5/12
    group
  "
									>
										{" "}
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
													sizes="(max-width: 640px) 320px, (max-width: 768px) 384px, (max-width: 1024px) 448px, 40vw"
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
											<p className="text-foreground leading-relaxed">
												Je remercie toutes les personnes
												qui m'ont accompagnée sur mon
												chemin et m'ont aidée à
												comprendre, à voir les choses
												autrement, à reconnaître mes
												erreurs et à développer mes
												ressources personnelles (coachs,
												énergéticiens, sophrologues,
												guérisseurs).{" "}
												<strong>
													Chacun d'eux, à sa manière,
													a déclenché chez moi une
													évolution qui fait la
													personne que je suis
													aujourd'hui
												</strong>
												.
											</p>
											<p>
												J'ai aussi l'énorme chance
												d'être mariée à mon grand amour
												et d'être maman de deux enfants
												qui sont autant ma force que ma
												déstabilisation quotidienne,
												mais qui sont aussi mes
												meilleurs enseignants de la «
												vie ».
											</p>
											<p className="text-foreground font-medium border-l-2 border-gold/40 pl-4">
												Grâce à eux, je{" "}
												<strong>
													continue d'apprendre,
													d'aimer, de me transformer
												</strong>
												. Et c'est avec cette
												expérience, cette authenticité
												et cette sensibilité que je vous
												accompagne, pour vous aider à
												votre tour à{" "}
												<strong>
													vous reconnecter à votre
													essence
												</strong>
												, à comprendre votre histoire et
												à continuer de marcher.
											</p>
											<p className="text-foreground font-medium text-lg md:text-xl font-display pt-2">
												L'amour sauve de tout, mais pour
												ma part, c'est vrai.
											</p>
										</div>
									</article>
								</div>
							</AnimatedSection>

							{/* Current Projects Section */}
							<AnimatedSection className="mt-12 md:mt-16">
								<div className="max-w-3xl mx-auto bg-card/50 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 sm:p-8 shadow-soft border border-border/20">
									<h3 className="font-display text-xl md:text-2xl text-gold mb-4 text-center">
										<span className="font-calligraphic text-gold text-2xl md:text-3xl">
											E
										</span>
										t maintenant ?
									</h3>
									<ul className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
										<li className="flex items-start gap-3">
											<span className="text-accent mt-1">
												•
											</span>
											<p>
												Je continue de lire et de me
												former dans ces domaines mais
												aussi sur des approches
												complémentaires dès que j'en ai
												l'occasion et que j'en ressens
												le besoin.
											</p>
										</li>
										<li className="flex items-start gap-3">
											<span className="text-accent mt-1">
												•
											</span>
											<p>
												J'ai des projets de partenariats
												pour continuer de transmettre
												car j'ai vraiment pris
												conscience ces derniers mois que
												ces moments de partage faisait
												vibrer mon cœur
											</p>
										</li>
										<li className="flex items-start gap-3">
											<span className="text-accent mt-1">
												•
											</span>
											<p>
												J'ai des projets d'évolution
												pour Lylusio qui j'espère se
												mettront en place dès cette
												année !
											</p>
										</li>
									</ul>
								</div>
							</AnimatedSection>
						</div>
					</section>

					{/* Testimonials Section */}
					<section
						className="relative py-16 md:py-20 lg:py-24 overflow-hidden"
						aria-labelledby="testimonials-title"
					>
						<div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-secondary/20 to-transparent" />
						<AstroStars count={20} />
						<div className="absolute top-10 right-8 pointer-events-none">
							<GoldenPlantBadge
								size="md"
								animate
								className="opacity-50"
							/>
						</div>

						<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
							<AnimatedSection>
								<header className="text-center mb-12 md:mb-16">
									<h2
										id="testimonials-title"
										className="font-display text-3xl md:text-4xl text-foreground mb-4"
									>
										Comment mes proches me perçoivent
									</h2>
									<p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
										Pour mieux me décrire, j'ai demandé à
										mes <strong>proches</strong> (amis,
										famille…) de me partager leurs
										témoignages avec{" "}
										<strong>sincérité</strong>. J'ai été
										surprise par leurs retours. C'est fou
										comme nous ne nous voyons jamais à
										travers les yeux des autres :
									</p>
								</header>
							</AnimatedSection>

							<div className="max-w-4xl mx-auto space-y-8 md:space-y-10">
								{/* Testimonial 1 */}
								<AnimatedSection>
									<div className="bg-card/70 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 sm:p-8 shadow-soft border border-border/20">
										<Quote
											className="w-10 h-10 text-accent/30 mb-4"
											aria-hidden="true"
										/>
										<blockquote className="text-muted-foreground text-base md:text-lg leading-relaxed italic">
											"C'est une personne remplie d'
											<strong className="text-foreground">
												amour
											</strong>{" "}
											et de{" "}
											<strong className="text-foreground">
												bienveillance
											</strong>
											. On se sent en{" "}
											<strong className="text-foreground">
												confiance
											</strong>
											, dans un espace sécurisé où chacun
											peut s'exprimer librement sans
											craindre le{" "}
											<strong className="text-foreground">
												jugement
											</strong>
											. Émilie possède le{" "}
											<strong className="text-foreground">
												don de réconforter
											</strong>{" "}
											les autres simplement en écoutant et
											en partageant. Sa{" "}
											<strong className="text-foreground">
												voix douce
											</strong>{" "}
											reflète sa{" "}
											<strong className="text-foreground">
												bonté
											</strong>{" "}
											et apaise les âmes."
										</blockquote>
									</div>
								</AnimatedSection>

								{/* Testimonial 2 */}
								<AnimatedSection>
									<div className="bg-card/70 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 sm:p-8 shadow-soft border border-border/20">
										<Quote
											className="w-10 h-10 text-accent/30 mb-4"
											aria-hidden="true"
										/>
										<blockquote className="text-muted-foreground text-base md:text-lg leading-relaxed italic">
											"Je la trouve très{" "}
											<strong className="text-foreground">
												exigeante envers elle-même
											</strong>
											, car elle vise toujours l'
											<strong className="text-foreground">
												excellence
											</strong>{" "}
											et cherche à se dépasser dans tout
											ce qu'elle entreprend. Cependant,
											cette quête incessante de perfection
											peut parfois la rendre{" "}
											<strong className="text-foreground">
												vulnérable
											</strong>
											, car elle est souvent trop dure
											avec elle-même et avec ses proches."
										</blockquote>
									</div>
								</AnimatedSection>

								{/* Testimonial 3 */}
								<AnimatedSection>
									<div className="bg-card/70 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 sm:p-8 shadow-soft border border-border/20">
										<Quote
											className="w-10 h-10 text-accent/30 mb-4"
											aria-hidden="true"
										/>
										<blockquote className="text-muted-foreground text-base md:text-lg leading-relaxed italic">
											"Elle possède une{" "}
											<strong className="text-foreground">
												empathie naturelle
											</strong>{" "}
											qui lui permet de ressentir toutes
											les joies et les peines des autres
											de manière{" "}
											<strong className="text-foreground">
												authentique
											</strong>{" "}
											et{" "}
											<strong className="text-foreground">
												sincère
											</strong>
											. Elle vit ses{" "}
											<strong className="text-foreground">
												émotions
											</strong>{" "}
											avec une telle intensité qu'il lui
											arrive d'être submergée, ressentant
											chaque douleur, mais c'est aussi la
											clé de sa{" "}
											<strong className="text-foreground">
												connexion profonde
											</strong>{" "}
											avec les autres, créant des{" "}
											<strong className="text-foreground">
												liens authentiques
											</strong>{" "}
											basés sur l'
											<strong className="text-foreground">
												amour
											</strong>{" "}
											et la{" "}
											<strong className="text-foreground">
												compréhension
											</strong>
											."
										</blockquote>
									</div>
								</AnimatedSection>

								{/* Testimonial 4 */}
								<AnimatedSection>
									<div className="bg-card/70 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 sm:p-8 shadow-soft border border-border/20">
										<Quote
											className="w-10 h-10 text-accent/30 mb-4"
											aria-hidden="true"
										/>
										<blockquote className="text-muted-foreground text-base md:text-lg leading-relaxed italic space-y-4">
											<p>
												"Faisant appel fréquemment à
												Émilie et à ses compétences et
												qualités en tant qu'
												<strong className="text-foreground">
													amie, astrologue, coach
												</strong>
												… je dois dire que ces fameux
												qualificatifs demeurent
												immuables chez elle.{" "}
												<strong className="text-foreground">
													Inchangés depuis toutes ces
													années, devenus son socle,
													sa base
												</strong>
												. Cette stabilité qu'elle
												dégage, ce calme intérieur,
												qu'elle possède me{" "}
												<strong className="text-foreground">
													font beaucoup beaucoup de
													bien à chaque fois que nous
													échangeons toutes les deux
												</strong>
												. Aussi bien par sa{" "}
												<strong className="text-foreground">
													présence et l'énergie
													qu'elle émane
												</strong>
												, que le ton de sa voix et les
												mots choisis, toujours emplies
												de bienveillance et de vérité."
											</p>
											<p>
												"Elle a cette manière bien à
												elle de{" "}
												<strong className="text-foreground">
													vulgariser l'astrologie
												</strong>
												, de restituer l'information au
												moment opportun, pertinent,{" "}
												<strong className="text-foreground">
													piquant parfois mais
													bon/juste d'entendre
												</strong>
												. Elle fait de{" "}
												<strong className="text-foreground">
													l'astrologie non pas un
													outil prédictif mais de
													guidance, de compréhension
												</strong>{" "}
												et donc, de soutien/d'appui."
											</p>
										</blockquote>
									</div>
								</AnimatedSection>
							</div>
						</div>
					</section>

					{/* Final CTA */}
					<section className="py-16 md:py-20 relative">
						<AstroStars count={12} />
						<div className="container mx-auto px-4 sm:px-6 lg:px-8">
							<AnimatedSection>
								<div className="max-w-2xl mx-auto text-center bg-card/60 backdrop-blur-sm rounded-2xl md:rounded-3xl p-8 md:p-10 shadow-soft border border-border/20">
									<GoldenPlantBadge
										size="lg"
										className="mx-auto mb-6 animate-gentle-pulse drop-shadow-[0_0_6px_rgba(212,175,55,0.45)]"
									/>
									<p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
										Prête à commencer votre transformation ?
										Je serais ravie de vous accompagner dans
										votre cheminement personnel.
									</p>
									<Link href="https://calendly.com/lylusio-fr">
										<Button
											variant="accent"
											size="lg"
											className="w-full sm:w-auto"
										>
											Prenez rendez-vous dès maintenant
											<ArrowRight className="ml-2 w-4 h-4" />
										</Button>
									</Link>
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
									<AnimatedSection key={value.title}>
										<li
											className="text-center bg-card/70 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-soft border border-border/20 h-full transition-all duration-300 hover:shadow-medium hover:border-accent/20 hover:-translate-y-1"
											style={{
												animationDelay: `${value.delay}ms`,
											}}
										>
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
