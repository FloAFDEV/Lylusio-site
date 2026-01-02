import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ServicesDiscoveryCTAProps {
	/**
	 * Variant to determine which URL scheme to use
	 * 'toulouse' - Uses URLs with -toulouse suffix (e.g., /astrologie-toulouse)
	 * 'standard' - Uses standard URLs (e.g., /astrologie)
	 */
	variant?: "toulouse" | "standard";
	/**
	 * Button variant to use for the main CTA
	 */
	buttonVariant?: "elegant" | "outline" | "default";
	/**
	 * Custom class name for the container
	 */
	className?: string;
}

/**
 * ServicesDiscoveryCTA component
 *
 * Displays a call-to-action section encouraging users to discover
 * the available services (astrology, Reiki, personalized accompaniment).
 *
 * This component eliminates code duplication between Blog.tsx and BlogClientWrapper.tsx
 */
export default function ServicesDiscoveryCTA({
	variant = "standard",
	buttonVariant = "elegant",
	className = "",
}: ServicesDiscoveryCTAProps) {
	// Determine URLs based on variant
	const urls = {
		astrologie:
			variant === "toulouse" ? "/astrologie-toulouse" : "/astrologie",
		reiki: variant === "toulouse" ? "/reiki-toulouse" : "/reiki",
		accompagnement:
			variant === "toulouse"
				? "/accompagnement-toulouse"
				: "/accompagnement",
		services:
			variant === "toulouse" ? "/accompagnement-toulouse" : "/services",
	};

	return (
		<section className={className}>
			{/* CTA Principal - Découverte des services */}
			<div className="mt-16 p-8 bg-gradient-sand-center/30 rounded-2xl text-center max-w-3xl mx-auto">
				<h3 className="font-display text-xl md:text-3xl text-navy mb-4">
					Découvrez mes accompagnements
				</h3>
				<p className="text-muted-foreground mb-6">
					Vous souhaitez aller plus loin dans votre cheminement ? Je
					propose des séances d'{" "}
					<Link
						href={urls.astrologie}
						className="text-accent hover:underline"
					>
						astrologie consciente
					</Link>
					, de{" "}
					<Link
						href={urls.reiki}
						className="text-accent hover:underline"
					>
						thérapie énergétique Reiki
					</Link>{" "}
					et d'{" "}
					<Link
						href={urls.accompagnement}
						className="text-accent hover:underline"
					>
						accompagnement personnalisé
					</Link>
					.
				</p>
				<Link href={urls.services}>
					<Button variant={buttonVariant} size="default">
						Voir toutes les prestations
					</Button>
				</Link>
			</div>

			{/* CTA Secondaire - Ressources */}
			<div className="mt-8 text-center">
				<p className="text-sm text-muted-foreground">
					Envie de contenus pratiques ?{" "}
					<Link
						href="/ressources"
						className="text-accent hover:text-gold transition-colors font-medium underline decoration-accent/30 hover:decoration-gold/50 underline-offset-2"
					>
						Découvrir les{" "}
						{variant === "toulouse"
							? "ressources gratuites"
							: "vidéos et ateliers gratuits"}
					</Link>
				</p>
			</div>
		</section>
	);
}
