const fs = require('fs');
const path = require('path');

// Simple script to create a symlink or inform about OG image
const jpgPath = path.join(__dirname, '..', 'public', 'og-image.jpg');
const webpPath = path.join(__dirname, '..', 'public', 'og-image.webp');

console.log('📸 OG Image Conversion');
console.log('=====================');
console.log('');

if (fs.existsSync(jpgPath)) {
  const stats = fs.statSync(jpgPath);
  console.log(`✅ Found og-image.jpg (${Math.round(stats.size / 1024)}KB)`);
  console.log('');
  console.log('⚠️  To convert to WebP, run one of:');
  console.log('   1. npx @squoosh/cli --webp auto public/og-image.jpg -d public');
  console.log('   2. cwebp -q 85 public/og-image.jpg -o public/og-image.webp');
  console.log('   3. convert public/og-image.jpg -quality 85 public/og-image.webp');
  console.log('');
  console.log('💡 For now, keeping og-image.jpg (46KB is acceptable for OG images)');
} else {
  console.log('❌ og-image.jpg not found');
}
