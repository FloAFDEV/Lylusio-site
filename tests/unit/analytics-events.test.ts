import { test } from "node:test";
import assert from "node:assert/strict";
import {
	buildContactEvent,
	contactMethodFromHref,
	pageKeyFromPath,
} from "../../lib/analytics-events";

test("méthode de contact déduite du lien", () => {
	assert.equal(contactMethodFromHref("tel:+33619151959"), "phone");
	assert.equal(contactMethodFromHref(" TEL:+33"), "phone");
	assert.equal(contactMethodFromHref("mailto:contact@lylusio.fr"), "email");
	assert.equal(contactMethodFromHref("https://calendly.com/x"), null);
	assert.equal(contactMethodFromHref("/contact"), null);
	assert.equal(contactMethodFromHref(null), null);
});

test("clé de page stable, sans slug ni paramètre", () => {
	assert.equal(pageKeyFromPath("/"), "home");
	assert.equal(pageKeyFromPath("/contact"), "contact");
	assert.equal(pageKeyFromPath("/reiki-toulouse"), "reiki");
	assert.equal(pageKeyFromPath("/blog"), "blog");
	assert.equal(pageKeyFromPath("/blog/mon-article?gclid=abc"), "blog_post");
	assert.equal(pageKeyFromPath("/ressources/guide"), "ressource");
	assert.equal(pageKeyFromPath("/un-article-wordpress"), "page");
});

test("phone_click de réservation avec emplacement et service", () => {
	assert.deepEqual(
		buildContactEvent("phone", { location: "hero", intent: "booking" }, "/"),
		{ name: "phone_click", params: { cta_location: "hero", cta_intent: "booking", service: "none" } }
	);
	assert.deepEqual(
		buildContactEvent("phone", { location: "service_card", intent: "booking", service: "reiki" }, "/reiki-toulouse"),
		{ name: "phone_click", params: { cta_location: "service_card", cta_intent: "booking", service: "reiki" } }
	);
});

test("email_click avec emplacement par défaut dérivé de la page", () => {
	assert.deepEqual(buildContactEvent("email", {}, "/blog/article"), {
		name: "email_click",
		params: { cta_location: "blog_post_content", cta_intent: "contact", service: "none" },
	});
});

test("aucune donnée personnelle ou texte libre dans les paramètres", () => {
	const event = buildContactEvent(
		"phone",
		{
			location: "06 19 15 19 59",
			// @ts-expect-error valeur volontairement invalide
			intent: "rendez-vous confirmé",
			service: "contact@lylusio.fr",
		},
		"/contact"
	);
	assert.deepEqual(event.params, {
		cta_location: "contact_content",
		cta_intent: "contact",
		service: "none",
	});
	const serialized = JSON.stringify(event);
	assert.doesNotMatch(serialized, /\d{2} \d{2}|@|\+33/);
});
