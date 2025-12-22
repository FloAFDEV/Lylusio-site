import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import logo from "@/assets/logo-lylusio.webp";

const MenuLabel = ({ label }: { label: string }) => (
	<span className="inline-flex items-baseline">
		<span className="font-calligraphic text-[1.4em] leading-none -mr-0.5">
			{label.charAt(0)}
		</span>
		<span>{label.slice(1)}</span>
	</span>
);

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

export const Header = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isMobileOpen, setIsMobileOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const location = useLocation();

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 20);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

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

	useEffect(() => {
		setIsMobileOpen(false);
		setIsDropdownOpen(false);
	}, [location.pathname]);

	const handleNavClick = () => {
		setIsMobileOpen(false);
		setIsDropdownOpen(false);
		window.scrollTo({ top: 0, behavior: "instant" });
	};

	return (
		<>
			<header
				className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
					isScrolled
						? "bg-background/95 shadow-sm py-3.5"
						: "bg-background/90 py-5"
				}`}
			>
				<div className="container mx-auto px-4 flex items-center justify-between">
					<Link
						to="/"
						onClick={handleNavClick}
						className="relative z-50"
					>
						<img
							src={logo}
							alt="Lylusio – Astrologie et Reiki à Toulouse"
							className={`h-12 w-auto transition-transform duration-300 ${
								isScrolled ? "h-10" : "h-12"
							}`}
						/>
					</Link>

					{/* Desktop */}
					<nav className="hidden lg:flex items-center gap-8">
						{mainLinks.map((link) =>
							link.hasSubmenu ? (
								<div
									key={link.label}
									className="relative"
									ref={dropdownRef}
									onMouseEnter={() => setIsDropdownOpen(true)}
									onMouseLeave={() =>
										setIsDropdownOpen(false)
									}
								>
									<button className="flex items-center gap-1 font-medium text-foreground/80 hover:text-accent transition-colors duration-300">
										<MenuLabel label={link.label} />
										<ChevronDown
											className={`w-4 h-4 transition-transform duration-300 ${
												isDropdownOpen
													? "rotate-180"
													: ""
											}`}
										/>
									</button>
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
													to={item.href}
													onClick={handleNavClick}
													className={`block px-4 py-3 text-[16px] font-medium text-foreground/90 hover:text-accent hover:bg-accent/5 transition-all duration-300`}
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
									to={link.href}
									onClick={handleNavClick}
									className={`font-medium text-foreground/80 hover:text-accent transition-colors duration-300`}
								>
									<MenuLabel label={link.label} />
								</Link>
							)
						)}
					</nav>

					{/* Mobile */}
					<button
						onClick={() => setIsMobileOpen(!isMobileOpen)}
						className="lg:hidden p-2 flex flex-col items-center justify-center gap-1.5 w-10 h-10"
					>
						<span
							className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
								isMobileOpen ? "rotate-45 translate-y-2" : ""
							}`}
						/>
						<span
							className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
								isMobileOpen ? "opacity-0" : ""
							}`}
						/>
						<span
							className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
								isMobileOpen ? "-rotate-45 -translate-y-2" : ""
							}`}
						/>
					</button>
				</div>
			</header>

			{/* Mobile Menu */}
			<div
				className={`lg:hidden fixed inset-0 bg-black/10 z-40 transition-opacity duration-300 ${
					isMobileOpen
						? "opacity-100 visible"
						: "opacity-0 invisible pointer-events-none"
				}`}
				onClick={() => setIsMobileOpen(false)}
			/>
			<div
				className={`lg:hidden fixed top-0 right-0 h-full w-3/4 max-w-xs bg-card/95 shadow-lg border-l border-accent/20 z-50 transition-transform duration-300 ${
					isMobileOpen ? "translate-x-0" : "translate-x-full"
				}`}
			>
				<nav className="p-6 flex flex-col gap-3">
					{mainLinks.map((link) => {
						if (link.hasSubmenu) {
							const [open, setOpen] = useState(false);
							return (
								<div key={link.label}>
									<button
										onClick={() => setOpen(!open)}
										className="w-full flex justify-between items-center font-medium text-foreground/80 hover:text-accent py-3 transition-all duration-300"
									>
										<MenuLabel label={link.label} />
										<ChevronDown
											className={`w-5 h-5 transition-transform duration-300 ${
												open ? "rotate-180" : ""
											}`}
										/>
									</button>
									<div
										className={`overflow-hidden transition-all duration-300 ${
											open
												? "max-h-60 opacity-100"
												: "max-h-0 opacity-0"
										}`}
									>
										<div className="pl-4 py-2 space-y-1 border-l-2 border-accent/30 ml-2">
											{subItems.map((item) => (
												<Link
													key={item.href}
													to={item.href}
													onClick={handleNavClick}
													className="block font-medium text-sm text-foreground/80 hover:text-accent hover:bg-accent/5 rounded-lg px-3 py-2 transition-all duration-300"
												>
													<MenuLabel
														label={item.label}
													/>
												</Link>
											))}
										</div>
									</div>
								</div>
							);
						} else {
							return (
								<Link
									key={link.href}
									to={link.href}
									onClick={handleNavClick}
									className="font-medium text-foreground/80 hover:text-accent py-3 transition-all duration-300"
								>
									<MenuLabel label={link.label} />
								</Link>
							);
						}
					})}
				</nav>
			</div>
		</>
	);
};

export default Header;
