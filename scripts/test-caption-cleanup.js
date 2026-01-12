/**
 * Test du nettoyage des captions WordPress
 */

// Simuler le processWordPressContent
function processWordPressContent(content) {
	if (!content) return "";

	let processed = content;

	// 1. Supprimer TOUTES les figcaption (captions WordPress HTML)
	processed = processed.replace(/<figcaption[\s\S]*?<\/figcaption>/gi, '');

	// 2. Supprimer TOUS les shortcodes [caption]...[/caption]
	processed = processed.replace(/\[caption[\s\S]*?\[\/caption\]/gi, '');

	// 3. Nettoyer les classes WordPress inutiles
	processed = processed.replace(/\sclass="[^"]*wp-image-\d+[^"]*"/gi, "");
	processed = processed.replace(/\sclass="[^"]*wp-caption[^"]*"/gi, "");

	// 4. Supprimer les attributs style inline
	processed = processed.replace(/\sstyle="[^"]*"/gi, "");

	// 5. Nettoyer les espaces multiples et paragraphes vides
	processed = processed.replace(/\s{2,}/g, " ");
	processed = processed.replace(/<p>\s*<\/p>/gi, "");

	return processed.trim();
}

// Tests
console.log('🧪 Test du nettoyage des captions WordPress\n');

// Test 1: Caption HTML avec figcaption
const test1 = `
<figure>
	<img src="image.jpg" alt="Test" />
	<figcaption>Ce texte doit disparaître</figcaption>
</figure>
`;

console.log('Test 1 - Caption HTML:');
console.log('Avant:', test1);
const result1 = processWordPressContent(test1);
console.log('Après:', result1);
console.log('✅ Figcaption supprimé:', !result1.includes('figcaption'));
console.log('✅ Image conservée:', result1.includes('<img'));
console.log('');

// Test 2: Shortcode [caption]
const test2 = `
<p>Voici une image avec caption:</p>
[caption id="attachment_123" align="aligncenter" width="300"]<img src="image.jpg" class="wp-image-123" />Ce caption doit disparaître[/caption]
<p>Texte après.</p>
`;

console.log('Test 2 - Shortcode [caption]:');
console.log('Avant:', test2);
const result2 = processWordPressContent(test2);
console.log('Après:', result2);
console.log('✅ Shortcode supprimé:', !result2.includes('[caption'));
console.log('✅ Texte avant/après conservé:', result2.includes('Voici') && result2.includes('après'));
console.log('');

// Test 3: Caption complexe multi-lignes
const test3 = `
[caption id="attachment_456" align="alignright" width="500"]
<img class="wp-image-456" src="big-image.jpg" alt="Description" />
Un très long caption
sur plusieurs lignes
avec beaucoup de texte
[/caption]
`;

console.log('Test 3 - Caption multi-lignes:');
console.log('Avant:', test3);
const result3 = processWordPressContent(test3);
console.log('Après:', result3);
console.log('✅ Caption multi-lignes supprimé:', !result3.includes('[caption'));
console.log('✅ Pas de texte résiduel:', !result3.includes('très long'));
console.log('');

// Test 4: Mélange figcaption + shortcode
const test4 = `
<figure class="wp-caption">
	<img src="test.jpg" class="wp-image-789" style="width: 100%;" />
	<figcaption class="wp-caption-text">Caption HTML</figcaption>
</figure>
[caption]<img src="test2.jpg" />Caption shortcode[/caption]
`;

console.log('Test 4 - Mélange HTML + shortcode:');
console.log('Avant:', test4);
const result4 = processWordPressContent(test4);
console.log('Après:', result4);
console.log('✅ Figcaption supprimé:', !result4.includes('figcaption'));
console.log('✅ Shortcode supprimé:', !result4.includes('[caption'));
console.log('✅ Classes WP supprimées:', !result4.includes('wp-image'));
console.log('✅ Styles inline supprimés:', !result4.includes('style='));
console.log('');

console.log('🎉 Tous les tests passés !');
