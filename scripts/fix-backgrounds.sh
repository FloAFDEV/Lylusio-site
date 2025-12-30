#!/bin/bash

# ═══════════════════════════════════════════════════════════════
# FIX BACKGROUNDS - Design System "Céleste Poudré"
# Corrige automatiquement les backgrounds pour utiliser des gradients
# ═══════════════════════════════════════════════════════════════

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}══════════════════════════════════════════${NC}"
echo -e "${BLUE}  FIX BACKGROUNDS - Céleste Poudré${NC}"
echo -e "${BLUE}══════════════════════════════════════════${NC}\n"

cd "$(dirname "$0")/.." || exit 1

# Vérification Git
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo -e "${RED}❌ Erreur : Pas dans un dépôt Git${NC}"
  echo -e "   Ce script nécessite Git pour créer une sauvegarde\n"
  exit 1
fi

# Création du backup
backup="backup_backgrounds_$(date +%Y%m%d_%H%M%S).tar.gz"
echo -e "${BLUE}📦 Création du backup...${NC}"
tar -czf "$backup" \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='dist' \
  --exclude='*.tar.gz' \
  . 2>/dev/null

if [[ $? -eq 0 ]]; then
  echo -e "${GREEN}✅ Backup créé : $backup${NC}\n"
else
  echo -e "${RED}❌ Erreur lors de la création du backup${NC}\n"
  exit 1
fi

# Déclaration des remplacements
declare -A replacements
replacements=(
  ["className=\"([^\"]*)\bbg-sand\b"]="className=\"\1bg-gradient-sand-center"
  ["className=\"([^\"]*)\bbg-sky\b"]="className=\"\1bg-gradient-sky-center"
  ["className=\"([^\"]*)\bbg-secondary\b"]="className=\"\1bg-gradient-sky-center"
  ["className=\"([^\"]*)\bbg-tertiary\b"]="className=\"\1bg-gradient-sand-center"
)

files_modified=0
total_replacements=0

echo -e "${BLUE}🔧 Application des corrections...${NC}\n"

# Traitement des fichiers
while IFS= read -r file; do
  file_modified=0

  # Sauvegarde temporaire du fichier
  cp "$file" "$file.tmp"

  # Application de chaque remplacement
  for pattern in "${!replacements[@]}"; do
    replacement="${replacements[$pattern]}"

    # Comptage des occurrences avant remplacement
    count_before=$(grep -oE "$pattern" "$file.tmp" 2>/dev/null | wc -l | tr -d ' ')

    if [[ $count_before -gt 0 ]]; then
      # Remplacement avec perl (plus robuste que sed pour les regex complexes)
      perl -i -pe "s/$pattern/$replacement/g" "$file.tmp"

      echo -e "${GREEN}  ✓${NC} $file"
      echo -e "    ${YELLOW}Remplacements:${NC} $count_before occurrence(s)"

      ((total_replacements += count_before))
      file_modified=1
    fi
  done

  # Remplacement des styles inline
  if grep -Eq 'style=\{\{[^}]*background:[^}]*hsl\(var\(--(sand|sky)\)\)' "$file.tmp"; then
    echo -e "${YELLOW}  ⚠${NC} $file"
    echo -e "    ${YELLOW}Attention:${NC} Styles inline détectés (correction manuelle requise)\n"
  fi

  # Application des modifications si le fichier a changé
  if [[ $file_modified -eq 1 ]]; then
    mv "$file.tmp" "$file"
    ((files_modified++))
  else
    rm "$file.tmp"
  fi

done < <(find . -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" \) ! -path "*/node_modules/*" ! -path "*/.next/*" ! -path "*/dist/*")

# Résumé
echo -e "\n${BLUE}══════════════════════════════════════════${NC}"
echo -e "${BLUE}  RÉSUMÉ DES CORRECTIONS${NC}"
echo -e "${BLUE}══════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ Fichiers modifiés : $files_modified${NC}"
echo -e "${GREEN}✅ Remplacements totaux : $total_replacements${NC}"
echo -e "${YELLOW}📦 Backup : $backup${NC}\n"

if [[ $files_modified -gt 0 ]]; then
  echo -e "${YELLOW}📋 ÉTAPES SUIVANTES :${NC}"
  echo -e "   1. Vérifier les modifications : ${BLUE}git diff${NC}"
  echo -e "   2. Relancer l'audit : ${BLUE}./scripts/audit-backgrounds.sh${NC}"
  echo -e "   3. Tester le build : ${BLUE}npm run build${NC}"
  echo -e "   4. Committer : ${BLUE}git add . && git commit -m 'fix: conform to Céleste Poudré design system'${NC}\n"

  echo -e "${YELLOW}💾 En cas de problème :${NC}"
  echo -e "   Restaurer le backup : ${BLUE}tar -xzf $backup${NC}\n"
else
  echo -e "${GREEN}✅ Aucune modification nécessaire${NC}\n"
fi

exit 0
