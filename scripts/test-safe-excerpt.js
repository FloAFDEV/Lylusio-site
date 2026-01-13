/**
 * Test de getSafeExcerpt() - version centralisée
 */

// Simuler processWordPressContent
function processWordPressContent(content) {
	if (!content) return "";
	let processed = content;
	processed = processed.replace(/<p[^>]*>\s*(\[caption[\s\S]*?\[\/caption\])\s*<\/p>/gi, "$1");
	processed = processed.replace(/<p[^>]*>\s*(<img[^>]+>)\s*<\/p>/gi, "$1");
	processed = processed.replace(/<figcaption[\s\S]*?<\/figcaption>/gi, "");
	processed = processed.replace(/\[caption[\s\S]*?\[\/caption\]/gi, "");
	processed = processed.replace(/\sclass="[^"]*wp-image-\d+[^"]*"/gi, "");
	processed = processed.replace(/\sclass="[^"]*wp-caption[^"]*"/gi, "");
	processed = processed.replace(/\sstyle="[^"]*"/gi, "");
	processed = processed.replace(/\s{2,}/g, " ");
	processed = processed.replace(/<p[^>]*>\s*<\/p>/gi, "");
	return processed.trim();
}

// Fonction getSafeExcerpt
function getSafeExcerpt(html, length = 150) {
	if (!html) return "";

	// 1. Nettoyer via pipeline centralisé
	const cleaned = processWordPressContent(html);

	// 2. Stripper HTML
	let text = cleaned.replace(/<[^>]+>/g, "");

	// 3. Décoder entités
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

	// 4. Nettoyer espaces
	text = text.replace(/\s{2,}/g, " ").trim();

	// 5. Tronquer
	if (text.length > length) {
		return text.slice(0, length).trim() + "…";
	}
	return text;
}

console.log('🧪 Test de getSafeExcerpt() - Version Centralisée\n');
console.log('=' .repeat(80));

// CAS RÉEL : excerpt avec [caption]
const realExcerpt = `<p class="text-muted-foreground max-w-2xl mx-auto mt-4 text-lg">[caption id="attachment_1739" align="aligncenter" width="800"] Un bouddha décoratif blanc tenant dans ses mains des pétales de fleurs[/caption]</p>`;

console.log('\n📥 INPUT (excerpt WordPress):');
console.log(realExcerpt);
console.log('');

const result = getSafeExcerpt(realExcerpt, 150);

console.log('📤 OUTPUT (excerpt nettoyé):');
console.log('"' + result + '"');
console.log('');

console.log('✅ VÉRIFICATIONS:');
console.log('  - [caption] supprimé?', !result.includes('[caption'));
console.log('  - HTML supprimé?', !result.includes('<'));
console.log('  - Texte caption supprimé?', !result.includes('bouddha'));
console.log('  - Classes supprimées?', !result.includes('text-muted'));
console.log('  - Résultat vide (attendu)?', result === '');
console.log('');

// TEST 2: Excerpt normal avec du vrai texte
const normalExcerpt = `<p>Découvrez comment l&rsquo;astrologie peut vous aider à mieux comprendre votre chemin de vie et vos cycles personnels.</p>`;

console.log('📥 TEST 2 - Excerpt normal:');
console.log(normalExcerpt);
const result2 = getSafeExcerpt(normalExcerpt, 60);
console.log('📤 Résultat:', '"' + result2 + '"');
console.log('✅ Entités décodées?', result2.includes("'") && !result2.includes('&rsquo;'));
console.log('✅ HTML supprimé?', !result2.includes('<p>'));
console.log('✅ Tronqué à 60 chars?', result2.length <= 61); // +1 pour "…"
console.log('');

// TEST 3: Texte avec [2024] (ne doit PAS être supprimé)
const textWithBrackets = `<p>En [2024], nous observons des changements importants.</p>`;
console.log('📥 TEST 3 - Texte avec [2024]:');
console.log(textWithBrackets);
const result3 = getSafeExcerpt(textWithBrackets, 150);
console.log('📤 Résultat:', '"' + result3 + '"');
console.log('✅ [2024] conservé?', result3.includes('[2024]'));
console.log('');

console.log('=' .repeat(80));
console.log('🎉 Tous les tests terminés !');
console.log('');
console.log('💡 Avantages de cette approche:');
console.log('   ✓ Une seule source de vérité (processWordPressContent)');
console.log('   ✓ Pas de regex générique dangereuse');
console.log('   ✓ Cohérence HTML → texte garantie');
console.log('   ✓ Maintien des [années] et autres crochets légitimes');
