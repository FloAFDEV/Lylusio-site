#!/bin/bash

# Script to download Google Fonts for self-hosting
# Fonts: Cormorant Garamond, Source Sans 3, Dancing Script

cd "$(dirname "$0")/.."
FONTS_DIR="public/fonts"

echo "📥 Downloading Google Fonts for self-hosting..."
echo ""

# Cormorant Garamond (weights: 300, 400, 500, 600, 700)
echo "1. Cormorant Garamond..."
curl -s "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap" \
  -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" \
  > /tmp/cormorant.css

# Extract URLs and download
grep -o 'https://[^)]*\.woff2' /tmp/cormorant.css | while read url; do
  filename=$(basename "$url" | sed 's/?.*$//')
  echo "  Downloading: $filename"
  curl -s "$url" -o "$FONTS_DIR/$filename"
done

# Source Sans 3 (weights: 300, 400, 600, 700)
echo "2. Source Sans 3..."
curl -s "https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@300;400;600;700&display=swap" \
  -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" \
  > /tmp/source-sans.css

grep -o 'https://[^)]*\.woff2' /tmp/source-sans.css | while read url; do
  filename=$(basename "$url" | sed 's/?.*$//')
  echo "  Downloading: $filename"
  curl -s "$url" -o "$FONTS_DIR/$filename"
done

# Dancing Script (weights: 400, 500, 600, 700)
echo "3. Dancing Script..."
curl -s "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap" \
  -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" \
  > /tmp/dancing.css

grep -o 'https://[^)]*\.woff2' /tmp/dancing.css | while read url; do
  filename=$(basename "$url" | sed 's/?.*$//')
  echo "  Downloading: $filename"
  curl -s "$url" -o "$FONTS_DIR/$filename"
done

echo ""
echo "✅ Fonts downloaded to $FONTS_DIR"
echo "Total files: $(ls -1 $FONTS_DIR/*.woff2 2>/dev/null | wc -l)"
ls -lh $FONTS_DIR/*.woff2 2>/dev/null
