"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

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

	/* Block scroll and add blur when mobile menu is open */
	useEffect(() => {
		const mainContent = document.getElementById("main-content");
		const footer = document.querySelector("footer");
		const header = document.querySelector("header");

		if (isMobileOpen) {
			document.body.style.overflow = "hidden";
			document.body.classList.add("menu-open");
			if (mainContent) {
				mainContent.style.filter = "blur(8px)";
				mainContent.style.transition = "filter 300ms ease-out";
			}
			if (footer) {
				footer.style.filter = "blur(8px)";
				footer.style.transition = "filter 300ms ease-out";
			}
			if (header) {
				header.style.filter = "blur(8px)";
				header.style.transition = "filter 300ms ease-out";
			}
		} else {
			document.body.style.overflow = "unset";
			document.body.classList.remove("menu-open");
			if (mainContent) {
				mainContent.style.filter = "none";
			}
			if (footer) {
				footer.style.filter = "none";
			}
			if (header) {
				header.style.filter = "none";
			}
		}

		return () => {
			document.body.style.overflow = "unset";
			document.body.classList.remove("menu-open");
			if (mainContent) mainContent.style.filter = "none";
			if (footer) footer.style.filter = "none";
			if (header) header.style.filter = "none";
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
					>
						<div
							className={`relative transition-all duration-300 ${
								isScrolled ? "h-11 w-[132px]" : "h-14 w-[168px]"
							}`}
						>
							<Image
								src="/assets/logo-lylusio.webp"
								alt="Lylusio – Astrologie et Reiki à Toulouse - Retour à l'accueil"
								fill
								className="object-contain group-hover:scale-105 transition-transform duration-300"
								priority
								sizes="(max-width: 768px) 132px, 168px"
							/>
						</div>
					</Link>

					{/* ================= Desktop Navigation ================= */}
					<nav
						className="hidden xl:flex items-center gap-8"
						aria-label="Navigation principale"
					>
						{mainLinks.map((link) =>
							link.hasSubmenu ? (
								<div
									key={link.label}
									className="relative flex items-center gap-1 group"
								>
									<Link
										href={link.href}
										onClick={handleNavClick}
										className="font-medium text-[15px] text-foreground/80 hover:text-foreground motion-safe:transition-colors duration-300 relative group/link focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md px-1"
									>
										<MenuLabel label={link.label} />
										<span className="absolute -bottom-1 left-0 w-0 h-[3px] bg-gradient-to-r from-accent via-gold to-accent opacity-0 group-hover/link:w-full group-hover/link:opacity-100 motion-safe:transition-all duration-300 shadow-[0_0_8px_hsl(var(--gold)/0.6)]" />
									</Link>

									<button
										type="button"
										aria-label={`Voir les options de ${link.label}`}
										aria-expanded="false"
										aria-haspopup="true"
										className="p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md motion-safe:transition-transform duration-300 group-hover:scale-110"
									>
										<ChevronDown
											className="w-4 h-4 text-foreground/60 motion-safe:transition-all duration-400 ease-out group-hover:rotate-180 group-hover:text-accent"
											aria-hidden="true"
										/>
									</button>

									{/* Dropdown menu - Smooth animations avec translateY + scale + cascade */}
									<div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-52 opacity-0 invisible translate-y-3 scale-95 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:scale-100 group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:scale-100 motion-safe:transition-all duration-400 ease-out pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto z-50">
										<div className="bg-card/70 backdrop-blur-lg rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-accent/20 overflow-hidden ring-1 ring-black/5">
											{link.subItems?.map(
												(item, index) => (
													<Link
														key={item.href}
														href={item.href}
														onClick={handleNavClick}
														className="block px-5 py-3.5 text-[15px] font-medium text-foreground/85 hover:text-accent hover:bg-accent/8 motion-safe:transition-all duration-350 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset group/item relative overflow-hidden"
														style={{
															animation: `fadeInDown 0.4s ease-out ${
																index * 0.08
															}s both`,
														}}
													>
														<span className="relative z-10">
															<MenuLabel
																label={
																	item.label
																}
															/>
														</span>
														{/* Effet de glow au hover */}
														<span className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent -translate-x-full group-hover/item:translate-x-full motion-safe:transition-transform duration-700 ease-out" />
													</Link>
												)
											)}

											{/* Lien direct vers la page Accompagnements - Desktop */}
											<Link
												href={link.href}
												onClick={handleNavClick}
												className="block px-5 py-3 text-[13px] font-medium text-muted-foreground hover:text-accent hover:bg-accent/5 motion-safe:transition-all duration-350 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset border-t border-accent/15 group/all relative overflow-hidden"
												style={{
													animation: `fadeInDown 0.4s ease-out ${
														(link.subItems
															?.length || 0) *
														0.08
													}s both`,
												}}
											>
												<span className="relative z-10 flex items-center gap-1.5">
													<span>→</span>
													<span>
														Voir tous les
														accompagnements
													</span>
												</span>
												<span className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent -translate-x-full group-hover/all:translate-x-full motion-safe:transition-transform duration-700 ease-out" />
											</Link>
										</div>
									</div>
								</div>
							) : (
								<Link
									key={link.href}
									href={link.href}
									onClick={handleNavClick}
									className="font-medium text-[15px] text-foreground/80 hover:text-foreground motion-safe:transition-colors duration-300 relative group/link focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md px-1"
								>
									<MenuLabel label={link.label} />
									<span className="absolute -bottom-1 left-0 w-0 h-[3px] bg-gradient-to-r from-accent via-gold to-accent opacity-0 group-hover/link:w-full group-hover/link:opacity-100 motion-safe:transition-all duration-300 shadow-[0_0_8px_hsl(var(--gold)/0.6)]" />
								</Link>
							)
						)}
					</nav>

					{/* ================= Mobile Toggle Button ================= */}
					<button
						onClick={() => setIsMobileOpen((v) => !v)}
						className="xl:hidden p-2 flex flex-col items-center justify-center gap-1.5 w-12 h-12 relative group bg-card/50 rounded-lg border border-border/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
						aria-label={
							isMobileOpen ? "Fermer le menu" : "Ouvrir le menu"
						}
						aria-expanded={isMobileOpen}
						aria-controls="mobile-menu"
					>
						<span
							className={`block h-0.5 w-6 bg-foreground rounded-full motion-safe:transition-all duration-300 ${
								isMobileOpen
									? "rotate-45 translate-y-2"
									: "rotate-0"
							}`}
						/>
						<span
							className={`block h-0.5 w-6 bg-foreground rounded-full motion-safe:transition-all duration-300 ${
								isMobileOpen
									? "opacity-0 scale-0"
									: "opacity-100"
							}`}
						/>
						<span
							className={`block h-0.5 w-6 bg-foreground rounded-full motion-safe:transition-all duration-300 ${
								isMobileOpen
									? "-rotate-45 -translate-y-2"
									: "rotate-0"
							}`}
						/>
						<div
							className={`absolute inset-0 rounded-lg bg-accent/20 opacity-0 group-hover:opacity-100 motion-safe:transition-opacity duration-300 ${
								isMobileOpen ? "opacity-100" : ""
							}`}
							aria-hidden="true"
						/>
					</button>
				</div>
			</header>

			{/* ================= Mobile Overlay ================= */}
			<div
				className={`xl:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40 motion-safe:transition-opacity duration-400 ease-in-out ${
					isMobileOpen
						? "opacity-100 visible"
						: "opacity-0 invisible pointer-events-none"
				}`}
				onClick={() => setIsMobileOpen(false)}
				aria-hidden="true"
			/>

			{/* ================= Mobile Menu ================= */}
			<div
				id="mobile-menu"
				className={`xl:hidden fixed top-0 right-0 h-full w-3/4 max-w-xs bg-card shadow-lg border-l border-accent/20 z-50 motion-safe:transition-transform duration-500 ease-in-out ${
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
									className="motion-safe:transition-all duration-400 ease-out"
									style={{
										opacity: isMobileOpen ? 1 : 0,
										transform: isMobileOpen
											? "translateX(0)"
											: "translateX(20px)",
										transitionDelay: isMobileOpen
											? `${index * 100}ms`
											: "0ms",
									}}
								>
									<button
										type="button"
										onClick={() =>
											setMobileSubmenuOpen(
												!mobileSubmenuOpen
											)
										}
										className="w-full flex items-center justify-between font-medium text-foreground/80 hover:text-accent py-3 motion-safe:transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 min-h-[44px]"
										aria-expanded={mobileSubmenuOpen}
										aria-controls={`mobile-submenu-${link.label
											.toLowerCase()
											.replace(/\s+/g, "-")}`}
									>
										<MenuLabel label={link.label} />
										<ChevronDown
											className={`w-4 h-4 motion-safe:transition-transform duration-400 ease-in-out ${
												mobileSubmenuOpen
													? "rotate-180"
													: ""
											}`}
											aria-hidden="true"
										/>
									</button>

									{/* Sous-menu mobile smooth avec translateY + scale */}
									<div
										id={`mobile-submenu-${link.label
											.toLowerCase()
											.replace(/\s+/g, "-")}`}
										aria-hidden={!mobileSubmenuOpen}
										className={`overflow-hidden motion-safe:transition-all duration-450 ease-in-out ${
											mobileSubmenuOpen
												? "max-h-52 opacity-100"
												: "max-h-0 opacity-0"
										}`}
									>
										<div className="pl-4 py-2 space-y-1 border-l-2 border-accent/30 ml-2">
											{link.subItems?.map(
												(item, subIndex) => (
													<Link
														key={item.href}
														href={item.href}
														onClick={handleNavClick}
														className="block font-medium text-sm text-foreground/80 hover:text-accent hover:bg-accent/5 rounded-lg px-3 py-2 motion-safe:transition-all duration-350 ease-out min-h-[44px] flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
														style={{
															opacity:
																mobileSubmenuOpen
																	? 1
																	: 0,
															transform:
																mobileSubmenuOpen
																	? "translateY(0) scale(1)"
																	: "translateY(-8px) scale(0.98)",
															transitionDelay:
																mobileSubmenuOpen
																	? `${
																			subIndex *
																			120
																	  }ms`
																	: "0ms",
														}}
													>
														<MenuLabel
															label={item.label}
														/>
													</Link>
												)
											)}

											{/* Lien direct vers la page Accompagnements */}
											{mobileSubmenuOpen && (
												<Link
													href={link.href}
													onClick={handleNavClick}
													className="block text-sm text-muted-foreground hover:text-accent py-2 pl-2 motion-safe:transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
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
																		(link
																			.subItems
																			?.length ||
																			0) *
																		120
																  }ms`
																: "0ms",
													}}
												>
													→ Voir tous les
													accompagnements
												</Link>
											)}
										</div>
									</div>
								</div>
							) : (
								<Link
									key={link.href}
									href={link.href}
									onClick={handleNavClick}
									className="flex items-center font-medium text-foreground/80 hover:text-accent py-3 motion-safe:transition-all duration-400 ease-out min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md"
									style={{
										opacity: isMobileOpen ? 1 : 0,
										transform: isMobileOpen
											? "translateX(0)"
											: "translateX(20px)",
										transitionDelay: isMobileOpen
											? `${index * 100}ms`
											: "0ms",
									}}
								>
									<MenuLabel label={link.label} />
								</Link>
							)
						)}
					</div>
				</nav>
			</div>
		</>
	);
};

export default Header;
