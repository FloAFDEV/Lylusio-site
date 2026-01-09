# 🚀 Migration Next.js - WordPress Headless + Edge Functions

## Résumé des modifications

Ce projet Next.js a été refactorisé pour optimiser les performances, la sécurité et le SEO en utilisant :

1. **Edge Functions Next.js** pour proxy des images WordPress
2. **API Routes sécurisées** avec rate limiting pour tous les appels WordPress
3. **Google Analytics GA4** avec le bon ID de mesure
4. **Content Security Policy (CSP)** complet et à jour

---

## 📦 Nouveaux fichiers ajoutés

### 1. Edge Function pour images WordPress

**Fichier** : `app/api/wp-image/route.ts`

- **Runtime** : Edge (CDN worldwide)
- **Rate limiting** : 100 req/min par IP
- **Timeout** : 10 secondes
- **Cache** : 1 an (immutable)
- **Formats supportés** : Tous formats images (Next.js convertit en WebP/AVIF)

**Usage** :
```
GET /api/wp-image?url=/wp-content/uploads/2024/01/image.jpg
```

### 2. Helpers pour transformation d'images

**Fichier** : `lib/wordpress-images.ts`

Fonctions disponibles :

- `getOptimizedImageUrl(wpImageUrl)` : Transforme une URL WordPress en URL optimisée
- `getFeaturedImageUrl(post, size)` : Extrait l'image featured d'un post
- `getFeaturedImageAlt(post)` : Extrait l'alt text
- `getFeaturedImageDimensions(post, size)` : Extrait les dimensions
- `transformContentImages(htmlContent)` : Transforme toutes les images dans un HTML
- `isWordPressImage(imageUrl)` : Vérifie si c'est une image WordPress

### 3. Composants React optimisés

**Fichier** : `components/WordPressImage.tsx`

Composants disponibles :

- `<WordPressImage>` : Composant Image de base
- `<FeaturedImage>` : Composant spécialisé pour featured images
- `useImageFallback()` : Hook pour gérer les erreurs

**Exemple d'utilisation** :
```tsx
import { FeaturedImage } from "@/components/WordPressImage";

<FeaturedImage
	post={post}
	size="large"
	fill
	sizes="(max-width: 768px) 100vw, 50vw"
	priority
/>
```

---

## ⚙️ Fichiers modifiés

### Configuration

1. **`.env`** :
   - ✅ `NEXT_PUBLIC_GA_ID=G-0895ZEQQY4` (ID de mesure GA4)
   - ✅ `NEXT_PUBLIC_WP_API_URL=https://admin.lylusio.fr/wp-json/wp/v2`

2. **`.env.example`** :
   - ✅ Commentaires ajoutés pour clarifier les variables
   - ✅ URL WordPress mise à jour

3. **`next.config.ts`** :
   - ✅ CSP mis à jour pour GA4 (`region1.google-analytics.com`)
   - ✅ CSP mis à jour pour WordPress (`admin.lylusio.fr`)
   - ✅ Remote patterns pour `/api/wp-image`
   - ✅ Configuration images optimisée

4. **`hooks/useAnalytics.ts`** :
   - ✅ ID GA4 configuré : `G-0895ZEQQY4`
   - ✅ Utilise `process.env.NEXT_PUBLIC_GA_ID`

---

## 🔄 Fonctionnement de l'Edge Function

### Architecture

```
Client Next.js
    ↓
    ↓ Request: /api/wp-image?url=/wp-content/uploads/...
    ↓
Edge Function (Vercel Edge Network)
    ↓
    ↓ Fetch: https://admin.lylusio.fr/wp-content/uploads/...
    ↓
WordPress (admin.lylusio.fr)
    ↓
    ↓ Return: Image originale (JPEG/PNG)
    ↓
Edge Function
    ↓
    ↓ Response: Image brute
    ↓
Next.js Image Optimizer
    ↓
    ↓ Convert: WebP/AVIF + Resize
    ↓
Client (Image optimisée + lazy-load)
```

### Avantages

1. **Performance** :
   - Conversion automatique WebP/AVIF
   - Resize selon device (responsive)
   - Lazy-load natif
   - Cache CDN 1 an

2. **Sécurité** :
   - Rate limiting 100 req/min
   - Validation des URLs
   - Protection path traversal
   - Timeout 10s

3. **Fiabilité** :
   - Fallback automatique en cas d'erreur
   - Logs détaillés
   - Headers cache appropriés

---

## 🎯 Plan d'action pour finaliser la migration

### Étape 1 : Corriger les composants existants

**Fichiers prioritaires à corriger** (voir `MIGRATION_GUIDE.md` pour détails) :

1. `src/page-components/BlogPost.tsx`
   - [ ] Corriger `processContent()` ligne 145
   - [ ] Corriger fetch ligne 254
   - [ ] Corriger `FeaturedImage` composant
   - [ ] Corriger related posts fetch ligne 308

2. `src/page-components/Blog.tsx`
   - [ ] Remplacer fetch direct par API interne
   - [ ] Transformer URLs images

3. `src/page-components/BlogCategory.tsx`
   - [ ] Remplacer fetch direct par API interne
   - [ ] Transformer URLs images

