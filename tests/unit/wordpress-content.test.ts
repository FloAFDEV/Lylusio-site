import { test } from "node:test";
import assert from "node:assert/strict";
import { replaceFacebookEmojiImages } from "../../lib/wordpress-shortcodes";

test("émojis Facebook : image tierce remplacée par l'émoji texte", () => {
	const html =
		'<p>Bonne lecture <img loading="lazy" decoding="async" src="https://static.xx.fbcdn.net/images/emoji.php/v9/tfb/1/16/263a.png" alt="☺️" width="16" height="16" /> et <img src="https://www.facebook.com/images/emoji.php/v9/t57/1/16/1f609.png" alt="😉"></p>';
	assert.equal(replaceFacebookEmojiImages(html), "<p>Bonne lecture ☺️ et 😉</p>");
});

test("les autres images ne sont pas modifiées", () => {
	const html = '<img src="https://admin.lylusio.fr/wp-content/uploads/a.jpg" alt="x">';
	assert.equal(replaceFacebookEmojiImages(html), html);
	assert.equal(replaceFacebookEmojiImages(""), "");
});

test("sanitizeWordPressPost : plus aucune URL Calendly ni émoji Facebook dans le post transmis", async () => {
	const { sanitizeWordPressPost } = await import("../../lib/wordpress-shortcodes");
	const post = {
		id: 1,
		slug: "x",
		content: {
			rendered:
				'<p><a href="https://calendly.com/lylusio-fr/consultationastrologique" target="_blank">https://calendly.com/lylusio-fr/consultationastrologique</a> <img src="https://static.xx.fbcdn.net/images/emoji.php/v9/tfb/1/16/263a.png" alt="☺️"></p>',
			protected: false,
		},
		excerpt: { rendered: "<p>Résumé</p>" },
	};
	const clean = sanitizeWordPressPost(post);
	assert.doesNotMatch(JSON.stringify(clean), /calendly|fbcdn/i);
	assert.match(clean.content.rendered, /href="tel:\+33619151959"/);
	assert.equal(clean.id, 1);
	assert.equal(clean.content.protected, false);
	assert.equal(post.content.rendered.includes("calendly"), true, "objet d'origine non modifié");
	assert.equal(sanitizeWordPressPost(null), null);
});
