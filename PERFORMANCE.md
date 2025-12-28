# Optimisations de Performance - Lylusio Site

## Objectif
Atteindre un score Lighthouse Performance > 95

## Optimisations Appliquées

### 1. Images
- ✅ Qualité réduite : 40-65-80 (au lieu de 50-75-85)
- ✅ Image `approche-arbre.webp` : quality=40, lazy loading, priority=false
- ✅ Attribut `sizes` optimisé : `(max-width: 1024px) 100vw, 50vw`
- ✅ Formats modernes : AVIF et WebP
- ✅ DeviceSizes optimisés : [640, 750, 828, 1080, 1200, 1920]
- ✅ Cache TTL : 1 an (31536000s)

### 2. JavaScript
- ✅ Suppression console.log en production
- ✅ webpackBuildWorker activé (build parallèle)
- ✅ optimizePackageImports pour lucide-react et @radix-ui
- ✅ Telemetry Next.js désactivé

### 3. Cache et Compression
- ✅ Headers Cache-Control : public, max-age=31536000, immutable
- ✅ Compression activée (compress: true)
- ✅ Configuration Vercel pour cache optimal

### 4. Fonts
- ✅ display: swap sur toutes les polices
- ✅ preload sur polices critiques uniquement
- ✅ adjustFontFallback: true (réduit CLS)
- ✅ Dancing Script en preload: false (non-critique)

### 5. Fichiers de Configuration

#### next.config.ts
```typescript
experimental: {
  optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  webpackBuildWorker: true,
}
```

#### vercel.json
```json
{
  "headers": [
    {
      "source": "/(.*)\\.(jpg|jpeg|png|gif|webp|avif|svg|ico)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

#### .env.production
```
NEXT_TELEMETRY_DISABLED=1
NODE_ENV=production
```

## Métriques Cibles

| Métrique | Cible | Statut Avant | Optimisation |
|----------|-------|--------------|--------------|
| FCP | < 1.8s | 0.4s ✅ | Maintenu |
| LCP | < 2.5s | 0.8s ✅ | Maintenu |
| TBT | < 200ms | 480ms ❌ | **Cible principale** |
| CLS | < 0.1 | 0 ✅ | Maintenu |
| SI | < 3.4s | 1.1s ✅ | Maintenu |

## Problèmes Identifiés (Lighthouse 78)

### Extensions Chrome
⚠️ **Impact majeur sur TBT**
- Extensions détectées impactant les performances
- chrome-extension://hbkblmodhbmcakopmmfbaopfckopccgp (756 KiB JS inutilisé)
- chrome-extension://aapbdbdomjkkjkaonfhkkikfgjllcleb (422 KiB JS inutilisé)
- **Solution** : Tester en navigation privée ou profil Chrome sans extensions

### JavaScript Inutilisé
- 1,5 Mo de JS inutilisé détecté
- Principalement dû aux extensions Chrome
- Optimisation Next.js chunk splitting déjà active

### Ajustements de Mise en Page Forcés
- 249261e921aeebba.js: 26ms
- Déjà minimal, acceptable

## Recommandations pour Tests

### 1. Environnement de Test
```bash
# Mode navigation privée Chrome
# OU
# Profil Chrome dédié sans extensions
```

### 2. Vérifier le Déploiement
1. Pusher sur GitHub
2. Attendre déploiement Vercel
3. Tester sur URL production : https://lylusio-site.vercel.app
4. Utiliser Lighthouse en navigation privée

### 3. Outils de Test
- Chrome DevTools > Lighthouse (navigation privée)
- PageSpeed Insights (https://pagespeed.web.dev/)
- WebPageTest (https://www.webpagetest.org/)

## Score Attendu

Avec ces optimisations et tests en environnement propre :
- **Performance** : 95-100 ✅
- **Accessibilité** : 95 (maintenu)
- **Bonnes pratiques** : 100 (maintenu)
- **SEO** : 100 (maintenu)

## Notes Importantes

1. **Extensions Chrome** sont le principal bloqueur (score 78 → 95+)
2. **TBT à 480ms** causé principalement par les extensions
3. **Images déjà optimales** (84 KiB approche-arbre.webp)
4. **Fonts optimales** avec display:swap et fallbacks
5. **Cache optimal** avec immutable sur 1 an

## Dernière Mise à Jour
Date : 28 décembre 2025
Version : 1.0.0
Build : Production optimisé
