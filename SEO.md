# SEO - Optimisation Complète (Pages Statiques + Blog WordPress)

## Résumé

✅ **Metadata unique** sur toutes les pages statiques
✅ **Metadata dynamique** pour articles WordPress
✅ **Metadata dynamique** pour catégories blog
✅ **JSON-LD schemas** : Organization, Person, Service, BlogPosting, FAQPage, CollectionPage
✅ **Sitemap dynamique** : pages statiques + articles WordPress + catégories
✅ **Canonical URLs** sur toutes les pages
✅ **Open Graph** + Twitter Cards
✅ **Build production** : 0 warnings, 0 errors

## Architecture SEO

```
content/
├── seo.ts          → Metadata centralisée pour pages statiques
└── schema.ts       → Générateurs JSON-LD (Service, BlogPosting, FAQ)

app/
├── page.tsx                      → metadata + WebSite + Organization schemas
├── astrologie-toulouse/page.tsx  → metadata + Service schema
├── reiki-toulouse/page.tsx       → metadata + Service schema
├── accompagnement-toulouse/      → metadata + Service schema
├── emilie-perez/page.tsx         → metadata + Person schema
├── contact/page.tsx              → metadata + LocalBusiness schema
├── faq/page.tsx                  → metadata + FAQPage schema
├── blog/page.tsx                 → metadata statique
├── blog/[slug]/page.tsx          → generateMetadata() dynamique + BlogPosting schema
├── category/blog/[categorySlug]/ → generateMetadata() dynamique + CollectionPage schema
├── sitemap.ts                    → Génération dynamique (statique + WordPress)
└── robots.ts                     → Configuration robots.txt
```

## Pages Statiques - Metadata

### Fichier central : `content/seo.ts`

Toutes les pages statiques utilisent `generateMetadata(page)` :

```typescript
export const metadata: Metadata = genMeta('astrologie');
```

**Champs inclus pour chaque page** :
- Title unique (< 60 caractères)
- Description unique (< 160 caractères)
- Canonical URL
- Keywords (pages principales uniquement)
- Open Graph (type, url, title, description, images)
- Twitter Cards (card, title, description, images)
- Robots (index/noindex selon la page)

**Pages avec metadata complète** :
- ✅ Homepage (`home`)
- ✅ Astrologie (`astrologie`)
- ✅ Reiki (`reiki`)
- ✅ Accompagnement (`accompagnement`)
- ✅ Thérapie Énergétique (`therapieEnergetique`)
- ✅ Mon Approche (`approche`)
- ✅ Émilie Perez (`emilie`)
- ✅ Contact (`contact`)
- ✅ Blog (`blog`)
- ✅ FAQ (`faq`)
- ✅ Mentions Légales (`mentionsLegales` - noindex)
- ✅ Confidentialité (`confidentialite` - noindex)
- ✅ CGU (`cgu` - noindex)

## Blog WordPress - Metadata Dynamique

### Articles de blog : `app/blog/[slug]/page.tsx`

**Metadata dynamique générée depuis l'API WordPress** :

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = await params;

  // Fetch depuis WordPress API
  const post = await fetch(`${WP_API_URL}/posts?slug=${slug}&_embed`);

  return {
    title: `${stripHtml(post.title)} | Lylusio`,
    description: stripHtml(post.excerpt).substring(0, 160),
    alternates: { canonical: `https://lylusio.fr/${slug}/` },
    openGraph: {
      type: 'article',
      url: `https://lylusio.fr/${slug}/`,
      title: stripHtml(post.title),
      description: stripHtml(post.excerpt),
      images: [post.featured_media.source_url],
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: [post.author.name],
    },
    twitter: { ... }
  };
}
```

**JSON-LD BlogPosting Schema** :

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Titre de l'article",
  "description": "Extrait de l'article",
  "url": "https://lylusio.fr/article-slug/",
  "image": "https://lylusio.fr/wp-content/.../featured-image.jpg",
  "datePublished": "2025-01-15T10:00:00Z",
  "dateModified": "2025-01-20T14:30:00Z",
  "author": {
    "@type": "Person",
    "name": "Émilie Perez"
  },
  "publisher": { Organization },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://lylusio.fr/article-slug/"
  }
}
```

### Catégories blog : `app/category/blog/[categorySlug]/page.tsx`

