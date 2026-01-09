# 📝 Exemples de Code Corrigé

Ce document contient des exemples concrets de code **AVANT** et **APRÈS** correction pour faciliter la migration.

---

## Exemple 1 : Composant BlogPost - FeaturedImage

### ❌ AVANT (ligne 207-237)

```tsx
const FeaturedImage = ({ src, alt }: { src: string; alt: string }) => {
	const [isLoaded, setIsLoaded] = useState(false);

	return (
		<figure className="relative mb-10">
			{!isLoaded && (
				<div className="w-full h-[300px] sm:h-[400px] lg:h-[450px] rounded-2xl shimmer-loading" />
			)}
			<div className="relative w-full aspect-[16/9] max-h-[500px]">
				<Image
					src={src} // ❌ URL WordPress directe non optimisée
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

### ✅ APRÈS

```tsx
import { getOptimizedImageUrl } from "@/lib/wordpress-images";

const FeaturedImage = ({ src, alt }: { src: string; alt: string }) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const optimizedSrc = getOptimizedImageUrl(src); // ✅ Transforme l'URL

	return (
		<figure className="relative mb-10">
			{!isLoaded && (
				<div className="w-full h-[300px] sm:h-[400px] lg:h-[450px] rounded-2xl shimmer-loading" />
			)}
			<div className="relative w-full aspect-[16/9] max-h-[500px]">
				<Image
					src={optimizedSrc} // ✅ URL optimisée via Edge Function
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

---

## Exemple 2 : Fetch WordPress posts

### ❌ AVANT

```tsx
import { WP_API_URL } from "@/lib/wordpress";

const { data: wpPost } = useQuery({
	queryKey: ["blogPost", slug],
	queryFn: async () => {
		if (!slug) throw new Error("No slug provided");
		const response = await fetch(
			WP_API_URL + "/posts?slug=" + slug + "&_embed" // ❌ Fetch direct
		);
		if (!response.ok) throw new Error("Post not found");
		const posts: WPPost[] = await response.json();
		if (posts.length === 0) throw new Error("Post not found");
		return posts[0];
	},
	staleTime: 1000 * 60 * 10,
	enabled: !!slug,
});
```

### ✅ APRÈS

```tsx
// Plus besoin d'importer WP_API_URL

const { data: wpPost } = useQuery({
	queryKey: ["blogPost", slug],
	queryFn: async () => {
		if (!slug) throw new Error("No slug provided");
		const response = await fetch(
			`/api/posts/${slug}` // ✅ API interne (Edge Function)
		);
		if (!response.ok) throw new Error("Post not found");
		const post: WPPost = await response.json();
		return post;
	},
	staleTime: 1000 * 60 * 10,
	enabled: !!slug,
});
```

---

## Exemple 3 : Transformation du contenu HTML

### ❌ AVANT (ligne 141-148)

```tsx
const processContent = (html: string): string => {
	let processed = html;

	// ❌ Remplace par URL non optimisée
	processed = processed.replace(
		/src="\/wp-content/g,
		'src="https://lylusio.fr/wp-content'
	);

	// ... autres traitements
	return processed;
};
```

### ✅ APRÈS

```tsx
import { transformContentImages } from "@/lib/wordpress-images";

const processContent = (html: string): string => {
	let processed = html;

	// ✅ Transforme toutes les images via Edge Function
	processed = transformContentImages(processed);

	// ... autres traitements (span, style, etc.)
	processed = processed.replace(/<span[^>]*>(.*?)<\/span>/gi, "$1");
	processed = processed.replace(/\sstyle="[^"]*"/gi, "");

	return processed;
};
```

---

## Exemple 4 : Related posts avec images

### ❌ AVANT

```tsx
const fetchRelatedPosts = async () => {
	try {
		const res = await fetch(
			WP_API_URL +
				"/posts?categories=" +
				wpPost.categories[0] +
				"&exclude=" +
				wpPost.id +
				"&per_page=3&_embed" // ❌ Fetch direct
		);
		if (res.ok) {
			const related: WPPost[] = await res.json();

			setRelatedPosts(
				related.map((rp) => ({
					id: rp.id,
					slug: rp.slug,
					title: utils.stripHtml(rp.title.rendered),
					image:
						rp._embedded?.["wp:featuredmedia"]?.[0]
							?.source_url || "/placeholder.svg", // ❌ URL directe
					date: utils.formatDate(rp.date),
					excerpt:
						utils.stripHtml(rp.excerpt.rendered).slice(0, 100) +
						"...",
				}))
			);
		}
	} catch (err) {
		console.error("Error fetching related posts:", err);
	}
};
```

### ✅ APRÈS

```tsx
import { getOptimizedImageUrl } from "@/lib/wordpress-images";

const fetchRelatedPosts = async () => {
	try {
		const res = await fetch(
			`/api/posts?categories=${wpPost.categories[0]}&exclude=${wpPost.id}&per_page=3&_embed=1` // ✅ API interne
		);
		if (res.ok) {
			const related: WPPost[] = await res.json();

			setRelatedPosts(
				related.map((rp) => ({
					id: rp.id,
					slug: rp.slug,
					title: utils.stripHtml(rp.title.rendered),
					image: getOptimizedImageUrl( // ✅ URL optimisée
						rp._embedded?.["wp:featuredmedia"]?.[0]?.source_url
					),
					date: utils.formatDate(rp.date),
					excerpt:
						utils.stripHtml(rp.excerpt.rendered).slice(0, 100) +
						"...",
				}))
			);
		}
	} catch (err) {
		console.error("Error fetching related posts:", err);
	}
};
```

---

## Exemple 5 : Métadonnées OpenGraph (generateMetadata)

### ❌ AVANT

```tsx
export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;

	// ❌ Fetch direct WordPress
	const response = await fetch(
		`${WP_API_URL}/posts?slug=${slug}&_embed`,
		{
			next: { revalidate: 3600 },
		}
	);

	const posts = await response.json();
	const post = posts[0];

	if (!post) {
		return {
			title: "Article non trouvé",
		};
	}

	return {
		title: post.title.rendered,
		description: post.excerpt.rendered.replace(/<[^>]*>/g, ""),
		openGraph: {
			title: post.title.rendered,
			description: post.excerpt.rendered.replace(/<[^>]*>/g, ""),
			images: [
				{
					url: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "", // ❌ URL directe
				},
			],
		},
	};
}
```

### ✅ APRÈS

```tsx
import { getOptimizedImageUrl } from "@/lib/wordpress-images";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;

	// ✅ API interne (Edge Function)
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SITE_URL}/api/posts/${slug}`,
		{
			next: { revalidate: 3600 },
		}
	);

	if (!response.ok) {
		return {
			title: "Article non trouvé",
		};
	}

	const post = await response.json();

	const featuredImageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

	return {
		title: post.title.rendered,
		description: post.excerpt.rendered.replace(/<[^>]*>/g, ""),
		openGraph: {
			title: post.title.rendered,
			description: post.excerpt.rendered.replace(/<[^>]*>/g, ""),
			images: featuredImageUrl
				? [
						{
							url: getOptimizedImageUrl(featuredImageUrl), // ✅ URL optimisée
							width: 1200,
							height: 630,
							alt: post.title.rendered,
						},
				  ]
				: [],
		},
		twitter: {
			card: "summary_large_image",
			title: post.title.rendered,
			description: post.excerpt.rendered.replace(/<[^>]*>/g, ""),
			images: featuredImageUrl
				? [getOptimizedImageUrl(featuredImageUrl)]
				: [],
		},
	};
}
```

---

## Exemple 6 : Utilisation du composant FeaturedImage (simplifié)

### ❌ AVANT (complex)

```tsx
const post: BlogPostData | null = wpPost
	? (() => {
			const featuredMedia = wpPost._embedded?.["wp:featuredmedia"]?.[0];
			const imageUrl = featuredMedia?.source_url || "";

			return {
				// ... autres props
				imageUrl: imageUrl,
				imageAlt: featuredMedia?.alt_text || "Image",
			};
	  })()
	: null;

