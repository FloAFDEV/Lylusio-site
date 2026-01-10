const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function compress() {
  const input = path.join(__dirname, '../public/assets/approche-arbre.webp');
  const output = path.join(__dirname, '../public/assets/approche-arbre.webp');

  console.log('🖼️  Final aggressive compression of approche-arbre.webp...');

  const statsBefore = fs.statSync(input);
  const beforeKB = Math.round(statsBefore.size / 1024);
  console.log(`Before: ${beforeKB} KB`);

  await sharp(input)
    .resize(1080, null, { withoutEnlargement: true, fit: 'inside' })
    .webp({ quality: 45, effort: 6, smartSubsample: true })
    .toFile(output + '.tmp');

  fs.renameSync(output + '.tmp', output);

  const statsAfter = fs.statSync(output);
  const afterKB = Math.round(statsAfter.size / 1024);
  const reduction = Math.round((1 - afterKB / beforeKB) * 100);

  console.log(`✓ After: ${afterKB} KB (${reduction}% reduction)`);
}

compress();
