/**
 * Plan de mesure GA4 — événements et paramètres autorisés.
 *
 * Deux événements seulement, déclenchés au clic sur un lien de contact :
 * - `phone_click` : ouverture d'un lien tel: (prise de rendez-vous ou contact).
 *   C'est une INTENTION d'appel, jamais la preuve d'un rendez-vous pris.
 * - `email_click` : ouverture d'un lien mailto:.
 *
 * Paramètres (valeurs stables, en snake_case, jamais de donnée personnelle) :
 * - `cta_location` : emplacement du lien (voir CtaLocation, ou `<page>_content`).
 * - `cta_intent`   : `booking` (bouton « Réserver ») ou `contact` (coordonnées).
 * - `service`      : service concerné, `none` sinon.
 *
 * Les pages vues ne sont PAS envoyées par le code : le Google tag envoie la
 * première à son chargement et la mesure améliorée GA4 suit les navigations.
 *
 * Module pur, testable avec `node --test`.
 */

export type ContactMethod = "phone" | "email";
export type ContactIntent = "booking" | "contact";

export type CtaLocation =
	| "hero"
	| "floating_cta"
	| "footer_cta"
	| "footer_contact"
	| "services_preview"
	| "service_carousel"
	| "service_card"
	| "page_hero"
	| "page_cta"
	| "contact_card"
	| "payment_info"
	| "article_content"
	| `${string}_content`;

export type ServiceKey =
	| "astrologie"
	| "reiki"
	| "therapie_holistique"
	| "accompagnement"
	| "accompagnement_transition"
	| "none";

export interface ContactEventOptions {
	location?: string;
	intent?: ContactIntent;
	service?: string;
}

export interface AnalyticsEvent {
	name: "phone_click" | "email_click";
	params: {
		cta_location: string;
		cta_intent: ContactIntent;
		service: string;
	};
}

const SAFE_VALUE = /^[a-z0-9_]{1,40}$/;

function safeValue(value: string | undefined, fallback: string): string {
	return value && SAFE_VALUE.test(value) ? value : fallback;
}

export function contactMethodFromHref(href: string | null | undefined): ContactMethod | null {
	if (!href) return null;
	const normalized = href.trim().toLowerCase();
	if (normalized.startsWith("tel:")) return "phone";
	if (normalized.startsWith("mailto:")) return "email";
	return null;
}

const PAGE_KEYS: Record<string, string> = {
	"": "home",
	contact: "contact",
	accompagnement: "accompagnement",
	"astrologie-toulouse": "astrologie",
	"reiki-toulouse": "reiki",
	"therapie-holistique": "therapie_holistique",
	"therapie-energetique": "therapie_energetique",
	"approche-therapeutique": "approche",
	"emilie-perez": "about",
	faq: "faq",
	blog: "blog",
	category: "blog_category",
	ressources: "ressources",
	confidentialite: "legal",
	"mentions-legales": "legal",
	cgu: "legal",
};

/** Clé de page stable dérivée du chemin (sans slug ni paramètre d'URL). */
export function pageKeyFromPath(pathname: string | null | undefined): string {
	const segments = (pathname || "/").split("?")[0].split("/").filter(Boolean);
	const first = segments[0] ?? "";
	if (first === "blog" && segments.length > 1) return "blog_post";
	if (first === "ressources" && segments.length > 1) return "ressource";
	return PAGE_KEYS[first] ?? (segments.length === 1 ? "page" : "other");
}

export function buildContactEvent(
	method: ContactMethod,
	options: ContactEventOptions = {},
	pathname = "/"
): AnalyticsEvent {
	return {
		name: method === "phone" ? "phone_click" : "email_click",
		params: {
			cta_location: safeValue(options.location, `${pageKeyFromPath(pathname)}_content`),
			cta_intent: options.intent === "booking" ? "booking" : "contact",
			service: safeValue(options.service, "none"),
		},
	};
}

/** Attributs data-* lus par l'écouteur délégué sur les liens tel:/mailto:. */
export function contactDataAttributes(options: ContactEventOptions) {
	return {
		"data-cta-location": options.location,
		"data-cta-intent": options.intent,
		"data-service": options.service,
	};
}
