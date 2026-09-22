/**
 * Nettoie les shortcodes WordPress du contenu HTML
 * Gère [caption], [gallery], [audio], [video], etc.
 */

import { PHONE_TEL_HREF } from "./contact";

const CALENDLY_HREF_PATTERN = /href\s*=\s*["']https?:\/\/(?:www\.)?calendly\.com\/[^"']*["']/i;
const CALENDLY_URL_TEXT_PATTERN = /^https?:\/\/(?:www\.)?calendly\.com\//i;
const CALENDLY_PHONE_LINK_TEXT = "Prendre rendez-vous par téléphone";

/**
 * Neutralise les anciens liens Calendly encore présents dans le contenu
 * WordPress (articles rédigés avant la migration vers la prise de
 * rendez-vous par téléphone). Réécrit le href vers le numéro centralisé
 * et retire target="_blank", sans toucher aux autres attributs (class,
 * rel, etc.). Le texte visible du lien est conservé tel quel, sauf s'il
 * s'agit lui-même de l'URL Calendly brute (ex: texte du lien = l'URL
 * copiée-collée) — dans ce seul cas, le texte est remplacé par un intitulé
 * cohérent avec la nouvelle destination. Les autres textes éditoriaux des
 * articles ne sont jamais modifiés.
 * @param content - Contenu HTML brut ou déjà partiellement traité
 * @returns Contenu avec les liens Calendly redirigés vers tel:
 */
export function replaceCalendlyLinks(content: string): string {
	if (!content) return "";

	return content.replace(
		/<a\b([^>]*)>([\s\S]*?)<\/a>/gi,
		(fullMatch, attrs, innerHtml) => {
			if (!CALENDLY_HREF_PATTERN.test(attrs)) {
				return fullMatch;
			}

			let updatedAttrs = attrs.replace(
				CALENDLY_HREF_PATTERN,
				`href="${PHONE_TEL_HREF}"`
			);
			updatedAttrs = updatedAttrs.replace(
				/\s+target\s*=\s*["']_blank["']/i,
				""
			);

			// Le texte visible n'est remplacé que s'il s'agit lui-même de
			// l'URL Calendly brute (aucun autre texte éditorial n'est touché)
			const updatedInnerHtml = CALENDLY_URL_TEXT_PATTERN.test(
				innerHtml.trim()
			)
				? CALENDLY_PHONE_LINK_TEXT
				: innerHtml;

			return `<a${updatedAttrs}>${updatedInnerHtml}</a>`;
		}
	);
}

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

	let processed = content;

	// 1. CRITIQUE : Supprimer les <p> qui wrappent des shortcodes [caption]
	// WordPress envoie souvent : <p>[caption]...[/caption]</p>
	// On doit extraire le shortcode AVANT de le supprimer
	processed = processed.replace(
		/<p[^>]*>\s*(\[caption[\s\S]*?\[\/caption\])\s*<\/p>/gi,
		"$1"
	);

	// 2. Supprimer les <p> qui wrappent uniquement une image (wpautop issue)
	// WordPress wrap les images seules : <p><img /></p>
	processed = processed.replace(/<p[^>]*>\s*(<img[^>]+>)\s*<\/p>/gi, "$1");

	// 3. Supprimer TOUTES les figcaption (captions WordPress HTML)
	processed = processed.replace(/<figcaption[\s\S]*?<\/figcaption>/gi, "");

	// 4. Supprimer TOUS les shortcodes [caption]...[/caption]
	processed = processed.replace(/\[caption[\s\S]*?\[\/caption\]/gi, "");

	// 5. Supprimer les shortcodes WordPress standards ([gallery], [audio], etc.)
	processed = removeWordPressShortcodes(processed);

	// 6. Nettoyer les classes WordPress inutiles
	processed = processed.replace(/\sclass="[^"]*wp-image-\d+[^"]*"/gi, "");
	processed = processed.replace(/\sclass="[^"]*wp-caption[^"]*"/gi, "");

	// 7. Supprimer les attributs style inline
	processed = processed.replace(/\sstyle="[^"]*"/gi, "");

	// 7b. Neutraliser les anciens liens Calendly (migration vers tel:)
	processed = replaceCalendlyLinks(processed);

	// 8. Nettoyer les espaces multiples et paragraphes vides (DOIT être à la fin)
	processed = processed.replace(/\s{2,}/g, " ");
	processed = processed.replace(/<p[^>]*>\s*<\/p>/gi, "");

	return processed.trim();
}

/**
 * Génère un excerpt texte pur (sans HTML ni shortcodes) depuis du HTML WordPress
 * Utilise le pipeline de nettoyage centralisé pour garantir la cohérence
 *
 * @param html - HTML brut depuis WordPress (content.rendered ou excerpt.rendered)
 * @param length - Longueur maximale du texte (défaut: 150)
 * @returns Texte pur sans HTML ni shortcodes, tronqué à la longueur souhaitée
 */
export function getSafeExcerpt(html: string, length: number = 150): string {
	if (!html) return "";

	// 1. Nettoyer le HTML via le pipeline centralisé (supprime shortcodes + classes WP)
	const cleaned = processWordPressContent(html);

	// 2. Stripper toutes les balises HTML restantes
	let text = cleaned.replace(/<[^>]+>/g, "");

	// 3. Décoder les entités HTML
	text = text
		.replace(/&nbsp;/g, " ")
		.replace(/&amp;/g, "&")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, '"')
		.replace(/&#039;/g, "'")
		.replace(/&rsquo;/g, "'")
		.replace(/&lsquo;/g, "'")
		.replace(/&rdquo;/g, '"')
		.replace(/&ldquo;/g, '"')
		.replace(/&hellip;/g, "...")
		.replace(/&ndash;/g, "–")
		.replace(/&mdash;/g, "—");

	// 4. Nettoyer les espaces multiples et trim
	text = text.replace(/\s{2,}/g, " ").trim();

	// 5. Tronquer et ajouter ellipsis
	if (text.length > length) {
		return text.slice(0, length).trim() + "…";
	}

	return text;
}
