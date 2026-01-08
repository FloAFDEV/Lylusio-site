// Golden Plant Badge - Decorative element with proper SSR support
import Image from "next/image";
import { cn } from "@/lib/utils";

interface GoldenPlantBadgeProps {
	size?: "sm" | "md" | "lg" | "xl";
	className?: string;
	animate?: boolean;
}

const sizeClasses = {
	sm: "w-12 h-12",   // Increased from w-8 h-8
	md: "w-16 h-16",   // Increased from w-12 h-12
	lg: "w-20 h-20",   // Increased from w-16 h-16
	xl: "w-28 h-28",   // Increased from w-24 h-24
};

const innerSizeClasses = {
	sm: "w-7 h-7",     // Increased from w-5 h-5
	md: "w-11 h-11",   // Increased from w-8 h-8
	lg: "w-14 h-14",   // Increased from w-10 h-10
	xl: "w-20 h-20",   // Increased from w-16 h-16
};

const GoldenPlantBadge = ({
	size = "md",
	className,
	animate = true,
}: GoldenPlantBadgeProps) => {
	return (
		<div
			className={cn(
				// Shape & Layout - IMPORTANT: rounded-full for circular shape
				"rounded-full flex items-center justify-center overflow-hidden",
				// Background with slight transparency
				"bg-background/95 backdrop-blur-sm",
				// Golden border - IMPORTANT: Increased border width for visibility
				"border-[3px] border-gold shadow-[0_0_15px_hsl(var(--gold)/0.4)]",
				// Animation
				animate && "hover:animate-float hover:shadow-[0_0_25px_hsl(var(--gold)/0.6)] transition-all duration-500",
				// Size
				sizeClasses[size],
				className
			)}
			aria-hidden="true"
		>
			<div className={cn(
				"relative rounded-full overflow-hidden",
				innerSizeClasses[size]
			)}>
				<Image
					src="/assets/plant-decoration.webp"
					alt=""
					fill
					className="object-cover"
					sizes="(max-width: 640px) 48px, (max-width: 768px) 64px, 80px"
					aria-hidden="true"
					quality={85}
				/>
			</div>
		</div>
	);
};

export default GoldenPlantBadge;
