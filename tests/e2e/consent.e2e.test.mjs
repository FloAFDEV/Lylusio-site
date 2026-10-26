/**
 * Tests navigateur : consentement, Consent Mode v2, pages vues, événements,
 * CSP, Google Maps et YouTube, sur le build de production local.
 *
 *   npm run build && npm run test:e2e
 */
import { after, before, describe, test } from "node:test";
import assert from "node:assert/strict";
import { setTimeout as sleep } from "node:timers/promises";
import { SITE, chromium, newSession, startServer, stopServer, waitFor } from "./harness.mjs";

let browser;

before(async () => {
	await startServer();
	browser = await chromium.launch();
});

after(async () => {
	await browser?.close();
	await stopServer();
});

const dialog = (page) => page.getByRole("dialog", { name: "Consentement aux cookies" });
const CLOSE_ANIMATION_MS = 700;

async function choose(page, action) {
	const names = { accept: "Tout accepter", reject: "Tout refuser" };
	await dialog(page).getByRole("button", { name: names[action], exact: true }).click();
	await sleep(CLOSE_ANIMATION_MS);
}

async function saveCustom(page, { analytics, marketing }) {
	const d = dialog(page);
	await d.waitFor();
	await sleep(300);
	if (await d.getByRole("button", { name: "Personnaliser" }).isVisible()) {
		await d.getByRole("button", { name: "Personnaliser" }).click();
		await sleep(400);
	}
	for (const [name, wanted] of [["analytiques", analytics], ["marketing", marketing]]) {
		const sw = d.getByRole("switch", { name: new RegExp(name) });
		if ((await sw.getAttribute("aria-checked")) !== String(wanted)) await sw.click();
	}
	await d.getByRole("button", { name: "Enregistrer mes choix" }).click();
	await sleep(CLOSE_ANIMATION_MS);
}

async function openCookieSettings(page) {
	await page.getByRole("button", { name: "Gérer les cookies" }).click();
	await dialog(page).waitFor();
	await sleep(300);
}

async function clientNav(page, href) {
	await page.locator(`a[href="${href}"]:visible`).first().click();
	await page.waitForURL(`**${href}`);
}

const ADS_COOKIE = /^_gcl_/;
const GA_COOKIE = /^_ga/;