**Metadata dynamique générée depuis l'API WordPress** :

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const { categorySlug } = await params;

  // Fetch depuis WordPress API
  const category = await fetch(`${WP_API_URL}/categories?slug=${categorySlug}`);

  return {
    title: `${category.name} - Blog | Lylusio`,
    description: stripHtml(category.description),
    alternates: { canonical: `https://lylusio.fr/category/blog/${categorySlug}/` },
    openGraph: { ... },
    twitter: { ... }
  };
}
```

**JSON-LD CollectionPage Schema** :

```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Astrologie - Blog Lylusio",
  "description": "Tous nos articles sur l'astrologie",
  "url": "https://lylusio.fr/category/blog/astrologie/",
  "isPartOf": {
    "@type": "Blog",
    "name": "Blog Lylusio",
    "url": "https://lylusio.fr/blog"
  }
}
```

## JSON-LD Schemas - Vue d'ensemble

### Homepage (`app/page.tsx`)
- **WebSite** schema (search action)
- **Organization** schema (LocalBusiness)

### Services
- **Service** schema :
  - Astrologie Toulouse
  - Reiki Toulouse
  - Accompagnement Holistique

### À propos
- **Person** schema (Émilie Perez)

### Contact
- **LocalBusiness** schema (adresse, horaires, téléphone)

### FAQ
- **FAQPage** schema (4 catégories, 14 questions/réponses)

### Blog (articles)
- **BlogPosting** schema (dynamique, un par article)

### Blog (catégories)
- **CollectionPage** schema (dynamique, une par catégorie)

## Sitemap Dynamique - `app/sitemap.ts`

Le sitemap est **généré dynamiquement** au build et se revalide toutes les heures.

### Structure du sitemap :

1. **Pages statiques** (13 pages)
   - Priority 1.0 : Homepage
   - Priority 0.9 : Services principaux (astrologie, reiki, accompagnement)
   - Priority 0.8 : Pages secondaires (blog, contact, thérapie)
   - Priority 0.7 : À propos
   - Priority 0.6 : FAQ
   - Priority 0.3 : Mentions légales, confidentialité, CGU

2. **Articles WordPress** (fetch dynamique)
   - Priority 0.7
   - lastModified : date de modification WordPress
   - changeFrequency : monthly
   - URL : `https://lylusio.fr/{slug}/`

3. **Catégories WordPress** (fetch dynamique)
   - Priority 0.6
   - changeFrequency : weekly
   - URL : `https://lylusio.fr/category/blog/{categorySlug}/`
   - Filtrées : uniquement les catégories avec articles (count > 0)

### Exemple de fetch :

```typescript
// Fetch articles WordPress
const posts = await fetch(`${WP_API_URL}/posts?per_page=100&_fields=slug,modified`);

// Fetch catégories WordPress
const categories = await fetch(`${WP_API_URL}/categories?per_page=100&_fields=slug,count`);
```

**Total URLs dans le sitemap** : ~13 (statiques) + X (articles) + 3 (catégories)

## Open Graph & Twitter Cards

**Toutes les pages** incluent :

### Open Graph
```html
<meta property="og:type" content="website" /> <!-- ou "article" pour blog -->
<meta property="og:locale" content="fr_FR" />
<meta property="og:url" content="..." />
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:site_name" content="Lylusio" />
<meta property="og:image" content="..." />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
```

### Twitter Cards
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="..." />
```

**Pour les articles WordPress** :
- Image OG : Featured image WordPress (`_embedded['wp:featuredmedia']`)
- Dimensions : largeur/hauteur depuis `media_details`
- Fallback : `/assets/logo-lylusio.webp` si pas d'image

## Canonical URLs

**Toutes les pages** incluent une balise canonical :

```typescript
alternates: {
  canonical: 'https://lylusio.fr/page-slug/'
}
```

**Générée dynamiquement** :
- Articles blog : `https://lylusio.fr/{slug}/`
- Catégories : `https://lylusio.fr/category/blog/{categorySlug}/`
- Pages statiques : définies dans `content/seo.ts`

## Robots.txt - `app/robots.ts`

```
User-Agent: *
Allow: /

Sitemap: https://lylusio.fr/sitemap.xml
```

## Variables d'environnement - `.env`

```bash
NEXT_PUBLIC_WP_API_URL=https://lylusio.fr/wp-json/wp/v2
NEXT_PUBLIC_SITE_URL=https://lylusio.fr
```

**Utilisé dans** :
- `app/sitemap.ts`
- `app/blog/[slug]/page.tsx`
- `app/category/blog/[categorySlug]/page.tsx`
- Tous les composants qui fetchent l'API WordPress

