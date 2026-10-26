/**
 * Chargement du Google tag (GA4) piloté par le consentement — mode basique.
 *
 * - Avant tout consentement Analytics : aucun script Google n'est chargé et
 *   aucune requête n'est émise.
 * - Consent Mode v2 : les 4 signaux sont poussés à `denied` (default) avant
 *   toute commande `config`, puis mis à jour selon le choix enregistré.
 * - Les destinations Google Ads ajoutées au Google tag côté Google suivent
 *   les signaux `ad_*` : sans consentement Marketing, pas de remarketing ni
 *   de cookie publicitaire.
 * - Pages vues : le Google tag envoie la page courante à son chargement ;
 *   la mesure améliorée GA4 (historique du navigateur) suit les navigations
 *   App Router. Aucun page_view manuel n'est envoyé, sauf lors d'une
 *   réacceptation sur une page non mesurée.
 */

import {
	DEFAULT_GOOGLE_CONSENT,
	expireCookieAssignments,
	matchingCookieNames,
	toGoogleConsent,
	type ConsentPreferences,
} from "./consent";
import {
	buildContactEvent,
	contactMethodFromHref,
	type ContactEventOptions,
	type ContactMethod,
} from "./analytics-events";

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "G-0895ZEQQY4";

/** 13 mois, durée maximale affichée dans le bandeau pour les cookies analytiques. */
export const GA_COOKIE_EXPIRES_SECONDS = 395 * 24 * 60 * 60;

const MEASUREMENT_HOSTS = new Set(["lylusio.fr", "www.lylusio.fr"]);

type Gtag = (...args: unknown[]) => void;

export interface TagWindow {
	location: { hostname: string; href: string; pathname: string };
	dataLayer?: unknown[];
	gtag?: Gtag;
	localStorage?: Pick<Storage, "removeItem">;
	requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => unknown;
	setTimeout: (cb: () => void, ms: number) => unknown;
	[key: string]: unknown;
}

export interface TagDocument {
	cookie: string;
	head: { appendChild: (node: unknown) => unknown };
	createElement: (tag: string) => { async?: boolean; src?: string };
}

interface TagState {
	consentDefaultPushed: boolean;
	configured: boolean;
	scriptInjected: boolean;
	analyticsGranted: boolean;
	lastMeasuredHref: string | null;
}

const initialState = (): TagState => ({
	consentDefaultPushed: false,
	configured: false,
	scriptInjected: false,
	analyticsGranted: false,
	lastMeasuredHref: null,
});

let state: TagState = initialState();

/** Réservé aux tests unitaires. */
export function resetGoogleTagStateForTests(): void {
	state = initialState();
}

export function getGoogleTagState(): Readonly<TagState> {
	return { ...state };
}

export function isMeasurementHost(hostname: string): boolean {
	return MEASUREMENT_HOSTS.has(hostname);
}

function ensureGtag(w: TagWindow): Gtag {
	w.dataLayer = w.dataLayer || [];
	if (typeof w.gtag !== "function") {
		w.gtag = function gtag() {
			// gtag.js attend l'objet `arguments`, pas un tableau
			// eslint-disable-next-line prefer-rest-params
			w.dataLayer!.push(arguments);
		};
	}
	if (!state.consentDefaultPushed) {
		w.gtag("consent", "default", { ...DEFAULT_GOOGLE_CONSENT });
		state.consentDefaultPushed = true;
	}
	return w.gtag;
}

function injectScript(w: TagWindow, d: TagDocument): void {
	if (state.scriptInjected) return;
	state.scriptInjected = true;
	const load = () => {
		const script = d.createElement("script");
		script.async = true;
		script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
		d.head.appendChild(script);
	};
	// Différé hors du chemin critique, sans attendre d'interaction (mobile compris)
	if (typeof w.requestIdleCallback === "function") {
		w.requestIdleCallback(load, { timeout: 3000 });
	} else {
		w.setTimeout(load, 1500);
	}
}

