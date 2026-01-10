"use client";

import Link from "next/link";
import Image from "next/image";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import GoldenPlantBadge from "@/components/GoldenPlantBadge";
import FloatingParticles from "@/components/FloatingParticles";
import { Button } from "@/components/ui/button";
import { Heart, Ear, Shield, ArrowRight } from "lucide-react";
import { useParallax } from "@/hooks/useParallax";
import { useInView } from "@/hooks/useInView";

/* -------------------------------------------------------------------------- */
/*                                   DATA                                     */
/* -------------------------------------------------------------------------- */

const symptoms = [
	"Anxiété, stress",
	"Surcharge émotionnelle",
	"Contrôle, difficulté à lâcher prise sur les événements ou les personnes",
	"Troubles du sommeil",
	"Épuisement, fatigue, manque d'entrain",
	"Manque de confiance en soi, blocages pour avancer ou prendre des décisions",
	"Peurs, phobies",
];

const therapiesPhysiques = [
	"La naturopathie",
	"La médecine ayurvédique",
	"La médecine traditionnelle chinoise",
	"L'acupuncture",
	"La réflexologie",
	"Les massages",
	"Le yoga",
];

const therapiesEnergetiques = [
	"Soins énergétiques",
	"Soin Reiki",
	"Soin Lahochi",
];

const therapiesMentales = [
	"La sophrologie",
	"La kinésiologie",
	"L'hypnose, l'EFT et la programmation neuro-linguistique (PNL)",
	"La relation d'aide (approche humaniste de Carl Rogers) et les différentes psychanalyses",
];

const qualities = [
	{
		icon: Heart,
		title: "Être cohérente",
		description:
			"Établir une ligne de conduite claire dès le départ, être transparente sur ce que vous attendez de moi et sur ce que je mets en place pour vous accompagner.",
	},
	{
		icon: Ear,
		title: "Être présente",
		description:
			"Un accompagnement basé sur l'écoute, la bienveillance, le respect et l'empathie, sans jugement.",
	},
	{
		icon: Shield,
		title: "Être humble",
		description:
			"Rester à ma juste place d'accompagnante, favoriser votre autonomie et ne jamais me substituer à un suivi médical.",
	},
];

/* -------------------------------------------------------------------------- */
/*                                   PAGE                                     */
/* -------------------------------------------------------------------------- */