## Utilitaires

### stripHtml (server-safe)

Utilisé dans les pages dynamiques pour nettoyer le HTML WordPress :

```typescript
const stripHtml = (html: string): string => {
  return html
    .replace(/<[^>]*>/g, '')        // Remove HTML tags
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
};
```

**Pourquoi ?** `DOMParser` n'existe pas côté serveur. Cette version utilise uniquement des regex.

## Checklist de validation

### Pages statiques
- [x] Metadata unique (title, description, canonical)
- [x] Open Graph + Twitter Cards
- [x] JSON-LD schemas appropriés
- [x] Robots configuré (index/noindex)

### Blog dynamique
- [x] generateMetadata() pour articles
- [x] generateMetadata() pour catégories
- [x] BlogPosting schema pour articles
- [x] CollectionPage schema pour catégories
- [x] Images featured depuis WordPress API
- [x] Author name depuis WordPress API
- [x] Dates published/modified depuis WordPress API

### Sitemap
- [x] Pages statiques avec priorités
- [x] Articles WordPress (fetch dynamique)
- [x] Catégories WordPress (fetch dynamique)
- [x] Revalidation 1h (ISR)

### Build
- [x] npm run build : 0 warnings
- [x] npm run build : 0 errors
- [x] Sitemap.xml généré (revalidate 1h)
- [x] Robots.txt généré

## Métriques attendues

| Métrique | Avant | Après | Objectif |
|----------|-------|-------|----------|
| **SEO Lighthouse** | 85-90 | 95-100 | 100 |
| **Meta descriptions uniques** | Partiel | 100% | 100% |
| **Canonical URLs** | Partiel | 100% | 100% |
| **JSON-LD Schemas** | Basique | Complet | 100% |
| **Sitemap coverage** | Statique | Dynamique | 100% |
| **Blog SEO** | Absent | Dynamique | 100% |

## Test SEO

### Vérifier les metadata

```bash
# Homepage
curl -s https://lylusio.fr | grep -E '<title>|<meta name="description"|<link rel="canonical"'

# Article blog (exemple)
curl -s https://lylusio.fr/article-slug/ | grep -E '<title>|<meta name="description"|<link rel="canonical"'
```

### Vérifier le sitemap

```bash
curl https://lylusio.fr/sitemap.xml
```

**Devrait contenir** :
- 13+ URLs statiques
- X URLs d'articles WordPress
- 3 URLs de catégories WordPress

### Vérifier JSON-LD

Ouvrir n'importe quelle page et chercher :

```html
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "..."
  }
</script>
```

### Test Google Rich Results

1. Aller sur : https://search.google.com/test/rich-results
2. Tester une URL (homepage, article, FAQ)
3. Vérifier que les schemas sont détectés

### Test Open Graph

1. Aller sur : https://www.opengraph.xyz/
2. Tester une URL
3. Vérifier l'aperçu Facebook/Twitter

## Commandes utiles

```bash
# Build production
npm run build

# Vérifier le sitemap généré
curl http://localhost:3000/sitemap.xml

# Vérifier robots.txt
curl http://localhost:3000/robots.txt

# Test Lighthouse
npx lighthouse https://lylusio.fr --view

# Test Google Search Console
# → Submit sitemap.xml
# → Request indexing pour nouvelles pages
```

## Prochaines étapes

1. **Google Search Console** :
   - Soumettre le sitemap : `https://lylusio.fr/sitemap.xml`
   - Vérifier l'indexation des articles WordPress
   - Surveiller les erreurs de couverture

2. **Google Analytics** :
   - Vérifier que GA_ID est configuré dans `.env`
   - Tester le tracking sur les articles dynamiques

3. **Performance** :
   - Tester avec Lighthouse
   - Objectif : Performance 95-100, SEO 100

4. **Accessibilité** :
   - Vérifier les alt text des images (déjà fait dans IMAGES-OPTIMIZATION.md)
   - Tester avec WAVE ou axe DevTools

## Résultat final

✅ **Pages statiques** : Metadata unique, canonical, OG, JSON-LD
✅ **Articles WordPress** : Metadata dynamique, BlogPosting schema
✅ **Catégories WordPress** : Metadata dynamique, CollectionPage schema
✅ **Sitemap** : Dynamique (statique + WordPress)
✅ **Build** : 0 warnings, 0 errors
✅ **Cache** : Revalidation 1h (ISR)

**SEO — BÉTON ! 🚀**
