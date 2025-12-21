import plantDecoration from "@/assets/plant-decoration.webp";
import { cn } from "@/lib/utils";

interface GoldenPlantBadgeProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  animate?: boolean;
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
  xl: "w-24 h-24"
};

const innerSizeClasses = {
  sm: "w-5 h-5",
  md: "w-8 h-8",
  lg: "w-10 h-10",
  xl: "w-16 h-16"
};

const GoldenPlantBadge = ({ 
  size = "md", 
  className,
  animate = true 
}: GoldenPlantBadgeProps) => {
  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center overflow-hidden",
        "bg-background/90 border-2 border-gold/40",
        "shadow-[0_0_15px_hsl(var(--gold)/0.25)]",
        animate && "animate-float",
        sizeClasses[size],
        className
      )}
      aria-hidden="true"
    >
      <img 
        src={plantDecoration} 
        alt="" 
        className={cn(
          "rounded-full object-cover",
          innerSizeClasses[size]
        )}
      />
    </div>
  );
};

export default GoldenPlantBadge;
