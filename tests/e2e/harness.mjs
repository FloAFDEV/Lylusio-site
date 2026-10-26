/**
 * Harnais E2E : sert le build de production local (`next start`) sous
 * l'hôte https://lylusio.fr (pour que le Google tag s'active comme en
 * production) et intercepte toutes les destinations Google.
 *
 * Aucune donnée n'est transmise à GA4 ni à Google Ads : chaque requête de
 * mesure est enregistrée puis reçoit une réponse 204 locale. Seul le script
 * gtag.js (GET public, configuration du Google tag) est réellement téléchargé.
 */
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { setTimeout as sleep } from "node:timers/promises";

const require = createRequire(import.meta.url);

function loadPlaywright() {
	try {
		return require("playwright");
	} catch {
		// Playwright préinstallé globalement (pas de dépendance du projet)
		return require(require.resolve("playwright", { paths: ["/opt/node-tools/node_modules", "/usr/local/lib/node_modules", "/usr/lib/node_modules"] }));
	}
}

export const { chromium, devices } = loadPlaywright();

export const SITE = "https://lylusio.fr";
const PORT = Number(process.env.E2E_PORT || 3100);
export const LOCAL = process.env.E2E_BASE_URL || `http://127.0.0.1:${PORT}`;

let server;

export async function startServer() {
	if (process.env.E2E_BASE_URL) return;
	const alreadyUp = await fetch(`${LOCAL}/robots.txt`).then(() => true, () => false);
	if (alreadyUp) {
		throw new Error(`Le port ${PORT} est déjà utilisé : arrêter l'ancien serveur ou définir E2E_BASE_URL`);
	}
	server = spawn("npx", ["next", "start", "-p", String(PORT), "-H", "127.0.0.1"], {
		stdio: ["ignore", "ignore", "pipe"],
		env: { ...process.env, NODE_ENV: "production" },
		detached: true,
	});
	server.stderr.on("data", (d) => process.stderr.write(d));
	for (let i = 0; i < 120; i++) {
		try {
			const res = await fetch(`${LOCAL}/robots.txt`);
			if (res.ok) return;
		} catch {
			/* pas encore prêt */
		}
		await sleep(500);
	}
	throw new Error("next start n'a pas démarré (as-tu lancé `npm run build` ?)");
}

export async function stopServer() {
	if (!server) return;
	server.stderr?.destroy();
	const killGroup = (signal) => {
		try {
			// npx -> next : on arrête tout le groupe de processus
			process.kill(-server.pid, signal);
		} catch {
			/* déjà arrêté */
		}
	};
	killGroup("SIGTERM");
	await sleep(2000);
	// next start attend la fin des connexions keep-alive : arrêt forcé
	killGroup("SIGKILL");
	server.unref();
}

const ADS_PATTERNS = [
	/googleads\.g\.doubleclick\.net/,
	/www\.google\.[a-z.]+\/(rmkt|pagead|ads|ccm)\//,
	/ad\.doubleclick\.net/,
	/pagead2\.googlesyndication\.com/,
	/stats\.g\.doubleclick\.net/,
	/googleadservices\.com/,
	/td\.doubleclick\.net/,
];

export function classify(url) {
	const u = new URL(url);
	if (/\/g\/collect/.test(u.pathname) && !/doubleclick/.test(u.host)) return "ga4";
	if (ADS_PATTERNS.some((p) => p.test(u.host + u.pathname))) return "ads";
	if (/googletagmanager\.com$/.test(u.host)) return "gtm";
	if (/google\.com$/.test(u.host) && u.pathname.startsWith("/maps")) return "maps";
	if (/(gstatic|googleapis)\.com$/.test(u.host)) return "maps";
	if (/youtube(-nocookie)?\.com$|ytimg\.com$|googlevideo\.com$/.test(u.host)) return "youtube";
	return "other";
}

