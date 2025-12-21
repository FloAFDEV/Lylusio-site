import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

const MentionsLegales = () => (
	<>
		<Helmet>
			<title>
				Mentions légales | Lylusio - Émilie Perez Astrologue Toulouse
			</title>
			<meta
				name="description"
				content="Mentions légales du site Lylusio. Informations sur l'éditeur Émilie Perez, astrologue et praticienne Reiki à Toulouse et Cépet."
			/>
			<link rel="canonical" href="https://lylusio.fr/mentions-legales" />
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
							<span className="font-calligraphic text-accent inline-block align-baseline mr-1">
								M
							</span>
							entions légales
						</h1>
						<p className="text-muted-foreground text-sm mt-4">
							Dernière mise à jour : Décembre 2024
						</p>
					</header>

					<div className="prose prose-lg text-muted-foreground space-y-10">
						{/* Éditeur */}
						<section aria-labelledby="editeur">
							<h2
								id="editeur"
								className="font-display text-xl sm:text-2xl text-foreground mb-4"
							>
								Éditeur du site
							</h2>
							<address className="not-italic leading-relaxed">
								<strong className="text-foreground">
									Lylusio
								</strong>
								<br />
								Émilie Perez
								<br />
								Entrepreneur individuel (Micro-entreprise)
								<br />
								SIRET : En cours d'immatriculation
								<br />
								49 route de Labastide, 31620 Cépet, France
								<br />
								<a
									href="mailto:contact@lylusio.fr"
									className="text-accent hover:underline focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
								>
									contact@lylusio.fr
								</a>
								<br />
								<a
									href="tel:+33619151959"
									className="text-accent hover:underline focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
								>
									06 19 15 19 59
								</a>
							</address>
						</section>

						{/* Hébergement */}
						<section aria-labelledby="hebergement">
							<h2
								id="hebergement"
								className="font-display text-xl sm:text-2xl text-foreground mb-4"
							>
								Hébergement
							</h2>
							<p className="leading-relaxed">
								Ce site est hébergé par :<br />
								<strong className="text-foreground">
									Netlify, Inc.
								</strong>
								<br />
								512 2nd Street, Suite 200
								<br />
								San Francisco, CA 94107, États-Unis
								<br />
								<a
									href="https://www.netlify.com"
									target="_blank"
									rel="noopener noreferrer"
									className="text-accent hover:underline"
								>
									www.netlify.com
								</a>
							</p>
						</section>

						{/* Directeur de publication */}
						<section aria-labelledby="directeur">
							<h2
								id="directeur"
								className="font-display text-xl sm:text-2xl text-foreground mb-4"
							>
								Directrice de la publication
							</h2>
							<p className="leading-relaxed">
								Émilie Perez, en sa qualité de fondatrice de
								Lylusio.
							</p>
						</section>

						{/* Propriété intellectuelle */}
						<section aria-labelledby="propriete">
							<h2
								id="propriete"
								className="font-display text-xl sm:text-2xl text-foreground mb-4"
							>
								Propriété intellectuelle
							</h2>
							<p className="leading-relaxed">
								L'ensemble du contenu de ce site (textes,
								images, graphismes, logo, icônes) est la
								propriété exclusive de Lylusio - Émilie Perez, à
								l'exception des marques, logos ou contenus
								appartenant à d'autres sociétés partenaires ou
								auteurs.
							</p>
							<p className="leading-relaxed mt-4">
								Toute reproduction, distribution, modification,
								adaptation, retransmission ou publication de ces
								différents éléments est strictement interdite
								sans l'accord écrit préalable de Lylusio.
							</p>
						</section>

						{/* Responsabilité */}
						<section aria-labelledby="responsabilite">
							<h2
								id="responsabilite"
								className="font-display text-xl sm:text-2xl text-foreground mb-4"
							>
								Limitation de responsabilité
							</h2>
							<p className="leading-relaxed">
								Les informations contenues sur ce site sont
								aussi précises que possible et le site est
								régulièrement mis à jour. Toutefois, il peut
								contenir des inexactitudes ou des omissions.
							</p>
							<p className="leading-relaxed mt-4">
								Lylusio ne pourra être tenue responsable des
								dommages directs et indirects causés au matériel
								de l'utilisateur, lors de l'accès au site.
							</p>
							<p className="leading-relaxed mt-4">
								<strong className="text-foreground">
									Important :
								</strong>{" "}
								Les séances d'astrologie et de Reiki ne se
								substituent en aucun cas à un traitement médical
								ou psychologique.
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
										to="/cgu"
										className="text-accent hover:underline focus:outline-none focus:ring-2 focus:ring-accent"
									>
										Conditions Générales d'Utilisation
									</Link>
								</li>
								<li>
									<Link
										to="/confidentialite"
										className="text-accent hover:underline focus:outline-none focus:ring-2 focus:ring-accent"
									>
										Politique de confidentialité
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

						{/* Droit applicable */}
						<section aria-labelledby="droit">
							<h2
								id="droit"
								className="font-display text-xl sm:text-2xl text-foreground mb-4"
							>
								Droit applicable
							</h2>
							<p className="leading-relaxed">
								Les présentes mentions légales sont régies par
								le droit français. En cas de litige, les
								tribunaux de Toulouse seront compétents.
							</p>
						</section>
					</div>
				</article>
			</main>

			<Footer />
		</div>
	</>
);

export default MentionsLegales;
