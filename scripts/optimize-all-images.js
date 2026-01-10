const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesToOptimize = [
  { input: 'public/assets/reiki-histoire.webp', quality: 65, maxWidth: 1200 },
  { input: 'public/assets/arbre-lumiere.webp', quality: 65, maxWidth: 1200 },
  { input: 'public/assets/buddha-meditation.webp', quality: 65, maxWidth: 1200 },
  { input: 'public/assets/cascade-zen.webp', quality: 65, maxWidth: 1200 },
  { input: 'public/assets/tarif-accompagnement.webp', quality: 65, maxWidth: 1200 },
  { input: 'public/assets/seance-reiki-zen.webp', quality: 60, maxWidth: 800 },
  { input: 'public/assets/emilie-lumiere.webp', quality: 65, maxWidth: 800 },
  { input: 'public/assets/emilie-enfant.webp', quality: 65, maxWidth: 800 },
  { input: 'public/assets/seance-astro-zen.webp', quality: 60, maxWidth: 800 },
];

async function optimizeImage(config) {
  try {
    const inputPath = path.join(__dirname, '..', config.input);

    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  Skip: ${config.input} (not found)`);
      return;
    }

    const stats = fs.statSync(inputPath);
    const originalSizeKB = Math.round(stats.size / 1024);

    // Skip if already small enough
    if (originalSizeKB < 30) {
      console.log(`✓ Skip: ${config.input} (${originalSizeKB} KB - already optimized)`);
      return;
    }

    console.log(`Processing: ${config.input} (${originalSizeKB} KB)`);

    await sharp(inputPath)
      .resize(config.maxWidth, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({
        quality: config.quality,
        effort: 6,
        smartSubsample: true
      })
      .toFile(inputPath + '.tmp');

    fs.renameSync(inputPath + '.tmp', inputPath);

    const newStats = fs.statSync(inputPath);
    const newSizeKB = Math.round(newStats.size / 1024);
    const reduction = Math.round((1 - newSizeKB / originalSizeKB) * 100);

    console.log(`✓ ${config.input}: ${originalSizeKB} KB → ${newSizeKB} KB (${reduction}% reduction)`);
  } catch (error) {
    console.error(`✗ Error processing ${config.input}:`, error.message);
  }
}

async function main() {
  console.log('🖼️  Optimizing all remaining images...\n');

  for (const image of imagesToOptimize) {
    await optimizeImage(image);
  }

  console.log('\n✅ All images optimized!');
}

main();