describe("consentement et Consent Mode v2", () => {
	test("1. première visite : bandeau, cases décochées, aucune requête ni cookie Google", async () => {
		const s = await newSession(browser);
		await s.page.goto(`${SITE}/`);
		await dialog(s.page).waitFor();
		assert.ok(!(await s.page.getByText("requis pour continuer").count()));
		await dialog(s.page).getByRole("button", { name: "Personnaliser" }).click();
		await sleep(400);
		for (const name of [/analytiques/, /marketing/]) {
			assert.equal(await dialog(s.page).getByRole("switch", { name }).getAttribute("aria-checked"), "false");
		}
		await sleep(4000);
		assert.deepEqual(s.log.requests.filter((r) => r.kind !== "other"), []);
		assert.deepEqual(await s.cookieNames(), []);
		assert.equal(await s.page.evaluate(() => typeof window.gtag), "undefined");
		await s.close();
	});

	test("2. refus total : aucune requête Google après rechargement et navigation", async () => {
		const s = await newSession(browser);
		await s.page.goto(`${SITE}/`);
		await choose(s.page, "reject");
		await clientNav(s.page, "/contact");
		await s.page.reload();
		await sleep(5000);
		assert.equal(await dialog(s.page).count(), 0, "le choix est conservé");
		assert.deepEqual(s.log.requests.filter((r) => r.kind !== "other"), []);
		assert.deepEqual(await s.cookieNames(), []);
		const prefs = JSON.parse((await s.storage())["lylusio-cookie-preferences"]);
		assert.deepEqual(prefs, { necessary: true, analytics: false, marketing: false });
		await s.close();
	});

	test("3. acceptation totale : 1 page_view par page (arrivée, navigations, rechargement), Ads actif", async () => {
		const s = await newSession(browser);
		await s.page.goto(`${SITE}/?gclid=TEST_GCLID`);
		await choose(s.page, "accept");
		assert.ok(await waitFor(() => s.pageViews().length >= 1), "page d'arrivée mesurée");
		await s.settle();
		assert.deepEqual(s.pageViewPaths(), ["/"]);
		assert.match(s.pageViews()[0].dl, /gclid=TEST_GCLID/, "paramètres d'attribution conservés");
		assert.equal(s.pageViews()[0].params.gcs, "G111");

		await clientNav(s.page, "/contact");
		assert.ok(await waitFor(() => s.pageViews().length >= 2));
		await clientNav(s.page, "/accompagnement");
		assert.ok(await waitFor(() => s.pageViews().length >= 3));
		await s.page.reload();
		await waitFor(() => s.pageViews().length >= 4);
		await s.settle();
		assert.deepEqual(s.pageViewPaths(), ["/", "/contact", "/accompagnement", "/accompagnement"]);
		assert.ok(s.log.ads.length > 0, "destination Ads active avec Marketing");
		const cookies = await s.cookieNames();
		assert.ok(cookies.some((c) => GA_COOKIE.test(c)));
		assert.ok(cookies.includes("_gcl_au"));
		const blocked = s.log.csp.filter((v) => /doubleclick|google/.test(v.blocked));
		assert.deepEqual(blocked, [], "aucune requête Google bloquée par la CSP");
		await s.close();
	});

	test("4. Analytics oui / Marketing non : pages vues GA4, aucun remarketing ni cookie publicitaire", async () => {
		const s = await newSession(browser);
		await s.page.goto(`${SITE}/`);
		await saveCustom(s.page, { analytics: true, marketing: false });
		await waitFor(() => s.pageViews().length >= 1);
		await clientNav(s.page, "/contact");
		assert.ok(await waitFor(() => s.pageViews().length >= 2));
		await s.page.reload();
		await waitFor(() => s.pageViews().length >= 3);
		await s.settle();
		assert.deepEqual(s.pageViewPaths(), ["/", "/contact", "/contact"]);
		assert.ok(s.pageViews().every((e) => e.params.gcs === "G101"), "gcs=G101 : analytics accordé, publicité refusée");
		assert.deepEqual(s.log.ads, [], "aucune requête Ads n'atteint le réseau");
		assert.ok(!(await s.cookieNames()).some((c) => ADS_COOKIE.test(c)));
		assert.equal((await s.storage())._gcl_ls, undefined);
		// Le ping sans cookie de la destination Ads est bloqué par la CSP (connect-src)
		const blocked = [...new Set(s.log.csp.map((v) => new URL(v.blocked).host))];
		assert.ok(blocked.every((h) => h === "pagead2.googlesyndication.com"), `bloqués : ${blocked}`);
		await s.close();
	});

	test("5. Marketing seul : le Google tag n'est pas chargé (Ads dépend du tag GA4)", async () => {
		const s = await newSession(browser);
		await s.page.goto(`${SITE}/`);
		await saveCustom(s.page, { analytics: false, marketing: true });
		await clientNav(s.page, "/contact");
		await sleep(5000);
		assert.deepEqual(s.log.requests.filter((r) => r.kind !== "other"), []);
		assert.deepEqual(await s.cookieNames(), []);
		await s.close();
	});

	test("6. modification : Marketing retiré via « Gérer les cookies »", async () => {
		const s = await newSession(browser);
		await s.page.goto(`${SITE}/`);
		await choose(s.page, "accept");
		await waitFor(async () => (await s.cookieNames()).includes("_gcl_au"));
		await openCookieSettings(s.page);
		const d = dialog(s.page);
		assert.equal(await d.getByRole("switch", { name: /analytiques/ }).getAttribute("aria-checked"), "true");
		assert.equal(await d.getByRole("switch", { name: /marketing/ }).getAttribute("aria-checked"), "true");
		await saveCustom(s.page, { analytics: true, marketing: false });
		assert.ok(!(await s.cookieNames()).some((c) => ADS_COOKIE.test(c)), "_gcl_* supprimés");
		await s.settle();
		const adsBefore = s.log.ads.length;
		const pvBefore = s.pageViews().length;
		await clientNav(s.page, "/contact");
		assert.ok(await waitFor(() => s.pageViews().length >= pvBefore + 1));
		await s.settle();
		assert.equal(s.pageViews().length, pvBefore + 1);
		assert.equal(s.log.ads.length, adsBefore, "plus de requête Ads après retrait du Marketing");
		await s.close();
	});

	test("7. retrait total après acceptation (tag déjà chargé) : plus aucun hit, cookies supprimés", async () => {
		const s = await newSession(browser);
		await s.page.goto(`${SITE}/`);
		await choose(s.page, "accept");
		await waitFor(() => s.pageViews().length >= 1);
		await s.settle();
		await openCookieSettings(s.page);
		await choose(s.page, "reject");
		const cookies = await s.cookieNames();
		assert.ok(!cookies.some((c) => GA_COOKIE.test(c) || ADS_COOKIE.test(c)), `restants : ${cookies}`);
		const ga4Before = s.log.ga4.length;
		const adsBefore = s.log.ads.length;
		await clientNav(s.page, "/contact");
		await s.page.locator('footer a[href^="tel:"]').first().click();
		await sleep(10000);
		// Un lot GA4 en attente peut encore livrer un événement collecté AVANT le
		// retrait (ex. scroll, gcs=G111) ; aucun événement ne doit être collecté après.
		const afterRevoke = s.log.ga4.slice(ga4Before);
		assert.deepEqual(
			afterRevoke.filter((e) => e.en === "page_view" || /_click$/.test(e.en) || e.params.gcs !== "G111"),
			[],
			`collectés après retrait : ${JSON.stringify(afterRevoke.map((e) => e.en))}`
		);
		assert.ok(!afterRevoke.some((e) => e.dl && new URL(e.dl).pathname === "/contact"), "page visitée après retrait non mesurée");
		assert.equal(s.log.ads.length, adsBefore, "aucun hit Ads après retrait");
		const ga4AfterNav = s.log.ga4.length;
		await s.page.reload();
		await sleep(5000);
		assert.equal(s.log.ga4.length, ga4AfterNav, "rien après rechargement");
		assert.deepEqual((await s.cookieNames()).filter((c) => GA_COOKIE.test(c) || ADS_COOKIE.test(c)), []);
		await s.close();
	});

	test("7b. réacceptation sur la même page : pas de page_view en double", async () => {
		const s = await newSession(browser);
		await s.page.goto(`${SITE}/`);
		await choose(s.page, "accept");
		await waitFor(() => s.pageViews().length >= 1);
		await openCookieSettings(s.page);
		await choose(s.page, "reject");
		await openCookieSettings(s.page);
		await choose(s.page, "accept");
		await s.settle();
		assert.deepEqual(s.pageViewPaths(), ["/"]);
		await s.close();
	});

	test("9. fermeture (croix) et Échap : aucun consentement enregistré, rien n'est chargé", async () => {
		for (const how of ["close", "escape"]) {
			const s = await newSession(browser);
			await s.page.goto(`${SITE}/`);
			await dialog(s.page).waitFor();
			if (how === "close") {
				await dialog(s.page).getByRole("button", { name: "Fermer sans accepter" }).click();
			} else {
				await s.page.keyboard.press("Escape");
			}
			await sleep(CLOSE_ANIMATION_MS);
			assert.equal(await dialog(s.page).count(), 0);
			const stored = await s.storage();
			assert.equal(stored["lylusio-cookie-preferences"], undefined, `${how} : aucune préférence enregistrée`);
			await s.page.reload();
			await sleep(3000);
			assert.equal(await dialog(s.page).count(), 0, "non réaffiché pendant la session");
			assert.deepEqual(s.log.requests.filter((r) => r.kind !== "other"), []);
			await s.close();
		}
	});

	test("10. « Gérer les cookies » puis fermeture ou Échap : préférences inchangées", async () => {
		const s = await newSession(browser);
		await s.page.goto(`${SITE}/`);
		await saveCustom(s.page, { analytics: true, marketing: false });
		const before = (await s.storage())["lylusio-cookie-preferences"];
		await openCookieSettings(s.page);
		await dialog(s.page).getByRole("switch", { name: /marketing/ }).click();
		await dialog(s.page).getByRole("button", { name: "Fermer sans modifier" }).click();
		await sleep(CLOSE_ANIMATION_MS);
		assert.equal((await s.storage())["lylusio-cookie-preferences"], before);
		await openCookieSettings(s.page);
		assert.equal(await dialog(s.page).getByRole("switch", { name: /marketing/ }).getAttribute("aria-checked"), "false");
		await s.page.keyboard.press("Escape");
		await sleep(CLOSE_ANIMATION_MS);
		assert.equal(await dialog(s.page).count(), 0);
		assert.equal((await s.storage())["lylusio-cookie-preferences"], before);
		await s.close();
	});
});

