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
			className={`fixed bottom-6 left-4 sm:left-6 z-30 transition-all duration-700 ease-out ${
				shouldShow
					? "opacity-100 translate-y-0"
					: "opacity-0 translate-y-8 pointer-events-none"
			}`}
		>
			<Button
				asChild
				size="default"
				className="bg-gradient-to-r from-[hsl(42,75%,42%)] to-[hsl(42,70%,38%)] text-white shadow-lg hover:shadow-glow group px-3 sm:px-4 transition-all duration-300 hover:scale-[1.05] active:scale-[0.98] border-0"
				aria-label="Réserver une séance (ouvre Calendly)"
				data-cta="true"
			>
				<a
					href="https://calendly.com/lylusio-fr"
					target="_blank"
					rel="noopener noreferrer"
					onClick={handleLinkClick}
					className="relative overflow-hidden"
				>
					{/* Effet de glow animé au hover */}
					<span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

					<Calendar
						className="w-4 h-4 sm:mr-2 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
						aria-hidden="true"
					/>
					<span className="hidden sm:inline relative">Réserver</span>
				</a>
			</Button>
		</div>
	);
};

export default FloatingCTA;
