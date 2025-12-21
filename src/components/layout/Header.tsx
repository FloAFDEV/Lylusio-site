import { useState, useEffect, createContext, useContext } from "react";
import { ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo-lylusio.webp";

// Context for mobile menu state
export const MobileMenuContext = createContext<{ isOpen: boolean }>({
	isOpen: false,
});
export const useMobileMenu = () => useContext(MobileMenuContext);

const navLinks = [
	{ href: "/", label: "Accueil" },
	{ href: "/approche-therapeutique", label: "Mon Approche" },
	{
		label: "Accompagnement",
		href: "/accompagnement-toulouse",
		isDropdown: true,
		items: [
			{ href: "/astrologie-toulouse", label: "Astrologie" },
			{ href: "/reiki-toulouse", label: "Reiki" },
		],
	},
	{ href: "/emilie-perez", label: "Qui suis-je" },
	{ href: "/blog", label: "Blog" },
	{ href: "/contact", label: "Contact" },
];

const mobileNavLinks = [
	{ href: "/", label: "Accueil" },
	{ href: "/approche-therapeutique", label: "Mon Approche" },
	{ href: "/accompagnement-toulouse", label: "Accompagnement" },
	{ href: "/astrologie-toulouse", label: "Astrologie", indent: true },
	{ href: "/reiki-toulouse", label: "Reiki", indent: true },
	{ href: "/emilie-perez", label: "Qui suis-je" },
	{ href: "/blog", label: "Blog" },
	{ href: "/contact", label: "Contact" },
];

const Header = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [openDropdown, setOpenDropdown] = useState<string | null>(null);
	const location = useLocation();

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 20);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		setIsMobileMenuOpen(false);
		setOpenDropdown(null);
	}, [location.pathname]);

	useEffect(() => {
		document.documentElement.style.overflow = isMobileMenuOpen
			? "hidden"
			: "";
		return () => {
			document.documentElement.style.overflow = "";
		};
	}, [isMobileMenuOpen]);

	useEffect(() => {
		window.dispatchEvent(
			new CustomEvent("mobileMenuToggle", {
				detail: { isOpen: isMobileMenuOpen },
			})
		);
	}, [isMobileMenuOpen]);

	const handleNavClick = () => {
		setIsMobileMenuOpen(false);
		setOpenDropdown(null);
		window.scrollTo({ top: 0, behavior: "instant" });
	};

	const isDropdownActive = (items: { href: string }[]) =>
		items.some((item) => location.pathname === item.href);

	const renderLabel = (label: string, href: string) => {
		const isActive = location.pathname === href;
		const firstChar = label.charAt(0);
		const restOfLabel = label.slice(1);

		return (
			<span className="relative inline-block">
				<span
					className={`transition-colors duration-300 ${
						isActive ? "text-accent" : "group-hover:text-accent"
					}`}
				>
					{firstChar}
				</span>
				<span className="transition-colors duration-300">
					{restOfLabel}
				</span>
			</span>
		);
	};

	return (
		<>
			<header
				className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				isScrolled
				? "bg-background/98 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.08)] py-3.5"
				: "bg-background/90 backdrop-blur-md py-5 md:py-6"
				}`}
				role="banner"
			>
				<div className="container mx-auto px-4 sm:px-6 flex items-center justify-between">
					{/* Logo */}
					<Link
						to="/"
						onClick={handleNavClick}
						aria-label="Lylusio – Retour à l'accueil"
						className="relative z-[60] focus:outline-none focus:ring-2 focus:ring-accent/50 rounded-lg transition-all duration-300"
					>
						<img
							src={logo}
							alt="Lylusio – Astrologie et Reiki à Toulouse"
							className={`object-contain transition-all duration-300 hover:scale-105 ${
							isScrolled ? "h-10 w-[130px]" : "h-12 w-[150px]"
							}`}
						/>
					</Link>

					{/* Desktop navigation */}
					<nav
						className="hidden lg:flex items-center gap-8 xl:gap-10"
						role="navigation"
						aria-label="Navigation principale"
					>
						{navLinks.map((link) =>
							link.isDropdown ? (
								<div
									key={link.label}
									className="relative group"
									onMouseEnter={() =>
										setOpenDropdown(link.label)
									}
									onMouseLeave={() => setOpenDropdown(null)}
								>
									<Link
										to={link.href!}
										onClick={handleNavClick}
										className={`flex items-center gap-1.5 text-base font-medium transition-all duration-300 relative group/link ${
										location.pathname === link.href ||
										isDropdownActive(link.items!)
										? "text-accent"
										: "text-foreground/75 hover:text-accent"
										}`}
									>
										{renderLabel(link.label, link.href!)}
										<ChevronDown
											className={`w-3.5 h-3.5 transition-all duration-300 ${
												openDropdown === link.label
													? "rotate-180 text-accent"
													: "text-foreground/40"
											}`}
										/>
										{/* Underline effect */}
										<span
											className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-accent/70 via-gold/60 to-accent/70 transition-all duration-300 ${
												location.pathname ===
													link.href ||
												isDropdownActive(link.items!)
													? "w-full"
													: "w-0 group-hover/link:w-full"
											}`}
										/>
									</Link>

									{/* Dropdown Menu */}
									<div
										className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-300 ${
											openDropdown === link.label
												? "opacity-100 visible translate-y-0"
												: "opacity-0 invisible -translate-y-2 pointer-events-none"
										}`}
									>
										<div className="bg-card/98 backdrop-blur-xl border border-gold/20 shadow-[0_10px_40px_rgba(0,0,0,0.12)] rounded-xl py-2 min-w-[180px] overflow-hidden">
											{link.items!.map((item, idx) => (
												<Link
													key={item.href}
													to={item.href}
													onClick={handleNavClick}
													className={`block px-4 py-2.5 text-[15px] font-medium transition-all duration-200 ${
													location.pathname ===
													item.href
													? "text-accent bg-accent/8 border-l-2 border-accent"
													: "text-foreground/75 hover:text-accent hover:bg-accent/5 hover:border-l-2 hover:border-accent/50"
													}`}
													style={{
														transitionDelay:
															openDropdown ===
															link.label
																? `${
																		idx * 30
																  }ms`
																: "0ms",
													}}
												>
													<span className="flex items-center gap-2">
														<span
															className={`w-1 h-1 rounded-full transition-colors ${
																location.pathname ===
																item.href
																	? "bg-accent"
																	: "bg-foreground/30"
															}`}
														/>
														{item.label}
													</span>
												</Link>
											))}
										</div>
									</div>
								</div>
							) : (
								<Link
									key={link.href}
									to={link.href!}
									onClick={handleNavClick}
									className={`text-base font-medium transition-all duration-300 relative group ${
									location.pathname === link.href
									? "text-accent"
									: "text-foreground/75 hover:text-accent"
									}`}
								>
									{renderLabel(link.label, link.href!)}
									<span
										className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-accent/70 via-gold/60 to-accent/70 transition-all duration-300 ${
											location.pathname === link.href
												? "w-full"
												: "w-0 group-hover:w-full"
										}`}
									/>
								</Link>
							)
						)}
					</nav>

					{/* Mobile toggle - Hamburger morphing moderne */}
					<button
						className="lg:hidden relative z-[60] p-3 -mr-2 rounded-2xl transition-all duration-300 hover:bg-accent/10 active:scale-90 focus:outline-none focus:ring-2 focus:ring-accent/50 backdrop-blur-sm"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						aria-label={
							isMobileMenuOpen
								? "Fermer le menu"
								: "Ouvrir le menu"
						}
						aria-expanded={isMobileMenuOpen}
						aria-controls="mobile-menu"
					>
						<div className="relative w-6 h-6 flex items-center justify-center">
							{/* Hamburger lines qui se transforment en X */}
							<div className="absolute w-6 h-5 flex flex-col justify-between">
								<span
									className={`w-full h-0.5 bg-foreground rounded-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
										isMobileMenuOpen
											? "rotate-45 translate-y-2"
											: "rotate-0 translate-y-0"
									}`}
								/>
								<span
									className={`w-full h-0.5 bg-foreground rounded-full transition-all duration-300 ${
										isMobileMenuOpen
											? "opacity-0 scale-x-0"
											: "opacity-100 scale-x-100"
									}`}
								/>
								<span
									className={`w-full h-0.5 bg-foreground rounded-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
										isMobileMenuOpen
											? "-rotate-45 -translate-y-2"
											: "rotate-0 translate-y-0"
									}`}
								/>
							</div>
						</div>
					</button>
				</div>
			</header>

			{/* Mobile Menu - Ultra moderne avec animations fluides */}
			<div
				id="mobile-menu"
				className={`lg:hidden fixed inset-0 z-40 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
					isMobileMenuOpen
						? "opacity-100 visible"
						: "opacity-0 invisible pointer-events-none"
				}`}
				aria-hidden={!isMobileMenuOpen}
			>
				{/* Overlay cliquable pour fermer */}
				<div
					className="absolute inset-0 cursor-pointer"
					onClick={() => setIsMobileMenuOpen(false)}
					aria-label="Fermer le menu"
				/>

				{/* Background avec effet glassmorphism */}
				<div
					className={`absolute inset-0 bg-gradient-to-br from-background/95 via-background/98 to-sand/95 backdrop-blur-3xl transition-all duration-700 ${
						isMobileMenuOpen 
							? "opacity-100 scale-100" 
							: "opacity-0 scale-95"
					}`}
				/>

				{/* Particules dorées animées */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					{/* Grand halo central */}
					<div
						className={`absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-radial from-gold/8 via-accent/4 to-transparent rounded-full blur-3xl transition-all duration-1000 ${
							isMobileMenuOpen
								? "opacity-100 scale-100 rotate-0"
								: "opacity-0 scale-50 rotate-45"
						}`}
					/>
					
					{/* Particules flottantes */}
					{[...Array(6)].map((_, i) => (
						<div
							key={i}
							className={`absolute w-2 h-2 bg-gold/20 rounded-full blur-sm transition-all duration-[${1000 + i * 200}ms] ${
								isMobileMenuOpen
									? "opacity-100 animate-float"
									: "opacity-0"
							}`}
							style={{
								left: `${20 + i * 15}%`,
								top: `${30 + (i % 3) * 20}%`,
								animationDelay: `${i * 0.3}s`,
								transitionDelay: `${i * 100}ms`,
							}}
						/>
					))}
				</div>

				{/* Navigation mobile - Slide from top avec cascade */}
				<nav
					className={`relative flex flex-col items-center justify-center h-full gap-3 px-8 pt-24 pb-12 transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
						isMobileMenuOpen 
							? "translate-y-0" 
							: "-translate-y-12"
					}`}
					role="navigation"
					aria-label="Navigation mobile"
					onClick={(e) => e.stopPropagation()}
				>
					{mobileNavLinks.map((link, index) => (
						<Link
							key={link.href}
							to={link.href}
							onClick={handleNavClick}
							className={`font-display transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] relative group/link ${
								link.indent
									? "text-base sm:text-lg text-foreground/65 pl-10"
									: "text-2xl sm:text-3xl font-medium"
							} ${
								location.pathname === link.href
									? "text-accent scale-105"
									: link.indent
									? "hover:text-accent hover:translate-x-2 hover:scale-105"
									: "text-foreground/80 hover:text-accent hover:scale-110"
							}`}
							style={{
								transform: isMobileMenuOpen
									? "translateY(0) scale(1)"
									: "translateY(20px) scale(0.95)",
								opacity: isMobileMenuOpen ? 1 : 0,
								transitionDelay: isMobileMenuOpen
									? `${150 + index * 50}ms`
									: "0ms",
							}}
						>
							{/* Ligne décorative pour sous-items */}
							{link.indent && (
								<span className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-px bg-gradient-to-r from-accent/50 to-transparent transition-all duration-300 group-hover/link:w-6" />
							)}
							
							{link.label}

							{/* Indicateur actif avec animation */}
							{location.pathname === link.href && !link.indent && (
								<>
									<span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full animate-pulse" />
									<span className="absolute inset-0 -z-10 bg-accent/5 rounded-2xl blur-xl scale-110" />
								</>
							)}

							{/* Effet hover pour items principaux */}
							{!link.indent && (
								<span className="absolute inset-0 -z-10 bg-accent/5 rounded-2xl opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 blur-xl scale-110" />
							)}
						</Link>
					))}

					{/* Indicateur de fermeture en bas */}
					<div
						className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 ${
							isMobileMenuOpen
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-4"
						}`}
						style={{ transitionDelay: "600ms" }}
					>
						<div className="w-12 h-1 bg-foreground/10 rounded-full" />
						<p className="text-xs text-foreground/40 font-medium">
							Touchez pour fermer
						</p>
					</div>
				</nav>
			</div>
		</>
	);
};

export default Header;