describe("mobile", () => {
	test("acceptation sur mobile : page d'arrivée mesurée sans autre interaction", async () => {
		const s = await newSession(browser, { mobile: true });
		await s.page.goto(`${SITE}/reiki-toulouse`);
		await choose(s.page, "accept");
		const t0 = Date.now();
		assert.ok(await waitFor(() => s.pageViews().length >= 1, 8000), "page_view sans interaction");
		const delay = Date.now() - t0;
		await s.settle();
		assert.deepEqual(s.pageViewPaths(), ["/reiki-toulouse"]);
		await s.page.reload();
		assert.ok(await waitFor(() => s.pageViews().length >= 2, 8000), "rechargement mesuré sans interaction");
		await s.settle();
		assert.deepEqual(s.pageViewPaths(), ["/reiki-toulouse", "/reiki-toulouse"]);
		console.log(`  délai page_view après acceptation (mobile) : ${delay} ms`);
		await s.close();
	});

	test("bandeau et lien « Gérer les cookies » utilisables sur mobile", async () => {
		const s = await newSession(browser, { mobile: true });
		await s.page.goto(`${SITE}/`);
		await choose(s.page, "reject");
		await openCookieSettings(s.page);
		assert.ok(await dialog(s.page).getByRole("button", { name: "Enregistrer mes choix" }).isVisible());
		const overflow = await s.page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
		assert.equal(overflow, false);
		await s.close();
	});
});

