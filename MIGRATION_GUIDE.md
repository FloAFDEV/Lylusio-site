# Guide de Migration - Images WordPress & URLs

## Résumé des changements

Ce guide explique comment migrer tous les composants du projet pour utiliser :
1. **Images WordPress via Edge Function** pour l'optimisation Next.js (WebP, AVIF, resize, lazy-load)
2. **URLs WordPress correctes** (`admin.lylusio.fr` au lieu de `lylusio.fr`)
3. **Google Analytics GA4** avec le bon ID de mesure

---

## ✅ Fichiers déjà corrigés

### 1. Configuration

- **`.env`** : Variable `NEXT_PUBLIC_GA_ID=G-0895ZEQQY4` ajoutée
- **`.env.example`** : Mis à jour avec `admin.lylusio.fr` et commentaires
- **`next.config.ts`** :
  - CSP mis à jour pour GA4 (region1.google-analytics.com)
  - CSP mis à jour pour WordPress (admin.lylusio.fr)
  - Remote patterns mis à jour pour Edge Function `/api/wp-image`
- **`hooks/useAnalytics.ts`** : ID GA4 configuré avec `G-0895ZEQQY4`
- **`lib/wordpress.ts`** : Déjà configuré avec `admin.lylusio.fr`

### 2. Nouveaux fichiers créés

- **`app/api/wp-image/route.ts`** : Edge Function pour proxy images WordPress
- **`lib/wordpress-images.ts`** : Helpers pour transformer URLs images
- **`components/WordPressImage.tsx`** : Composants React optimisés

---

## 📝 Fichiers à corriger

### **IMPORTANT : Utilisation des nouveaux helpers**

Importer les helpers en début de fichier :

```typescript
import {
	getOptimizedImageUrl,
	getFeaturedImageUrl,
	getFeaturedImageAlt,
	getFeaturedImageDimensions,
} from "@/lib/wordpress-images";

// OU utiliser les composants tout prêts :
import { WordPressImage, FeaturedImage } from "@/components/WordPressImage";
```

---

### Fichier 1 : `src/page-components/BlogPost.tsx`

#### Problèmes identifiés :

1. **Ligne 145** : Remplace les URLs d'images dans le contenu HTML
```typescript
// ❌ AVANT
processed = processed.replace(
	/src="\/wp-content/g,
	'src="https://lylusio.fr/wp-content'
);

// ✅ APRÈS
import { transformContentImages } from "@/lib/wordpress-images";

// Dans processContent :
processed = transformContentImages(processed);
```

2. **Ligne 254** : Fetch direct vers WordPress
```typescript
// ❌ AVANT
const response = await fetch(
	WP_API_URL + "/posts?slug=" + slug + "&_embed"
);

// ✅ APRÈS
// Utiliser l'API interne (Edge Function)
const response = await fetch(
	`/api/posts/${slug}`
);
```

3. **Ligne 207-237** : Composant FeaturedImage
```typescript
// ❌ AVANT
const FeaturedImage = ({ src, alt }: { src: string; alt: string }) => {
	// ... utilise directement src
	<Image src={src} alt={alt} fill ... />
};

// ✅ APRÈS
import { getOptimizedImageUrl } from "@/lib/wordpress-images";

const FeaturedImage = ({ src, alt }: { src: string; alt: string }) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const optimizedSrc = getOptimizedImageUrl(src);

	return (
		<figure className="relative mb-10">
			{!isLoaded && (
				<div className="w-full h-[300px] sm:h-[400px] lg:h-[450px] rounded-2xl shimmer-loading" />
			)}
			<div className="relative w-full aspect-[16/9] max-h-[500px]">
				<Image
					src={optimizedSrc}
					alt={alt}
					fill
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
					className={
						"object-cover rounded-2xl shadow-elegant transition-opacity duration-500 " +
						(isLoaded ? "opacity-100" : "opacity-0")
					}
					priority
					quality={90}
					onLoad={() => setIsLoaded(true)}
				/>
			</div>
			<GoldenPlantBadge
				size="md"
				className="absolute -bottom-3 -right-3"
				aria-hidden="true"
			/>
		</figure>
	);
};
```

