"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import GoldenPlantBadge from "@/components/GoldenPlantBadge";

// ROUTES CONFIG
const routeConfig: Record<
	string,
	{ name: string; seoName: string; parent?: string }
> = {
	"/": { name: "Accueil", seoName: "Accueil" },
	"/approche-therapeutique": {
		name: "Mon Approche",
		seoName: "Approche Thérapeutique",
	},
	"/accompagnement-toulouse": {
		name: "Accompagnement",
		seoName: "Accompagnement Toulouse",
	},
	"/astrologie-toulouse": {
		name: "Astrologie",
		seoName: "Astrologie Toulouse",
		parent: "/accompagnement-toulouse",
	},
	"/reiki-toulouse": {
		name: "Reiki",
		seoName: "Reiki Toulouse",
		parent: "/accompagnement-toulouse",
	},
	"/emilie-perez": { name: "Qui suis-je", seoName: "Émilie Perez" },
	"/blog": { name: "Blog", seoName: "Blog Astrologie & Bien-être" },
	"/contact": { name: "Contact", seoName: "Contact" },
	"/faq": { name: "FAQ", seoName: "Questions Fréquentes" },
	"/mentions-legales": {
		name: "Mentions Légales",
		seoName: "Mentions Légales",
	},
	"/confidentialite": {
		name: "Confidentialité",
		seoName: "Politique de Confidentialité",
	},
	"/cgu": { name: "CGU", seoName: "CGU" },
	"/category/blog/astrologie": {
		name: "Astrologie",
		seoName: "Catégorie Astrologie",
		parent: "/blog",
	},
	"/category/blog/reiki": {
		name: "Reiki",
		seoName: "Catégorie Reiki",
		parent: "/blog",
	},
	"/category/blog/developpement-personnel": {
		name: "Développement Personnel",
		seoName: "Développement Personnel",
		parent: "/blog",
	},
};

interface BreadcrumbItem {
	path: string;
	name: string;
	isLast: boolean;
}

interface BreadcrumbsProps {
	showPlant?: boolean;
	customTitle?: string;
}

const Breadcrumbs = ({ showPlant = true, customTitle }: BreadcrumbsProps) => {
	const pathname = usePathname();
	const currentPath = pathname;
	const [isVisible, setIsVisible] = useState(false);

	// Show breadcrumbs after scroll
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 20) {
				setIsVisible(true);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Reset visibility on route change
	useEffect(() => {
		setIsVisible(false);
	}, [currentPath]);

	// Pas de fil d'Ariane sur la home
	if (currentPath === "/") return null;

	// Construction des breadcrumbs
	const buildBreadcrumbs = (): BreadcrumbItem[] => {
		const breadcrumbs: BreadcrumbItem[] = [];
		const isBlogArticle =
			currentPath.startsWith("/blog/") && currentPath !== "/blog";

		// Cas des articles de blog
		if (isBlogArticle) {
			breadcrumbs.push({ path: "/blog", name: "Blog", isLast: false });
			breadcrumbs.push({
				path: currentPath,
				name: customTitle || "Article",
				isLast: true,
			});
			return breadcrumbs;
		}

		const config = routeConfig[currentPath];

		if (config) {
			// Ajout parent si existant
			if (config.parent && routeConfig[config.parent]) {
				breadcrumbs.push({
					path: config.parent,
					name: routeConfig[config.parent].name,
					isLast: false,
				});
			}

			// Dernier
			breadcrumbs.push({
				path: currentPath,
				name: customTitle || config.name,
				isLast: true,
			});
		} else {
			// Page inconnue / dynamique
			breadcrumbs.push({
				path: currentPath,
				name: customTitle || "Page",
				isLast: true,
			});
		}

		return breadcrumbs;
	};

	const breadcrumbs = buildBreadcrumbs();

	return (
		<nav
			className={`container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-28 relative transition-all duration-500 ease-out ${
				isVisible
					? "opacity-100 pb-4"
					: "opacity-0 h-0 pb-0 pointer-events-none overflow-hidden"
			}`}
			aria-label="Fil d'Ariane"
		>
			{showPlant && (
				<GoldenPlantBadge
					size="lg"
					className="absolute top-16 sm:top-20 right-4 md:right-12 opacity-40"
				/>
			)}

			{/* DESKTOP */}
			<ol className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
				<li className="flex-shrink-0">
					<Link
						href="/"
						className="flex items-center gap-1 hover:text-accent transition"
					>
						<Home className="w-4 h-4" />
						<span>Accueil</span>
					</Link>
				</li>

				{breadcrumbs.map((crumb, index) => (
					<li key={index} className="flex items-center gap-2 min-w-0">
						<ChevronRight className="w-4 h-4 text-muted-foreground/70" />

						{crumb.isLast ? (
							<span className="font-medium text-foreground truncate max-w-[200px]">
								{crumb.name}
							</span>
						) : (
							<Link
								href={crumb.path}
								className="hover:text-accent transition truncate max-w-[150px]"
							>
								{crumb.name}
							</Link>
						)}
					</li>
				))}
			</ol>

			{/* MOBILE */}
			<ol className="flex sm:hidden items-center gap-1 text-xs text-muted-foreground flex-nowrap overflow-x-auto no-scrollbar">
				{/* Home */}
				<li className="flex-shrink-0">
					<Link
						href="/"
						className="flex items-center gap-1 hover:text-accent transition"
					>
						<Home className="w-3.5 h-3.5" />
					</Link>
				</li>

				<ChevronRight className="w-3 h-3 text-muted-foreground/70 flex-shrink-0" />

				{/* 1 seul breadcrumb → afficher uniquement le dernier */}
				{breadcrumbs.length === 1 ? (
					<span className="font-medium text-foreground truncate max-w-[70vw]">
						{breadcrumbs[0].name}
					</span>
				) : (
					<>
						{/* Parent */}
						<span className="truncate max-w-[35vw] flex-shrink">
							{breadcrumbs[0].name}
						</span>

						<ChevronRight className="w-3 h-3 text-muted-foreground/70 flex-shrink-0" />

						{/* Dernier élément */}
						<span className="font-medium text-foreground truncate max-w-[40vw]">
							{breadcrumbs[breadcrumbs.length - 1].name}
						</span>
					</>
				)}
			</ol>
		</nav>
	);
};

export default Breadcrumbs;
