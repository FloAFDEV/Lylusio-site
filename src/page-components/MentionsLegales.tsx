"use client";

import Link from "next/link";
import Image from "next/image";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

const MentionsLegales = () => (
	<>
		{/* SEO metadata handled by Next.js Metadata API */}

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
								M
							</span>
							entions légales
						</h1>
						<p className="text-muted-foreground text-sm mt-4">
							Dernière mise à jour : Janvier 2026
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
									Micro-entreprise Perez Émilie
								</strong>
								<br />
								Capital social : 0 €
								<br />
								SIREN : 898476353
								<br />
								49 Route De Labastide, 31620 Cépet, France
								<br />
								<br />
								<strong className="text-foreground">
									Directrice de la publication :
								</strong>{" "}
								Émilie Perez
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
								<strong className="text-foreground">
									Hébergement du site web :
								</strong>
								<br />
								Vercel Inc.
								<br />
								340 S Lemon Ave #4133
								<br />
								Walnut, CA 91789, États-Unis
								<br />
								<a
									href="https://vercel.com"
									target="_blank"
									rel="noopener noreferrer"
									className="text-accent hover:underline"
								>
									vercel.com
								</a>
							</p>
							<p className="leading-relaxed mt-4">
								<strong className="text-foreground">
									Nom de domaine :
								</strong>
								<br />
								OVH SAS
								<br />
								2 rue Kellermann
								<br />
								59100 Roubaix, France
								<br />
								<a
									href="https://www.ovh.com"
									target="_blank"
									rel="noopener noreferrer"
									className="text-accent hover:underline"
								>
									www.ovh.com
								</a>
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
										href="/cgu"
										className="text-accent hover:underline focus:outline-none focus:ring-2 focus:ring-accent"
									>
										Conditions Générales d'Utilisation
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
										href="/contact"
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
