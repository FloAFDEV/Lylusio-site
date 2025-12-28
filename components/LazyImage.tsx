import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface LazyImageProps {
	src: string;
	alt: string;
	className?: string;
	placeholderClassName?: string;
	width?: string | number;
	height?: string | number;
	priority?: boolean;
}

const LazyImage = ({
	src,
	alt,
	className = "",
	placeholderClassName = "",
	width,
	height,
	priority = false,
}: LazyImageProps) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [isInView, setIsInView] = useState(priority);
	const imgRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (priority) {
			setIsInView(true);
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsInView(true);
					observer.disconnect();
				}
			},
			{
				rootMargin: "100px", // Start loading 100px before entering viewport
				threshold: 0.01,
			}
		);

		if (imgRef.current) {
			observer.observe(imgRef.current);
		}

		return () => observer.disconnect();
	}, [priority]);

	return (
		<div ref={imgRef} className="relative">
			{/* Shimmer placeholder */}
			<div
				className={`transition-opacity duration-500 ${
					isLoaded ? "opacity-0 absolute inset-0" : "opacity-100"
				} ${
					placeholderClassName ||
					"w-full aspect-[4/3] shimmer-loading rounded-xl"
				}`}
				aria-hidden="true"
			/>

			{/* Actual image - only load when in view */}
			{isInView && (
				<Image
					src={src}
					alt={alt}
					width={typeof width === 'number' ? width : width ? parseInt(width as string) : 800}
					height={typeof height === 'number' ? height : height ? parseInt(height as string) : 600}
					priority={priority}
						onLoad={() => setIsLoaded(true)}
					className={`transition-opacity duration-500 ${
						isLoaded ? "opacity-100" : "opacity-0 absolute inset-0"
					} ${className}`}
				/>
			)}
		</div>
	);
};

export default LazyImage;
