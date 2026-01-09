# 🔧 Application Automatique des Corrections

Ce fichier contient toutes les corrections prêtes à appliquer sur votre projet.

---

## ✅ Ce qui est déjà fait

### Nouveaux fichiers créés

✅ **`app/api/wp-image/route.ts`** - Edge Function pour images WordPress
✅ **`lib/wordpress-images.ts`** - Helpers transformation images
✅ **`components/WordPressImage.tsx`** - Composants React optimisés

###  Configuration mise à jour

✅ **`.env`** - GA4 ID configuré
✅ **`.env.example`** - URLs WordPress mises à jour
✅ **`next.config.ts`** - CSP pour GA4 et remote patterns
✅ **`hooks/useAnalytics.ts`** - ID Google Analytics

---

## 📝 Fichier `.env.production` à créer

Créez le fichier `.env.production` avec ce contenu :

```bash
# API WordPress (Production)
NEXT_PUBLIC_WP_API_URL=https://admin.lylusio.fr/wp-json/wp/v2

# Google Analytics GA4
# ID de mesure : G-0895ZEQQY4
# ID de flux : 6111910808
NEXT_PUBLIC_GA_ID=G-0895ZEQQY4

# Site URL (Production)
NEXT_PUBLIC_SITE_URL=https://lylusio.fr

# Node Environment
NODE_ENV=production
```

---

## 🔨 Corrections à appliquer manuellement

### Fichier 1 : `src/page-components/BlogPost.tsx`

#### Étape 1.1 : Modifier les imports (lignes 1-18)

**Remplacer :**
```typescript
import { WP_API_URL } from "@/lib/wordpress";
```

**Par :**
```typescript
import { getOptimizedImageUrl, transformContentImages } from "@/lib/wordpress-images";
```

#### Étape 1.2 : Modifier processContent (ligne 141-148)

**Remplacer :**
```typescript
const processContent = (html: string): string => {
	let processed = html;

	processed = processed.replace(
		/src="\/wp-content/g,
		'src="https://lylusio.fr/wp-content'
	);

	// ... le reste du code
	return processed;
};
```

**Par :**
```typescript
const processContent = (html: string): string => {
	let processed = html;

	// Transformer toutes les images WordPress via Edge Function
	processed = transformContentImages(processed);

	// ... le reste du code (garder tel quel)
	processed = processed.replace(/<span[^>]*>(.*?)<\/span>/gi, "$1");
	processed = processed.replace(/\sstyle="[^"]*"/gi, "");
	// etc...

	return processed;
};
```

#### Étape 1.3 : Modifier FeaturedImage (ligne 207-237)

**Remplacer :**
```typescript
const FeaturedImage = ({ src, alt }: { src: string; alt: string }) => {
	const [isLoaded, setIsLoaded] = useState(false);

	return (
		<figure className="relative mb-10">
			{!isLoaded && (
				<div className="w-full h-[300px] sm:h-[400px] lg:h-[450px] rounded-2xl shimmer-loading" />
			)}
			<div className="relative w-full aspect-[16/9] max-h-[500px]">
				<Image
					src={src}
```

**Par :**
```typescript
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
```

#### Étape 1.4 : Modifier le fetch du post (ligne 253-259)

**Remplacer :**
```typescript
const response = await fetch(
	WP_API_URL + "/posts?slug=" + slug + "&_embed"
);
if (!response.ok) throw new Error("Post not found");
const posts: WPPost[] = await response.json();
if (posts.length === 0) throw new Error("Post not found");
return posts[0];
```

**Par :**
```typescript
const response = await fetch(`/api/posts/${slug}`);
if (!response.ok) throw new Error("Post not found");
const post: WPPost = await response.json();
return post;
```

#### Étape 1.5 : Modifier le fetch des related posts (ligne 310-316)

**Remplacer :**
```typescript
const res = await fetch(
	WP_API_URL +
		"/posts?categories=" +
		wpPost.categories[0] +
		"&exclude=" +
		wpPost.id +
		"&per_page=3&_embed"
);
```

**Par :**
```typescript
const res = await fetch(
	`/api/posts?categories=${wpPost.categories[0]}&per_page=3&_embed=1`
);
```

#### Étape 1.6 : Modifier setRelatedPosts (ligne 343-356)

**Remplacer :**
```typescript
setRelatedPosts(
	related.map((rp) => ({
		id: rp.id,
		slug: rp.slug,
		title: utils.stripHtml(rp.title.rendered),
		image:
			rp._embedded?.["wp:featuredmedia"]?.[0]
				?.source_url || "/placeholder.svg",
		date: utils.formatDate(rp.date),
		excerpt:
			utils.stripHtml(rp.excerpt.rendered).slice(0, 100) +
			"...",
	}))
);
```

**Par :**
```typescript
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
			utils.stripHtml(rp.excerpt.rendered).slice(0, 100) +
			"...",
	}))
);
```

---

### Fichier 2 : `src/page-components/Blog.tsx`

Lisez ce fichier et appliquez les mêmes modifications :

1. **Ajouter import** :
   ```typescript
   import { getOptimizedImageUrl } from "@/lib/wordpress-images";
   ```

2. **Remplacer tous les fetch** `WP_API_URL + "/posts` par `/api/posts`

3. **Wrapper toutes les images** :
   ```typescript
   image: getOptimizedImageUrl(
       post._embedded?.["wp:featuredmedia"]?.[0]?.source_url
   )
   ```

---

### Fichier 3 : `src/page-components/BlogCategory.tsx`

Mêmes modifications que Blog.tsx :

1. Import `getOptimizedImageUrl`
2. Fetch `/api/posts?categories=...`
3. Wrapper images avec `getOptimizedImageUrl()`

---

### Fichier 4 : `components/sections/RecentArticlesSection.tsx`

<function_calls>
<invoke name="Read">
<parameter name="file_path">/Users/florentperez/.claude-worktrees/Lylusio/magical-rubin/components/sections/RecentArticlesSection.tsx