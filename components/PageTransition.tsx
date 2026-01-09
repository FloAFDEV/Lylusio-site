"use client";

import { ReactNode } from "react";

interface PageTransitionProps {
	children: ReactNode;
}

/**
 * Page Transition Component
 * Renders children directly without any transitions to prevent flash/flicker
 */
const PageTransition = ({ children }: PageTransitionProps) => {
	// Simply render children without any opacity transitions
	// This prevents any flash or flicker on page load
	return <>{children}</>;
};

export default PageTransition;
