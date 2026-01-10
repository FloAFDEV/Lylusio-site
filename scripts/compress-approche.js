const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function compress() {
  const input = path.join(__dirname, '../public/assets/approche-arbre.original.webp');
  const output = path.join(__dirname, '../public/assets/approche-arbre.webp');

  console.log('Compressing approche-arbre.webp with lower quality...');

  await sharp(input)
    .resize(1080, null, { withoutEnlargement: true, fit: 'inside' })
    .webp({ quality: 60, effort: 6, smartSubsample: true })
    .toFile(output);

  const stats = fs.statSync(output);
  const sizeKB = Math.round(stats.size / 1024);
  console.log(`✓ Compressed to ${sizeKB} KB`);
}

compress();
