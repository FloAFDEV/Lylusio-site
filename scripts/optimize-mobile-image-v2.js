const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImage() {
  const backupPath = path.join(__dirname, '..', 'public', 'assets', 'approche-arbre-mobile.webp.backup');
  const inputPath = backupPath; // Use original backup
  const outputPath = path.join(__dirname, '..', 'public', 'assets', 'approche-arbre-mobile.webp');

  console.log('🖼️  Optimizing approche-arbre-mobile.webp (aggressive)...');
  console.log('');

  // Get original size
  const originalStats = fs.statSync(inputPath);
  const originalSize = Math.round(originalStats.size / 1024);
  console.log(`Original size: ${originalSize}KB`);

  // Optimize with aggressive compression
  // - Quality 48 (instead of 55)
  // - Resize to max-width 1024px (mobile viewport limit)
  const image = sharp(inputPath);
  const metadata = await image.metadata();

  console.log(`Original dimensions: ${metadata.width}x${metadata.height}`);

  await image
    .resize({ width: Math.min(metadata.width, 1024), withoutEnlargement: true })
    .webp({ quality: 48, effort: 6 })
    .toFile(outputPath + '.tmp');

  // Get new size
  const newStats = fs.statSync(outputPath + '.tmp');
  const newSize = Math.round(newStats.size / 1024);
  const saved = originalSize - newSize;
  const percent = Math.round((saved / originalSize) * 100);

  console.log(`Optimized size: ${newSize}KB`);
  console.log(`Savings: ${saved}KB (${percent}%)`);
  console.log('');

  if (saved >= 15) {
    fs.renameSync(outputPath + '.tmp', outputPath);
    console.log(`✅ Image optimized successfully!`);
    console.log(`🎉 Target achieved (${saved}KB >= 16KB target)`);
  } else {
    console.log(`⚠️  Savings insufficient (${saved}KB < 16KB target)`);
    console.log('Keeping previous optimization');
    fs.unlinkSync(outputPath + '.tmp');
  }
}

optimizeImage().catch(console.error);
