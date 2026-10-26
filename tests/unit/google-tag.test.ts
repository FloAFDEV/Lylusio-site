import { beforeEach, test } from "node:test";
import assert from "node:assert/strict";
import {
	GA_COOKIE_EXPIRES_SECONDS,
	GA_MEASUREMENT_ID,
	applyConsent,
	getGoogleTagState,
	handleContactLinkClick,
	resetGoogleTagStateForTests,
	trackEvent,
	type TagDocument,
	type TagWindow,
} from "../../lib/google-tag";

const ANALYTICS_ONLY = { analytics: true, marketing: false };
const ALL = { analytics: true, marketing: true };
const NONE = { analytics: false, marketing: false };

function fakeEnv(hostname = "lylusio.fr", path = "/") {
	const jar = new Map<string, string>();
	const scripts: { src?: string; async?: boolean }[] = [];
	const removedLocal: string[] = [];
	const location = {
		hostname,
		pathname: path,
		href: `https://${hostname}${path}`,
	};
	const w: TagWindow = {
		location,
		setTimeout: (cb: () => void) => {
			cb();
			return 0;
		},
		localStorage: { removeItem: (key: string) => void removedLocal.push(key) },
	};
	const d: TagDocument = {
		get cookie() {
			return [...jar].map(([k, v]) => `${k}=${v}`).join("; ");
		},
		set cookie(value: string) {
			const [pair, ...attrs] = value.split(";");
			const [name, val] = pair.split("=");
			if (attrs.some((a) => /max-age=0/i.test(a))) jar.delete(name.trim());
			else jar.set(name.trim(), val);
		},
		head: { appendChild: (node: unknown) => scripts.push(node as { src?: string }) },
		createElement: () => ({}),
	};
	const navigate = (newPath: string) => {
		location.pathname = newPath;
		location.href = `https://${hostname}${newPath}`;
	};
	const commands = () =>
		(w.dataLayer ?? []).map((args) => Array.from(args as ArrayLike<unknown>));
	return { w, d, jar, scripts, removedLocal, navigate, commands };
}

const pageViews = (commands: unknown[][]) =>
	commands.filter((c) => c[0] === "event" && c[1] === "page_view").length;

beforeEach(() => resetGoogleTagStateForTests());

test("hors domaine de production : aucun tag, aucune commande", () => {
	const env = fakeEnv("localhost");
	applyConsent(ALL, env.w, env.d);
	assert.equal(env.w.dataLayer, undefined);
	assert.equal(env.scripts.length, 0);
});

test("sans choix ou refus total : aucun script Google ni dataLayer", () => {
	const env = fakeEnv();
	applyConsent(null, env.w, env.d);
	applyConsent(NONE, env.w, env.d);
	assert.equal(env.w.dataLayer, undefined);
	assert.equal(env.scripts.length, 0);
});

test("Analytics accepté : consent default (4 × denied) avant update, js et config", () => {
	const env = fakeEnv();
	applyConsent(ANALYTICS_ONLY, env.w, env.d);
	const cmds = env.commands();
	assert.deepEqual(cmds[0], [
		"consent",
		"default",
		{
			analytics_storage: "denied",
			ad_storage: "denied",
			ad_user_data: "denied",
			ad_personalization: "denied",
		},
	]);
	assert.deepEqual(cmds[1], [
		"consent",
		"update",
		{
			analytics_storage: "granted",
			ad_storage: "denied",
			ad_user_data: "denied",
			ad_personalization: "denied",
		},
	]);
	assert.equal(cmds[2][0], "js");
	assert.deepEqual(cmds[3], ["config", GA_MEASUREMENT_ID, { cookie_expires: GA_COOKIE_EXPIRES_SECONDS }]);
	// La page courante est mesurée par config (send_page_view par défaut), pas en double
	assert.equal(pageViews(cmds), 0);
	assert.equal(env.scripts.length, 1);
	assert.equal(env.scripts[0].src, `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`);
	assert.equal(env.scripts[0].async, true);
});

test("appels répétés (rechargement du choix, StrictMode) : un seul config, un seul script", () => {
	const env = fakeEnv();
	applyConsent(ALL, env.w, env.d);
	applyConsent(ALL, env.w, env.d);
	env.navigate("/contact");
	applyConsent(ALL, env.w, env.d);
	const cmds = env.commands();
	assert.equal(cmds.filter((c) => c[0] === "config").length, 1);
	assert.equal(cmds.filter((c) => c[0] === "consent" && c[1] === "default").length, 1);
	assert.equal(pageViews(cmds), 0);
	assert.equal(env.scripts.length, 1);
});

test("Marketing refusé : cookies _gcl_* et _gcl_ls supprimés", () => {
	const env = fakeEnv();
	env.jar.set("_gcl_au", "1.1");
	env.jar.set("_ga", "GA1");
	applyConsent(ANALYTICS_ONLY, env.w, env.d);
	assert.equal(env.jar.has("_gcl_au"), false);
	assert.equal(env.jar.has("_ga"), true);
	assert.ok(env.removedLocal.includes("_gcl_ls"));
});

