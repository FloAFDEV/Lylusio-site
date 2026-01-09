/**
 * Composant Image optimisé pour WordPress
 * Utilise automatiquement l'Edge Function pour optimisation Next.js
 */

import Image from "next/image";
import {
	getOptimizedImageUrl,
	getFeaturedImageUrl,
	getFeaturedImageAlt,
	getFeaturedImageDimensions,
} from "@/lib/wordpress-images";

interface WordPressImageProps {
	src: string;
	alt: string;
	width?: number;
	height?: number;
	fill?: boolean;
	sizes?: string;
	quality?: number;
	priority?: boolean;
	className?: string;
	loading?: "lazy" | "eager";
	onError?: () => void;
}

/**
 * Composant Image basique pour images WordPress
 * Transforme automatiquement l'URL pour passer par l'Edge Function
 *
 * @example
 * <WordPressImage
 *   src="https://admin.lylusio.fr/wp-content/uploads/2024/01/image.jpg"
 *   alt="Description"
 *   width={800}
 *   height={600}
 * />
 */
export function WordPressImage({
	src,
	alt,
	width,
	height,
	fill = false,
	sizes,
	quality = 75,
	priority = false,
	className,
	loading = "lazy",
	onError,
}: WordPressImageProps) {
	const optimizedSrc = getOptimizedImageUrl(src);

	// Si fill est true, width et height ne doivent pas être spécifiés
	if (fill) {
		return (
			<Image
				src={optimizedSrc}
				alt={alt}
				fill
				sizes={
					sizes ||
					"(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
				}
				quality={quality}
				priority={priority}
				className={className}
				onError={onError}
				loading={priority ? undefined : loading}
			/>
		);
	}

	// Mode avec dimensions fixes
	return (
		<Image
			src={optimizedSrc}
			alt={alt}
			width={width}
			height={height}
			sizes={sizes}
			quality={quality}
			priority={priority}
			className={className}
			onError={onError}
			loading={priority ? undefined : loading}
		/>
	);
}

interface FeaturedImageProps {
	post: any;
	size?: "thumbnail" | "medium" | "large" | "full";
	fill?: boolean;
	sizes?: string;
	quality?: number;
	priority?: boolean;
	className?: string;
	loading?: "lazy" | "eager";
}

/**
 * Composant spécialisé pour les featured images WordPress
 * Extrait automatiquement l'image, alt et dimensions depuis le post
 *
 * @example
 * <FeaturedImage
 *   post={post}
 *   size="large"
 *   fill
 *   sizes="(max-width: 768px) 100vw, 50vw"
 * />
 */
export function FeaturedImage({
	post,
	size = "large",
	fill = false,
	sizes,
	quality = 75,
	priority = false,
	className,
	loading = "lazy",
}: FeaturedImageProps) {
	const src = getFeaturedImageUrl(post, size);
	const alt = getFeaturedImageAlt(post);
	const dimensions = getFeaturedImageDimensions(post, size);

	// Si fill est true, utiliser fill mode
	if (fill) {
		return (
			<WordPressImage
				src={src}
				alt={alt}
				fill
				sizes={
					sizes ||
					"(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
				}
				quality={quality}
				priority={priority}
				className={className}
				loading={loading}
			/>
		);
	}

	// Si les dimensions sont disponibles, les utiliser
	if (dimensions) {
		return (
			<WordPressImage
				src={src}
				alt={alt}
				width={dimensions.width}
				height={dimensions.height}
				sizes={sizes}
				quality={quality}
				priority={priority}
				className={className}
				loading={loading}
			/>
		);
	}

	// Fallback avec dimensions par défaut selon la taille
	const defaultDimensions = {
		thumbnail: { width: 150, height: 150 },
		medium: { width: 300, height: 300 },
		large: { width: 1024, height: 768 },
		full: { width: 1920, height: 1080 },
	};

	const { width, height } = defaultDimensions[size];

	return (
		<WordPressImage
			src={src}
			alt={alt}
			width={width}
			height={height}
			sizes={sizes}
			quality={quality}
			priority={priority}
			className={className}
			loading={loading}
		/>
	);
}

/**
 * Hook pour gérer les erreurs d'images avec fallback
 */
export function useImageFallback() {
	const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
		// Remplacer par l'image fallback
		event.currentTarget.src = "/assets/logo-lylusio.png";
		event.currentTarget.srcset = "";
	};

	return { handleError };
}

export default WordPressImage;