// Dans le JSX
{post.imageUrl && (
	<FeaturedImage src={post.imageUrl} alt={post.imageAlt} />
)}
```

### ✅ APRÈS (simplifié avec composant WordPress)

```tsx
import { FeaturedImage } from "@/components/WordPressImage";

// Dans le JSX - beaucoup plus simple !
{wpPost && (
	<FeaturedImage
		post={wpPost}
		size="large"
		fill
		sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
		priority
	/>
)}
```

**Avantages** :
- ✅ Extraction automatique de l'image featured
- ✅ Alt text automatique
- ✅ Dimensions automatiques
- ✅ URL optimisée automatiquement
- ✅ Code beaucoup plus court

---

## Exemple 7 : Configuration CSP

### ❌ AVANT (incomplet)

```tsx
{
	key: "Content-Security-Policy",
	value: [
		"default-src 'self'",
		"script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
		"connect-src 'self' https://lylusio.fr https://www.google-analytics.com", // ❌ Manque region1
	].join("; "),
}
```

### ✅ APRÈS (complet)

```tsx
{
	key: "Content-Security-Policy",
	value: [
		"default-src 'self'",
		"script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://region1.google-analytics.com https://calendly.com", // ✅ region1 ajouté
		"connect-src 'self' https://lylusio.fr https://admin.lylusio.fr https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://region1.analytics.google.com", // ✅ Tous les endpoints GA4
		"img-src 'self' data: https: blob:",
		"frame-src 'self' https://calendly.com https://www.youtube.com https://www.youtube-nocookie.com",
		// ... autres directives
	].join("; "),
}
```

---

## Exemple 8 : Configuration Google Analytics

### ❌ AVANT

```tsx
// Configuration GA4 - Remplacer par votre ID de mesure
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // ❌ Placeholder
```

### ✅ APRÈS

```tsx
// Configuration GA4
// ID de mesure : G-0895ZEQQY4
// ID de flux : 6111910808
// URL de flux : https://lylusio.fr/
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-0895ZEQQY4'; // ✅ Variable d'environnement
```

---

## Exemple 9 : Pattern Search & Replace complet

### Rechercher (Regex) :

```regex
WP_API_URL\s*\+\s*['"]/posts
```

### Remplacer par :

```typescript
/api/posts
```

### Rechercher (Regex) :

```regex
post\._embedded\?\.\["wp:featuredmedia"\]\?\.\[0\]\?\.source_url
```

### Wrapper avec :

```typescript
getOptimizedImageUrl(post._embedded?.["wp:featuredmedia"]?.[0]?.source_url)
```

---

## 🎯 Checklist par fichier

### Pour chaque fichier contenant des images WordPress :

- [ ] Ajouter import : `import { getOptimizedImageUrl } from "@/lib/wordpress-images";`
- [ ] Remplacer tous les `WP_API_URL + "/posts` par `/api/posts`
- [ ] Wrapper toutes les `source_url` avec `getOptimizedImageUrl()`
- [ ] Vérifier que les `<Image>` ont `width/height` ou `fill`
- [ ] Tester le composant en dev : `npm run dev`

---

## 📚 Ressources

- Documentation Next.js Image : https://nextjs.org/docs/app/building-your-application/optimizing/images
- Documentation Edge Functions : https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- Documentation CSP : https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP

---

**Note importante** : Ces exemples sont extraits du projet réel. Adaptez selon votre structure de code spécifique.