test("retrait après chargement : signaux denied, GA coupé, cookies supprimés, plus d'événement", () => {
	const env = fakeEnv();
	applyConsent(ALL, env.w, env.d);
	env.jar.set("_ga", "GA1");
	env.jar.set(`_ga_${GA_MEASUREMENT_ID.slice(2)}`, "GS1");
	env.jar.set("_gcl_au", "1.1");
	assert.equal(trackEvent("phone_click", { cta_location: "hero" }, env.w), true);

	applyConsent(NONE, env.w, env.d);
	const last = env.commands().at(-1);
	assert.deepEqual(last, [
		"consent",
		"update",
		{
			analytics_storage: "denied",
			ad_storage: "denied",
			ad_user_data: "denied",
			ad_personalization: "denied",
		},
	]);
	assert.equal(env.w[`ga-disable-${GA_MEASUREMENT_ID}`], true);
	assert.equal(env.jar.size, 0);
	const before = env.commands().length;
	assert.equal(trackEvent("phone_click", { cta_location: "hero" }, env.w), false);
	assert.equal(env.commands().length, before);
});

test("réacceptation : page_view seulement si la page courante n'a pas été mesurée", () => {
	const env = fakeEnv();
	applyConsent(ALL, env.w, env.d);
	applyConsent(NONE, env.w, env.d);
	applyConsent(ALL, env.w, env.d); // même page : déjà mesurée
	assert.equal(pageViews(env.commands()), 0);
	assert.equal(env.w[`ga-disable-${GA_MEASUREMENT_ID}`], false);

	applyConsent(NONE, env.w, env.d);
	env.navigate("/blog"); // navigation pendant le refus : non mesurée
	applyConsent(ANALYTICS_ONLY, env.w, env.d);
	assert.equal(pageViews(env.commands()), 1);
	applyConsent(ANALYTICS_ONLY, env.w, env.d);
	assert.equal(pageViews(env.commands()), 1);
});

test("modifier seulement Marketing après navigation : aucun page_view supplémentaire", () => {
	const env = fakeEnv();
	applyConsent(ANALYTICS_ONLY, env.w, env.d);
	env.navigate("/contact");
	applyConsent(ALL, env.w, env.d);
	applyConsent(ANALYTICS_ONLY, env.w, env.d);
	assert.equal(pageViews(env.commands()), 0);
	const updates = env.commands().filter((c) => c[0] === "consent" && c[1] === "update");
	assert.equal((updates.at(-1)![2] as Record<string, string>).ad_storage, "denied");
});

function fakeLink(attrs: Record<string, string>, ignored = false) {
	const link = {
		getAttribute: (name: string) => attrs[name] ?? null,
		closest: (selector: string) => (selector === "[data-analytics-ignore]" && ignored ? {} : null),
	};
	return { closest: (selector: string) => (selector === "a[href]" ? link : null) };
}

test("clic délégué sur tel: : phone_click avec les attributs data-*", () => {
	const env = fakeEnv("lylusio.fr", "/reiki-toulouse");
	applyConsent(ANALYTICS_ONLY, env.w, env.d);
	const sent = handleContactLinkClick(
		fakeLink({
			href: "tel:+33619151959",
			"data-cta-location": "footer_cta",
			"data-cta-intent": "booking",
		}),
		env.w
	);
	assert.equal(sent, true);
	assert.deepEqual(env.commands().at(-1), [
		"event",
		"phone_click",
		{ cta_location: "footer_cta", cta_intent: "booking", service: "none" },
	]);
});

test("clic délégué : mailto sans attribut → emplacement par page ; honeypot et liens normaux ignorés", () => {
	const env = fakeEnv("lylusio.fr", "/contact");
	applyConsent(ANALYTICS_ONLY, env.w, env.d);
	assert.equal(handleContactLinkClick(fakeLink({ href: "mailto:contact@lylusio.fr" }), env.w), true);
	assert.deepEqual(env.commands().at(-1), [
		"event",
		"email_click",
		{ cta_location: "contact_content", cta_intent: "contact", service: "none" },
	]);
	const count = env.commands().length;
	assert.equal(handleContactLinkClick(fakeLink({ href: "tel:+33000000000" }, true), env.w), false);
	assert.equal(handleContactLinkClick(fakeLink({ href: "/blog" }), env.w), false);
	assert.equal(handleContactLinkClick(null, env.w), false);
	assert.equal(env.commands().length, count);
});

test("clic sans consentement Analytics : aucun événement", () => {
	const env = fakeEnv();
	applyConsent(NONE, env.w, env.d);
	assert.equal(handleContactLinkClick(fakeLink({ href: "tel:+33619151959" }), env.w), false);
	assert.equal(env.w.dataLayer, undefined);
	assert.equal(getGoogleTagState().configured, false);
});
