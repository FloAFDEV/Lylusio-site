/**
 * Consentement cookies — source unique de vérité (stockage, expiration,
 * correspondance Google Consent Mode v2, nettoyage des cookies Google).
 *
 * Module pur : aucune dépendance React/Next, uniquement des imports
 * relatifs, pour pouvoir être testé directement avec `node --test`.
 */

export interface ConsentPreferences {
	necessary: true;
	analytics: boolean;
	marketing: boolean;
}

export type ConsentSignal = "granted" | "denied";

export interface GoogleConsentState {
	analytics_storage: ConsentSignal;
	ad_storage: ConsentSignal;
	ad_user_data: ConsentSignal;
	ad_personalization: ConsentSignal;
}

/** Clés historiques conservées pour ne pas perdre les choix déjà enregistrés. */
export const CONSENT_KEY = "lylusio-cookie-consent";
export const PREFERENCES_KEY = "lylusio-cookie-preferences";
export const EXPIRY_KEY = "cookie-consent-expiry";
/** Fermeture du bandeau sans choix : mémorisée pour la session uniquement. */
export const DISMISSED_SESSION_KEY = "lylusio-cookie-banner-dismissed";

/** Durée de conservation du choix (affichée dans le bandeau). */
export const CONSENT_EXPIRY_DAYS = 180;

/** Événement émis après chaque enregistrement de choix (detail: ConsentPreferences). */
export const CONSENT_CHANGE_EVENT = "lylusio:consent-change";
/** Événement demandant l'ouverture du panneau de préférences. */
export const OPEN_CONSENT_SETTINGS_EVENT = "lylusio:open-cookie-settings";

export const DEFAULT_GOOGLE_CONSENT: GoogleConsentState = {
	analytics_storage: "denied",
	ad_storage: "denied",
	ad_user_data: "denied",
	ad_personalization: "denied",
};

type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

export function clearConsent(storage: StorageLike): void {
	storage.removeItem(CONSENT_KEY);
	storage.removeItem(PREFERENCES_KEY);
	storage.removeItem(EXPIRY_KEY);
}

/**
 * Lit le choix enregistré. Retourne null si aucun choix valide n'existe
 * (absent, expiré ou illisible) : dans ce cas rien ne doit être chargé.
 */
export function readConsent(
	storage: StorageLike,
	now: Date = new Date()
): ConsentPreferences | null {
	try {
		if (!storage.getItem(CONSENT_KEY)) return null;

		const expiry = storage.getItem(EXPIRY_KEY);
		if (expiry) {
			const expiryDate = new Date(expiry);
			if (Number.isNaN(expiryDate.getTime()) || expiryDate < now) {
				clearConsent(storage);
				return null;
			}
		}

		const raw = storage.getItem(PREFERENCES_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (!parsed || typeof parsed !== "object") return null;

		return {
			necessary: true,
			analytics: parsed.analytics === true,
			marketing: parsed.marketing === true,
		};
	} catch {
		return null;
	}
}

export function writeConsent(
	storage: StorageLike,
	prefs: Pick<ConsentPreferences, "analytics" | "marketing">,
	now: Date = new Date()
): ConsentPreferences {
	const normalized: ConsentPreferences = {
		necessary: true,
		analytics: prefs.analytics === true,
		marketing: prefs.marketing === true,
	};
	const expiry = new Date(now.getTime());
	expiry.setDate(expiry.getDate() + CONSENT_EXPIRY_DAYS);

	storage.setItem(CONSENT_KEY, "customized");
	storage.setItem(PREFERENCES_KEY, JSON.stringify(normalized));
	storage.setItem(EXPIRY_KEY, expiry.toISOString());
	return normalized;
}

/**
 * Le tag publicitaire (Google Ads) n'existe pas en dehors du Google tag
 * GA4 : il est ajouté comme destination dans la configuration côté Google.
 * Sans consentement Analytics, le Google tag n'est jamais chargé, donc les
 * signaux publicitaires sont refusés eux aussi, même si Marketing est accepté.
 */
export function toGoogleConsent(
	prefs: Pick<ConsentPreferences, "analytics" | "marketing"> | null
): GoogleConsentState {
	if (!prefs || !prefs.analytics) return { ...DEFAULT_GOOGLE_CONSENT };
	const ads: ConsentSignal = prefs.marketing ? "granted" : "denied";
	return {
		analytics_storage: "granted",
		ad_storage: ads,
		ad_user_data: ads,
		ad_personalization: ads,
	};
}

const ANALYTICS_COOKIE_PATTERN = /^(_ga|_ga_[A-Za-z0-9]+|_gid|_gat(_.*)?)$/;
const ADS_COOKIE_PATTERN = /^(_gcl_[A-Za-z0-9_]+|_gac_.*)$/;

export function matchingCookieNames(
	cookieString: string,
	kind: "analytics" | "ads"
): string[] {
	const pattern = kind === "analytics" ? ANALYTICS_COOKIE_PATTERN : ADS_COOKIE_PATTERN;
	return cookieString
		.split(";")
		.map((part) => part.split("=")[0]?.trim())
		.filter((name): name is string => !!name && pattern.test(name));
}

/**
 * Domaines sur lesquels un cookie first-party peut avoir été déposé
 * (Google dépose ses cookies sur le domaine racine, ex. `.lylusio.fr`).
 */
export function cookieDomainCandidates(hostname: string): string[] {
	if (!hostname || /^[\d.]+$/.test(hostname) || !hostname.includes(".")) {
		return [""];
	}
	const parts = hostname.split(".");
	const domains = new Set<string>([""]);
	for (let i = 0; i < parts.length - 1; i++) {
		const domain = parts.slice(i).join(".");
		domains.add(domain);
		domains.add(`.${domain}`);
	}
	return [...domains];
}

/** Chaînes `document.cookie = ...` qui expirent un cookie sur chaque domaine candidat. */
export function expireCookieAssignments(name: string, hostname: string): string[] {
	return cookieDomainCandidates(hostname).map(
		(domain) =>
			`${name}=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/` +
			(domain ? `; Domain=${domain}` : "")
	);
}

/** Rouvre le panneau de préférences (lien « Gérer les cookies »). */
export function openCookieSettings(): void {
	window.dispatchEvent(new Event(OPEN_CONSENT_SETTINGS_EVENT));
}