/** Événements d'un hit GA4 : paramètres d'URL + lignes du corps (envoi groupé). */
export function ga4Events(url, body) {
	const u = new URL(url);
	const baseDl = u.searchParams.get("dl");
	const events = [];
	if (u.searchParams.get("en")) {
		events.push({ en: u.searchParams.get("en"), dl: baseDl, params: Object.fromEntries(u.searchParams) });
	}
	for (const line of (body || "").split("\r\n").filter(Boolean)) {
		const q = new URLSearchParams(line);
		if (q.get("en")) events.push({ en: q.get("en"), dl: q.get("dl") || baseDl, params: Object.fromEntries(q) });
	}
	return events;
}

export async function newSession(browser, { mobile = false } = {}) {
	const context = await browser.newContext(
		mobile ? { ...devices["Pixel 7"] } : { viewport: { width: 1366, height: 900 } }
	);
	const log = { requests: [], ga4: [], ads: [], csp: [], pageErrors: [] };

	await context.addInitScript(() => {
		document.addEventListener("securitypolicyviolation", (e) => {
			console.log(`CSPV|${e.violatedDirective}|${e.blockedURI}`);
		});
	});

	await context.route("**/*", async (route) => {
		const request = route.request();
		const url = request.url();
		const u = new URL(url);

		if (u.origin === SITE || u.origin === "https://www.lylusio.fr") {
			try {
				const response = await route.fetch({ url: LOCAL + u.pathname + u.search, maxRedirects: 0 });
				return await route.fulfill({ response });
			} catch {
				// Contexte fermé ou connexion locale réinitialisée : requête abandonnée
				return route.abort().catch(() => {});
			}
		}
		if (u.host === "admin.lylusio.fr") return route.continue();

		const kind = classify(url);
		log.requests.push({ kind, host: u.host, path: u.pathname });
		if (kind === "gtm" && u.pathname === "/gtag/js") return route.continue();
		if (kind === "ga4") log.ga4.push(...ga4Events(url, request.postData()));
		if (kind === "ads") log.ads.push({ host: u.host, path: u.pathname });
		if (request.resourceType() === "document") {
			return route.fulfill({ status: 200, contentType: "text/html", body: "<html><body>stub</body></html>" });
		}
		return route.fulfill({ status: 204, body: "" });
	});

	const page = await context.newPage();
	page.on("console", (msg) => {
		const text = msg.text();
		if (text.startsWith("CSPV|")) {
			const [, directive, blocked] = text.split("|");
			log.csp.push({ directive, blocked });
		}
	});
	page.on("pageerror", (err) => log.pageErrors.push(err.message));

	const pageViews = () => log.ga4.filter((e) => e.en === "page_view");
	const pathOf = (dl) => (dl ? new URL(dl).pathname : null);

	return {
		context,
		page,
		log,
		pageViews,
		pageViewPaths: () => pageViews().map((e) => pathOf(e.dl)),
		cookieNames: async () => (await context.cookies()).map((c) => c.name).sort(),
		storage: () => page.evaluate(() => ({ ...localStorage })),
		/** Attend que le nombre d'événements soit stable (envois groupés GA4). */
		/** Attend qu'aucun nouvel événement n'arrive pendant `quietMs` (envois groupés GA4). */
		settle: async (quietMs = 7000, maxMs = 20000) => {
			const start = Date.now();
			let last = log.ga4.length + log.ads.length;
			let lastChange = Date.now();
			while (Date.now() - start < maxMs && Date.now() - lastChange < quietMs) {
				await sleep(500);
				const n = log.ga4.length + log.ads.length;
				if (n !== last) {
					last = n;
					lastChange = Date.now();
				}
			}
		},
		close: async () => {
			await context.unrouteAll({ behavior: "ignoreErrors" });
			await context.close();
		},
	};
}

export async function waitFor(predicate, timeout = 15000, step = 250) {
	const start = Date.now();
	while (Date.now() - start < timeout) {
		if (await predicate()) return true;
		await sleep(step);
	}
	return false;
}
