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
	const [mounted, setMounted] = useState(false);
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

	/* Mark as mounted to prevent hydration mismatch */
	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (!mounted) return;

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

		// DO NOT call handleScroll immediately - wait for first scroll event to prevent flash
		// handleScroll(); // REMOVED: Causes flash if scrollY > 400 on mount

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
	}, [mounted]);

	// Hide when menu is open, near footer, or on hidden pages
	const shouldShow =
		mounted && isVisible && !isMenuOpen && !isNearFooter && !isHiddenPage;

	// L'action de clic ne fait plus qu'appeler l'analytics (la navigation est gérée par le href du <a>)
	const handleLinkClick = () => {
		trackBookingClick("floating_cta");
	};

	// Do not render anything until mounted to prevent flash
	if (!mounted) return null;

	return (
		<div
			className={`fixed bottom-20 right-6 z-40 transition-all duration-700 ease-out ${
				shouldShow
					? "opacity-100 translate-y-0"
					: "opacity-0 translate-y-8 pointer-events-none"
			}`}
			role="complementary"
			aria-label="Bouton de réservation flottant"
		>
			<Button
				asChild
				size="default"
				className="bg-gold-light hover:bg-navy text-foreground hover:text-white shadow-soft px-3 sm:px-4 py-2.5 transition-colors duration-300"
			>
				<a
					href="https://calendly.com/lylusio-fr"
					target="_blank"
					rel="noopener noreferrer"
					onClick={handleLinkClick}
					className="flex items-center gap-2"
					aria-label="Réserver une séance d'astrologie ou de Reiki avec Émilie Perez (ouvre Calendly dans un nouvel onglet)"
				>
					<Calendar
						className="w-4 h-4 text-foreground"
						aria-hidden="true"
					/>
					<span className="hidden sm:inline font-medium text-foreground">
						Réserver
					</span>
				</a>
			</Button>
		</div>
	);
};

export default FloatingCTA;
