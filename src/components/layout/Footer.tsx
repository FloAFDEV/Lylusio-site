import { useState } from "react";
import {
	Facebook,
	Instagram,
	Mail,
	Phone,
	MapPin,
	Eye,
	ChevronDown,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
// NOTE: Nous supposons que le composant Button supporte l'attribut `asChild` pour le rendre en tant que <a>
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-lylusio.webp";
import GoldenPlantBadge from "@/components/GoldenPlantBadge";
import { HoneypotContact } from "@/components/ClickToReveal";
import { useAnalyticsEvent } from "@/hooks/useAnalytics";

// Composant pour l'espace d'alignement du titre.
// Il crée un "bloc" de la même largeur que les icônes de contact pour aligner le texte du titre.
const TitleIconSpacer = () => (
	// w-5 h-5 (ou w-6 h-6 en md) correspond à la taille des icônes de contact.
	// mr-3 correspond au gap-3 utilisé dans les listes de contact.
	<span
		className="w-5 h-5 md:w-6 md:h-6 shrink-0 inline-flex items-center justify-center mr-3"
		aria-hidden="true"
	>
		<span className="w-2 h-2 bg-gold-light rounded-full inline-block" />
	</span>
);

const Footer = () => {
	const currentYear = new Date().getFullYear();
	const [showPhone, setShowPhone] = useState(false);
	const [showEmail, setShowEmail] = useState(false);
	const [navOpen, setNavOpen] = useState(false);
	// Supprimé contactOpen state car il n'est plus un accordéon dans la structure desktop/mobile
	const { trackBookingClick, trackContactClick } = useAnalyticsEvent();

	const navigate = useNavigate();
	const handleNavigation = (path: string) => {
		if (path === "/") {
			window.scrollTo({ top: 0, behavior: "smooth" });
			setTimeout(() => navigate(path), 300);
		} else {
			navigate(path);
		}
	};

	const socialLinks = [
		{
			icon: Facebook,
			href: "https://www.facebook.com/lylusio/",
			label: "Facebook",
		},
		{
			icon: Instagram,
			href: "https://www.instagram.com/emilie.perez_astroreiki_/",
			label: "Instagram",
		},
		{ icon: Mail, href: "mailto:contact@lylusio.fr", label: "Email" },
	];

	const navLinks = [
		{ href: "/", label: "Accueil" },
		{ href: "/approche-therapeutique", label: "Mon Approche" },
		{ href: "/accompagnement-toulouse", label: "Accompagnement" },
		{ href: "/astrologie-toulouse", label: "Astrologie" },
		{ href: "/reiki-toulouse", label: "Reiki" },
		{ href: "/emilie-perez", label: "Qui suis-je" },
		{ href: "/blog", label: "Blog" },
		{ href: "/faq", label: "FAQ" },
		{ href: "/contact", label: "Contact" },
		{
			href: "https://calendly.com/lylusio-fr",
			label: "Prendre rendez-vous",
			external: true,
		},
	];

	// Composant LinkButton pour le CTA du footer (meilleur SEO/Accessibilité)
	const LinkButton = (
		<Button
			asChild // Indique au composant Button de se rendre en tant qu'enfant (ici, le lien <a>)
			variant="hero"
			size="lg"
			aria-label="Réserver une séance avec Émilie Perez via Calendly"
			className="w-full sm:w-auto shadow-lg shadow-black/10 hover:shadow-xl hover:scale-[1.02] transition-transform"
			onClick={() => trackBookingClick("footer_cta")} // Seulement l'analytics, la navigation se fait par le lien href
		>
			<a
				href="https://calendly.com/lylusio-fr"
				target="_blank"
				rel="noopener noreferrer"
			>
				Réserver une séance
			</a>
		</Button>
	);

	return (
		<footer
			className="bg-primary text-primary-foreground"
			role="contentinfo"
			itemScope
			itemType="https://schema.org/LocalBusiness"
		>
			{/* CTA Section */}
			<div className="border-b border-primary-foreground/15">
				<div className="container mx-auto px-5 md:px-8 lg:px-12 py-10 md:py-20 lg:py-28 text-center relative">
					<GoldenPlantBadge
						size="md"
						className="absolute -top-4 right-2 opacity-80 hidden sm:flex"
					/>
					<p className="text-primary-foreground/60 text-xs uppercase tracking-[0.2em] mb-3">
						Prendre rendez-vous
					</p>
					<h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-normal mb-4 md:mb-6 leading-tight">
						Prête à vous reconnecter à vous-même ?
					</h3>
					<p className="text-primary-foreground/80 text-base md:text-lg leading-relaxed md:leading-loose mb-6 md:mb-10">
						Réservez votre première séance et offrez-vous un espace
						de clarté et d'apaisement.
					</p>
					{LinkButton}{" "}
					{/* Utilisation du nouveau composant LinkButton optimisé SEO */}
				</div>
			</div>

			{/* Main Footer */}
			<div className="container mx-auto px-5 md:px-8 lg:px-12 py-10 md:py-16 lg:py-20">
				<div className="grid gap-8 md:gap-12 lg:grid-cols-12">
					{/* Brand - Optimisation du Spacing vertical pour la hiérarchie */}
					<div className="lg:col-span-3">
						<img
							src={logo}
							alt="Lylusio"
							// AJUSTEMENT: mb-6 pour séparer le logo de la description (correction de l'ancien space-y-5)
							className="h-10 md:h-12 w-auto brightness-0 invert opacity-80 mb-6"
							itemProp="logo"
						/>
						<p
							// AJUSTEMENT: mb-8 pour séparer clairement la description des icônes sociales (correction de l'ancien space-y-5)
							className="text-primary-foreground/70 max-w-sm text-sm md:text-base leading-relaxed mb-8"
							itemProp="description"
						>
							Accompagnement en astrologie symbolique, Reiki et
							transitions de vie. Un espace pour traverser vos
							transitions avec lucidité et douceur.
						</p>
						<div className="flex gap-3">
							{socialLinks.map((link) => (
								<a
									key={link.label}
									href={link.href}
									target="_blank"
									rel="noopener noreferrer"
									className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center bg-primary-foreground/15 text-gold-light transition-colors duration-500 rounded-full group"
									aria-label={link.label}
								>
									<link.icon className="w-4 h-4 md:w-5 md:h-5 group-hover:text-white transition-colors duration-300" />
								</a>
							))}
						</div>
					</div>

					{/* Navigation & Contact */}
					<div className="lg:col-span-5 flex flex-col md:flex-row md:gap-10">
						{/* Navigation */}
						<nav
							className="flex-1 mb-8 md:mb-0"
							aria-labelledby="footer-navigation-title"
						>
							{" "}
							{/* Ajout de mb-8 pour la séparation mobile */}
							<button
								onClick={() => setNavOpen(!navOpen)}
								className="flex items-center justify-between w-full md:cursor-default"
								aria-expanded={navOpen}
							>
								<h4
									id="footer-navigation-title"
									// ALIGNEMENT: Utilisation de TitleIconSpacer pour l'alignement horizontal
									className="font-display text-base md:text-lg font-bold text-white flex items-center"
								>
									<TitleIconSpacer /> Navigation
								</h4>
								<ChevronDown
									className={`w-4 h-4 text-gold-light/60 md:hidden transition-transform duration-300 ${
										navOpen ? "rotate-180" : ""
									}`}
									aria-hidden="true"
								/>
							</button>
							<ul
								className={`space-y-3 md:space-y-4 mt-4 md:mt-6 overflow-hidden transition-all duration-300 ${
									navOpen
										? "max-h-[500px] opacity-100"
										: "max-h-0 md:max-h-none opacity-0 md:opacity-100"
								}`}
							>
								{navLinks.map((link) => (
									<li key={link.href}>
										{link.external ? (
											<a
												href={link.href}
												target="_blank"
												rel="noopener noreferrer"
												className="text-left text-primary-foreground/70 hover:text-gold-light transition-all duration-500 text-sm md:text-base relative group inline-block font-medium"
											>
												{link.label}
												<span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-gradient-to-r from-gold-light/60 via-gold/50 to-gold-light/60 group-hover:w-full transition-all duration-500 ease-out" />
											</a>
										) : (
											<button
												onClick={() =>
													handleNavigation(link.href)
												}
												className="text-left text-primary-foreground/70 hover:text-gold-light transition-all duration-500 text-sm md:text-base relative group inline-block"
											>
												{link.label}
												<span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-gradient-to-r from-gold-light/60 via-gold/50 to-gold-light/60 group-hover:w-full transition-all duration-500 ease-out" />
											</button>
										)}
									</li>
								))}
							</ul>
						</nav>

						{/* Contact */}
						<div className="flex-1">
							<h4
								// ALIGNEMENT: Utilisation de TitleIconSpacer pour l'alignement horizontal
								className="font-display text-base md:text-lg font-bold text-white flex items-center"
							>
								<TitleIconSpacer /> Contact
							</h4>
							<ul className="space-y-3 md:space-y-4 mt-4">
								{" "}
								{/* AJUSTEMENT: space-y-3 pour grouper les coordonnées */}
								{/* PHONE */}
								<li itemProp="telephone">
									{!showPhone ? (
										<button
											onClick={() => {
												setShowPhone(true);
												trackContactClick("phone");
											}}
											className="flex items-center gap-3 text-primary-foreground/70 hover:text-gold-light transition-colors duration-500 text-sm md:text-base group cursor-pointer"
											aria-label="Afficher le numéro de téléphone"
										>
											<Phone
												className="w-5 h-5 md:w-6 md:h-6 shrink-0 text-gold-light/60"
												aria-hidden="true"
											/>{" "}
											{/* Taille d'icône augmentée pour alignement */}
											<span className="flex items-center gap-1.5">
												<Eye
													className="w-3 h-3 opacity-60 group-hover:opacity-100"
													aria-hidden="true"
												/>
												Afficher le numéro
											</span>
										</button>
									) : (
										<a
											href="tel:+33619151959"
											className="flex items-center gap-3 text-gold-light hover:text-gold transition-colors duration-500 text-sm md:text-base animate-reveal-contact"
										>
											<Phone
												className="w-5 h-5 md:w-6 md:h-6 shrink-0 text-gold-light"
												aria-hidden="true"
											/>{" "}
											{/* Taille d'icône augmentée pour alignement */}
											<span>06 19 15 19 59</span>
										</a>
									)}
								</li>
								{/* EMAIL */}
								<li itemProp="email">
									{!showEmail ? (
										<button
											onClick={() => {
												setShowEmail(true);
												trackContactClick("email");
											}}
											className="flex items-center gap-3 text-primary-foreground/70 hover:text-gold-light transition-colors duration-500 text-sm md:text-base group cursor-pointer"
											aria-label="Afficher l'email de contact"
										>
											<Mail
												className="w-5 h-5 md:w-6 md:h-6 shrink-0 text-gold-light/60"
												aria-hidden="true"
											/>{" "}
											{/* Taille d'icône augmentée pour alignement */}
											<span className="flex items-center gap-1.5">
												<Eye
													className="w-3 h-3 opacity-60 group-hover:opacity-100"
													aria-hidden="true"
												/>
												Afficher l'email
											</span>
										</button>
									) : (
										<a
											href="mailto:contact@lylusio.fr"
											className="flex items-center gap-3 text-gold-light hover:text-gold transition-colors duration-500 text-sm md:text-base animate-reveal-contact"
										>
											<Mail
												className="w-5 h-5 md:w-6 md:h-6 shrink-0 text-gold-light"
												aria-hidden="true"
											/>{" "}
											{/* Taille d'icône augmentée pour alignement */}
											<span>contact@lylusio.fr</span>
										</a>
									)}
								</li>
								{/* ADDRESS */}
								<li
									className="flex items-start gap-3 text-primary-foreground/70 text-sm md:text-base"
									itemScope
									itemType="https://schema.org/PostalAddress"
								>
									<MapPin
										className="w-5 h-5 md:w-6 md:h-6 shrink-0 text-gold-light/60 mt-0.5"
										aria-hidden="true"
									/>{" "}
									{/* Taille d'icône augmentée pour alignement */}
									<a
										href="https://www.google.com/maps?q=49+route+de+Labastide+31620+Cépet"
										target="_blank"
										rel="noopener noreferrer"
										className="hover:text-primary-foreground"
									>
										<span itemProp="streetAddress">
											49 route de Labastide
										</span>
										,{" "}
										<span itemProp="postalCode">31620</span>{" "}
										<span itemProp="addressLocality">
											Cépet
										</span>{" "}
										— Toulouse Nord & en ligne
									</a>
								</li>
							</ul>
							<HoneypotContact />
						</div>
					</div>

					{/* Map */}
					<div className="lg:col-span-4 mt-8 lg:mt-0">
						<h4
							// ALIGNEMENT: Utilisation de TitleIconSpacer pour l'alignement horizontal
							className="font-display text-base md:text-lg font-bold mb-5 md:mb-6 text-white flex items-center"
						>
							<TitleIconSpacer /> Localisation
						</h4>
						<div className="rounded-xl overflow-hidden border border-primary-foreground/10">
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2897.188229409235!2d1.4298480117613777!3d43.748421570977264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12aea7de29a6bfcf%3A0xe7a375cbe60d1076!2sEmilie%20Perez%20Astrologue%2C%20Praticienne%20Reiki%2C%20Coaching%20professionnel%20-%20Lylusio!5e1!3m2!1sfr!2sfr!4v1765194360692!5m2!1sfr!2sfr"
								width="100%"
								height="180"
								style={{ border: 0 }}
								allowFullScreen
								loading="lazy"
								referrerPolicy="strict-origin-when-cross-origin"
								className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
								title="Localisation du cabinet d'Émilie Perez à Cépet près de Toulouse"
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom */}
			<div className="border-t border-primary-foreground/15">
				<div className="container mx-auto px-5 md:px-8 lg:px-12 py-6 md:py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
					<p className="text-primary-foreground/50 text-xs md:text-sm flex items-center gap-2">
						© {currentYear} Lylusio . Tous droits réservés.
					</p>
					<div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm">
						<Link
							to="/mentions-legales"
							className="text-primary-foreground/50 hover:text-gold-light transition-all duration-500 relative group"
						>
							Mentions légales
							<span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-gradient-to-r from-gold-light/60 via-gold/50 to-gold-light/60 group-hover:w-full transition-all duration-500 ease-out" />
						</Link>
						<Link
							to="/cgu"
							className="text-primary-foreground/50 hover:text-gold-light transition-all duration-500 relative group"
						>
							CGU
							<span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-gradient-to-r from-gold-light/60 via-gold/50 to-gold-light/60 group-hover:w-full transition-all duration-500 ease-out" />
						</Link>
						<Link
							to="/confidentialite"
							className="text-primary-foreground/50 hover:text-gold-light transition-all duration-500 relative group"
						>
							Confidentialité
							<span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-gradient-to-r from-gold-light/60 via-gold/50 to-gold-light/60 group-hover:w-full transition-all duration-500 ease-out" />
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
