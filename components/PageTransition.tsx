"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";

interface PageTransitionProps {
	children: ReactNode;
}

/**
 * Page Transition Component
 * Provides smooth, feminine fade-in transitions between pages
 * Hydration-safe with CSS-only animation
 */
const PageTransition = ({ children }: PageTransitionProps) => {
	const pathname = usePathname();
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		// Reset animation on route change
		setIsMounted(false);
		const timer = setTimeout(() => setIsMounted(true), 10);
		return () => clearTimeout(timer);
	}, [pathname]);

	return (
		<div
			className={`transition-all duration-700 ease-out ${
				isMounted
					? "opacity-100 translate-y-0"
					: "opacity-0 translate-y-2"
			}`}
		>
			{children}
		</div>
	);
};

export default PageTransition;