describe("événements de contact", () => {
	test("phone_click / email_click : un seul événement par clic, paramètres stables, aucune donnée personnelle", async () => {
		const s = await newSession(browser);
		await s.page.goto(`${SITE}/`);
		await saveCustom(s.page, { analytics: true, marketing: false });
		await waitFor(() => s.pageViews().length >= 1);

		await s.page.getByRole("link", { name: "Réserver une séance par téléphone" }).first().click();
		await s.page.locator('footer a[href^="tel:"][data-cta-location="footer_contact"]').click();
		await clientNav(s.page, "/contact");
		await s.page.locator('a[href^="mailto:"][data-cta-location="contact_card"]').first().click();
		await waitFor(() => s.log.ga4.filter((e) => /_click$/.test(e.en)).length >= 3, 20000);
		await s.settle();

		const events = s.log.ga4.filter((e) => /_click$/.test(e.en)).map((e) => ({
			en: e.en,
			location: e.params["ep.cta_location"],
			intent: e.params["ep.cta_intent"],
			service: e.params["ep.service"],
		}));
		assert.deepEqual(events, [
			{ en: "phone_click", location: "hero", intent: "booking", service: "none" },
			{ en: "phone_click", location: "footer_contact", intent: "contact", service: "none" },
			{ en: "email_click", location: "contact_card", intent: "contact", service: "none" },
		]);
		const serialized = JSON.stringify(s.log.ga4.map((e) => e.params));
		assert.doesNotMatch(serialized, /33619151959|contact%40lylusio|contact@lylusio/);
		assert.ok(!s.log.ga4.some((e) => /^(booking_click|contact_click|service_view|cta_click|article_view)$/.test(e.en)));
		await s.close();
	});

	test("bouton de réservation d'un service (sans lien) : phone_click avec service", async () => {
		const s = await newSession(browser);
		await s.page.goto(`${SITE}/reiki-toulouse`);
		await saveCustom(s.page, { analytics: true, marketing: false });
		await waitFor(() => s.pageViews().length >= 1);
		await s.page.getByRole("button", { name: /Réserver une séance/ }).first().click();
		await s.settle();
		const click = s.log.ga4.find((e) => e.en === "phone_click");
		assert.equal(click?.params["ep.cta_location"], "page_hero");
		assert.equal(click?.params["ep.service"], "reiki");
		assert.equal(click?.params["ep.cta_intent"], "booking");
		await s.close();
	});

	test("clics sans consentement Analytics : aucun envoi", async () => {
		const s = await newSession(browser);
		await s.page.goto(`${SITE}/`);
		await choose(s.page, "reject");
		await s.page.getByRole("link", { name: "Réserver une séance par téléphone" }).first().click();
		await sleep(3000);
		assert.deepEqual(s.log.ga4, []);
		await s.close();
	});
});

