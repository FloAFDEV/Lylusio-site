"use client";

import { useEffect } from "react";

/**
 * Composant de debug pour vérifier les variables d'environnement côté client
 * À utiliser uniquement en développement
 */
export default function EnvChecker() {
	useEffect(() => {
		console.log("=== 🔍 Environment Variables Check ===");
		console.log("NEXT_PUBLIC_SITE_URL =", process.env.NEXT_PUBLIC_SITE_URL);
		console.log("NEXT_PUBLIC_GA_ID =", process.env.NEXT_PUBLIC_GA_ID);
		console.log("NEXT_PUBLIC_WP_API_URL =", process.env.NEXT_PUBLIC_WP_API_URL);
		console.log("NODE_ENV =", process.env.NODE_ENV);
		console.log("=====================================");
	}, []);

	return null;
}
