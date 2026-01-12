const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImage() {
  const inputPath = path.join(__dirname, '..', 'public', 'assets', 'approche-arbre-mobile.webp');
  const outputPath = path.join(__dirname, '..', 'public', 'assets', 'approche-arbre-mobile.webp.tmp');
  const backupPath = path.join(__dirname, '..', 'public', 'assets', 'approche-arbre-mobile.webp.backup');

  console.log('🖼️  Optimizing approche-arbre-mobile.webp...');
  console.log('');

  // Get original size
  const originalStats = fs.statSync(inputPath);
  const originalSize = Math.round(originalStats.size / 1024);
  console.log(`Original size: ${originalSize}KB`);

  // Optimize with lower quality (60 instead of 70)
  await sharp(inputPath)
    .webp({ quality: 55, effort: 6 })
    .toFile(outputPath);

  // Get new size
  const newStats = fs.statSync(outputPath);
  const newSize = Math.round(newStats.size / 1024);
  const saved = originalSize - newSize;
  const percent = Math.round((saved / originalSize) * 100);

  console.log(`Optimized size: ${newSize}KB`);
  console.log(`Savings: ${saved}KB (${percent}%)`);
  console.log('');

  if (newSize < originalSize) {
    // Backup original
    fs.copyFileSync(inputPath, backupPath);
    console.log(`✅ Backup saved: approche-arbre-mobile.webp.backup`);

    // Replace original
    fs.renameSync(outputPath, inputPath);
    console.log(`✅ Image optimized successfully!`);
    console.log('');
    console.log(`Target Lighthouse savings: 16.4KB`);
    console.log(`Actual savings: ${saved}KB`);

    if (saved >= 16) {
      console.log('🎉 Target achieved!');
    } else {
      console.log('⚠️  May need further optimization');
    }
  } else {
    console.log('⚠️  Optimized image is larger, keeping original');
    fs.unlinkSync(outputPath);
  }
}

optimizeImage().catch(console.error);