describe("CSP et en-têtes", () => {
	test("en-têtes de production : CSP attendue, sans 'unsafe-eval' ni X-XSS-Protection", async () => {
		const s = await newSession(browser);
		const response = await s.page.goto(`${SITE}/`);
		const headers = response.headers();
		const csp = headers["content-security-policy"];
		assert.ok(csp, "CSP présente");
		assert.doesNotMatch(csp, /unsafe-eval/);
		assert.equal(headers["x-xss-protection"], undefined);
		const connect = csp.split(";").find((d) => d.trim().startsWith("connect-src"));
		assert.match(connect, /https:\/\/ad\.doubleclick\.net/);
		assert.match(connect, /https:\/\/stats\.g\.doubleclick\.net/);
		assert.doesNotMatch(connect, /pagead2\.googlesyndication\.com|\*/);
		assert.equal(headers["x-content-type-options"], "nosniff");
		assert.ok(headers["strict-transport-security"]);
		await s.close();
	});

	test("pages principales : aucune violation CSP ni erreur JS sans 'unsafe-eval'", async () => {
		const s = await newSession(browser);
		await s.page.goto(`${SITE}/`);
		await choose(s.page, "reject");
		const paths = ["/", "/contact", "/reiki-toulouse", "/astrologie-toulouse", "/accompagnement", "/blog", "/ressources", "/confidentialite"];
		const firstPost = await s.page.evaluate(async () => {
			const res = await fetch("/api/posts?per_page=1");
			const data = await res.json().catch(() => null);
			const list = Array.isArray(data) ? data : data?.posts;
			return list?.[0]?.slug ?? null;
		});
		if (firstPost) paths.push(`/blog/${firstPost}`);
		for (const path of paths) {
			await s.page.goto(`${SITE}${path}`, { waitUntil: "networkidle" });
		}
		assert.deepEqual(s.log.csp, []);
		assert.deepEqual(s.log.pageErrors, []);
		await s.close();
	});
});

