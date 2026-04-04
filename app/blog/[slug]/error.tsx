"use client";

/**
 * Error boundary pour la route /blog/[slug].
 *
 * Intercepte toute erreur SSR non gérée sur ce segment (ex: slug malformé,
 * timeout réseau, contenu WordPress invalide…) et affiche une UI propre
 * au lieu du 500 brut de Next.js.
 */

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BlogPostError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error("[BlogPost Error Boundary]", error);
	}, [error]);

	return (
		<main className="min-h-screen bg-background flex items-center justify-center px-4">
			<div className="text-center max-w-md">
				<h1 className="font-display text-3xl text-navy mb-4">
					Article indisponible
				</h1>
				<p className="text-muted-foreground mb-8">
					Une erreur s'est produite lors du chargement de cet article.
					Vous pouvez réessayer ou revenir à la liste des articles.
				</p>

				<div className="flex flex-col sm:flex-row gap-3 justify-center">
					<Button variant="elegant" onClick={reset}>
						<RefreshCw className="w-4 h-4 mr-2" />
						Réessayer
					</Button>

					<Link href="/blog">
						<Button variant="outline" className="w-full sm:w-auto">
							<ArrowLeft className="w-4 h-4 mr-2" />
							Retour au blog
						</Button>
					</Link>
				</div>
			</div>
		</main>
	);
}
