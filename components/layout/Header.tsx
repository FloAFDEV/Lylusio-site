"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
// import logo from "@/assets/logo-lylusio.webp"; // Now using /assets/logo-lylusio.webp

/* =========================
   MenuLabel
========================= */
const MenuLabel = ({ label }: { label: string }) => (
	<span className="inline-flex items-baseline">
		<span className="font-calligraphic text-[1.4em] leading-none -mr-0.5">
			{label.charAt(0)}
		</span>
		<span>{label.slice(1)}</span>
	</span>
);

/* =========================
   Navigation data

   Structure:
   - Astrologie: Lien direct autonome (PAS de sous-menu)
   - Accompagnements: Sous-menu contenant UNIQUEMENT Thérapie Holistique + Reiki
   - Pas de duplication, pas de doublon
   - Ordre: Thérapie Holistique en premier (approche globale), puis Reiki (technique spécifique)
========================= */
const accompagnementsSubItems = [
	{ label: "Thérapie Holistique", href: "/therapie-holistique" },
	{ label: "Reiki", href: "/reiki-toulouse" },
];

const mainLinks = [
	{ label: "Accueil", href: "/" },
	{ label: "Qui suis-je", href: "/emilie-perez" },
	{ label: "Mon Approche", href: "/approche-therapeutique" },
	{
		label: "Accompagnements",
		href: "/accompagnement-toulouse",
		hasSubmenu: true,
		subItems: accompagnementsSubItems,
	},
	{ label: "Astrologie", href: "/astrologie-toulouse" },
	{ label: "Ressources", href: "/ressources" },
	{ label: "Blog", href: "/blog" },
	{ label: "Contact", href: "/contact" },
];

