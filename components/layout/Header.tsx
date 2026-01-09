"use client";

import { useState, useEffect } from "react";
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
	{ label: "Astrologie", href: "/astrologie-toulouse" },
	{
		label: "Consultations & Tarifs",
		href: "/accompagnement-toulouse",
		hasSubmenu: true,
		subItems: accompagnementsSubItems,
	},
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
	const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<
		Record<string, boolean>
	>({});
	const [desktopSubmenuOpen, setDesktopSubmenuOpen] = useState(false);
	const [mounted, setMounted] = useState(false);

	const pathname = usePathname();

	/* Mark as mounted to prevent hydration mismatch */
	useEffect(() => {
		setMounted(true);
	}, []);

	/* Scroll state - initialize after mount to prevent flash */
	useEffect(() => {
		if (!mounted) return;

		// Initialize scroll state after mount to prevent SSR/client mismatch
		setIsScrolled(window.scrollY > 20);

		const handleScroll = () => setIsScrolled(window.scrollY > 20);
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [mounted]);

	/* Close menus on route change */
	useEffect(() => {
		setIsMobileOpen(false);
		setMobileSubmenuOpen({});
		setDesktopSubmenuOpen(false);
	}, [pathname]);

	/* Block scroll and add blur when mobile menu is open */
	useEffect(() => {
		const mainContent = document.getElementById("main-content");
		const footer = document.querySelector("footer");
		const header = document.querySelector("header");

		const applyBlur = () => {
			if (mainContent) {
				mainContent.style.transition = "filter 700ms ease-out";
				mainContent.style.filter = "blur(8px)";
			}
			if (footer) {
				footer.style.transition = "filter 700ms ease-out";
				footer.style.filter = "blur(8px)";
			}
			if (header) {
				header.style.transition = "filter 700ms ease-out";
				header.style.filter = "blur(8px)";
			}
		};

		const removeBlur = () => {
			if (mainContent) mainContent.style.filter = "none";
			if (footer) footer.style.filter = "none";
			if (header) header.style.filter = "none";
		};

		if (isMobileOpen) {
			document.body.style.overflow = "hidden";
			document.body.classList.add("menu-open");
			applyBlur();
		} else {
			document.body.style.overflow = "unset";
			document.body.classList.remove("menu-open");
			// attendre la fin de la transition avant de supprimer le blur
			const timeout = setTimeout(() => {
				removeBlur();
			}, 700); // durée = 700ms comme la transition
			return () => clearTimeout(timeout);
		}

		return () => {
			document.body.style.overflow = "unset";
			document.body.classList.remove("menu-open");
			removeBlur();
		};
	}, [isMobileOpen]);

	const handleNavClick = () => {
		setIsMobileOpen(false);
		setMobileSubmenuOpen({});
		setDesktopSubmenuOpen(false);
		window.scrollTo({ top: 0, behavior: "instant" });
	};

	const toggleMobileSubmenu = (label: string) => {
		setMobileSubmenuOpen((prev) => ({
			...prev,
			[label]: !prev[label],
		}));
	};

	return (
		<>
			<header
				suppressHydrationWarning
				className={`fixed top-0 left-0 right-0 z-50 transition-all duration-&lsqb;550ms&rsqb; ${
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
							className={`relative transition-all duration-&lsqb;550ms&rsqb; ${
								isScrolled ? "h-11 w-[132px]" : "h-14 w-[168px]"
							}`}
						>
							<Image
								src="/assets/logo-lylusio.webp"
								alt="Lylusio – Astrologie et Reiki à Toulouse - Retour à l'accueil"
								fill
								className="object-contain group-hover:scale-105 transition-transform duration-&lsqb;650ms&rsqb;"
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
									className="relative group"
									onMouseEnter={() =>
										setDesktopSubmenuOpen(true)
									}
									onMouseLeave={() =>
										setDesktopSubmenuOpen(false)
									}
								>
									<button
										type="button"
										aria-label={`Voir les options de ${link.label}`}
										aria-expanded={desktopSubmenuOpen}
										aria-haspopup="true"
										className="flex items-center gap-1 font-medium text-foreground/80 hover:text-accent motion-safe:transition-colors duration-&lsqb;450ms&rsqb; focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md"
										onClick={() =>
											setDesktopSubmenuOpen(
												!desktopSubmenuOpen
											)
										}
										onKeyDown={(e) => {
											if (
												e.key === "Enter" ||
												e.key === " "
											) {
												e.preventDefault();
												setDesktopSubmenuOpen(
													!desktopSubmenuOpen
												);
											}
										}}
									>
										<MenuLabel label={link.label} />
										<ChevronDown
											className={`w-4 h-4 motion-safe:transition-transform duration-&lsqb;1100ms&rsqb; ease-out ${
												desktopSubmenuOpen
													? "rotate-180"
													: ""
											}`}
											aria-hidden="true"
										/>
									</button>

									{/* Dropdown menu - Toujours rendu pour éviter hydration mismatch */}
									<div
										className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 w-52 motion-safe:transition-all duration-&lsqb;1100ms&rsqb; ease-out z-50 ${
											desktopSubmenuOpen
												? "opacity-100 visible translate-y-0 scale-100 pointer-events-auto"
												: "opacity-0 invisible translate-y-3 scale-95 pointer-events-none"
										}`}
									>
											<div className="bg-card/90 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-accent/20 overflow-hidden ring-1 ring-black/5">
												{link.subItems?.map(
													(item, index) => (
														<Link
															key={item.href}
															href={item.href}
															onClick={
																handleNavClick
															}
															className="block px-5 py-3.5 text-[15px] font-medium text-foreground/85 hover:text-accent hover:bg-accent/8 motion-safe:transition-all duration-&lsqb;750ms&rsqb; ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset group/item relative overflow-hidden"
														>
															<span className="relative z-10">
																<MenuLabel
																	label={
																		item.label
																	}
																/>
															</span>
															<span className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent -translate-x-full group-hover/item:translate-x-full motion-safe:transition-transform duration-&lsqb;800ms&rsqb; ease-out" />
														</Link>
													)
												)}

												{/* Lien direct vers la page Accompagnements */}
												<Link
													href={link.href}
													onClick={handleNavClick}
													className="block px-5 py-3 text-[13px] font-medium text-muted-foreground hover:text-accent hover:bg-accent/5 motion-safe:transition-all duration-&lsqb;750ms&rsqb; ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset border-t border-accent/15 group/all relative overflow-hidden"
												>
													<span className="relative z-10 flex items-center gap-1.5">
														<span>→</span>
														<span>
															Voir tous les
															accompagnements
														</span>
													</span>
													<span className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent -translate-x-full group-hover/all:translate-x-full motion-safe:transition-transform duration-&lsqb;800ms&rsqb; ease-out" />
												</Link>
											</div>
									</div>
								</div>
							) : (
								<Link
									key={link.href}
									href={link.href}
									onClick={handleNavClick}
									className="font-medium text-[15px] text-foreground/80 hover:text-foreground motion-safe:transition-colors duration-&lsqb;850ms&rsqb; relative group/link focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md px-1"
								>
									<MenuLabel label={link.label} />
									<span className="absolute -bottom-0.5 left-0 w-full h-[2px] bg-gradient-to-r from-accent/90 via-gold/80 to-accent/90 opacity-0 group-hover/link:opacity-100 motion-safe:transition-opacity duration-&lsqb;700ms&rsqb; shadow-[0_0_6px_hsl(var(--gold)/0.4)]" />
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
							className={`block h-0.5 w-6 bg-foreground rounded-full motion-safe:transition-all duration-&lsqb;650ms&rsqb; ${
								isMobileOpen
									? "rotate-45 translate-y-2"
									: "rotate-0"
							}`}
						/>
						<span
							className={`block h-0.5 w-6 bg-foreground rounded-full motion-safe:transition-all duration-&lsqb;650ms&rsqb; ${
								isMobileOpen
									? "opacity-0 scale-0"
									: "opacity-100"
							}`}
						/>
						<span
							className={`block h-0.5 w-6 bg-foreground rounded-full motion-safe:transition-all duration-&lsqb;650ms&rsqb; ${
								isMobileOpen
									? "-rotate-45 -translate-y-2"
									: "rotate-0"
							}`}
						/>
						<div
							className={`absolute inset-0 rounded-lg bg-accent/20 opacity-0 group-hover:opacity-100 motion-safe:transition-opacity duration-&lsqb;550ms&rsqb; ${
								isMobileOpen ? "opacity-100" : ""
							}`}
							aria-hidden="true"
						/>
					</button>
				</div>
			</header>

			{/* ================= Mobile Overlay ================= */}
			<div
				className={`xl:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40 motion-safe:transition-opacity duration-&lsqb;700ms&rsqb; ease-out ${
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
				className={`xl:hidden fixed top-0 right-0 h-full w-3/4 max-w-xs bg-card shadow-lg border-l border-accent/20 z-50 motion-safe:transition-transform duration-&lsqb;800ms&rsqb; ease-&lsqb;cubic-bezier(0.23,1,0.32,1)&rsqb; ${
					isMobileOpen ? "translate-x-0" : "translate-x-[110%]"
				}`}
				role="dialog"
				aria-label="Menu de navigation mobile"
				aria-modal={isMobileOpen}
				inert={!isMobileOpen || undefined}
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
										className="motion-safe:transition-all duration-&lsqb;700ms&rsqb; ease-out will-change-transform"
										style={{
											opacity: isMobileOpen ? 1 : 0,
											transform: isMobileOpen
												? "translateY(0)"
												: "translateY(12px)",
											transitionDelay: isMobileOpen
												? `${index * 50 + 150}ms`
												: "0ms", // cascade douce
										}}
									>
										<button
											type="button"
											onClick={() =>
												toggleMobileSubmenu(link.label)
											}
											className="w-full flex items-center justify-between font-medium text-foreground/80 hover:text-accent py-3 motion-safe:transition-colors duration-&lsqb;550ms&rsqb; focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 min-h-[44px]"
											aria-expanded={
												mobileSubmenuOpen[link.label] ||
												false
											}
											aria-controls={`mobile-submenu-${link.label
												.toLowerCase()
												.replace(/\s+/g, "-")}`}
										>
											<MenuLabel label={link.label} />
											<ChevronDown
												className={`w-4 h-4 motion-safe:transition-transform duration-&lsqb;900ms&rsqb; ease-in-out ${
													mobileSubmenuOpen[
														link.label
													]
														? "rotate-180"
														: ""
												}`}
												aria-hidden="true"
											/>
										</button>

										{/* Sous-menu mobile smooth avec translateY uniquement */}
										<div
											id={`mobile-submenu-${link.label
												.toLowerCase()
												.replace(/\s+/g, "-")}`}
											className={`overflow-hidden ${
												mobileSubmenuOpen[link.label]
													? "max-h-52"
													: "max-h-0"
											}`}
										>
											<div className="pl-4 py-2 space-y-1 border-l-2 backdrop-blur-lg border-accent/30 ml-2">
												{link.subItems?.map(
													(item, subIndex) => (
														<Link
															key={item.href}
															href={item.href}
															onClick={
																handleNavClick
															}
															className="block font-medium text-sm text-foreground/80 hover:text-accent hover:bg-accent/5 rounded-lg px-3 py-2 motion-safe:transition-all duration-&lsqb;400ms&rsqb; ease-out min-h-[44px] flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent will-change-transform"
															style={{
																opacity:
																	mobileSubmenuOpen[
																		link
																			.label
																	]
																		? 1
																		: 0,
																transform:
																	mobileSubmenuOpen[
																		link
																			.label
																	]
																		? "translateY(0)"
																		: "translateY(-8px)",
																transitionDelay:
																	mobileSubmenuOpen[
																		link
																			.label
																	]
																		? `${
																				subIndex *
																				50
																		  }ms`
																		: "0ms",
															}}
														>
															<MenuLabel
																label={
																	item.label
																}
															/>
														</Link>
													)
												)}

												{/* Lien direct vers la page Accompagnements */}
												{mobileSubmenuOpen[
													link.label
												] && (
													<Link
														href={link.href}
														onClick={handleNavClick}
														className="block text-sm text-muted-foreground hover:text-accent py-2 pl-2 motion-safe:transition-all duration-&lsqb;400ms&rsqb; ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg will-change-transform"
														style={{
															opacity:
																mobileSubmenuOpen[
																	link.label
																]
																	? 1
																	: 0,
															transform:
																mobileSubmenuOpen[
																	link.label
																]
																	? "translateY(0)"
																	: "translateY(-8px)",
															transitionDelay:
																mobileSubmenuOpen[
																	link.label
																]
																	? `${
																			(link
																				.subItems
																				?.length ||
																				0) *
																			50
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
										className="flex items-center font-medium text-foreground/80 hover:text-accent py-3 motion-safe:transition-all duration-&lsqb;500ms&rsqb; ease-out min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-md will-change-transform"
										style={{
											opacity: isMobileOpen ? 1 : 0,
											transform: isMobileOpen
												? "translateY(0)"
												: "translateY(12px)",
											transitionDelay: isMobileOpen
												? `${index * 50 + 150}ms`
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
