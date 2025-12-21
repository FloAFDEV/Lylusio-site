import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAnalyticsEvent } from "@/hooks/useAnalytics";

const FloatingCTA = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isNearFooter, setIsNearFooter] = useState(false);
	const location = useLocation();
	const { trackBookingClick } = useAnalyticsEvent();

	// Pages where CTA should be hidden (pages with existing CTAs)
	const hiddenOnPages = [
		"/therapie-energetique",
		"/astrologie-toulouse",
		"/reiki-toulouse",
		"/accompagnement-toulouse",
		"/approche-therapeutique",
		"/contact",
	];
	const isHiddenPage = hiddenOnPages.includes(location.pathname);

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
			className={`fixed bottom-6 left-4 sm:left-6 z-30 transition-all duration-500 ${
				shouldShow
					? "opacity-100 translate-y-0"
					: "opacity-0 translate-y-4 pointer-events-none"
			}`}
		>
			<Button
				asChild // ⬅️ CHANGEMENT CLÉ : Force le rendu en tant que lien <a>
				variant="hero"
				size="default"
				// L'onClick du Button est retiré et géré par le <a> enfant
				className="shadow-medium hover:shadow-glow group px-3 sm:px-4"
				aria-label="Réserver une séance (ouvre Calendly)"
				data-cta="true"
			>
				<a
					href="https://calendly.com/lylusio-fr" // ⬅️ CHANGEMENT CLÉ : L'URL est désormais exposée pour le SEO
					target="_blank"
					rel="noopener noreferrer"
					onClick={handleLinkClick} // ⬅️ L'événement analytics est maintenant sur le <a>
				>
					<Calendar
						className="w-4 h-4 sm:mr-2 transition-transform duration-300 group-hover:scale-110"
						aria-hidden="true"
					/>
					<span className="hidden sm:inline">Réserver</span>
				</a>
			</Button>
		</div>
	);
};

export default FloatingCTA;
