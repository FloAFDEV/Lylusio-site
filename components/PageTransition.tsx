"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";

interface PageTransitionProps {
	children: ReactNode;
}

/**
 * Page Transition Component
 * Provides smooth, feminine transitions between pages
 */
const PageTransition = ({ children }: PageTransitionProps) => {
	const pathname = usePathname();
	const [displayContent, setDisplayContent] = useState(children);
	const [transitionStage, setTransitionStage] = useState<"fadeIn" | "fadeOut">("fadeIn");

	useEffect(() => {
		// Fade out current content
		setTransitionStage("fadeOut");

		// After fade out, update content and fade in
		const timeout = setTimeout(() => {
			setDisplayContent(children);
			setTransitionStage("fadeIn");
		}, 300);

		return () => clearTimeout(timeout);
	}, [pathname, children]);

	return (
		<div
			className={`transition-all duration-500 ease-in-out ${
				transitionStage === "fadeOut"
					? "opacity-0 translate-y-4"
					: "opacity-100 translate-y-0"
			}`}
		>
			{displayContent}
		</div>
	);
};

export default PageTransition;
