import { permanentRedirect } from "next/navigation";

/**
 * Catch-all pour les slugs racine hérités (ex: /mon-article).
 * Redirige en 308 permanent vers /blog/:slug (canonique SEO).
 *
 * Next.js App Router donne priorité aux routes statiques sur [slug],
 * donc /contact, /about, /blog, etc. ne sont jamais interceptés ici —
 * seuls les slugs d'articles sans route dédiée arrivent dans ce handler.
 *
 * Aucun rendu React, aucun useRouter : réponse HTTP pure côté serveur.
 */
export default async function LegacySlugRedirectPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	permanentRedirect(`/blog/${slug}`);
}
