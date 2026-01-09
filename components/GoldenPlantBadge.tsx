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
	sm: "w-7 h-7",
	md: "w-11 h-11",
	lg: "w-14 h-14",
	xl: "w-20 h-20",
};

const GoldenPlantBadge = ({
	size = "md",
	className,
	animate = true,
}: GoldenPlantBadgeProps) => {
	return (
		<div
			className={cn(
				"rounded-full flex items-center justify-center overflow-hidden",
				"bg-background/95 backdrop-blur-sm",
				"border-2 border-gold/60 shadow-[0_0_12px_hsl(var(--gold)/0.25)]",

				// ✅ FLOATING PASSIF
				animate &&
					"motion-safe:animate-float motion-safe:hover:animate-float-slow",

				// Hover enhancement only
				"transition-shadow duration-500 hover:shadow-[0_0_20px_hsl(var(--gold)/0.4)]",

				sizeClasses[size],
				className
			)}
			aria-hidden="true"
		>
			{/* Image décorative en background CSS - protection maximale */}
			<div
				className={cn(
					"rounded-full bg-cover bg-center",
					innerSizeClasses[size]
				)}
				style={{
					backgroundImage: "url('/assets/plant-decoration.webp')",
				}}
				aria-hidden="true"
			/>
		</div>
	);
};

export default GoldenPlantBadge;
