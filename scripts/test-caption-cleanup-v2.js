/**
 * Test du nettoyage des captions WordPress - Version 2
 * Teste le cas réel fourni par l'utilisateur
 */

function processWordPressContent(content) {
	if (!content) return "";

	let processed = content;

	// 1. 🔥 CRITIQUE : Supprimer les <p> qui wrappent des shortcodes [caption]
	// WordPress envoie souvent : <p>[caption]...[/caption]</p>
	// On doit extraire le shortcode AVANT de le supprimer
	processed = processed.replace(
		/<p[^>]*>\s*(\[caption[\s\S]*?\[\/caption\])\s*<\/p>/gi,
		"$1"
	);

	// 2. Supprimer les <p> qui wrappent uniquement une image (wpautop issue)
	// WordPress wrap les images seules : <p><img /></p>
	processed = processed.replace(
		/<p[^>]*>\s*(<img[^>]+>)\s*<\/p>/gi,
		"$1"
	);

	// 3. Supprimer TOUTES les figcaption (captions WordPress HTML)
	processed = processed.replace(/<figcaption[\s\S]*?<\/figcaption>/gi, '');

	// 4. Supprimer TOUS les shortcodes [caption]...[/caption]
	processed = processed.replace(/\[caption[\s\S]*?\[\/caption\]/gi, '');

	// 5. Nettoyer les classes WordPress inutiles
	processed = processed.replace(/\sclass="[^"]*wp-image-\d+[^"]*"/gi, "");
	processed = processed.replace(/\sclass="[^"]*wp-caption[^"]*"/gi, "");

	// 6. Supprimer les attributs style inline
	processed = processed.replace(/\sstyle="[^"]*"/gi, "");

	// 7. Nettoyer les espaces multiples et paragraphes vides (DOIT être à la fin)
	processed = processed.replace(/\s{2,}/g, " ");
	processed = processed.replace(/<p[^>]*>\s*<\/p>/gi, "");

	return processed.trim();
}

console.log('🧪 Test du nettoyage WordPress - CAS RÉEL\n');
console.log('=' .repeat(80));

// CAS RÉEL fourni par l'utilisateur
const realCase = `<p class="text-muted-foreground max-w-2xl mx-auto mt-4 text-lg">[caption id="attachment_1739" align="aligncenter" width="800"] Un bouddha décoratif blanc tenant dans ses mains des pétales de fleurs[/caption]</p>`;

console.log('\n📥 INPUT (WordPress envoie):');
console.log(realCase);
console.log('');

const result = processWordPressContent(realCase);

console.log('📤 OUTPUT (après nettoyage):');
console.log(result);
console.log('');

console.log('✅ VÉRIFICATIONS:');
console.log('  - <p> vide supprimé?', !result.includes('<p'));
console.log('  - [caption] supprimé?', !result.includes('[caption'));
console.log('  - Texte caption supprimé?', !result.includes('bouddha'));
console.log('  - Classes WP supprimées?', !result.includes('text-muted-foreground'));
console.log('');

if (result === '' || result.length < 10) {
	console.log('🎉 PARFAIT ! Le caption est complètement supprimé.');
	console.log('   Résultat final: "' + result + '"');
} else {
	console.log('⚠️  Il reste du contenu:', result);
}

console.log('');
console.log('=' .repeat(80));

// Test supplémentaire : <p> avec image seule
console.log('\n📥 TEST BONUS - Image wrappée dans <p>:');
const imgTest = '<p><img src="test.jpg" class="wp-image-123" /></p>';
console.log(imgTest);
const imgResult = processWordPressContent(imgTest);
console.log('📤 Résultat:', imgResult);
console.log('✅ <p> supprimé?', !imgResult.includes('<p'));
console.log('✅ Image conservée?', imgResult.includes('<img'));
console.log('✅ Classe wp-image supprimée?', !imgResult.includes('wp-image'));

console.log('');
console.log('🎉 Tous les tests terminés !');
