const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesToCompress = [
  {
    input: 'public/assets/approche-arbre.webp',
    output: 'public/assets/approche-arbre.webp',
    quality: 65,
    width: 1200
  },
  {
    input: 'public/assets/emilie-hero.webp',
    output: 'public/assets/emilie-hero.webp',
    quality: 70,
    width: 600
  }
];

async function compressImage(config) {
  try {
    const inputPath = path.join(__dirname, '..', config.input);
    const outputPath = path.join(__dirname, '..', config.output);

    // Backup original
    const backupPath = outputPath.replace('.webp', '.original.webp');
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(outputPath, backupPath);
      console.log(`✓ Backup created: ${backupPath}`);
    }

    const info = await sharp(inputPath)
      .resize(config.width, null, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: config.quality, effort: 6 })
      .toFile(outputPath + '.tmp');

    // Replace original
    fs.renameSync(outputPath + '.tmp', outputPath);

    console.log(`✓ Compressed ${config.input}:`);
    console.log(`  Size: ${Math.round(info.size / 1024)}KB`);
    console.log(`  Dimensions: ${info.width}x${info.height}`);
    console.log(`  Quality: ${config.quality}`);

  } catch (error) {
    console.error(`✗ Error compressing ${config.input}:`, error.message);
  }
}

async function main() {
  console.log('🖼️  Starting image compression...\n');

  for (const config of imagesToCompress) {
    await compressImage(config);
    console.log('');
  }

  console.log('✅ Image compression complete!');
}

main();
