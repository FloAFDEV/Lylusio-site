"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * ScrollReset - Réinitialise le scroll en haut au chargement initial
 * Évite les problèmes de clignotement avec parallax et header
 * SSR-safe: ne s'exécute que côté client
 */
export default function ScrollReset() {
	const pathname = usePathname();

	useEffect(() => {
		// Reset scroll position on mount for homepage only
		// This prevents parallax offset flickering on initial load
		if (pathname === "/" && window.scrollY > 0) {
			window.scrollTo(0, 0);
		}
	}, [pathname]);

	return null;
}