function expireCookies(w: TagWindow, d: TagDocument, kind: "analytics" | "ads"): void {
	for (const name of matchingCookieNames(d.cookie, kind)) {
		for (const assignment of expireCookieAssignments(name, w.location.hostname)) {
			d.cookie = assignment;
		}
	}
	if (kind === "ads") {
		try {
			w.localStorage?.removeItem("_gcl_ls");
		} catch {
			/* stockage indisponible */
		}
	}
}

/**
 * Applique un choix de consentement (au chargement, après enregistrement,
 * après modification ou retrait). Idempotent.
 */
export function applyConsent(
	prefs: Pick<ConsentPreferences, "analytics" | "marketing"> | null,
	w: TagWindow = window as unknown as TagWindow,
	d: TagDocument = document as unknown as TagDocument
): void {
	const consent = toGoogleConsent(prefs);
	const analyticsGranted = consent.analytics_storage === "granted";
	const adsGranted = consent.ad_storage === "granted";

	if (!isMeasurementHost(w.location.hostname)) {
		state.analyticsGranted = false;
		return;
	}

	if (!analyticsGranted) {
		if (state.configured) {
			const gtag = ensureGtag(w);
			gtag("consent", "update", consent);
			// Coupe toute émission ultérieure de la propriété GA4 déjà chargée
			w[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
			if (state.analyticsGranted) state.lastMeasuredHref = w.location.href;
		}
		state.analyticsGranted = false;
		expireCookies(w, d, "analytics");
		expireCookies(w, d, "ads");
		return;
	}

	const gtag = ensureGtag(w);
	gtag("consent", "update", consent);
	w[`ga-disable-${GA_MEASUREMENT_ID}`] = false;
	if (!adsGranted) expireCookies(w, d, "ads");

	if (!state.configured) {
		gtag("js", new Date());
		// send_page_view par défaut : mesure la page courante (y compris
		// celle où le consentement vient d'être donné, avec ses paramètres d'URL)
		gtag("config", GA_MEASUREMENT_ID, {
			cookie_expires: GA_COOKIE_EXPIRES_SECONDS,
		});
		state.configured = true;
		state.lastMeasuredHref = w.location.href;
		injectScript(w, d);
	} else if (!state.analyticsGranted && state.lastMeasuredHref !== w.location.href) {
		// Réacceptation dans le même document sur une page non encore mesurée
		gtag("event", "page_view");
		state.lastMeasuredHref = w.location.href;
	}
	state.analyticsGranted = true;
}

export function trackEvent(
	name: string,
	params: Record<string, string | number | boolean>,
	w: TagWindow = window as unknown as TagWindow
): boolean {
	if (!state.analyticsGranted || !state.configured || typeof w.gtag !== "function") {
		return false;
	}
	w.gtag("event", name, params);
	return true;
}

export function trackContactClick(
	method: ContactMethod,
	options: ContactEventOptions = {},
	w: TagWindow = window as unknown as TagWindow
): boolean {
	const event = buildContactEvent(method, options, w.location.pathname);
	return trackEvent(event.name, event.params, w);
}

interface ClickTarget {
	closest?: (selector: string) => {
		getAttribute: (name: string) => string | null;
		closest: (selector: string) => unknown;
	} | null;
}

/**
 * Écouteur délégué : mesure chaque clic sur un lien tel:/mailto: du site,
 * y compris dans le contenu WordPress. Les attributs data-cta-location,
 * data-cta-intent et data-service précisent le contexte.
 */
export function handleContactLinkClick(
	target: unknown,
	w: TagWindow = window as unknown as TagWindow
): boolean {
	const link = (target as ClickTarget | null)?.closest?.("a[href]");
	if (!link || link.closest("[data-analytics-ignore]")) return false;
	const method = contactMethodFromHref(link.getAttribute("href"));
	if (!method) return false;
	return trackContactClick(
		method,
		{
			location: link.getAttribute("data-cta-location") ?? undefined,
			intent: (link.getAttribute("data-cta-intent") as ContactEventOptions["intent"]) ?? undefined,
			service: link.getAttribute("data-service") ?? undefined,
		},
		w
	);
}
