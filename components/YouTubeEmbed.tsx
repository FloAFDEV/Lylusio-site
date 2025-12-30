"use client";

import { useState } from "react";
import Image from "next/image";

interface YouTubeEmbedProps {
	videoId: string;
	title: string;
	thumbnailUrl?: string;
	className?: string;
}

/**
 * Optimized YouTube embed component with lazy-loading facade
 * Loads thumbnail first, only loads iframe on user click
 * Saves ~500-800 KB per video until user interaction
 */
export function YouTubeEmbed({
	videoId,
	title,
	thumbnailUrl,
	className = "",
}: YouTubeEmbedProps) {
	const [isLoaded, setIsLoaded] = useState(false);

	const thumbnail =
		thumbnailUrl || `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

	// Show thumbnail with play button overlay until clicked
	if (!isLoaded) {
		return (
			<button
				onClick={() => setIsLoaded(true)}
				className={`relative w-full aspect-video group cursor-pointer overflow-hidden rounded-2xl md:rounded-3xl ${className}`}
				aria-label={`Charger la vidéo: ${title}`}
				type="button"
			>
				{/* Thumbnail image */}
				<Image
					src={thumbnail}
					alt={title}
					fill
					className="object-cover transition-transform duration-500 group-hover:scale-105"
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				/>

				{/* Dark overlay on hover */}
				<div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

				{/* Play button */}
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="relative">
						{/* Glow effect */}
						<div className="absolute inset-0 bg-gold/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

						{/* Play button circle */}
						<div className="relative w-10 h-10 md:w-14 md:h-14 bg-gold/70 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-gold">
							{/* Play icon */}
							<svg
								className="w-8 h-8 md:w-10 md:h-10 text-white ml-1"
								fill="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path d="M8 5v14l11-7z" />
							</svg>
						</div>
					</div>
				</div>

				{/* Title overlay at bottom */}
				<div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
					<div className="bg-card/80 backdrop-blur-sm rounded-xl p-1 md:p-2 border border-border/30">
						<p className="text-sm md:text-base font-medium text-foreground line-clamp-2">
							{title}
						</p>
					</div>
				</div>
			</button>
		);
	}

	// Load iframe after click
	return (
		<div className={`relative w-full aspect-video ${className}`}>
			<iframe
				src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
				title={title}
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowFullScreen
				className="absolute inset-0 w-full h-full rounded-2xl md:rounded-3xl border-0"
			/>
		</div>
	);
}
