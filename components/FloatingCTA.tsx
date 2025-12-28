"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAnalyticsEvent } from "@/hooks/useAnalytics";

const FloatingCTA = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isNearFooter, setIsNearFooter] = useState(false);
	const pathname = usePathname();
	const { trackBookingClick } = useAnalyticsEvent();

	// Pages where CTA should be hidden (pages with existing CTAs)
	const hiddenOnPages = [
		"/astrologie-toulouse",
		"/reiki-toulouse",
		"/accompagnement-toulouse",
		"/approche-therapeutique",
		"/contact",
	];
	const isHiddenPage = hiddenOnPages.includes(pathname);

	useEffect(() => {
		const handleScroll = () => {
			// Show after scrolling 400px
			const scrollY = window.scrollY;
			const windowHeight = window.innerHeight;
			const documentHeight = document.documentElement.scrollHeight;

			// Hide when near CTA section/footer (1200px before end to hide before "Prendre rendez-vous" section)
			const isNearBottom =
				scrollY + windowHeight >= documentHeight - 1200;

			setIsVisible(scrollY > 400);
			setIsNearFooter(isNearBottom);
		};

		const handleMenuToggle = (event: CustomEvent<{ isOpen: boolean }>) => {
			setIsMenuOpen(event.detail.isOpen);
		};

		// Initial check
		handleScroll();

		window.addEventListener("scroll", handleScroll, { passive: true });
		window.addEventListener(
			"mobileMenuToggle",
			handleMenuToggle as EventListener
		);

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener(
				"mobileMenuToggle",
				handleMenuToggle as EventListener
			);
		};
	}, []);

	// Hide when menu is open, near footer, or on hidden pages
	const shouldShow =
		isVisible && !isMenuOpen && !isNearFooter && !isHiddenPage;

	// L'action de clic ne fait plus qu'appeler l'analytics (la navigation est gérée par le href du <a>)
	const handleLinkClick = () => {
		trackBookingClick("floating_cta");
	};

	return (
		<div
			className={`fixed bottom-6 left-4 sm:left-6 z-30 transition-all duration-700 ease-out ${
				shouldShow
					? "opacity-100 translate-y-0"
					: "opacity-0 translate-y-8 pointer-events-none"
			}`}
		>
			{/* Glow effect autour du bouton */}
			<div className="relative group/floating">
				<div className="absolute -inset-1 bg-gradient-to-r from-[hsl(25,75%,65%)]/20 via-[hsl(30,70%,60%)]/25 to-[hsl(25,75%,65%)]/20 rounded-xl opacity-0 group-hover/floating:opacity-100 blur-sm transition-all duration-500" />

				<Button
					asChild
					size="default"
					className="relative bg-gradient-to-br from-[hsl(20,75%,68%)] via-[hsl(30,70%,65%)] to-[hsl(35,65%,62%)] hover:from-[hsl(20,77%,70%)] hover:via-[hsl(30,72%,66%)] hover:to-[hsl(35,67%,63%)] text-white shadow-[0_4px_20px_rgba(232,156,124,0.4)] hover:shadow-[0_6px_28px_rgba(232,156,124,0.45)] group px-3 sm:px-4 py-2.5 transition-all duration-300 hover:scale-105 active:scale-95 border-0 backdrop-blur-sm"
					aria-label="Réserver une séance (ouvre Calendly)"
					data-cta="true"
				>
					<a
						href="https://calendly.com/lylusio-fr"
						target="_blank"
						rel="noopener noreferrer"
						onClick={handleLinkClick}
						className="relative overflow-hidden flex items-center gap-2"
					>
						{/* Effet de shine animé au hover */}
						<span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />

						<Calendar
							className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 relative z-10"
							aria-hidden="true"
						/>
						<span className="hidden sm:inline relative z-10 font-medium">Réserver</span>
					</a>
				</Button>
			</div>
		</div>
	);
};

export default FloatingCTA;
