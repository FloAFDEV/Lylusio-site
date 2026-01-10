"use client";

import Link from "next/link";
import Image from "next/image";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import GoldenPlantBadge from "@/components/GoldenPlantBadge";

const CGU = () => {
	return (
		<>
			{/* SEO metadata handled by Next.js Metadata API */}

			<Header />
			<main id="main-content" className="min-h-screen bg-background">
				<a href="#main-content" className="skip-link">
					Aller au contenu principal
				</a>
				<Breadcrumbs />

				<article className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
					<div className="max-w-3xl mx-auto relative">
						{/* Decorative plant badge */}
						<GoldenPlantBadge
							size="lg"
							className="absolute -top-4 right-0 opacity-40 hidden sm:flex"
						/>

						<header className="mb-10">
							<h1 className="font-heading text-2xl sm:text-3xl md:text-4xl text-navy">
								<span className="font-calligraphic text-accent inline-block align-baseline  ">
									C
								</span>
								onditions Générales d'Utilisation
							</h1>

							<p className="text-muted-foreground mt-4">
								Dernière mise à jour : Décembre 2024
							</p>
						</header>

						<div className="prose prose-lg prose-navy max-w-none space-y-8">
							<section>
								<h2 className="font-heading text-xl text-navy mb-4">
									1. Objet
								</h2>
								<p className="text-foreground/80 leading-relaxed">
									Les présentes Conditions Générales
									d'Utilisation (CGU) ont pour objet de
									définir les modalités et conditions
									d'utilisation du site internet lylusio.fr,
									ainsi que de définir les droits et
									obligations des parties dans ce cadre.
								</p>
								<p className="text-foreground/80 leading-relaxed mt-4">
									En naviguant sur ce site, vous acceptez sans
									réserve les présentes CGU.
								</p>
							</section>

							<section>
								<h2 className="font-heading text-xl text-navy mb-4">
									2. Mentions légales
								</h2>
								<p className="text-foreground/80 leading-relaxed">
									<strong>Éditeur du site :</strong>
									<br />
									Émilie Perez - Lylusio
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
								</p>
								<p className="text-foreground/80 leading-relaxed mt-4">
									<strong>Hébergement :</strong>
									<br />
									Netlify, Inc. - San Francisco, CA,
									États-Unis
								</p>
								<p className="text-foreground/80 leading-relaxed mt-4">
									Pour plus de détails, consultez nos{" "}
									<Link
										href="/mentions-legales"
										className="text-accent hover:underline focus:outline-none focus:ring-2 focus:ring-accent"
									>
										mentions légales complètes
									</Link>
									.
								</p>
							</section>

							<section>
								<h2 className="font-heading text-xl text-navy mb-4">
									3. Accès au site
								</h2>
								<p className="text-foreground/80 leading-relaxed">
									Le site est accessible gratuitement depuis
									n'importe quel lieu à tout utilisateur
									disposant d'un accès à Internet. Tous les
									frais supportés par l'utilisateur pour
									accéder au service (matériel informatique,
									logiciels, connexion Internet, etc.) sont à
									sa charge.
								</p>
								<p className="text-foreground/80 leading-relaxed mt-4">
									L'éditeur met en œuvre tous les moyens
									raisonnables pour assurer un accès de
									qualité au site, mais n'est tenu à aucune
									obligation d'y parvenir.
								</p>
							</section>

							<section>
								<h2 className="font-heading text-xl text-navy mb-4">
									4. Services proposés
								</h2>
								<p className="text-foreground/80 leading-relaxed">
									Le site lylusio.fr propose les services
									suivants :
								</p>
								<ul className="list-disc list-inside text-foreground/80 space-y-2 mt-4">
									<li>
										<Link
											href="/astrologie-toulouse"
											className="text-accent hover:underline"
										>
											Consultations en astrologie
											symbolique et psychologique
										</Link>
									</li>
									<li>
										<Link
											href="/reiki-toulouse"
											className="text-accent hover:underline"
										>
											Séances de thérapie énergétique
											Reiki
										</Link>
									</li>
									<li>
										<Link
											href="/accompagnement-toulouse"
											className="text-accent hover:underline"
										>
											Accompagnement personnalisé pour les
											transitions de vie
										</Link>
									</li>
									<li>
										<Link
											href="/blog"
											className="text-accent hover:underline"
										>
											Contenu informatif via le blog
										</Link>
									</li>
								</ul>
							</section>

							<section>
								<h2 className="font-heading text-xl text-navy mb-4">
									5. Propriété intellectuelle
								</h2>
								<p className="text-foreground/80 leading-relaxed">
									Tous les éléments du site (textes, images,
									graphismes, logo, icônes, sons, logiciels,
									etc.) sont la propriété exclusive de Lylusio
									- Émilie Perez, à l'exception des marques,
									logos ou contenus appartenant à d'autres
									sociétés partenaires ou auteurs.
								</p>
								<p className="text-foreground/80 leading-relaxed mt-4">
									Toute reproduction, représentation,
									modification, publication, adaptation de
									tout ou partie des éléments du site, quel
									que soit le moyen ou le procédé utilisé, est
									interdite, sauf autorisation écrite
									préalable.
								</p>
							</section>

							<section>
								<h2 className="font-heading text-xl text-navy mb-4">
									6. Responsabilité et avertissement
								</h2>
								<p className="text-foreground/80 leading-relaxed">
									<strong className="text-navy">
										Important :
									</strong>{" "}
									Les séances d'astrologie et de Reiki
									proposées par Lylusio ne se substituent en
									aucun cas à un traitement médical,
									psychologique ou psychiatrique. Elles
									représentent un accompagnement
									complémentaire et ne permettent pas
									d'établir un diagnostic médical.
								</p>
								<p className="text-foreground/80 leading-relaxed mt-4">
									L'utilisateur est seul responsable de
									l'utilisation qu'il fait des informations
									fournies sur le site et des décisions qu'il
									prend suite aux séances.
								</p>
								<p className="text-foreground/80 leading-relaxed mt-4">
									En cas de problème de santé, consultez
									toujours un professionnel de santé qualifié.
								</p>
							</section>

							<section>
								<h2 className="font-heading text-xl text-navy mb-4">
									7. Prise de rendez-vous et annulation
								</h2>
								<p className="text-foreground/80 leading-relaxed">
									Les rendez-vous sont pris via la plateforme
									Calendly. Lors de la réservation, vous
									acceptez les présentes conditions.
								</p>
								<p className="text-foreground/80 leading-relaxed mt-4">
									<strong>Conditions d'annulation :</strong>
								</p>
								<ul className="list-disc list-inside text-foreground/80 space-y-2 mt-2">
									<li>
										Annulation gratuite jusqu'à 24 heures
										avant le rendez-vous
									</li>
									<li>
										En cas d'annulation tardive (moins de
										24h) ou de non-présentation, la séance
										pourra être facturée en totalité
									</li>
									<li>
										Report possible sous réserve de
										disponibilité
									</li>
								</ul>
							</section>

							<section>
								<h2 className="font-heading text-xl text-navy mb-4">
									8. Tarifs et paiement
								</h2>
								<p className="text-foreground/80 leading-relaxed">
									Les tarifs des prestations sont indiqués sur
									la page{" "}
									<Link
										href="/accompagnement-toulouse"
										className="text-accent hover:underline"
									>
										Accompagnement & Tarifs
									</Link>{" "}
									et peuvent être modifiés à tout moment. Les
									tarifs applicables sont ceux en vigueur au
									moment de la prise de rendez-vous.
								</p>
								<p className="text-foreground/80 leading-relaxed mt-4">
									Le paiement s'effectue à la fin de la
									séance, sauf accord préalable.
								</p>
							</section>

							<section>
								<h2 className="font-heading text-xl text-navy mb-4">
									9. Protection des données personnelles
								</h2>
								<p className="text-foreground/80 leading-relaxed">
									Le traitement des données personnelles est
									détaillé dans notre{" "}
									<Link
										href="/confidentialite"
										className="text-accent hover:underline focus:outline-none focus:ring-2 focus:ring-accent"
									>
										Politique de Confidentialité
									</Link>
									.
								</p>
								<p className="text-foreground/80 leading-relaxed mt-4">
									Conformément au RGPD, vous disposez d'un
									droit d'accès, de rectification et de
									suppression de vos données personnelles.
								</p>
							</section>

							<section>
								<h2 className="font-heading text-xl text-navy mb-4">
									10. Modifications des CGU
								</h2>
								<p className="text-foreground/80 leading-relaxed">
									Lylusio se réserve le droit de modifier les
									présentes CGU à tout moment. Les
									utilisateurs seront informés de toute
									modification significative via le site.
								</p>
								<p className="text-foreground/80 leading-relaxed mt-4">
									La date de dernière mise à jour est indiquée
									en haut de cette page.
								</p>
							</section>

							<section>
								<h2 className="font-heading text-xl text-navy mb-4">
									11. Droit applicable et litiges
								</h2>
								<p className="text-foreground/80 leading-relaxed">
									Les présentes CGU sont soumises au droit
									français. En cas de litige, et après
									tentative de recherche d'une solution
									amiable, les tribunaux de Toulouse seront
									compétents.
								</p>
							</section>

							<section>
								<h2 className="font-heading text-xl text-navy mb-4">
									12. Contact
								</h2>
								<p className="text-foreground/80 leading-relaxed">
									Pour toute question relative aux présentes
									CGU, vous pouvez :<br />
									<Link
										href="/contact"
										className="text-accent hover:underline"
									>
										Nous contacter via le formulaire
									</Link>
									<br />
									Email :{" "}
									<a
										href="mailto:contact@lylusio.fr"
										className="text-accent hover:underline"
									>
										contact@lylusio.fr
									</a>
									<br />
									Téléphone :{" "}
									<a
										href="tel:+33619151959"
										className="text-accent hover:underline"
									>
										06 19 15 19 59
									</a>
								</p>
							</section>

							{/* Liens internes pour maillage */}
							<section>
								<h2 className="font-heading text-xl text-navy mb-4">
									Liens utiles
								</h2>
								<ul className="space-y-2">
									<li>
										<Link
											href="/mentions-legales"
											className="text-accent hover:underline focus:outline-none focus:ring-2 focus:ring-accent"
										>
											Mentions légales
										</Link>
									</li>
									<li>
										<Link
											href="/confidentialite"
											className="text-accent hover:underline focus:outline-none focus:ring-2 focus:ring-accent"
										>
											Politique de confidentialité
										</Link>
									</li>
									<li>
										<Link
											href="/faq"
											className="text-accent hover:underline focus:outline-none focus:ring-2 focus:ring-accent"
										>
											Questions fréquentes
										</Link>
									</li>
								</ul>
							</section>
						</div>
					</div>
				</article>
			</main>
			<Footer />
		</>
	);
};

export default CGU;
