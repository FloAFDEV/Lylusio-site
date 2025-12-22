import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

const Confidentialite = () => (
	<>
		<Helmet>
			<title>
				Politique de confidentialité | Lylusio - Émilie Perez Toulouse
			</title>
			<meta
				name="description"
				content="Politique de confidentialité du site Lylusio. Découvrez comment Émilie Perez protège vos données personnelles conformément au RGPD."
			/>
			<link rel="canonical" href="https://lylusio.fr/confidentialite" />
			<meta name="robots" content="noindex, follow" />
		</Helmet>

		<div className="min-h-screen bg-background">
			<a href="#main-content" className="skip-link">
				Aller au contenu principal
			</a>
			<Header />
			<Breadcrumbs />

			<main id="main-content" className="pb-16 md:pb-20">
				<article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
					{/* Header */}
					<header className="mb-10 md:mb-12">
						<h1 className="font-heading text-2xl sm:text-3xl md:text-4xl text-navy">
							<span className="font-calligraphic text-accent inline-block align-baseline  ">
								P
							</span>
							olitique de confidentialité
						</h1>
						<p className="text-muted-foreground text-sm mt-4">
							Dernière mise à jour : Décembre 2024
						</p>
					</header>

					<div className="prose prose-lg text-muted-foreground space-y-10">
						{/* Introduction */}
						<section aria-labelledby="intro">
							<p className="leading-relaxed text-lg">
								La protection de vos données personnelles est
								une priorité pour Lylusio. Cette politique de
								confidentialité vous informe sur la manière dont
								vos données sont collectées, utilisées et
								protégées conformément au Règlement Général sur
								la Protection des Données (RGPD).
							</p>
						</section>

						{/* Responsable */}
						<section aria-labelledby="responsable">
							<h2
								id="responsable"
								className="font-display text-xl sm:text-2xl text-foreground mb-4"
							>
								Responsable du traitement
							</h2>
							<address className="not-italic leading-relaxed">
								<strong className="text-foreground">
									Lylusio - Émilie Perez
								</strong>
								<br />
								49 route de Labastide, 31620 Cépet, France
								<br />
								Email :{" "}
								<a
									href="mailto:contact@lylusio.fr"
									className="text-accent hover:underline focus:outline-none focus:ring-2 focus:ring-accent"
								>
									contact@lylusio.fr
								</a>
								<br />
								Téléphone :{" "}
								<a
									href="tel:+33619151959"
									className="text-accent hover:underline focus:outline-none focus:ring-2 focus:ring-accent"
								>
									06 19 15 19 59
								</a>
							</address>
						</section>

						{/* Données collectées */}
						<section aria-labelledby="donnees">
							<h2
								id="donnees"
								className="font-display text-xl sm:text-2xl text-foreground mb-4"
							>
								Données collectées
							</h2>
							<p className="leading-relaxed mb-4">
								Les données personnelles collectées peuvent
								inclure :
							</p>
							<ul className="list-disc pl-6 space-y-2">
								<li>Nom et prénom</li>
								<li>Adresse email</li>
								<li>Numéro de téléphone</li>
								<li>
									Date, heure et lieu de naissance (pour les
									consultations astrologiques)
								</li>
							</ul>
							<p className="leading-relaxed mt-4">
								Ces données sont collectées uniquement dans le
								cadre de la prise de rendez-vous via Calendly et
								de la réalisation des prestations.
							</p>
						</section>

						{/* Base légale */}
						<section aria-labelledby="base-legale">
							<h2
								id="base-legale"
								className="font-display text-xl sm:text-2xl text-foreground mb-4"
							>
								Base légale du traitement
							</h2>
							<p className="leading-relaxed">
								Le traitement de vos données personnelles est
								fondé sur :
							</p>
							<ul className="list-disc pl-6 space-y-2 mt-4">
								<li>
									<strong className="text-foreground">
										L'exécution d'un contrat :
									</strong>{" "}
									pour la réalisation des prestations
									commandées
								</li>
								<li>
									<strong className="text-foreground">
										Votre consentement :
									</strong>{" "}
									pour l'envoi d'informations
								</li>
								<li>
									<strong className="text-foreground">
										L'intérêt légitime :
									</strong>{" "}
									pour l'amélioration de nos services
								</li>
							</ul>
						</section>

						{/* Utilisation */}
						<section aria-labelledby="utilisation">
							<h2
								id="utilisation"
								className="font-display text-xl sm:text-2xl text-foreground mb-4"
							>
								Utilisation des données
							</h2>
							<p className="leading-relaxed mb-4">
								Vos données sont utilisées pour :
							</p>
							<ul className="list-disc pl-6 space-y-2">
								<li>
									Gérer les prises de rendez-vous via Calendly
								</li>
								<li>
									Réaliser les consultations d'astrologie et
									soins Reiki
								</li>
								<li>
									Vous contacter dans le cadre du suivi de vos
									séances
								</li>
								<li>
									Améliorer la qualité des services proposés
								</li>
							</ul>
						</section>

						{/* Protection */}
						<section aria-labelledby="protection">
							<h2
								id="protection"
								className="font-display text-xl sm:text-2xl text-foreground mb-4"
							>
								Protection et conservation des données
							</h2>
							<p className="leading-relaxed">
								Vos données sont traitées avec le plus grand
								soin et ne sont jamais partagées avec des tiers
								sans votre consentement explicite.
							</p>
							<p className="leading-relaxed mt-4">
								Elles sont stockées de manière sécurisée et
								conservées pendant une durée maximale de 3 ans
								après votre dernière interaction avec nos
								services.
							</p>
						</section>

						{/* Cookies */}
						<section aria-labelledby="cookies">
							<h2
								id="cookies"
								className="font-display text-xl sm:text-2xl text-foreground mb-4"
							>
								Cookies
							</h2>
							<p className="leading-relaxed">
								Ce site utilise uniquement des cookies
								techniques essentiels au bon fonctionnement du
								site. Aucun cookie de tracking publicitaire
								n'est utilisé.
							</p>
							<p className="leading-relaxed mt-4">
								Vous pouvez configurer votre navigateur pour
								refuser les cookies, mais certaines
								fonctionnalités du site pourraient ne plus
								fonctionner correctement.
							</p>
						</section>

						{/* Droits */}
						<section aria-labelledby="droits">
							<h2
								id="droits"
								className="font-display text-xl sm:text-2xl text-foreground mb-4"
							>
								Vos droits (RGPD)
							</h2>
							<p className="leading-relaxed mb-4">
								Conformément au Règlement Général sur la
								Protection des Données, vous disposez des droits
								suivants :
							</p>
							<ul className="list-disc pl-6 space-y-2">
								<li>
									<strong className="text-foreground">
										Droit d'accès :
									</strong>{" "}
									obtenir une copie de vos données
								</li>
								<li>
									<strong className="text-foreground">
										Droit de rectification :
									</strong>{" "}
									corriger des données inexactes
								</li>
								<li>
									<strong className="text-foreground">
										Droit à l'effacement :
									</strong>{" "}
									demander la suppression de vos données
								</li>
								<li>
									<strong className="text-foreground">
										Droit à la portabilité :
									</strong>{" "}
									récupérer vos données dans un format lisible
								</li>
								<li>
									<strong className="text-foreground">
										Droit d'opposition :
									</strong>{" "}
									vous opposer au traitement de vos données
								</li>
								<li>
									<strong className="text-foreground">
										Droit de limitation :
									</strong>{" "}
									limiter l'utilisation de vos données
								</li>
							</ul>
							<p className="leading-relaxed mt-4">
								Pour exercer ces droits, contactez-moi à{" "}
								<a
									href="mailto:contact@lylusio.fr"
									className="text-accent hover:underline focus:outline-none focus:ring-2 focus:ring-accent"
								>
									contact@lylusio.fr
								</a>
								. Une réponse vous sera apportée sous 30 jours.
							</p>
							<p className="leading-relaxed mt-4">
								Vous avez également le droit de déposer une
								réclamation auprès de la CNIL (
								<a
									href="https://www.cnil.fr"
									target="_blank"
									rel="noopener noreferrer"
									className="text-accent hover:underline"
								>
									www.cnil.fr
								</a>
								).
							</p>
						</section>

						{/* Liens internes */}
						<section aria-labelledby="liens">
							<h2
								id="liens"
								className="font-display text-xl sm:text-2xl text-foreground mb-4"
							>
								Liens utiles
							</h2>
							<ul className="space-y-2">
								<li>
									<Link
										to="/mentions-legales"
										className="text-accent hover:underline focus:outline-none focus:ring-2 focus:ring-accent"
									>
										Mentions légales
									</Link>
								</li>
								<li>
									<Link
										to="/cgu"
										className="text-accent hover:underline focus:outline-none focus:ring-2 focus:ring-accent"
									>
										Conditions Générales d'Utilisation
									</Link>
								</li>
								<li>
									<Link
										to="/contact"
										className="text-accent hover:underline focus:outline-none focus:ring-2 focus:ring-accent"
									>
										Nous contacter
									</Link>
								</li>
							</ul>
						</section>
					</div>
				</article>
			</main>

			<Footer />
		</div>
	</>
);

export default Confidentialite;
