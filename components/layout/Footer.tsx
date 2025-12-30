"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Mail, Phone, MapPin, Eye, ChevronDown } from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
// NOTE: Nous supposons que le composant Button supporte l'attribut `asChild` pour le rendre en tant que <a>
import { Button } from "@/components/ui/button";
// import logo from "@/assets/logo-lylusio.webp"; // Now using /assets/logo-lylusio.webp
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

	// Generate star positions only on client side to avoid hydration mismatch
	const [stars, setStars] = useState<
		Array<{ top: number; left: number; delay: number }>
	>([]);

	useEffect(() => {
		// Generate random positions only after component mounts (client-side only)
		setStars(
			Array.from({ length: 12 }, () => ({
				top: 15 + Math.random() * 70,
				left: 10 + Math.random() * 80,
				delay: Math.random() * 3,
			}))
		);
	}, []);

	const router = useRouter();
	const handleNavigation = (path: string) => {
		if (path === "/") {
			window.scrollTo({ top: 0, behavior: "smooth" });
			setTimeout(() => router.push(path), 300);
		} else {
			router.push(path);
		}
	};

	const socialLinks = [
		{
			icon: FaFacebook,
			href: "https://www.facebook.com/lylusio/",
			label: "Facebook",
		},
		{
			icon: FaInstagram,
			href: "https://www.instagram.com/emilie.perez_astroreiki_/",
			label: "Instagram",
		},
		{
			icon: FaYoutube,
			href: "https://www.youtube.com/@EmiliePerez-AstroReiki",
			label: "YouTube",
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
		<div className="relative group/cta">
			<Button
				asChild
				size="lg"
				aria-label="Réserver une séance avec Émilie Perez via Calendly"
				className="relative w-full sm:w-auto bg-gold hover:bg-gold-light text-foreground font-medium shadow-gold hover:scale-105 transition-all duration-300"
				onClick={() => trackBookingClick("footer_cta")}
			>
				<a
					href="https://calendly.com/lylusio-fr"
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center gap-2"
				>
					<span>Réserver une séance</span>
					<svg
						className="w-5 h-5 transform group-hover/cta:translate-x-1 transition-transform duration-500"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M13 7l5 5m0 0l-5 5m5-5H6"
						/>
					</svg>
				</a>
			</Button>
		</div>
	);

	return (
		<footer
			className="bg-primary text-primary-foreground"
			role="contentinfo"
			itemScope
			itemType="https://schema.org/LocalBusiness"
		>
			{/* CTA Section */}
			<div className="relative overflow-hidden">
				{/* Decorative background with stars */}
				<div
					className="absolute inset-0 pointer-events-none"
					aria-hidden="true"
				>
					{stars.map((star, i) => (
						<div
							key={i}
							className="absolute w-1.5 h-1.5 bg-gold/30 rounded-full animate-gentle-pulse shadow-[0_0_8px_hsl(var(--gold)/0.4)]"
							style={{
								top: `${star.top}%`,
								left: `${star.left}%`,
								animationDelay: `${star.delay}s`,
							}}
						/>
					))}
				</div>

				{/* Golden glow behind title */}
				<div
					className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gold/15 rounded-full blur-[140px] opacity-60"
					aria-hidden="true"
				/>

				<div className="container mx-auto px-5 md:px-8 lg:px-10 py-12 md:py-24 lg:py-32 text-center relative z-10">
					<GoldenPlantBadge
						size="lg"
						className="absolute -top-4 right-2 opacity-80 hidden sm:flex"
					/>
					<p className="text-primary-foreground/75 text-xs uppercase tracking-[0.25em] mb-4 font-semibold">
						Prendre rendez-vous
					</p>
					<h3 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal mb-4 md:mb-6 leading-tight text-primary-foreground group inline-block">
						<span className="group-hover:text-gold-light transition-colors duration-500">
							Prête à vous reconnecter à vous-même ?
						</span>
					</h3>
					<p className="text-primary-foreground/80 text-base md:text-lg lg:text-xl leading-relaxed md:leading-loose mb-8 md:mb-12 max-w-2xl mx-auto tracking-wide">
						Réservez votre première séance et offrez-vous un espace
						de clarté et d'apaisement.
					</p>
					<div className="inline-block">{LinkButton}</div>
				</div>
			</div>

			{/* Main Footer */}
			<div className="container mx-auto px-5 md:px-8 lg:px-12 py-12 md:py-20 lg:py-24">
				<div className="grid gap-10 md:gap-14 lg:grid-cols-12">
					{/* Brand */}
					<div className="lg:col-span-3 relative">
						<div className="relative h-11 md:h-14 w-[132px] md:w-[168px] mb-6 group">
							<div
								className="absolute inset-0 bg-gold/40 rounded-xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
								aria-hidden="true"
							/>
							<Image
								src="/assets/logo-lylusio.webp"
								alt="Lylusio"
								fill
								className="object-contain brightness-0 invert opacity-100 group-hover:scale-105 transition-all duration-300 relative z-10 drop-shadow-[0_2px_8px_rgba(255,255,255,0.1)]"
							/>
						</div>
						<p
							className="text-primary-foreground/70 max-w-sm text-sm md:text-base leading-relaxed mb-4"
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
									className="relative w-11 h-11 md:w-12 md:h-12 flex items-center justify-center bg-primary-foreground/15 border-2 border-primary-foreground/30 text-primary-foreground transition-all duration-500 rounded-full group overflow-hidden hover:border-gold hover:bg-primary-foreground/25"
									aria-label={link.label}
								>
									<div
										className="absolute inset-0 bg-gradient-to-br from-gold/20 via-accent/15 to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
										aria-hidden="true"
									/>
									<div
										className="absolute inset-0 bg-gold/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
										aria-hidden="true"
									/>
									<link.icon className="w-5 h-5 md:w-5 md:h-5 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 relative z-10" />
								</a>
							))}
						</div>
					</div>

					{/* Navigation & Contact */}
					<div className="lg:col-span-5 flex flex-col md:flex-row md:gap-12 relative">
						{/* Navigation */}
						<nav
							className="flex-1 mb-8 md:mb-0"
							aria-labelledby="footer-navigation-title"
						>
							<button
								onClick={() => setNavOpen(!navOpen)}
								className="flex items-center justify-between w-full md:cursor-default"
								aria-expanded={navOpen}
							>
								<h4
									id="footer-navigation-title"
									className="font-display text-base md:text-lg font-bold text-white flex items-center mb-1"
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
								className={`space-y-3 md:space-y-3.5 mt-4 md:mt-6 overflow-hidden transition-all duration-300 ${
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
												className="text-left text-primary-foreground/70 hover:text-primary-foreground transition-all duration-300 text-sm md:text-base relative group inline-flex items-center gap-2.5"
											>
												<span
													className="w-1.5 h-1.5 rounded-full bg-gold/60 group-hover:bg-gold group-hover:shadow-[0_0_12px_hsl(var(--gold)/0.8)] transition-all duration-300"
													aria-hidden="true"
												/>
												<span className="group-hover:translate-x-1.5 transition-transform duration-300">
													{link.label}
												</span>
											</a>
										) : (
											<button
												onClick={() =>
													handleNavigation(link.href)
												}
												className="text-left text-primary-foreground/70 hover:text-primary-foreground transition-all duration-300 text-sm md:text-base relative group inline-flex items-center gap-2.5"
											>
												<span
													className="w-1.5 h-1.5 rounded-full bg-gold/60 group-hover:bg-gold group-hover:shadow-[0_0_12px_hsl(var(--gold)/0.8)] transition-all duration-300"
													aria-hidden="true"
												/>
												<span className="group-hover:translate-x-1.5 transition-transform duration-300">
													{link.label}
												</span>
											</button>
										)}
									</li>
								))}
							</ul>
						</nav>

						{/* Contact */}
						<div className="flex-1">
							<h4 className="font-display text-base md:text-lg font-bold text-white flex items-center mb-1">
								<TitleIconSpacer /> Contact
							</h4>
							<ul className="space-y-4 md:space-y-5 mt-4 md:mt-6">
								{/* PHONE */}
								<li itemProp="telephone">
									{!showPhone ? (
										<button
											onClick={() => {
												setShowPhone(true);
												trackContactClick("phone");
											}}
											className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300 text-sm md:text-base group cursor-pointer"
											aria-label="Afficher le numéro de téléphone"
										>
											<div className="relative w-8 h-8 md:w-9 md:h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center shrink-0 group-hover:bg-primary-foreground/20 transition-colors duration-300">
												<div
													className="absolute inset-0 bg-gold/20 rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300"
													aria-hidden="true"
												/>
												<Phone
													className="w-4 h-4 text-primary-foreground/70 relative z-10 group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-300"
													aria-hidden="true"
												/>
											</div>
											<span className="flex items-center gap-1.5 group-hover:translate-x-1.5 transition-transform duration-300">
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
											className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300 text-sm md:text-base animate-reveal-contact group"
										>
											<div className="relative w-8 h-8 md:w-9 md:h-9 rounded-full bg-primary-foreground/15 flex items-center justify-center shrink-0 group-hover:bg-primary-foreground/25 transition-colors duration-300">
												<div
													className="absolute inset-0 bg-gold/30 rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300"
													aria-hidden="true"
												/>
												<Phone
													className="w-4 h-4 text-primary-foreground relative z-10 group-hover:scale-110 transition-transform duration-300"
													aria-hidden="true"
												/>
											</div>
											<span className="group-hover:translate-x-1.5 transition-transform duration-300">
												06 19 15 19 59
											</span>
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
											className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300 text-sm md:text-base group cursor-pointer"
											aria-label="Afficher l'email de contact"
										>
											<div className="relative w-8 h-8 md:w-9 md:h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center shrink-0 group-hover:bg-primary-foreground/20 transition-colors duration-300">
												<div
													className="absolute inset-0 bg-gold/20 rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300"
													aria-hidden="true"
												/>
												<Mail
													className="w-4 h-4 text-primary-foreground/70 relative z-10 group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-300"
													aria-hidden="true"
												/>
											</div>
											<span className="flex items-center gap-1.5 group-hover:translate-x-1.5 transition-transform duration-300">
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
											className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors duration-300 text-sm md:text-base animate-reveal-contact group"
										>
											<div className="relative w-8 h-8 md:w-9 md:h-9 rounded-full bg-primary-foreground/15 flex items-center justify-center shrink-0 group-hover:bg-primary-foreground/25 transition-colors duration-300">
												<div
													className="absolute inset-0 bg-gold/30 rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300"
													aria-hidden="true"
												/>
												<Mail
													className="w-4 h-4 text-primary-foreground relative z-10 group-hover:scale-110 transition-transform duration-300"
													aria-hidden="true"
												/>
											</div>
											<span className="group-hover:translate-x-1.5 transition-transform duration-300">
												contact@lylusio.fr
											</span>
										</a>
									)}
								</li>

								{/* ADDRESS */}
								<li
									className="flex items-start gap-3 text-primary-foreground/70 text-sm md:text-base group"
									itemScope
									itemType="https://schema.org/PostalAddress"
								>
									<div className="relative w-8 h-8 md:w-9 md:h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary-foreground/20 transition-colors duration-300">
										<div
											className="absolute inset-0 bg-gold/20 rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300"
											aria-hidden="true"
										/>
										<MapPin
											className="w-4 h-4 text-primary-foreground/70 relative z-10 group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-300"
											aria-hidden="true"
										/>
									</div>
									<a
										href="https://www.google.com/maps?q=49+route+de+Labastide+31620+Cépet"
										target="_blank"
										rel="noopener noreferrer"
										className="hover:text-primary-foreground transition-colors duration-300 leading-relaxed group-hover:translate-x-1.5 transition-transform duration-300 inline-block"
									>
										<span itemProp="streetAddress">
											49 route de Labastide
										</span>
										,{" "}
										<span itemProp="postalCode">31620</span>{" "}
										<span itemProp="addressLocality">
											Cépet
										</span>
										<br />
										<span className="text-primary-foreground/75 text-xs md:text-sm">
											Toulouse Nord & en ligne
										</span>
									</a>
								</li>
							</ul>
							<HoneypotContact />
						</div>
					</div>

					{/* Map */}
					<div className="lg:col-span-4 mt-8 lg:mt-0">
						<h4 className="font-display text-base md:text-lg font-bold mb-5 md:mb-6 text-white flex items-center">
							<TitleIconSpacer /> Localisation
						</h4>
						<div className="relative group/map rounded-2xl overflow-hidden border border-gold/30 shadow-[0_4px_20px_-4px_hsl(var(--gold)/0.2)] hover:shadow-[0_8px_30px_-4px_hsl(var(--gold)/0.4),0_0_20px_-4px_hsl(var(--accent)/0.2)] transition-all duration-500">
							<div
								className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-accent/5 opacity-0 group-hover/map:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
								aria-hidden="true"
							/>
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2897.188229409235!2d1.4298480117613777!3d43.748421570977264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12aea7de29a6bfcf%3A0xe7a375cbe60d1076!2sEmilie%20Perez%20Astrologue%2C%20Praticienne%20Reiki%2C%20Coaching%20professionnel%20-%20Lylusio!5e1!3m2!1sfr!2sfr!4v1765194360692!5m2!1sfr!2sfr"
								width="100%"
								height="220"
								style={{ border: 0 }}
								allowFullScreen
								loading="lazy"
								referrerPolicy="strict-origin-when-cross-origin"
								className="grayscale opacity-70 group-hover/map:grayscale-0 group-hover/map:opacity-100 transition-all duration-500 group-hover/map:scale-105"
								title="Localisation du cabinet d'Émilie Perez à Cépet près de Toulouse"
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom */}
			<div className="relative border-t border-primary-foreground/20">
				<div className="container mx-auto px-5 md:px-8 lg:px-12 py-7 md:py-9 flex flex-col sm:flex-row justify-between items-center gap-4">
					<p className="text-primary-foreground/80 text-xs md:text-sm flex items-center gap-2.5 tracking-wide">
						<span
							className="w-1.5 h-1.5 rounded-full bg-gold/70 shadow-[0_0_6px_hsl(var(--gold)/0.6)]"
							aria-hidden="true"
						/>
						© {currentYear} Lylusio · Tous droits réservés
					</p>
					<div className="flex flex-wrap justify-center sm:justify-end gap-4 md:gap-6 text-primary-foreground/70 text-xs md:text-sm">
						<a
							href="/cgu"
							className="hover:text-primary-foreground transition-colors duration-300"
						>
							CGU
						</a>
						<a
							href="/mentions-legales"
							className="hover:text-primary-foreground transition-colors duration-300"
						>
							Mentions légales
						</a>
						<a
							href="/politique-de-confidentialite"
							className="hover:text-primary-foreground transition-colors duration-300"
						>
							Politique de confidentialité
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
