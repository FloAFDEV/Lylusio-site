const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const images = [
  {
    input: 'public/assets/therapie-holistique-card.webp',
    output: 'public/assets/therapie-holistique-card.webp',
    maxWidth: 800,
    quality: 75,
    targetSize: 100 // KB
  },
  {
    input: 'public/assets/tarif-transits.webp',
    output: 'public/assets/tarif-transits.webp',
    maxWidth: 1200,
    quality: 70,
    targetSize: 150
  },
  {
    input: 'public/assets/tarif-theme-natal.webp',
    output: 'public/assets/tarif-theme-natal.webp',
    maxWidth: 1200,
    quality: 70,
    targetSize: 150
  },
  {
    input: 'public/assets/tarif-bilan-pro.webp',
    output: 'public/assets/tarif-bilan-pro.webp',
    maxWidth: 1200,
    quality: 70,
    targetSize: 150
  },
  {
    input: 'public/assets/approche-arbre.webp',
    output: 'public/assets/approche-arbre.webp',
    maxWidth: 1200,
    quality: 75,
    targetSize: 50
  }
];

async function optimizeImage(config) {
  try {
    const inputPath = path.join(__dirname, '..', config.input);
    const outputPath = path.join(__dirname, '..', config.output);

    // Backup original
    const backupPath = inputPath.replace('.webp', '.original.webp');
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(inputPath, backupPath);
      console.log(`✓ Backup created: ${backupPath}`);
    }

    const stats = fs.statSync(inputPath);
    const originalSizeKB = Math.round(stats.size / 1024);

    console.log(`\nProcessing: ${config.input}`);
    console.log(`Original size: ${originalSizeKB} KB`);

    // Optimize with sharp
    await sharp(inputPath)
      .resize(config.maxWidth, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({
        quality: config.quality,
        effort: 6, // Max compression effort
        smartSubsample: true
      })
      .toFile(outputPath + '.tmp');

    // Replace original with optimized
    fs.renameSync(outputPath + '.tmp', outputPath);

    const newStats = fs.statSync(outputPath);
    const newSizeKB = Math.round(newStats.size / 1024);
    const reduction = Math.round((1 - newSizeKB / originalSizeKB) * 100);

    console.log(`✓ New size: ${newSizeKB} KB (${reduction}% reduction)`);

    if (newSizeKB > config.targetSize) {
      console.log(`⚠️  Warning: Target was ${config.targetSize} KB, consider reducing quality further`);
    }

  } catch (error) {
    console.error(`✗ Error processing ${config.input}:`, error.message);
  }
}

async function main() {
  console.log('🖼️  Starting image optimization...\n');

  for (const image of images) {
    await optimizeImage(image);
  }

  console.log('\n✅ Image optimization complete!');
}

main();
