import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium font-body transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft hover:shadow-medium text-[15px] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 text-[15px]",
        outline: "border border-border bg-transparent text-foreground hover:bg-gradient-sky-center hover:text-secondary-foreground hover:border-accent/30 text-[15px]",
        secondary: "bg-gradient-sky-center text-secondary-foreground hover:bg-gradient-sky-center/80 text-[15px]",
        ghost: "hover:bg-gradient-sky-center hover:text-secondary-foreground text-sm",
        link: "text-accent underline-offset-4 hover:underline hover:translate-y-0 text-sm",
        // Golden accent button - premium gold with glow & shimmer effect
        accent: "bg-gold-light text-foreground font-medium hover:bg-navy hover:text-white shadow-soft hover:shadow-glow text-base before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-1000",
        // Soft hero button - gentle blush with subtle glow & shimmer effect
        hero: "bg-cta text-cta-foreground font-medium hover:bg-cta-hover shadow-soft hover:shadow-glow text-base before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-1000",
        // Elegant soft outline variant with shimmer
        elegant: "border border-accent/30 bg-transparent text-foreground hover:border-accent/50 hover:bg-accent/5 text-[15px] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-accent/10 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700",
        // Glass effect button with shimmer
        glass: "bg-background/60 backdrop-blur-md border border-border/40 text-foreground hover:bg-background/80 text-[15px] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700",
      },
      size: {
        default: "h-12 px-8 py-2",
        sm: "h-11 px-6",
        lg: "h-14 px-10 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