/* =========================
   Header
========================= */
export const Header = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileOpen, setIsMobileOpen] = useState(false);
	const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(false);

	const pathname = usePathname();

	/* Scroll state */
	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 20);
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	/* Close menus on route change */
	useEffect(() => {
		setIsMobileOpen(false);
		setMobileSubmenuOpen(false);
	}, [pathname]);

	/* Block scroll when mobile menu is open */
	useEffect(() => {
		if (isMobileOpen) {
			document.body.style.overflow = "hidden";
			document.body.classList.add("menu-open");
		} else {
			document.body.style.overflow = "unset";
			document.body.classList.remove("menu-open");
		}

		return () => {
			document.body.style.overflow = "unset";
			document.body.classList.remove("menu-open");
		};
	}, [isMobileOpen]);

	const handleNavClick = () => {
		setIsMobileOpen(false);
		setMobileSubmenuOpen(false);
		window.scrollTo({ top: 0, behavior: "instant" });
	};

	return (
		<>
			<header
				className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
					isScrolled
						? "bg-background/98 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.08)] py-3"
						: "bg-background/90 backdrop-blur-md py-4 md:py-5"
				}`}
				role="banner"
			>
				<div className="container mx-auto px-4 flex items-center justify-between">
					{/* ================= Logo ================= */}
					<Link
						href="/"
						onClick={handleNavClick}
						className="relative z-50 group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-lg"
						aria-label="Retour à l'accueil - Lylusio"
					>
						<div
							className={`relative transition-all duration-300 ${
								isScrolled ? "h-11 w-[132px]" : "h-14 w-[168px]"
							}`}
						>
							<Image
								src="/assets/logo-lylusio.webp"
								alt="Lylusio – Astrologie et Reiki à Toulouse"
								fill
								className="object-contain group-hover:scale-105 transition-transform duration-300"
								priority
								sizes="(max-width: 768px) 132px, 168px"
							/>
						</div>
					</Link>

					{/* ================= Desktop Navigation =================
						Pure CSS hover pour performance optimale.
						aria-expanded statique car contrôlé par CSS :hover uniquement.
					*/}
					<nav
						className="hidden lg:flex items-center gap-8"
						aria-label="Navigation principale"
					>
						{mainLinks.map((link) =>
							link.hasSubmenu ? (
								<div
									key={link.label}
									className="relative flex items-center gap-1 group"
								>
									{/* Lien principal du sous-menu */}
									<Link
										href={link.href}
										onClick={handleNavClick}
										className="font-medium text-[15px] text-foreground/80 hover:text-foreground motion-safe:transition-colors duration-300 relative group/link focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md px-1"
									>
										<MenuLabel label={link.label} />
										{/* Gradient underline avec glow */}
										<span className="absolute -bottom-1 left-0 w-0 h-[3px] bg-gradient-to-r from-accent via-gold to-accent opacity-0 group-hover/link:w-full group-hover/link:opacity-100 motion-safe:transition-all duration-300 shadow-[0_0_8px_hsl(var(--gold)/0.6)]" />
									</Link>

									{/* Icône dropdown (pure CSS) */}
									<button
										type="button"
										aria-label={`Voir les options de ${link.label}`}
										aria-expanded="false"
										aria-haspopup="true"
										className="p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md"
									>
										<ChevronDown
											className="w-4 h-4 motion-safe:transition-transform duration-300 group-hover:rotate-180"
											aria-hidden="true"
										/>
									</button>

									{/* Dropdown menu - Pure CSS hover (performance maximale) */}
									<div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible motion-safe:transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
										<div className="bg-card/95 backdrop-blur-sm rounded-xl shadow-lg border border-accent/20 overflow-hidden">
											{link.subItems?.map((item) => (
												<Link
													key={item.href}
													href={item.href}
													onClick={handleNavClick}
													className="block px-4 py-3 text-[16px] font-medium text-foreground/90 hover:text-accent hover:bg-accent/5 motion-safe:transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
												>
													<MenuLabel
														label={item.label}
													/>
												</Link>
											))}
										</div>
									</div>
								</div>
							) : (
								/* Lien direct sans sous-menu */
								<Link
									key={link.href}
									href={link.href}
									onClick={handleNavClick}
									className="font-medium text-[15px] text-foreground/80 hover:text-foreground motion-safe:transition-colors duration-300 relative group/link focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md px-1"
								>
									<MenuLabel label={link.label} />
									{/* Gradient underline avec glow */}
									<span className="absolute -bottom-1 left-0 w-0 h-[3px] bg-gradient-to-r from-accent via-gold to-accent opacity-0 group-hover/link:w-full group-hover/link:opacity-100 motion-safe:transition-all duration-300 shadow-[0_0_8px_hsl(var(--gold)/0.6)]" />
								</Link>
							)
						)}
					</nav>

					{/* ================= Mobile Toggle Button =================
						Hamburger animé avec effet glow au clic.
					*/}
					<button
						onClick={() => setIsMobileOpen((v) => !v)}
						className="lg:hidden p-2 flex flex-col items-center justify-center gap-1.5 w-12 h-12 relative group bg-card/50 rounded-lg border border-border/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
						aria-label={
							isMobileOpen ? "Fermer le menu" : "Ouvrir le menu"
						}
						aria-expanded={isMobileOpen}
						aria-controls="mobile-menu"
					>
						{/* Glow effect when open */}
						{isMobileOpen && (
							<span
								className="absolute inset-0 bg-accent/20 rounded-lg blur-sm ring-2 ring-accent/40 motion-safe:transition-opacity duration-300"
								aria-hidden="true"
							/>
						)}
						{/* Ligne 1 (devient \ du X) */}
						<span
							className={`relative block w-6 h-[3px] motion-safe:transition-all duration-300 ${
								isMobileOpen
									? "rotate-45 translate-y-2 bg-accent shadow-[0_0_12px_hsl(var(--accent)/0.8)] scale-110"
									: "bg-foreground shadow-sm"
							}`}
						/>
						{/* Ligne 2 (disparaît) */}
						<span
							className={`relative block w-6 h-[3px] bg-foreground shadow-sm motion-safe:transition-all duration-300 ${
								isMobileOpen ? "opacity-0" : ""
							}`}
						/>
						{/* Ligne 3 (devient / du X) */}
						<span
							className={`relative block w-6 h-[3px] motion-safe:transition-all duration-300 ${
								isMobileOpen
									? "-rotate-45 -translate-y-2 bg-accent shadow-[0_0_12px_hsl(var(--accent)/0.8)] scale-110"
									: "bg-foreground shadow-sm"
							}`}
						/>
					</button>
				</div>
			</header>

			{/* ================= Mobile Overlay =================
				Backdrop semi-transparent avec fermeture au clic.
			*/}
			<div
				className={`lg:hidden fixed inset-0 bg-black/10 z-40 motion-safe:transition-opacity duration-300 ${
					isMobileOpen
						? "opacity-100 visible"
						: "opacity-0 invisible pointer-events-none"
				}`}
				onClick={() => setIsMobileOpen(false)}
				aria-hidden="true"
			/>

			{/* ================= Mobile Menu =================
				Slide-in depuis la droite avec animations cascadées.
				Sous-menus collapsibles avec aria-controls dynamique.
			*/}
			<div
				id="mobile-menu"
				className={`lg:hidden fixed top-0 right-0 h-full w-3/4 max-w-xs bg-card shadow-lg border-l border-accent/20 z-50 motion-safe:transition-transform duration-500 ease-out ${
					isMobileOpen ? "translate-x-0" : "translate-x-full"
				}`}
				role="dialog"
				aria-label="Menu de navigation mobile"
				aria-hidden={!isMobileOpen}
			>
				<nav
					className="p-6 flex flex-col gap-3 h-full overflow-y-auto overscroll-contain"
					aria-label="Navigation mobile"
				>
					<div className="flex-1">
						{mainLinks.map((link, index) =>
							link.hasSubmenu ? (
								<div
									key={link.label}
									className="motion-safe:transition-all duration-500 ease-out"
									style={{
										opacity: isMobileOpen ? 1 : 0,
										transform: isMobileOpen
											? "translateX(0)"
											: "translateX(20px)",
										transitionDelay: isMobileOpen
											? `${index * 80}ms`
											: "0ms",
									}}
								>
									{/* Toggle button pour le sous-menu */}
									<button
										type="button"
										onClick={() =>
											setMobileSubmenuOpen(
												!mobileSubmenuOpen
											)
										}
										className="w-full flex items-center justify-between font-medium text-foreground/80 hover:text-accent py-3 motion-safe:transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 min-h-[44px]"
										aria-expanded={mobileSubmenuOpen}
										aria-controls={`mobile-submenu-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
									>
										<MenuLabel label={link.label} />
										<ChevronDown
											className={`w-4 h-4 motion-safe:transition-transform duration-300 ${
												mobileSubmenuOpen
													? "rotate-180"
													: ""
											}`}
											aria-hidden="true"
										/>
									</button>

									{/* Sous-menu collapsible avec animations cascadées */}
									<div
										id={`mobile-submenu-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
										aria-hidden={!mobileSubmenuOpen}
										className={`overflow-hidden motion-safe:transition-all duration-300 ease-out ${
											mobileSubmenuOpen
												? "max-h-40 opacity-100"
												: "max-h-0 opacity-0"
										}`}
									>
										<div className="pl-4 py-2 space-y-1 border-l-2 border-accent/30 ml-2">
											{link.subItems?.map((item, subIndex) => (
												<Link
													key={item.href}
													href={item.href}
													onClick={handleNavClick}
													className="block font-medium text-sm text-foreground/80 hover:text-accent hover:bg-accent/5 rounded-lg px-3 py-2 motion-safe:transition-all duration-300 min-h-[44px] flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
													style={{
														opacity:
															mobileSubmenuOpen
																? 1
																: 0,
														transform:
															mobileSubmenuOpen
																? "translateY(0)"
																: "translateY(-8px)",
														transitionDelay:
															mobileSubmenuOpen
																? `${
																		subIndex *
																		80
																  }ms`
																: "0ms",
													}}
												>
													<MenuLabel
														label={item.label}
													/>
												</Link>
											))}
										</div>
									</div>

									{/* Lien direct vers la page parent (affichage conditionnel) */}
									{mobileSubmenuOpen && (
										<Link
											href={link.href}
											onClick={handleNavClick}
											className="block text-sm text-muted-foreground hover:text-accent py-2 pl-2 motion-safe:transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
										>
											→ Voir tous les accompagnements
										</Link>
									)}
								</div>
							) : (
								/* Lien direct sans sous-menu */
								<Link
									key={link.href}
									href={link.href}
									onClick={handleNavClick}
									className="block font-medium text-foreground/80 hover:text-accent py-3 motion-safe:transition-all duration-500 ease-out min-h-[44px] flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
									style={{
										opacity: isMobileOpen ? 1 : 0,
										transform: isMobileOpen
											? "translateX(0)"
											: "translateX(20px)",
										transitionDelay: isMobileOpen
											? `${index * 80}ms`
											: "0ms",
									}}
								>
									<MenuLabel label={link.label} />
								</Link>
							)
						)}
					</div>

					{/* Footer du menu mobile */}
					<div
						className="border-t border-border/30 pt-4 motion-safe:transition-all duration-500 ease-out"
						style={{
							opacity: isMobileOpen ? 1 : 0,
							transform: isMobileOpen
								? "translateY(0)"
								: "translateY(10px)",
							transitionDelay: isMobileOpen
								? `${mainLinks.length * 80 + 200}ms`
								: "0ms",
						}}
					>
						<p className="text-xs text-muted-foreground text-center leading-relaxed">
							Consultations en cabinet
							<br />à Cépet ou en ligne
						</p>
					</div>
				</nav>
			</div>
		</>
	);
};
export default Header;
