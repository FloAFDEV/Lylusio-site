#!/bin/bash

# ═══════════════════════════════════════════════════════════════
# AUDIT BACKGROUNDS - Design System "Céleste Poudré"
# Vérifie que TOUS les backgrounds utilisent des gradients verticaux
# INTERDITS : bg-sand, bg-sky, bg-secondary, bg-tertiary, style inline
# ═══════════════════════════════════════════════════════════════

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}══════════════════════════════════════════${NC}"
echo -e "${BLUE}  AUDIT BACKGROUNDS - Céleste Poudré${NC}"
echo -e "${BLUE}══════════════════════════════════════════${NC}\n"

cd "$(dirname "$0")/.." || exit 1

count_violations=0
count_warnings=0

# Patterns interdits
FORBIDDEN_CLASSES="(className|class)=['\"][^'\"]*\b(bg-sand|bg-sky|bg-secondary|bg-tertiary)\b"
FORBIDDEN_INLINE='style=\{\{[^}]*background:[^}]*hsl\(var\(--'

echo -e "${BLUE}🔍 Recherche des violations dans les fichiers TypeScript/JSX...${NC}\n"

# Recherche dans les fichiers TSX/JSX/TS/JS
while IFS= read -r file; do
  line_num=0
  while IFS= read -r line; do
    ((line_num++))

    # Check for forbidden className
    if echo "$line" | grep -Eq "$FORBIDDEN_CLASSES"; then
      echo -e "${RED}❌ VIOLATION:${NC} $file:$line_num"
      echo -e "   ${YELLOW}Code:${NC} $(echo "$line" | sed 's/^[[:space:]]*//')"
      echo -e "   ${RED}Raison:${NC} Utilisation de bg-sand/bg-sky/bg-secondary/bg-tertiary (interdit)\n"
      ((count_violations++))
    fi

    # Check for forbidden inline style
    if echo "$line" | grep -Eq "$FORBIDDEN_INLINE"; then
      echo -e "${RED}❌ VIOLATION:${NC} $file:$line_num"
      echo -e "   ${YELLOW}Code:${NC} $(echo "$line" | sed 's/^[[:space:]]*//')"
      echo -e "   ${RED}Raison:${NC} Style inline avec hsl(var(--...) (interdit)\n"
      ((count_violations++))
    fi
  done < "$file"
done < <(find . -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.jsx" -o -name "*.js" \) ! -path "*/node_modules/*" ! -path "*/.next/*" ! -path "*/dist/*")

echo -e "${BLUE}🔍 Vérification des classes dépréciées dans CSS...${NC}\n"

# Recherche dans les fichiers CSS
while IFS= read -r file; do
  line_num=0
  while IFS= read -r line; do
    ((line_num++))

    # Check for deprecated classes (warning only)
    if echo "$line" | grep -Eq '^\s*\.(section-sky|section-sand)\s*\{'; then
      echo -e "${YELLOW}⚠️  WARNING:${NC} $file:$line_num"
      echo -e "   ${YELLOW}Code:${NC} $(echo "$line" | sed 's/^[[:space:]]*//')"
      echo -e "   ${YELLOW}Raison:${NC} Classe dépréciée (utiliser bg-gradient-* à la place)\n"
      ((count_warnings++))
    fi
  done < "$file"
done < <(find . -type f -name "*.css" ! -path "*/node_modules/*" ! -path "*/.next/*")

# Résumé
echo -e "${BLUE}══════════════════════════════════════════${NC}"
echo -e "${BLUE}  RÉSUMÉ DE L'AUDIT${NC}"
echo -e "${BLUE}══════════════════════════════════════════${NC}"

if [[ $count_violations -eq 0 && $count_warnings -eq 0 ]]; then
  echo -e "${GREEN}✅ SUCCÈS : Aucune violation détectée !${NC}"
  echo -e "${GREEN}   Le Design System 'Céleste Poudré' est respecté.${NC}\n"
  exit 0
else
  echo -e "${RED}📊 Violations critiques : $count_violations${NC}"
  echo -e "${YELLOW}📊 Avertissements : $count_warnings${NC}\n"

  if [[ $count_violations -gt 0 ]]; then
    echo -e "${RED}❌ ÉCHEC : Violations critiques détectées${NC}"
    echo -e "${YELLOW}   Utilisez ./scripts/fix-backgrounds.sh pour corriger automatiquement${NC}\n"
    exit 1
  else
    echo -e "${YELLOW}⚠️  ATTENTION : Avertissements détectés (non bloquant)${NC}\n"
    exit 0
  fi
fi