4. `components/sections/RecentArticlesSection.tsx`
   - [ ] Remplacer fetch direct par API interne
   - [ ] Transformer URLs images

5. `app/blog/page.tsx`
   - [ ] Vérifier métadonnées
   - [ ] Vérifier fetch

6. `app/blog/[slug]/page.tsx`
   - [ ] Corriger generateMetadata
   - [ ] Corriger generateStaticParams

### Étape 2 : Tests

```bash
# Installation des dépendances
npm install

# Build de production
npm run build

# Test en local
npm run start

# Vérifier les routes
ls -la .next/server/app/api
```

### Étape 3 : Vérifications

- [ ] Toutes les images WordPress passent par `/api/wp-image`
- [ ] Google Analytics fonctionne (vérifier dans GA4 console)
- [ ] CSP n'a pas d'erreurs (vérifier console navigateur)
- [ ] Images sont optimisées (vérifier Network tab : format WebP/AVIF)
- [ ] Lazy-load fonctionne
- [ ] Performance : Lighthouse score > 90

---

## 🐛 Debugging

### Vérifier l'Edge Function

```bash
# Test direct de l'Edge Function
curl "https://lylusio.fr/api/wp-image?url=/wp-content/uploads/2024/01/test.jpg" -I
```

**Résultat attendu** :
```
HTTP/2 200
content-type: image/jpeg
cache-control: public, max-age=31536000, immutable
x-ratelimit-limit: 100
x-ratelimit-remaining: 99
```

### Vérifier Google Analytics

1. Ouvrir la console : `F12` → Console
2. Vérifier : `window.gtag` doit être défini
3. Vérifier : `window.dataLayer` doit contenir des events

### Vérifier CSP

1. Ouvrir la console : `F12` → Console
2. Chercher erreurs CSP : `Content-Security-Policy`
3. Si erreurs : ajouter le domaine manquant dans `next.config.ts`

---

## 📈 Métriques de performance attendues

### Avant migration

- Images JPEG/PNG lourdes (500KB - 2MB)
- Pas de lazy-load
- Fetch direct WordPress (latence)
- Cache court

### Après migration

- Images WebP/AVIF légères (50KB - 200KB)
- Lazy-load natif Next.js
- Edge Functions (latence CDN)
- Cache 1 an

**Gain estimé** : 60-70% de réduction de poids, 40% de latence en moins

---

## 🔐 Sécurité

### Rate Limiting

Toutes les API routes ont du rate limiting :

- `/api/posts` : 30 req/min par IP
- `/api/posts/[slug]` : 60 req/min par IP
- `/api/categories` : 30 req/min par IP
- `/api/wp-image` : 100 req/min par IP

### CSP Complet

Content Security Policy configure :

- `script-src` : Google Analytics, Calendly
- `connect-src` : WordPress API, GA4
- `img-src` : Toutes sources HTTPS
- `frame-src` : YouTube, Calendly

---

## 📚 Documentation technique

### Variables d'environnement

| Variable | Description | Valeur |
|----------|-------------|--------|
| `NEXT_PUBLIC_WP_API_URL` | URL API WordPress | `https://admin.lylusio.fr/wp-json/wp/v2` |
| `NEXT_PUBLIC_GA_ID` | ID Google Analytics GA4 | `G-0895ZEQQY4` |
| `NEXT_PUBLIC_SITE_URL` | URL publique du site | `https://lylusio.fr` |

### Endpoints API internes

| Endpoint | Method | Params | Description |
|----------|--------|--------|-------------|
| `/api/posts` | GET | `per_page`, `page`, `categories`, `_embed` | Liste des posts |
| `/api/posts/[slug]` | GET | - | Post par slug |
| `/api/categories` | GET | - | Liste catégories |
| `/api/wp-image` | GET | `url` | Proxy image WordPress |

---

## ✅ Checklist finale

### Avant déploiement

- [ ] Tous les fichiers du `MIGRATION_GUIDE.md` sont corrigés
- [ ] Build réussit sans erreurs : `npm run build`
- [ ] Tests en local OK : `npm run start`
- [ ] Google Analytics fonctionne
- [ ] Images optimisées (WebP/AVIF)
- [ ] Pas d'erreurs CSP dans console
- [ ] Rate limiting testé

### Après déploiement

- [ ] Vérifier Google Analytics Real-Time
- [ ] Vérifier images s'affichent correctement
- [ ] Vérifier performance Lighthouse
- [ ] Monitorer logs Vercel pour erreurs
- [ ] Tester quelques URLs d'articles
- [ ] Vérifier cache CDN (headers)

---

## 🆘 Support

Si problème :

1. Vérifier logs Vercel : Dashboard → Functions → Logs
2. Vérifier console navigateur : F12 → Console
3. Tester l'Edge Function directement : `/api/wp-image?url=...`
4. Vérifier variables d'environnement Vercel : Dashboard → Settings → Environment Variables

---

## 📌 Notes importantes

- **Ne pas déployer en production sans tests**
- **Vérifier que WordPress `admin.lylusio.fr` est accessible**
- **Monitorer les erreurs 404 images après déploiement**
- **Prévoir rollback si problème critique**

---

**Date** : 2026-01-09
**Version** : 1.0.0
**Statut** : Prêt pour finalisation