4. **Lignes 308-342** : Related posts fetch et images
```typescript
// ❌ AVANT
const res = await fetch(
	WP_API_URL +
		"/posts?categories=" +
		wpPost.categories[0] +
		"&exclude=" +
		wpPost.id +
		"&per_page=3&_embed"
);

// ✅ APRÈS
import { getOptimizedImageUrl } from "@/lib/wordpress-images";

// Utiliser l'API interne
const res = await fetch(
	`/api/posts?categories=${wpPost.categories[0]}&exclude=${wpPost.id}&per_page=3&_embed=1`
);

// Transformer les URLs d'images dans setRelatedPosts
setRelatedPosts(
	related.map((rp) => ({
		id: rp.id,
		slug: rp.slug,
		title: utils.stripHtml(rp.title.rendered),
		image: getOptimizedImageUrl(
			rp._embedded?.["wp:featuredmedia"]?.[0]?.source_url
		),
		date: utils.formatDate(rp.date),
		excerpt:
			utils.stripHtml(rp.excerpt.rendered).slice(0, 100) + "...",
	}))
);
```

5. **Ligne 732-740** : LazyImage dans related posts
```typescript
// ✅ LazyImage est OK, mais s'assurer que rp.image est déjà transformé (voir point 4)
<LazyImage
	src={rp.image} // Déjà transformé par getOptimizedImageUrl
	alt={rp.title}
	className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
	placeholderClassName="w-full h-full shimmer-loading"
	width={400}
	height={250}
/>
```

---

### Fichier 2 : `src/page-components/Blog.tsx`

#### Actions requises :

1. **Remplacer les fetch directs par l'API interne**
```typescript
// ❌ AVANT
const response = await fetch(
	`${WP_API_URL}/posts?per_page=12&page=${page}&_embed`
);

// ✅ APRÈS
const response = await fetch(
	`/api/posts?per_page=12&page=${page}&_embed=1`
);
```

2. **Transformer toutes les URLs d'images**
```typescript
import { getOptimizedImageUrl } from "@/lib/wordpress-images";

// Lors de la transformation des posts
posts.map((post) => ({
	// ... autres props
	image: getOptimizedImageUrl(
		post._embedded?.["wp:featuredmedia"]?.[0]?.source_url
	),
}))
```

---

### Fichier 3 : `src/page-components/BlogCategory.tsx`

#### Actions requises :

Identiques au fichier Blog.tsx :

1. Remplacer fetch WordPress direct par `/api/posts?categories=...`
2. Transformer les URLs d'images avec `getOptimizedImageUrl()`

---

### Fichier 4 : `components/sections/RecentArticlesSection.tsx`

#### Actions requises :

1. **Remplacer fetch WordPress**
```typescript
// ❌ AVANT
const response = await fetch(
	`${WP_API_URL}/posts?per_page=3&_embed`
);

// ✅ APRÈS
const response = await fetch(
	`/api/posts?per_page=3&_embed=1`
);
```

2. **Transformer les URLs d'images**
```typescript
import { getOptimizedImageUrl } from "@/lib/wordpress-images";

articles.map((post) => ({
	// ... autres props
	image: getOptimizedImageUrl(
		post._embedded?.["wp:featuredmedia"]?.[0]?.source_url
	),
}))
```

---

### Fichier 5 : `app/blog/page.tsx`

Vérifier la génération des métadonnées et s'assurer que les fetch utilisent l'API interne.

---

### Fichier 6 : `app/blog/[slug]/page.tsx`

#### Actions requises :

1. **generateMetadata** : Transformer l'URL de l'image OG
```typescript
// ❌ AVANT
images: [
	{
		url: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
	},
],

// ✅ APRÈS
import { getOptimizedImageUrl } from "@/lib/wordpress-images";

images: [
	{
		url: getOptimizedImageUrl(
			post._embedded?.['wp:featuredmedia']?.[0]?.source_url
		),
	},
],
```

