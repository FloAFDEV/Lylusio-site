/**
 * Helper pour transformer les URLs d'images WordPress
 * Convertit les URLs WordPress en URLs passant par l'Edge Function
 * pour permettre l'optimisation Next.js (WebP, AVIF, resize, lazy-load)
 */

const WORDPRESS_DOMAIN = "admin.lylusio.fr";
const SITE_URL =
	process.env.NEXT_PUBLIC_SITE_URL || "https://lylusio.fr";

/**
 * Transforme une URL d'image WordPress pour utiliser l'Edge Function
 * @param wpImageUrl - URL complète de l'image WordPress ou chemin relatif
 * @returns URL optimisée via Edge Function
 *
 * @example
 * // URL complète
 * getOptimizedImageUrl("https://admin.lylusio.fr/wp-content/uploads/2024/01/image.jpg")
 * // => "https://lylusio.fr/api/wp-image?url=/wp-content/uploads/2024/01/image.jpg"
 *
 * @example
 * // Chemin relatif
 * getOptimizedImageUrl("/wp-content/uploads/2024/01/image.jpg")
 * // => "https://lylusio.fr/api/wp-image?url=/wp-content/uploads/2024/01/image.jpg"
 */
export function getOptimizedImageUrl(wpImageUrl: string | null | undefined): string {
	// Fallback si l'URL est vide ou nulle
	if (!wpImageUrl) {
		return "/assets/logo-lylusio.png";
	}

	// Si c'est déjà une URL locale (assets), la retourner telle quelle
	if (wpImageUrl.startsWith("/assets/") || wpImageUrl.startsWith("/")) {
		// Vérifier si c'est bien un chemin wp-content
		if (!wpImageUrl.includes("/wp-content/")) {
			return wpImageUrl;
		}
	}

	try {
		let imagePath: string;

		// Extraire le chemin de l'image
		if (wpImageUrl.startsWith("http")) {
			const url = new URL(wpImageUrl);
			imagePath = url.pathname;
		} else {
			imagePath = wpImageUrl;
		}

		// Vérifier que le chemin commence par /wp-content/
		if (!imagePath.startsWith("/wp-content/")) {
			console.warn(
				`Invalid WordPress image path: ${imagePath}. Returning fallback.`,
			);
			return "/assets/logo-lylusio.png";
		}

		// Construire l'URL via l'Edge Function
		const optimizedUrl = `${SITE_URL}/api/wp-image?url=${encodeURIComponent(imagePath)}`;

		return optimizedUrl;
	} catch (error) {
		console.error("Error transforming WordPress image URL:", error);
		return "/assets/logo-lylusio.png";
	}
}

/**
 * Extrait l'URL de l'image featured depuis un post WordPress
 * Compatible avec _embedded data
 * @param post - Post WordPress avec données embedded
 * @param size - Taille de l'image ('thumbnail', 'medium', 'large', 'full')
 * @returns URL optimisée de l'image ou fallback
 *
 * @example
 * getFeaturedImageUrl(post, 'large')
 * // => "https://lylusio.fr/api/wp-image?url=/wp-content/uploads/2024/01/image.jpg"
 */
export function getFeaturedImageUrl(
	post: any,
	size: "thumbnail" | "medium" | "large" | "full" = "large",
): string {
	try {
		// Essayer d'extraire depuis _embedded
		const media = post._embedded?.["wp:featuredmedia"]?.[0];

		if (media?.media_details?.sizes?.[size]?.source_url) {
			return getOptimizedImageUrl(
				media.media_details.sizes[size].source_url,
			);
		}

		// Fallback vers l'URL complète
		if (media?.source_url) {
			return getOptimizedImageUrl(media.source_url);
		}

		// Fallback vers guid
		if (media?.guid?.rendered) {
			return getOptimizedImageUrl(media.guid.rendered);
		}

		// Dernier fallback
		return "/assets/logo-lylusio.png";
	} catch (error) {
		console.error("Error extracting featured image:", error);
		return "/assets/logo-lylusio.png";
	}
}

/**
 * Extrait l'alt text de l'image featured depuis un post WordPress
 * @param post - Post WordPress avec données embedded
 * @returns Texte alternatif ou titre du post
 */
export function getFeaturedImageAlt(post: any): string {
	try {
		const media = post._embedded?.["wp:featuredmedia"]?.[0];

		// Utiliser alt_text si disponible
		if (media?.alt_text) {
			return media.alt_text;
		}

		// Fallback vers le titre de l'image
		if (media?.title?.rendered) {
			return media.title.rendered;
		}

		// Fallback vers le titre du post
		if (post.title?.rendered) {
			return post.title.rendered;
		}

		return "Image Lylusio";
	} catch (error) {
		console.error("Error extracting featured image alt:", error);
		return "Image Lylusio";
	}
}

/**
 * Extrait les dimensions de l'image featured depuis un post WordPress
 * @param post - Post WordPress avec données embedded
 * @param size - Taille de l'image
 * @returns Objet avec width et height ou null
 */
export function getFeaturedImageDimensions(
	post: any,
	size: "thumbnail" | "medium" | "large" | "full" = "large",
): { width: number; height: number } | null {
	try {
		const media = post._embedded?.["wp:featuredmedia"]?.[0];

		if (media?.media_details?.sizes?.[size]) {
			const sizeData = media.media_details.sizes[size];
			return {
				width: sizeData.width,
				height: sizeData.height,
			};
		}

		// Fallback vers les dimensions originales
		if (media?.media_details?.width && media?.media_details?.height) {
			return {
				width: media.media_details.width,
				height: media.media_details.height,
			};
		}

		return null;
	} catch (error) {
		console.error("Error extracting image dimensions:", error);
		return null;
	}
}

/**
 * Vérifie si une URL d'image est une URL WordPress
 * @param imageUrl - URL à vérifier
 * @returns true si c'est une URL WordPress
 */
export function isWordPressImage(imageUrl: string): boolean {
	if (!imageUrl) return false;

	return (
		imageUrl.includes(WORDPRESS_DOMAIN) ||
		imageUrl.includes("/wp-content/")
	);
}

/**
 * Transforme toutes les URLs d'images dans un contenu HTML
 * Utile pour transformer les images dans le contenu des posts
 * @param htmlContent - Contenu HTML avec des images
 * @returns HTML avec URLs transformées
 */
export function transformContentImages(htmlContent: string): string {
	if (!htmlContent) return "";

	// Regex pour matcher les URLs d'images dans src=""
	const imgRegex = /src="([^"]+)"/g;

	return htmlContent.replace(imgRegex, (match, imageUrl) => {
		if (isWordPressImage(imageUrl)) {
			const optimizedUrl = getOptimizedImageUrl(imageUrl);
			return `src="${optimizedUrl}"`;
		}
		return match;
	});
}

/**
 * Extrait toutes les URLs d'images depuis un contenu HTML
 * @param htmlContent - Contenu HTML
 * @returns Array des URLs d'images
 */
export function extractImagesFromContent(htmlContent: string): string[] {
	if (!htmlContent) return [];

	const imgRegex = /src="([^"]+)"/g;
	const images: string[] = [];
	let match;

	while ((match = imgRegex.exec(htmlContent)) !== null) {
		images.push(match[1]);
	}

	return images;
}
