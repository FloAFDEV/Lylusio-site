/**
 * Nettoie les shortcodes WordPress du contenu HTML
 * Gère [caption], [gallery], [audio], [video], etc.
 */

/**
 * Supprime tous les shortcodes WordPress d'un contenu HTML
 * @param content - Contenu HTML brut depuis WordPress
 * @returns Contenu nettoyé sans shortcodes
 */
export function removeWordPressShortcodes(content: string): string {
	if (!content) return "";

	let cleaned = content;

	// 1. Traiter [caption] avec extraction de l'image et suppression du caption
	// Pattern: [caption ...]<img ... />Caption text[/caption]
	cleaned = cleaned.replace(
		/\[caption[^\]]*\]([\s\S]*?)\[\/caption\]/gi,
		(match, innerContent) => {
			// Extraire uniquement l'image, supprimer le texte du caption
			const imgMatch = innerContent.match(/<img[^>]*>/i);
			if (imgMatch) {
				// Ajouter aria-hidden au caption s'il est conservé (optionnel)
				return imgMatch[0]; // Retourne uniquement l'image
			}
			return ""; // Supprimer complètement si pas d'image
		}
	);

	// 2. Supprimer [gallery] complètement (non supporté nativement)
	cleaned = cleaned.replace(/\[gallery[^\]]*\]/gi, "");

	// 3. Supprimer [audio] et [video] shortcodes (on garde les balises HTML natives)
	cleaned = cleaned.replace(/\[audio[^\]]*\]([\s\S]*?)\[\/audio\]/gi, "$1");
	cleaned = cleaned.replace(/\[video[^\]]*\]([\s\S]*?)\[\/video\]/gi, "$1");

	// 4. Supprimer [embed] shortcodes (on garde l'URL ou iframe si présent)
	cleaned = cleaned.replace(/\[embed[^\]]*\]([\s\S]*?)\[\/embed\]/gi, "$1");

	// 5. Supprimer tous les autres shortcodes génériques
	// Pattern: [shortcode] ou [shortcode attr="value"]...[/shortcode]
	cleaned = cleaned.replace(/\[[^\]]+\]/g, "");

	// 6. Nettoyer les espaces multiples générés
	cleaned = cleaned.replace(/\s{2,}/g, " ");
	cleaned = cleaned.replace(/<p>\s*<\/p>/gi, "");

	return cleaned.trim();
}

/**
 * Rend les captions WordPress invisibles aux moteurs de recherche
 * tout en les gardant pour le style front-end
 * @param content - Contenu HTML
 * @returns Contenu avec captions en aria-hidden
 */
export function hideWordPressCaptions(content: string): string {
	if (!content) return "";

	// Ajouter aria-hidden="true" à toutes les figcaption
	let processed = content.replace(
		/<figcaption([^>]*)>/gi,
		'<figcaption$1 aria-hidden="true">'
	);

	// Ajouter aria-hidden aux divs avec classe wp-caption-text
	processed = processed.replace(
		/<div([^>]*class="[^"]*wp-caption-text[^"]*"[^>]*)>/gi,
		'<div$1 aria-hidden="true">'
	);

	return processed;
}

/**
 * Traite complètement le contenu WordPress pour le SEO
 * @param content - Contenu HTML brut
 * @returns Contenu optimisé SEO
 */
export function processWordPressContent(content: string): string {
	if (!content) return "";

	// 1. Supprimer les shortcodes
	let processed = removeWordPressShortcodes(content);

	// 2. Masquer les captions décoratifs (aria-hidden)
	processed = hideWordPressCaptions(processed);

	// 3. Nettoyer les classes WordPress inutiles
	processed = processed.replace(/\sclass="[^"]*wp-image-\d+[^"]*"/gi, "");

	// 4. Supprimer les attributs style inline
	processed = processed.replace(/\sstyle="[^"]*"/gi, "");

	return processed;
}
