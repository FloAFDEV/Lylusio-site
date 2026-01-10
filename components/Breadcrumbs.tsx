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
		name: "Consultations & Tarifs",
		seoName: "Consultations & Tarifs Toulouse",
	},
	"/astrologie-toulouse": {
		name: "Astrologie",
		seoName: "Astrologie Toulouse",
		// Pas de parent - page autonome
	},
	"/reiki-toulouse": {
		name: "Reiki",
		seoName: "Reiki Toulouse",
		parent: "/accompagnement-toulouse",
	},
	"/therapie-holistique": {
		name: "Thérapie Holistique",
		seoName: "Thérapie Holistique",
		parent: "/accompagnement-toulouse",
	},
	"/emilie-perez": { name: "Qui suis-je", seoName: "Émilie Perez" },
	"/ressources": { name: "Ressources", seoName: "Ressources" },
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
	const [hasScrolled, setHasScrolled] = useState(false);

	// Détecter le premier scroll vers le bas
	useEffect(() => {
		const handleScroll = () => {
			if (!hasScrolled && window.scrollY > 100) {
				setHasScrolled(true);
			}
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, [hasScrolled]);

	// Reset au changement de page - cacher les breadcrumbs jusqu'au prochain scroll
	useEffect(() => {
		setHasScrolled(false);
	}, [currentPath]);

	// Pas de fil d'Ariane sur la home
	if (currentPath === "/") return null;

	// Ne pas afficher avant le premier scroll
	if (!hasScrolled) return null;

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
			className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-28 pb-4 relative"
			aria-label="Fil d'Ariane"
		>
			{showPlant && (
				<GoldenPlantBadge
					size="lg"
					className="absolute -top-2 right-4 md:right-12 opacity-40"
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
			<ol
				className="
    flex sm:hidden items-center
    text-xs text-muted-foreground
    flex-nowrap overflow-x-auto no-scrollbar
    list-none p-0 m-0 mt-4
  "
			>
				{/* Home */}
				<li className="flex-shrink-0">
					<Link
						href="/"
						className="hover:text-accent transition"
						aria-label="Accueil"
					>
						<Home className="w-3.5 h-3.5" aria-hidden="true" />
					</Link>
				</li>

				{/* Chevron */}
				<li className="flex-shrink-0 flex items-center">
					<ChevronRight className="mx-0.5 w-3 h-3 text-muted-foreground/70" />
				</li>

				{/* 1 seul breadcrumb */}
				{breadcrumbs.length === 1 ? (
					<li className="font-medium text-foreground truncate max-w-[70vw]">
						{breadcrumbs[0].name}
					</li>
				) : (
					<>
						<li className="truncate max-w-[35vw] flex-shrink">
							{breadcrumbs[0].name}
						</li>

						<li className="flex-shrink-0 flex items-center">
							<ChevronRight className="mx-0.5 w-3 h-3 text-muted-foreground/70" />
						</li>

						<li className="font-medium text-foreground truncate max-w-[40vw]">
							{breadcrumbs[breadcrumbs.length - 1].name}
						</li>
					</>
				)}
			</ol>
		</nav>
	);
};

export default Breadcrumbs;
