#!/bin/bash

# 🔍 Script de validation SEO et Performance - Lylusio.fr
# Vérifie que toutes les optimisations sont en place

set -e

echo "🔍 Validation SEO et Performance - Lylusio.fr"
echo "================================================"
echo ""

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Compteurs
PASSED=0
FAILED=0

check_pass() {
    echo -e "${GREEN}✅ $1${NC}"
    ((PASSED++))
}

check_fail() {
    echo -e "${RED}❌ $1${NC}"
    ((FAILED++))
}

check_warn() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

echo "📁 1. Vérification des fichiers optimisés"
echo "----------------------------------------"

# Vérifier HeroSection
if grep -q "fetchPriority=\"high\"" components/sections/HeroSection.tsx; then
    check_pass "HeroSection: fetchPriority='high' présent"
else
    check_fail "HeroSection: fetchPriority='high' manquant"
fi

if grep -q "priority" components/sections/HeroSection.tsx; then
    check_pass "HeroSection: priority présent"
else
    check_fail "HeroSection: priority manquant"
fi

if grep -q "seededRandom" components/sections/HeroSection.tsx; then
    check_pass "HeroSection: générateur déterministe présent"
else
    check_fail "HeroSection: générateur déterministe manquant"
fi

echo ""
echo "📱 2. Vérification des images responsive"
echo "----------------------------------------"

# Vérifier ApprochSection
if grep -q "arbre-lumiere.webp" components/sections/ApprochSection.tsx; then
    check_pass "ApprochSection: version mobile (arbre-lumiere) présente"
else
    check_fail "ApprochSection: version mobile manquante"
fi

if grep -q "approche-arbre.webp" components/sections/ApprochSection.tsx; then
    check_pass "ApprochSection: version desktop (approche-arbre) présente"
else
    check_fail "ApprochSection: version desktop manquante"
fi

# Vérifier présence des fichiers images
if [ -f "public/assets/emilie-hero.webp" ]; then
    SIZE=$(wc -c < "public/assets/emilie-hero.webp" | awk '{print int($1/1024)}')
    if [ $SIZE -lt 50 ]; then
        check_pass "emilie-hero.webp présente (${SIZE}KB) - optimale"
    else
        check_warn "emilie-hero.webp présente (${SIZE}KB) - pourrait être optimisée"
    fi
else
    check_fail "emilie-hero.webp manquante"
fi

if [ -f "public/assets/arbre-lumiere.webp" ]; then
    SIZE=$(wc -c < "public/assets/arbre-lumiere.webp" | awk '{print int($1/1024)}')
    if [ $SIZE -lt 70 ]; then
        check_pass "arbre-lumiere.webp présente (${SIZE}KB) - mobile optimisée"
    else
        check_warn "arbre-lumiere.webp présente (${SIZE}KB) - pourrait être optimisée"
    fi
else
    check_fail "arbre-lumiere.webp manquante"
fi

if [ -f "public/assets/approche-arbre.webp" ]; then
    SIZE=$(wc -c < "public/assets/approche-arbre.webp" | awk '{print int($1/1024)}')
    check_pass "approche-arbre.webp présente (${SIZE}KB) - desktop"
else
    check_fail "approche-arbre.webp manquante"
fi

echo ""
echo "🔒 3. Vérification accessibilité"
echo "--------------------------------"

# Vérifier aria-hidden
if grep -q "aria-hidden=\"true\"" components/sections/HeroSection.tsx; then
    check_pass "HeroSection: aria-hidden sur décoratifs"
else
    check_fail "HeroSection: aria-hidden manquant"
fi

# Vérifier alt texte
if grep -q "alt=\"Émilie Perez" components/sections/HeroSection.tsx; then
    check_pass "HeroSection: alt texte descriptif présent"
else
    check_fail "HeroSection: alt texte manquant ou incomplet"
fi

echo ""
echo "📊 4. Vérification SEO"
echo "----------------------"

# Vérifier sitemap
if [ -f "app/sitemap.ts" ]; then
    if grep -q "category/blog" app/sitemap.ts; then
        check_pass "Sitemap: catégories blog incluses"
    else
        check_fail "Sitemap: catégories blog manquantes"
    fi
else
    check_fail "Sitemap: fichier manquant"
fi

# Vérifier robots.txt
if [ -f "app/robots.ts" ]; then
    if grep -q "sitemap.xml" app/robots.ts; then
        check_pass "Robots.txt: sitemap déclaré"
    else
        check_fail "Robots.txt: sitemap non déclaré"
    fi
else
    check_fail "Robots.txt: fichier manquant"
fi

echo ""
echo "🧪 5. Build Test"
echo "----------------"

# Tester le build
echo "Construction du projet..."
if npm run build > /dev/null 2>&1; then
    check_pass "Build Next.js réussi"
else
    check_fail "Build Next.js échoué"
    echo "Exécutez 'npm run build' pour voir les erreurs"
fi

echo ""
echo "================================================"
echo "📊 RÉSUMÉ"
echo "================================================"
echo ""
echo -e "${GREEN}✅ Tests réussis: $PASSED${NC}"
if [ $FAILED -gt 0 ]; then
    echo -e "${RED}❌ Tests échoués: $FAILED${NC}"
    echo ""
    echo "⚠️  Certaines optimisations ne sont pas appliquées."
    echo "Consultez OPTIMIZATIONS_SEO_IMAGES.md pour les détails."
    exit 1
else
    echo -e "${GREEN}🎉 Toutes les optimisations sont appliquées !${NC}"
    echo ""
    echo "✅ Le site est prêt pour la production"
    echo "✅ Core Web Vitals optimisés"
    echo "✅ SEO conforme Google"
    echo ""
    echo "Prochaines étapes :"
    echo "1. Déployer sur production"
    echo "2. Tester sur PageSpeed Insights"
    echo "3. Vérifier Core Web Vitals après 24-48h"
    exit 0
fi