describe("CSP : toutes les URL du sitemap", () => {
	test("aucune violation CSP (images, scripts, styles) sur les pages publiques", async () => {
		const s = await newSession(browser);
		await s.page.goto(`${SITE}/`);
		await choose(s.page, "reject");
		const xml = await s.page.evaluate(async () => (await fetch("/sitemap.xml")).text());
		const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
		assert.ok(urls.length > 10, `sitemap : ${urls.length} URL`);
		const violations = [];
		for (const path of urls) {
			const before = s.log.csp.length;
			await s.page.goto(`${SITE}${path}`, { waitUntil: "load", timeout: 60000 });
			await s.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
			await sleep(1500);
			for (const v of s.log.csp.slice(before)) violations.push({ path, ...v });
			// Aucune trace de Calendly ni d'émoji Facebook, y compris dans les données Next.js
			const html = await s.page.content();
			const rsc = await s.page.evaluate(() => JSON.stringify(self.__next_f ?? []));
			if (/calendly|fbcdn/i.test(html + rsc)) violations.push({ path, leftover: "calendly/fbcdn" });
		}
		assert.deepEqual(violations, []);
		assert.deepEqual(s.log.pageErrors, []);
		await s.close();
	});
});

describe("Google Maps et YouTube", () => {
	test("carte du footer : façade sans requête Google, chargement au clic uniquement", async () => {
		const s = await newSession(browser);
		await s.page.goto(`${SITE}/`);
		await choose(s.page, "accept");
		await s.page.locator('[data-testid="map-facade"]').scrollIntoViewIfNeeded();
		await sleep(2000);
		assert.equal(s.log.requests.filter((r) => r.kind === "maps").length, 0, "aucune requête Maps avant clic");
		assert.equal(await s.page.locator('iframe[src*="google.com/maps"]').count(), 0);
		assert.ok(await s.page.getByRole("link", { name: "Ouvrir dans Google Maps" }).isVisible());

		await s.page.getByRole("button", { name: "Afficher la carte" }).click();
		await waitFor(() => s.log.requests.some((r) => r.kind === "maps"));
		assert.equal(await s.page.locator('iframe[src*="google.com/maps/embed"]').count(), 1);
		// Charger la carte ne modifie pas le consentement
		const prefs = JSON.parse((await s.storage())["lylusio-cookie-preferences"]);
		assert.deepEqual(prefs, { necessary: true, analytics: true, marketing: true });

		// Nouvelle visite après retrait : la façade est de nouveau affichée
		await openCookieSettings(s.page);
		await choose(s.page, "reject");
		await s.page.reload();
		await s.page.locator('[data-testid="map-facade"]').scrollIntoViewIfNeeded();
		assert.equal(await s.page.locator('iframe[src*="google.com/maps"]').count(), 0);
		await s.close();
	});

	test("YouTube (/ressources) : miniature servie par lylusio.fr, lecteur nocookie au clic", async () => {
		const s = await newSession(browser);
		await s.page.goto(`${SITE}/ressources`);
		await choose(s.page, "reject");
		const play = s.page.getByRole("button", { name: /Charger la vidéo/ }).first();
		await play.scrollIntoViewIfNeeded();
		await sleep(2500);
		assert.equal(s.log.requests.filter((r) => r.kind === "youtube").length, 0, "aucune requête YouTube avant clic");
		const thumb = await play.locator("img").getAttribute("src");
		assert.match(thumb, /^\/_next\/image\?url=https%3A%2F%2Fi\.ytimg\.com/);
		const loaded = await s.page.evaluate(async (src) => (await fetch(src)).ok, thumb);
		assert.ok(loaded, "miniature disponible");

		await play.click();
		const iframe = s.page.locator('iframe[src^="https://www.youtube-nocookie.com/embed/"]');
		await iframe.waitFor();
		assert.ok(s.log.requests.some((r) => r.host === "www.youtube-nocookie.com"));
		assert.ok(!s.log.requests.some((r) => r.host === "www.youtube.com"));
		await s.close();
	});
});
