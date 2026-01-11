"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface GoldenPlantBadgeProps {
	size?: "sm" | "md" | "lg" | "xl";
	className?: string;
	animate?: boolean;
}

const sizeClasses = {
	sm: "w-12 h-12",
	md: "w-16 h-16",
	lg: "w-20 h-20",
	xl: "w-28 h-28",
};

const innerSizeClasses = {
	sm: 28, // px
	md: 44,
	lg: 56,
	xl: 80,
};

const GoldenPlantBadge = ({
	size = "md",
	className,
	animate = true,
}: GoldenPlantBadgeProps) => {
	const innerSize = innerSizeClasses[size];
	const [mounted, setMounted] = useState(false);

	// ✅ Fix hydration: render same content on server and initial client render
	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<div
			className={cn(
				"rounded-full flex items-center justify-center overflow-hidden",
				"bg-background/95 backdrop-blur-sm",
				"border-2 border-gold/60 shadow-[0_0_12px_hsl(var(--gold)/0.25)]",
				animate &&
					"motion-safe:animate-float motion-safe:hover:animate-float-slow",
				"transition-shadow duration-500 hover:shadow-[0_0_20px_hsl(var(--gold)/0.4)]",
				sizeClasses[size],
				// Only apply full opacity after mount to ensure smooth appearance
				mounted ? "opacity-100" : "opacity-0",
				"transition-opacity duration-300",
				className
			)}
			aria-hidden="true"
		>
			<div
				className="relative rounded-full overflow-hidden"
				style={{ width: innerSize, height: innerSize }}
				aria-hidden="true"
			>
				<Image
					src="/assets/plant-decoration.webp"
					alt=""
					width={innerSize}
					height={innerSize}
					className="object-cover"
					loading="lazy"
					quality={85}
					aria-hidden="true"
				/>
			</div>
		</div>
	);
};

export default GoldenPlantBadge;