2. **generateStaticParams** : Utiliser l'API interne
```typescript
// ❌ AVANT
const response = await fetch(`${WP_API_URL}/posts?per_page=100`);

// ✅ APRÈS
const response = await fetch(`/api/posts?per_page=100`);
```

---

## 🔧 Pattern de remplacement global

### Pour tous les fichiers TypeScript/React :

1. **Ajouter l'import en début de fichier** :
```typescript
import { getOptimizedImageUrl } from "@/lib/wordpress-images";
```

2. **Remplacer tous les fetch WordPress directs** :
```typescript
// ❌ Pattern à rechercher
WP_API_URL + "/posts

// ✅ Remplacer par
/api/posts
```

3. **Transformer toutes les URLs d'images featured** :
```typescript
// ❌ Pattern à rechercher
post._embedded?.["wp:featuredmedia"]?.[0]?.source_url

// ✅ Wrapper avec
getOptimizedImageUrl(
	post._embedded?.["wp:featuredmedia"]?.[0]?.source_url
)
```

4. **Pour les images dans le contenu HTML** :
```typescript
// Utiliser le helper
import { transformContentImages } from "@/lib/wordpress-images";

const processedContent = transformContentImages(rawHtmlContent);
```

---

## 🎯 Composant WordPress Image

### Utilisation recommandée

Au lieu de modifier manuellement tous les composants, **utiliser les nouveaux composants WordPress** :

```typescript
import { WordPressImage, FeaturedImage } from "@/components/WordPressImage";

// Pour une image WordPress quelconque
<WordPressImage
	src="https://admin.lylusio.fr/wp-content/uploads/2024/01/image.jpg"
	alt="Description"
	width={800}
	height={600}
	quality={85}
/>

// Pour une featured image de post
<FeaturedImage
	post={post}
	size="large"
	fill
	sizes="(max-width: 768px) 100vw, 50vw"
	priority
/>
```

---

## 🚀 Vérification finale

### Checklist avant déploiement :

- [ ] Toutes les images WordPress passent par `/api/wp-image`
- [ ] Tous les fetch WordPress utilisent `/api/posts` ou `/api/categories`
- [ ] Google Analytics GA4 configuré avec `G-0895ZEQQY4`
- [ ] CSP autorise `region1.google-analytics.com`
- [ ] Variables d'environnement mises à jour (`.env` et `.env.production`)
- [ ] Tests des images : vérifier que WebP/AVIF fonctionne
- [ ] Tests de build : `npm run build`
- [ ] Tests de performance : vérifier le cache des images (1 an)

### Commandes de test :

```bash
# Build de production
npm run build

# Vérifier les routes générées
ls -la .next/server/app

# Tester en local
npm run start
```

---

## 📊 Bénéfices attendus

### Performance :

1. **Images optimisées automatiquement** :
   - Conversion WebP/AVIF automatique
   - Resize selon device (640px → 1920px)
   - Lazy-load natif Next.js
   - Cache 1 an pour images optimisées

2. **Edge Functions** :
   - Latence réduite (CDN)
   - Rate limiting intégré
   - Timeout 10s max
   - Fallback automatique en cas d'erreur

3. **SEO** :
   - Métadonnées OG avec bonnes URLs
   - Structured Data JSON-LD optimisé
   - Google Analytics GA4 fonctionnel

---

## 🛠 Support

En cas de problème :

1. Vérifier les logs de l'Edge Function : `/api/wp-image`
2. Vérifier les headers CSP dans la console
3. Vérifier que les images WordPress sont accessibles depuis `admin.lylusio.fr`
4. Tester l'Edge Function directement : `https://lylusio.fr/api/wp-image?url=/wp-content/uploads/...`

---

## 📌 Notes importantes

1. **Ne pas supprimer les anciens patterns WordPress** immédiatement
2. **Tester en staging avant production**
3. **Monitorer les erreurs 404 sur les images** après déploiement
4. **Vérifier le cache CDN Vercel** après déploiement

---

**Date de création** : 2026-01-09
**Version** : 1.0.0
**Auteur** : Claude Code Assistant
