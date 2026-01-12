/**
 * Transforme les balises <img> du contenu WordPress
 * pour ajouter des attributs optimisés SEO et performance
 */

export function optimizeContentImages(htmlContent: string): string {
	if (!htmlContent) return "";

	// Regex pour matcher toutes les balises <img>
	const imgRegex = /<img([^>]*)>/gi;

	return htmlContent.replace(imgRegex, (match, attributes) => {
		let optimized = match;

		// Ajouter loading="lazy" si absent
		if (!attributes.includes("loading=")) {
			optimized = optimized.replace("<img", '<img loading="lazy"');
		}

		// Ajouter decoding="async" si absent
		if (!attributes.includes("decoding=")) {
			optimized = optimized.replace("<img", '<img decoding="async"');
		}

		// Ajouter fetchpriority="low" pour images de contenu
		if (!attributes.includes("fetchpriority=")) {
			optimized = optimized.replace("<img", '<img fetchpriority="low"');
		}

		// Ajouter width/height si manquants (éviter CLS)
		if (!attributes.includes("width=") || !attributes.includes("height=")) {
			// Extraire src pour potentiellement récupérer dimensions
			const srcMatch = attributes.match(/src="([^"]+)"/);
			if (srcMatch) {
				// Ajouter des dimensions par défaut si non présentes
				optimized = optimized.replace(
					"<img",
					'<img style="max-width: 100%; height: auto;"'
				);
			}
		}

		return optimized;
	});
}
