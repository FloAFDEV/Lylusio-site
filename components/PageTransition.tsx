"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";

interface PageTransitionProps {
	children: ReactNode;
}

/**
 * Page Transition Component
 * Provides smooth transitions between route changes only
 * No initial flash - only animates on navigation
 */
const PageTransition = ({ children }: PageTransitionProps) => {
	const pathname = usePathname();
	const [displayPath, setDisplayPath] = useState(pathname);
	const [isTransitioning, setIsTransitioning] = useState(false);

	useEffect(() => {
		// Only animate on route changes, not on initial load
		if (displayPath !== pathname) {
			setIsTransitioning(true);
			const timer = setTimeout(() => {
				setDisplayPath(pathname);
				setIsTransitioning(false);
			}, 300);
			return () => clearTimeout(timer);
		}
	}, [pathname, displayPath]);

	return (
		<div
			className={`transition-opacity duration-300 ease-out ${
				isTransitioning ? "opacity-0" : "opacity-100"
			}`}
		>
			{children}
		</div>
	);
};

export default PageTransition;
