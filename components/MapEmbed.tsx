"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

interface MapEmbedProps {
	/** URL https://www.google.com/maps/embed?... chargée uniquement au clic */
	embedUrl: string;
	/** Lien externe vers Google Maps, utilisable sans charger la carte */
	externalUrl: string;
	title: string;
	address: string;
	height?: number;
	className?: string;
	iframeClassName?: string;
}

/**
 * Façade Google Maps : aucune requête vers Google tant que le visiteur n'a
 * pas demandé l'affichage de la carte. Le chargement vaut pour cette carte
 * et cette page uniquement ; ce n'est pas un consentement aux cookies.
 */
export function MapEmbed({
	embedUrl,
	externalUrl,
	title,
	address,
	height = 220,
	className = "",
	iframeClassName = "",
}: MapEmbedProps) {
	const [isLoaded, setIsLoaded] = useState(false);

	if (isLoaded) {
		return (
			<iframe
				src={embedUrl}
				width="100%"
				height={height}
				style={{ border: 0 }}
				allowFullScreen
				loading="lazy"
				referrerPolicy="strict-origin-when-cross-origin"
				className={iframeClassName}
				title={title}
			/>
		);
	}

	return (
		<div
			className={`flex flex-col items-center justify-center gap-3 px-5 text-center bg-primary-foreground/5 ${className}`}
			style={{ height }}
			data-testid="map-facade"
		>
			<MapPin className="w-6 h-6 text-gold-light" aria-hidden="true" />
			<p className="text-primary-foreground/80 text-sm">{address}</p>
			<button
				type="button"
				onClick={() => setIsLoaded(true)}
				className="text-sm font-medium px-4 py-2 rounded-full border border-gold/50 text-primary-foreground hover:bg-primary-foreground/10 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold min-h-[44px]"
			>
				Afficher la carte
			</button>
			<p className="text-primary-foreground/60 text-xs leading-relaxed max-w-xs">
				La carte est fournie par Google Maps, qui peut déposer ses propres
				cookies.{" "}
				<a
					href={externalUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="underline underline-offset-2 hover:text-primary-foreground"
				>
					Ouvrir dans Google Maps
				</a>
			</p>
		</div>
	);
}

export default MapEmbed;
