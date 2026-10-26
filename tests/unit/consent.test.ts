import { test } from "node:test";
import assert from "node:assert/strict";
import {
	CONSENT_EXPIRY_DAYS,
	CONSENT_KEY,
	EXPIRY_KEY,
	PREFERENCES_KEY,
	cookieDomainCandidates,
	expireCookieAssignments,
	matchingCookieNames,
	readConsent,
	toGoogleConsent,
	writeConsent,
} from "../../lib/consent";

function memoryStorage(initial: Record<string, string> = {}) {
	const data = new Map(Object.entries(initial));
	return {
		data,
		getItem: (key: string) => (data.has(key) ? data.get(key)! : null),
		setItem: (key: string, value: string) => void data.set(key, String(value)),
		removeItem: (key: string) => void data.delete(key),
	};
}

test("aucun choix enregistré : null (rien ne doit être chargé)", () => {
	assert.equal(readConsent(memoryStorage()), null);
});

test("lit le format historique {necessary, analytics, marketing}", () => {
	const storage = memoryStorage({
		[CONSENT_KEY]: "customized",
		[PREFERENCES_KEY]: JSON.stringify({ necessary: true, analytics: true, marketing: false }),
		[EXPIRY_KEY]: "2099-01-01T00:00:00.000Z",
	});
	assert.deepEqual(readConsent(storage), { necessary: true, analytics: true, marketing: false });
});

test("choix expiré : supprimé et considéré comme absent", () => {
	const storage = memoryStorage({
		[CONSENT_KEY]: "customized",
		[PREFERENCES_KEY]: JSON.stringify({ analytics: true, marketing: true }),
		[EXPIRY_KEY]: "2020-01-01T00:00:00.000Z",
	});
	assert.equal(readConsent(storage, new Date("2026-01-01")), null);
	assert.equal(storage.data.size, 0);
});

test("préférences illisibles ou valeurs non booléennes : jamais d'acceptation implicite", () => {
	assert.equal(
		readConsent(memoryStorage({ [CONSENT_KEY]: "customized", [PREFERENCES_KEY]: "{oops" })),
		null
	);
	assert.deepEqual(
		readConsent(
			memoryStorage({
				[CONSENT_KEY]: "customized",
				[PREFERENCES_KEY]: JSON.stringify({ analytics: "true", marketing: 1 }),
			})
		),
		{ necessary: true, analytics: false, marketing: false }
	);
});

test("writeConsent normalise et fixe l'expiration à 180 jours", () => {
	const storage = memoryStorage();
	const now = new Date("2026-01-01T00:00:00.000Z");
	writeConsent(storage, { analytics: true, marketing: false }, now);
	assert.equal(storage.getItem(CONSENT_KEY), "customized");
	assert.deepEqual(JSON.parse(storage.getItem(PREFERENCES_KEY)!), {
		necessary: true,
		analytics: true,
		marketing: false,
	});
	const expiry = new Date(storage.getItem(EXPIRY_KEY)!);
	assert.equal(Math.round((expiry.getTime() - now.getTime()) / 86400000), CONSENT_EXPIRY_DAYS);
	assert.deepEqual(readConsent(storage, now), { necessary: true, analytics: true, marketing: false });
});

test("Consent Mode v2 : correspondance des 4 signaux", () => {
	const allDenied = {
		analytics_storage: "denied",
		ad_storage: "denied",
		ad_user_data: "denied",
		ad_personalization: "denied",
	};
	assert.deepEqual(toGoogleConsent(null), allDenied);
	assert.deepEqual(toGoogleConsent({ analytics: false, marketing: false }), allDenied);
	// Marketing seul : la destination Ads n'existe que dans le Google tag GA4,
	// qui n'est pas chargé sans consentement Analytics
	assert.deepEqual(toGoogleConsent({ analytics: false, marketing: true }), allDenied);
	assert.deepEqual(toGoogleConsent({ analytics: true, marketing: false }), {
		...allDenied,
		analytics_storage: "granted",
	});
	assert.deepEqual(toGoogleConsent({ analytics: true, marketing: true }), {
		analytics_storage: "granted",
		ad_storage: "granted",
		ad_user_data: "granted",
		ad_personalization: "granted",
	});
});

test("identifie les cookies Google first-party à supprimer", () => {
	const cookies = "_ga=GA1.1.1; _ga_0895ZEQQY4=GS1; _gcl_au=1.1; _gcl_aw=GCL.1; theme=light; _gat_x=1";
	assert.deepEqual(matchingCookieNames(cookies, "analytics"), ["_ga", "_ga_0895ZEQQY4", "_gat_x"]);
	assert.deepEqual(matchingCookieNames(cookies, "ads"), ["_gcl_au", "_gcl_aw"]);
	assert.deepEqual(matchingCookieNames("", "ads"), []);
});

test("domaines candidats : hôte, domaine racine et variantes pointées", () => {
	assert.deepEqual(cookieDomainCandidates("lylusio.fr"), ["", "lylusio.fr", ".lylusio.fr"]);
	assert.ok(cookieDomainCandidates("www.lylusio.fr").includes(".lylusio.fr"));
	assert.deepEqual(cookieDomainCandidates("localhost"), [""]);
	assert.deepEqual(cookieDomainCandidates("127.0.0.1"), [""]);
	for (const assignment of expireCookieAssignments("_ga", "lylusio.fr")) {
		assert.match(assignment, /^_ga=; Max-Age=0; .*Path=\//);
	}
});
