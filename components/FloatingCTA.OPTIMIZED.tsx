"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAnalyticsEvent } from "@/hooks/useAnalytics";
import CALENDLY_URLS from "@/lib/calendly";

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
			className={`fixed bottom-20 right-6 z-40 transition-all duration-700 ease-out ${
				shouldShow
					? "opacity-100 translate-y-0"
					: "opacity-0 translate-y-8 pointer-events-none"
			}`}
			role="complementary"
			aria-label="Bouton de réservation flottant"
			aria-hidden={!shouldShow}
		>
			{/* Glow effect autour du bouton */}
			<div className="relative group/floating">

				<Button
					asChild
					size="default"
					className="relative bg-gold hover:brightness-110 text-white shadow-gold group px-4 py-3 transition-all duration-300 hover:scale-105 active:scale-95 min-h-[56px] min-w-[56px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
				>
					<a
						href={CALENDLY_URLS.GENERAL}
						target="_blank"
						rel="noopener noreferrer"
						onClick={handleLinkClick}
						className="relative overflow-hidden flex items-center gap-2"
						aria-label="Réserver une séance d'astrologie ou de Reiki avec Émilie Perez (ouvre Calendly dans un nouvel onglet)"
					>
						{/* Effet de shine animé au hover */}
						<span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" aria-hidden="true" />

						<Calendar
							className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 relative z-10 text-white"
							aria-hidden="true"
						/>
						<span className="hidden sm:inline relative z-10 font-medium text-white">Réserver</span>
					</a>
				</Button>
			</div>
		</div>
	);
};

export default FloatingCTA;