const TherapieHolistique = () => {
	const parallaxOffset = useParallax(0.12);
	const parallaxOffsetSlow = useParallax(0.06);
	const { ref: heroRef, isInView: heroInView } = useInView({
		threshold: 0.1,
	});
	const { ref: definitionRef, isInView: definitionInView } = useInView({
		threshold: 0.1,
	});
	const { ref: pourQuiRef, isInView: pourQuiInView } = useInView({
		threshold: 0.1,
	});
	const { ref: qualitiesRef, isInView: qualitiesInView } = useInView({
		threshold: 0.1,
	});
	const { ref: therapiesRef, isInView: therapiesInView } = useInView({
		threshold: 0.1,
	});
	const { ref: reikiRef, isInView: reikiInView } = useInView({
		threshold: 0.1,
	});

	return (
		<>
			<div className="min-h-screen bg-background relative">
				<FloatingParticles count={20} />
				<a href="#main-content" className="skip-link">
					Aller au contenu principal
				</a>
				<Header />
				<Breadcrumbs />

				<main
					id="main-content"
					className="pt-20 sm:pt-24 md:pt-28 pb-16 md:pb-24 relative overflow-hidden"
				>
					{/* Hero Section with Full Background Image */}
					<section
						ref={heroRef}
						className="relative min-h-[70vh] sm:min-h-[80vh] md:min-h-[85vh] flex items-center overflow-hidden mb-12 md:mb-24"
					>
						{/* Background image with parallax */}
						<div className="absolute inset-0" aria-hidden="true">
							<div
								className="relative w-full h-[120%] -mt-[10%]"
								style={{
									transform: `translate3d(0, ${parallaxOffset}px, 0) scale(1.05)`,
								}}
							>
								<Image
									src="/assets/therapie-holistique-card.webp"
									alt=""
									fill
									className="object-cover"
									priority
									sizes="100vw"
								/>
							</div>
							{/* Multi-layer gradient overlays for glass effect */}
							<div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/75 to-background/30" />
							<div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
							<div className="absolute inset-0 backdrop-blur-[2px]" />
						</div>

						{/* Animated ambient orbs - hidden on mobile for performance */}
						<div
							className="absolute inset-0 pointer-events-none overflow-hidden hidden sm:block"
							aria-hidden="true"
						>
							<div
								className="absolute top-1/4 right-1/4 w-[300px] md:w-[400px] h-[300px] md:h-[400px] rounded-full opacity-30"
								style={{
									background:
										"radial-gradient(circle, hsl(var(--gold) / 0.2) 0%, transparent 70%)",
									transform: `translateY(${parallaxOffsetSlow}px)`,
								}}
							/>
							<div
								className="absolute bottom-1/3 left-10 w-[200px] md:w-[300px] h-[200px] md:h-[300px] rounded-full opacity-25"
								style={{
									background:
										"radial-gradient(circle, hsl(var(--accent) / 0.15) 0%, transparent 70%)",
									transform: `translateY(${
										-parallaxOffsetSlow * 0.8
									}px)`,
								}}
							/>
						</div>

						{/* Content */}
						<div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
							<div className="max-w-2xl">
								<div
									className={`transition-all duration-1000 ${
										heroInView
											? "opacity-100 translate-y-0"
											: "opacity-0 translate-y-12"
									}`}
								>
									<div className="inline-flex items-center gap-2 px-4 py-2 bg-card/60 backdrop-blur-md rounded-full mb-6 border border-gold/20">
										<Heart className="w-4 h-4 text-gold" />
										<span className="text-sm text-foreground font-medium">
											Approche Holistique
										</span>
									</div>

									<h1 className="text-foreground text-4xl md:text-5xl mb-4 sm:mb-6 leading-tight">
										<span className="font-calligraphic text-accent text-5xl md:text-6xl inline-block align-baseline">
											T
										</span>
										hérapie Holistique
									</h1>

									<p className="text-2xl sm:text-3xl text-accent font-display mb-6">
										Un accompagnement global corps-esprit
									</p>

									<p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
										Découvrez une approche qui considère
										l'être humain dans sa globalité.
										<br />
										<span className="text-foreground font-semibold mt-2">
											La thérapie holistique associe
											différentes pratiques pour vous
											accompagner vers un bien-être
											profond et durable.
										</span>
									</p>

									<div className="flex flex-col sm:flex-row gap-4">
										<Link href="/accompagnement-toulouse">
											<Button
												variant="elegant"
												size="lg"
												className="group w-full sm:w-auto"
											>
												Découvrir l'accompagnement
												<ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
											</Button>
										</Link>
									</div>
								</div>
							</div>
						</div>

						{/* Floating badge - smaller on mobile */}
						<GoldenPlantBadge
							size="md"
							className="absolute bottom-20 sm:bottom-12 right-4 sm:right-8 md:right-16 z-10 opacity-70 sm:opacity-80"
						/>

						{/* Scroll indicator - hidden on very small screens */}
						<div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce hidden xs:flex">
							<div className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border-2 border-foreground/20 flex justify-center pt-1.5 sm:pt-2">
								<div className="w-1 h-2 sm:w-1.5 sm:h-3 bg-foreground/40 rounded-full animate-pulse" />
							</div>
						</div>
					</section>

					{/* Définition - Glass Card over Image */}
					<section
						ref={definitionRef}
						className="relative mb-20 md:mb-28 overflow-hidden"
					>
						<div className="container mx-auto px-4 sm:px-6 lg:px-8">
							<div
								className={`max-w-5xl mx-auto transition-all duration-1000 ${
									definitionInView
										? "opacity-100 translate-y-0"
										: "opacity-0 translate-y-12"
								}`}
							>
								<div className="text-center mb-12">
									<p className="section-label">Définition</p>
									<h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground">
										Qu'est-ce que la thérapie holistique ?
									</h2>
								</div>

								<article className="bg-card/70 backdrop-blur-xl rounded-2xl md:rounded-3xl p-8 md:p-12 border border-border/30 shadow-xl">
									<blockquote className="mb-10 text-xl md:text-2xl italic text-foreground text-center font-display leading-relaxed">
										Le terme « holistique » vient du grec{" "}
										<em>holos</em> qui signifie « tout ». La
										thérapie est un chemin de soin qui
										considère l'être humain dans sa
										globalité.
									</blockquote>

									<div className="grid gap-10 lg:grid-cols-2 items-center">
										<div className="relative aspect-[4/5] w-full max-w-sm mx-auto overflow-hidden rounded-2xl shadow-medium">
											<Image
												src="/assets/buddha-meditation.webp"
												alt="Bouddha en méditation symbolisant la paix intérieure et l'approche holistique"
												fill
												className="object-cover"
												sizes="(max-width: 768px) 100vw, 400px"
											/>
										</div>

										<div className="space-y-6 text-muted-foreground leading-relaxed">
											<p>
												La thérapie holistique
												accompagne l'humain dans sa
												<strong>
													{" "}
													globalité et son unicité
												</strong>
												. Elle s'inspire notamment des
												médecines orientales ancestrales
												comme l'ayurvéda ou la médecine
												traditionnelle chinoise.
											</p>

											<p>
												Contrairement à la médecine
												conventionnelle occidentale,
												elle ne s'intéresse pas
												uniquement aux symptômes, mais
												cherche à comprendre les causes
												profondes du déséquilibre vécu
												par la personne.
											</p>

											<div className="bg-gradient-sand-center/30 rounded-xl p-6 border border-accent/10">
												<p className="text-sm">
													<strong>Important :</strong>{" "}
													Les thérapies holistiques ne
													se substituent jamais à un
													suivi médical. Aucun
													diagnostic ni prescription
													médicale n'est effectué.
												</p>
											</div>
										</div>
									</div>
								</article>
							</div>
						</div>
					</section>

					{/* Pour qui - Colored section */}
					<section
						ref={pourQuiRef}
						className="relative py-16 md:py-24 mb-20 md:mb-28 overflow-hidden"
					>
						{/* Subtle background pattern */}
						<div
							className="absolute inset-0 -z-10"
							aria-hidden="true"
						>
							<div
								className="absolute inset-0 opacity-[0.03]"
								style={{
									backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
								}}
							/>
							<div className="absolute inset-0 bg-gradient-to-b from-sand/40 via-background to-background" />
						</div>

						<div className="container mx-auto px-4 sm:px-6 lg:px-8">
							<div className="max-w-5xl mx-auto">
								<div
									className={`transition-all duration-1000 ${
										pourQuiInView
											? "opacity-100 translate-y-0"
											: "opacity-0 translate-y-8"
									}`}
								>
									<h2 className="mb-6 text-center font-display text-2xl sm:text-3xl md:text-4xl text-foreground">
										Est-ce que cela s'adresse à moi ?
									</h2>

									<p className="mb-12 text-center text-muted-foreground text-lg">
										Vous vous reconnaissez dans l'une ou
										plusieurs de ces situations ?
									</p>
								</div>

								<div className="grid gap-4 sm:grid-cols-2 mb-12">
									{symptoms.map((item, i) => (
										<div
											key={i}
											className={`card-celestial flex items-start gap-3 p-4 transition-all duration-700 ${
												pourQuiInView
													? "opacity-100 translate-y-0"
													: "opacity-0 translate-y-12"
											}`}
											style={{
												transitionDelay: `${i * 100}ms`,
											}}
										>
											<span className="mt-1 text-accent text-lg">
												✦
											</span>
											<span className="text-muted-foreground">
												{item}
											</span>
										</div>
									))}
								</div>

								<div
									className={`card-celestial p-8 text-center max-w-3xl mx-auto transition-all duration-1000 delay-500 ${
										pourQuiInView
											? "opacity-100 translate-y-0"
											: "opacity-0 translate-y-8"
									}`}
								>
									<p className="text-muted-foreground text-left mb-4 leading-relaxed">
										La <strong>Thérapie holistique</strong>{" "}
										s'adresse à toute personne désireuse de
										découvrir une autre approche et{" "}
										<strong>
											d'aller travailler en profondeur sur
											les causes et non les symptômes pour
											amener une vraie prise de
											conscience.
										</strong>
									</p>
									<p className="font-display text-xl md:text-2xl text-gold italic mt-6">
										Qu'ai-je donc réellement besoin pour me
										sentir épanouie ?
									</p>
								</div>
							</div>
						</div>
					</section>

					{/* Qualités */}
					<section
						ref={qualitiesRef}
						className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20 md:mb-28"
					>
						<div className="max-w-5xl mx-auto">
							<div
								className={`transition-all duration-1000 ${
									qualitiesInView
										? "opacity-100 translate-y-0"
										: "opacity-0 translate-y-8"
								}`}
							>
								<div className="text-center mb-12">
									<p className="section-label">Valeurs</p>
									<h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground">
										Mes valeurs dans l'accompagnement
									</h2>
								</div>
							</div>

							<div className="grid gap-8 md:grid-cols-3">
								{qualities.map((q, i) => (
									<article
										key={i}
										className={`card-celestial text-center p-8 transition-all duration-700 ${
											qualitiesInView
												? "opacity-100 translate-y-0"
												: "opacity-0 translate-y-12"
										}`}
										style={{
											transitionDelay: `${i * 150}ms`,
										}}
									>
										<div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 border border-accent/20">
											<q.icon className="h-7 w-7 text-accent" />
										</div>
										<h3 className="mb-3 font-display text-lg text-foreground">
											{q.title}
										</h3>
										<p className="text-sm text-muted-foreground leading-relaxed">
											{q.description}
										</p>
									</article>
								))}
							</div>
						</div>
					</section>

					{/* Exemples de thérapies */}
					<section
						ref={therapiesRef}
						className="relative py-16 md:py-24 mb-20 md:mb-28 overflow-hidden"
					>
						{/* Subtle background */}
						<div
							className="absolute inset-0 -z-10"
							aria-hidden="true"
						>
							<div className="absolute inset-0 bg-gradient-to-b from-sand/30 via-background to-background" />
						</div>

						<div className="container mx-auto px-4 sm:px-6 lg:px-8">
							<div className="max-w-5xl mx-auto">
								<div
									className={`transition-all duration-1000 ${
										therapiesInView
											? "opacity-100 translate-y-0"
											: "opacity-0 translate-y-8"
									}`}
								>
									<h2 className="mb-4 text-center font-display text-2xl sm:text-3xl md:text-4xl text-foreground">
										Quelques exemples de Thérapies
										holistiques
									</h2>
									<p className="text-center text-muted-foreground mb-12 text-lg max-w-3xl mx-auto">
										Voici quelques exemples de Thérapies qui
										entrent dans le champ holistique et qui
										associent Corps – Émotionnel – Mental –
										Énergie.
									</p>
								</div>

								<div className="grid md:grid-cols-3 gap-6">
									{/* Corps physique */}
									<div
										className={`card-celestial p-6 transition-all duration-700 ${
											therapiesInView
												? "opacity-100 translate-y-0"
												: "opacity-0 translate-y-12"
										}`}
									>
										<div className="text-center mb-4">
											<span className="inline-block px-4 py-2 bg-accent/80 rounded-full text-navy/70 font-medium text-sm">
												1 – Pour le corps physique
											</span>
										</div>
										<ul className="space-y-2">
											{therapiesPhysiques.map(
												(item, index) => (
													<li
														key={index}
														className="flex items-center gap-2 text-muted-foreground text-sm"
													>
														<span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
														<span>{item}</span>
													</li>
												)
											)}
										</ul>
									</div>

									{/* Corps énergétique */}
									<div
										className={`card-celestial p-6 transition-all duration-700 delay-150 ${
											therapiesInView
												? "opacity-100 translate-y-0"
												: "opacity-0 translate-y-12"
										}`}
									>
										<div className="text-center mb-4">
											<span className="inline-block px-4 py-2 bg-accent/80 rounded-full text-navy/70 font-medium text-sm">
												2 – Pour le corps énergétique
											</span>
										</div>
										<p className="text-xs text-muted-foreground mb-4 italic">
											afin de libérer les émotions en
											complément et/ou commencer un
											processus de guérison :
										</p>
										<ul className="space-y-2">
											{therapiesEnergetiques.map(
												(item, index) => (
													<li
														key={index}
														className="flex items-center gap-2 text-muted-foreground text-sm"
													>
														<span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
														<span>{item}</span>
													</li>
												)
											)}
										</ul>
									</div>

									{/* Mental */}
									<div
										className={`card-celestial p-6 transition-all duration-700 delay-300 ${
											therapiesInView
												? "opacity-100 translate-y-0"
												: "opacity-0 translate-y-12"
										}`}
									>
										<div className="text-center mb-4">
											<span className="inline-block px-4 py-2 bg-accent/80 rounded-full text-navy/70 font-medium text-sm">
												3 – Pour libérer le mental
											</span>
										</div>
										<ul className="space-y-2">
											{therapiesMentales.map(
												(item, index) => (
													<li
														key={index}
														className="flex items-center gap-2 text-muted-foreground text-sm"
													>
														<span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
														<span>{item}</span>
													</li>
												)
											)}
										</ul>
									</div>
								</div>
							</div>
						</div>
					</section>

					{/* Reiki - Image Card */}
					<section
						ref={reikiRef}
						className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20 md:mb-28"
					>
						<div className="max-w-5xl mx-auto">
							<div
								className={`card-celestial overflow-hidden md:flex transition-all duration-1000 ${
									reikiInView
										? "opacity-100 translate-y-0"
										: "opacity-0 translate-y-12"
								}`}
							>
								<div className="relative md:w-2/5 min-h-[320px]">
									<Image
										src="/assets/reiki-healing.webp"
										alt="Soin Reiki - Énergie vitale et guérison holistique"
										fill
										className="object-cover"
										sizes="(max-width: 768px) 100vw, 40vw"
									/>
								</div>

								<div className="p-8 md:w-3/5 flex flex-col justify-center">
									<h3 className="mb-4 font-display text-2xl md:text-3xl text-foreground">
										Et le Reiki dans tout ça ?
									</h3>

									<p className="mb-4 text-muted-foreground leading-relaxed">
										Le Reiki fait partie des outils
										énergétiques que j'utilise lorsqu'ils
										sont justes et pertinents pour la
										personne, toujours dans une approche
										globale et respectueuse.
									</p>

									<p className="mb-6 text-muted-foreground leading-relaxed">
										Cette pratique japonaise ancestrale
										permet de rééquilibrer les énergies et
										de favoriser l'auto-guérison du corps et
										de l'esprit.
									</p>

									<Link href="/reiki-toulouse">
										<Button
											variant="elegant"
											className="group w-full sm:w-auto"
										>
											Découvrir le Reiki
											<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
										</Button>
									</Link>
								</div>
							</div>
						</div>
					</section>

					{/* CTA Contact */}
					<section className="relative py-16 md:py-24 overflow-hidden">
						<div
							className="absolute inset-0 -z-10"
							aria-hidden="true"
						>
							<div className="absolute inset-0 bg-gradient-to-b from-sand/40 via-background to-background" />
						</div>

						<div className="container mx-auto px-4 sm:px-6 lg:px-8">
							<div className="max-w-4xl mx-auto text-center">
								<GoldenPlantBadge className="mx-auto mb-6" />

								<h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground mb-6">
									Prête à commencer votre parcours ?
								</h2>

								<p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
									Je vous accompagne avec bienveillance et
									professionnalisme dans votre cheminement
									personnel vers un mieux-être global.
								</p>

								<Link href="/accompagnement-toulouse">
									<Button
										variant="elegant"
										size="lg"
										className="group"
									>
										Découvrir tous les accompagnements
										<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
									</Button>
								</Link>
							</div>
						</div>
					</section>
				</main>

				<Footer />
			</div>
		</>
	);
};

export default TherapieHolistique;
