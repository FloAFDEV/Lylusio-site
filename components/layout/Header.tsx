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
========================= */
const subItems = [
	{ label: "Astrologie", href: "/astrologie-toulouse" },
	{ label: "Reiki", href: "/reiki-toulouse" },
];

const mainLinks = [
	{ label: "Accueil", href: "/" },
	{ label: "Mon Approche", href: "/approche-therapeutique" },
	{
		label: "Accompagnement",
		href: "/accompagnement-toulouse",
		hasSubmenu: true,
	},
	{ label: "Qui suis-je", href: "/emilie-perez" },
	{ label: "Blog", href: "/blog" },
	{ label: "Contact", href: "/contact" },
];

/* =========================
   Header
========================= */
export const Header = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isMobileOpen, setIsMobileOpen] = useState(false);
	const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(false);

	const dropdownRef = useRef<HTMLDivElement>(null);
	const pathname = usePathname();

	/* Scroll state */
	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 20);
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	/* Close dropdown on outside click */
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsDropdownOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	/* Close menus on route change */
	useEffect(() => {
		setIsMobileOpen(false);
		setIsDropdownOpen(false);
		setMobileSubmenuOpen(false);
	}, [pathname]);

	const handleNavClick = () => {
		setIsMobileOpen(false);
		setIsDropdownOpen(false);
		setMobileSubmenuOpen(false);
		window.scrollTo({ top: 0, behavior: "instant" });
	};

	return (
		<>
			<header
				role="banner"
				className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
					isScrolled
						? "bg-background/95 shadow-sm py-3.5"
						: "bg-background/90 py-5"
				}`}
			>
				<div className="container mx-auto px-4 flex items-center justify-between">
					{/* Logo */}
					<Link
						href="/"
						onClick={handleNavClick}
						className="relative z-50 group"
					>
						<div className={`relative transition-all duration-300 ${
								isScrolled ? "h-11 w-[132px]" : "h-14 w-[168px]"
							}`}>
							<Image
								src="/assets/logo-lylusio.webp"
								alt="Lylusio – Astrologie et Reiki à Toulouse"
								fill
								className="object-contain group-hover:scale-105 transition-transform duration-300"
								priority
							/>
						</div>
					</Link>

					{/* ================= Desktop ================= */}
					<nav className="hidden lg:flex items-center gap-8" aria-label="Navigation principale">
						{mainLinks.map((link) =>
							link.hasSubmenu ? (
								<div
									key={link.label}
									ref={dropdownRef}
									className="relative flex items-center gap-1"
									onMouseEnter={() => setIsDropdownOpen(true)}
									onMouseLeave={() =>
										setIsDropdownOpen(false)
									}
								>
									{/* ✅ NAVIGATION */}
									<Link
										href={link.href}
										onClick={handleNavClick}
										className="font-medium text-[15px] text-foreground/80 hover:text-foreground transition-colors duration-300 relative group/link"
									>
										<MenuLabel label={link.label} />
										<span className="absolute -bottom-1 left-0 w-0 h-[3px] bg-gradient-to-r from-accent via-gold to-accent opacity-0 group-hover/link:w-full group-hover/link:opacity-100 transition-all duration-300 shadow-[0_0_8px_hsl(var(--gold)/0.6)]" />
									</Link>

									{/* Dropdown toggle */}
									<button
										type="button"
										aria-label={isDropdownOpen ? "Fermer le sous-menu" : "Ouvrir le sous-menu"}
										aria-expanded={isDropdownOpen}
										className="p-1"
									>
										<ChevronDown
											className={`w-4 h-4 transition-transform duration-300 ${
												isDropdownOpen
													? "rotate-180"
													: ""
											}`}
											aria-hidden="true"
										/>
									</button>

									{/* Dropdown */}
									<div
										className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-48 transition-all duration-300 ${
											isDropdownOpen
												? "opacity-100 visible translate-y-0 scale-100"
												: "opacity-0 invisible -translate-y-3 scale-95 pointer-events-none"
										}`}
									>
										<div className="bg-card/95 rounded-xl shadow-md border border-accent/20 overflow-hidden">
											{subItems.map((item, idx) => (
												<Link
													key={item.href}
													href={item.href}
													onClick={handleNavClick}
													className="block px-4 py-3 text-[16px] font-medium text-foreground/90 hover:text-accent hover:bg-accent/5 transition-all duration-300"
													style={{
														opacity: isDropdownOpen
															? 1
															: 0,
														transform:
															isDropdownOpen
																? "translateX(0)"
																: "translateX(-8px)",
														transitionDelay:
															isDropdownOpen
																? `${
																		idx *
																			50 +
																		100
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
								</div>
							) : (
								<Link
									key={link.href}
									href={link.href}
									onClick={handleNavClick}
									className="font-medium text-[15px] text-foreground/80 hover:text-foreground transition-colors duration-300 relative group/link"
								>
									<MenuLabel label={link.label} />
									<span className="absolute -bottom-1 left-0 w-0 h-[3px] bg-gradient-to-r from-accent via-gold to-accent opacity-0 group-hover/link:w-full group-hover/link:opacity-100 transition-all duration-300 shadow-[0_0_8px_hsl(var(--gold)/0.6)]" />
								</Link>
							)
						)}
					</nav>

					{/* ================= Mobile toggle ================= */}
					<button
						onClick={() => setIsMobileOpen((v) => !v)}
						className="lg:hidden p-2 flex flex-col items-center justify-center gap-1.5 w-10 h-10 relative group"
						aria-label={isMobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
						aria-expanded={isMobileOpen}
					>
						{/* Glow effect on open */}
						{isMobileOpen && (
							<span className="absolute inset-0 bg-accent/10 rounded-lg blur-sm" aria-hidden="true" />
						)}
						<span
							className={`relative block w-6 h-[3px] transition-all duration-300 ${
								isMobileOpen
									? "rotate-45 translate-y-2 bg-accent shadow-[0_0_8px_hsl(var(--accent)/0.6)]"
									: "bg-foreground shadow-sm"
							}`}
						/>
						<span
							className={`relative block w-6 h-[3px] bg-foreground shadow-sm transition-all duration-300 ${
								isMobileOpen ? "opacity-0" : ""
							}`}
						/>
						<span
							className={`relative block w-6 h-[3px] transition-all duration-300 ${
								isMobileOpen
									? "-rotate-45 -translate-y-2 bg-accent shadow-[0_0_8px_hsl(var(--accent)/0.6)]"
									: "bg-foreground shadow-sm"
							}`}
						/>
					</button>
				</div>
			</header>

			{/* ================= Mobile overlay ================= */}
			<div
				className={`lg:hidden fixed inset-0 bg-black/10 z-40 transition-opacity duration-300 ${
					isMobileOpen
						? "opacity-100 visible"
						: "opacity-0 invisible pointer-events-none"
				}`}
				onClick={() => setIsMobileOpen(false)}
			/>

			{/* ================= Mobile menu ================= */}
			<div
				className={`lg:hidden fixed top-0 right-0 h-full w-3/4 max-w-xs bg-card/95 shadow-lg border-l border-accent/20 z-50 transition-transform duration-300 ${
					isMobileOpen ? "translate-x-0" : "translate-x-full"
				}`}
				role="dialog"
				aria-label="Menu de navigation mobile"
			>
				<nav className="p-6 flex flex-col gap-3" aria-label="Navigation mobile">
					{mainLinks.map((link) =>
						link.hasSubmenu ? (
							<div key={link.label}>
								<Link
									href={link.href}
									onClick={handleNavClick}
									className="block font-medium text-foreground/80 hover:text-accent py-3 transition-colors duration-300"
								>
									<MenuLabel label={link.label} />
								</Link>

								<div className="pl-4 py-2 space-y-1 border-l-2 border-accent/30 ml-2">
									{subItems.map((item) => (
										<Link
											key={item.href}
											href={item.href}
											onClick={handleNavClick}
											className="block font-medium text-sm text-foreground/80 hover:text-accent hover:bg-accent/5 rounded-lg px-3 py-2 transition-all duration-300"
										>
											<MenuLabel label={item.label} />
										</Link>
									))}
								</div>
							</div>
						) : (
							<Link
								key={link.href}
								href={link.href}
								onClick={handleNavClick}
								className="font-medium text-foreground/80 hover:text-accent py-3 transition-colors duration-300"
							>
								<MenuLabel label={link.label} />
							</Link>
						)
					)}
				</nav>
			</div>
		</>
	);
};
export default Header;
