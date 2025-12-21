import { useEffect, useState, useCallback } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MonApproche from "./pages/MonApproche";
import Services from "./pages/Services";
import Astrologie from "./pages/Astrologie";
import Reiki from "./pages/Reiki";
import Accompagnement from "./pages/Accompagnement";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogCategory from "./pages/BlogCategory";
import ArticleRedirect from "./pages/ArticleRedirect";
import Contact from "./pages/Contact";
import MentionsLegales from "./pages/MentionsLegales";
import Confidentialite from "./pages/Confidentialite";
import CGU from "./pages/CGU";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import FloatingCTA from "./components/FloatingCTA";
import CookieBanner from "./components/CookieBanner";
import PageTransition from "./components/PageTransition";
import AppLoader from "./components/AppLoader";
import { usePageTracking, initGA } from "./hooks/useAnalytics";

// Configuration optimisée du QueryClient pour le blog
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// Données considérées fraîches pendant 10 minutes
			staleTime: 1000 * 60 * 10,
			// Garde en mémoire pendant 30 minutes
			gcTime: 1000 * 60 * 30,
			// Réessaye une fois en cas d'erreur
			retry: 1,
			// Ne refetch pas automatiquement au focus de la fenêtre
			refetchOnWindowFocus: false,
			// Ne refetch pas au reconnect
			refetchOnReconnect: false,
		},
	},
});

// Component to scroll to top on route change and track pages
const ScrollToTopOnRoute = () => {
	const { pathname } = useLocation();

	// Track page views
	usePageTracking();

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "instant" });
	}, [pathname]);

	return null;
};

// Main app content wrapped in a component for cleaner loading state management
const AppContent = () => {
	return (
		<>
			<ScrollToTopOnRoute />
			<PageTransition>
				<Routes>
					{/* ===== MAIN ROUTES (SEO-optimized URLs) ===== */}
					<Route path="/" element={<Index />} />
					<Route
						path="/approche-therapeutique"
						element={<MonApproche />}
					/>
					<Route
						path="/therapie-energetique"
						element={<Services />}
					/>
					<Route
						path="/astrologie-toulouse"
						element={<Astrologie />}
					/>
					<Route path="/reiki-toulouse" element={<Reiki />} />
					<Route
						path="/accompagnement-toulouse"
						element={<Accompagnement />}
					/>
					<Route path="/emilie-perez" element={<About />} />
					<Route path="/blog" element={<Blog />} />
					<Route path="/blog/:slug" element={<BlogPost />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/faq" element={<FAQ />} />
					<Route
						path="/mentions-legales"
						element={<MentionsLegales />}
					/>
					<Route
						path="/confidentialite"
						element={<Confidentialite />}
					/>
					<Route path="/cgu" element={<CGU />} />

					{/* ===== BLOG CATEGORY PAGES (WordPress structure) ===== */}
					<Route
						path="/category/blog/:categorySlug"
						element={<BlogCategory />}
					/>
					{/* Support trailing slash for WordPress compatibility */}
					<Route
						path="/category/blog/:categorySlug/"
						element={<BlogCategory />}
					/>

					{/* ===== WORDPRESS LEGACY REDIRECTS (301) ===== */}
					{/* Pages principales avec préfixe /astrologue-cepet-toulouse/ */}
					<Route
						path="/astrologue-cepet-toulouse/astrologie"
						element={<Navigate to="/astrologie-toulouse" replace />}
					/>
					<Route
						path="/astrologue-cepet-toulouse/astrologie/"
						element={<Navigate to="/astrologie-toulouse" replace />}
					/>
					<Route
						path="/astrologue-cepet-toulouse/therapie_energetique_reiki"
						element={<Navigate to="/reiki-toulouse" replace />}
					/>
					<Route
						path="/astrologue-cepet-toulouse/therapie_energetique_reiki/"
						element={<Navigate to="/reiki-toulouse" replace />}
					/>
					<Route
						path="/astrologue-cepet-toulouse/accompagnements"
						element={
							<Navigate to="/accompagnement-toulouse" replace />
						}
					/>
					<Route
						path="/astrologue-cepet-toulouse/accompagnements/"
						element={
							<Navigate to="/accompagnement-toulouse" replace />
						}
					/>
					<Route
						path="/astrologue-cepet-toulouse/therapie_energetique_therapie_holistique"
						element={
							<Navigate to="/therapie-energetique" replace />
						}
					/>
					<Route
						path="/astrologue-cepet-toulouse/therapie_energetique_therapie_holistique/"
						element={
							<Navigate to="/therapie-energetique" replace />
						}
					/>
					<Route
						path="/astrologue-cepet-toulouse/mon-approche"
						element={
							<Navigate to="/approche-therapeutique" replace />
						}
					/>
					<Route
						path="/astrologue-cepet-toulouse/mon-approche/"
						element={
							<Navigate to="/approche-therapeutique" replace />
						}
					/>
					<Route
						path="/astrologue-cepet-toulouse/a-propos"
						element={<Navigate to="/emilie-perez" replace />}
					/>
					<Route
						path="/astrologue-cepet-toulouse/a-propos/"
						element={<Navigate to="/emilie-perez" replace />}
					/>
					<Route
						path="/astrologue-cepet-toulouse/blog"
						element={<Navigate to="/blog" replace />}
					/>
					<Route
						path="/astrologue-cepet-toulouse/blog/"
						element={<Navigate to="/blog" replace />}
					/>
					<Route
						path="/astrologue-cepet-toulouse/politique-de-confidentialite"
						element={<Navigate to="/confidentialite" replace />}
					/>
					<Route
						path="/astrologue-cepet-toulouse/politique-de-confidentialite/"
						element={<Navigate to="/confidentialite" replace />}
					/>
					<Route
						path="/astrologue-cepet-toulouse/newsletter"
						element={<Navigate to="/contact" replace />}
					/>
					<Route
						path="/astrologue-cepet-toulouse/newsletter/"
						element={<Navigate to="/contact" replace />}
					/>

					{/* Redirections catégories blog WordPress */}
					<Route
						path="/astrologue-cepet-toulouse/blog/astrologie"
						element={
							<Navigate to="/category/blog/astrologie/" replace />
						}
					/>
					<Route
						path="/astrologue-cepet-toulouse/blog/astrologie/"
						element={
							<Navigate to="/category/blog/astrologie/" replace />
						}
					/>
					<Route
						path="/astrologue-cepet-toulouse/blog/reiki"
						element={
							<Navigate to="/category/blog/reiki/" replace />
						}
					/>
					<Route
						path="/astrologue-cepet-toulouse/blog/reiki/"
						element={
							<Navigate to="/category/blog/reiki/" replace />
						}
					/>
					<Route
						path="/astrologue-cepet-toulouse/blog/developpement-personnel"
						element={
							<Navigate
								to="/category/blog/developpement-personnel/"
								replace
							/>
						}
					/>
					<Route
						path="/astrologue-cepet-toulouse/blog/developpement-personnel/"
						element={
							<Navigate
								to="/category/blog/developpement-personnel/"
								replace
							/>
						}
					/>

					{/* Anciennes URLs simples (redirections internes) */}
					<Route
						path="/mon-approche"
						element={
							<Navigate to="/approche-therapeutique" replace />
						}
					/>
					<Route
						path="/services"
						element={
							<Navigate to="/therapie-energetique" replace />
						}
					/>
					<Route
						path="/astrologie"
						element={<Navigate to="/astrologie-toulouse" replace />}
					/>
					<Route
						path="/reiki"
						element={<Navigate to="/reiki-toulouse" replace />}
					/>
					<Route
						path="/accompagnement"
						element={
							<Navigate to="/accompagnement-toulouse" replace />
						}
					/>
					<Route
						path="/a-propos"
						element={<Navigate to="/emilie-perez" replace />}
					/>

					{/* WordPress article URLs at root level (dynamic check) */}
					{/* Cette route attrape les slugs à la racine et vérifie s'ils sont des articles WP */}
					<Route path="/:slug" element={<ArticleRedirect />} />

					<Route path="*" element={<NotFound />} />
				</Routes>
			</PageTransition>
			<ScrollToTop />
			<FloatingCTA />
			<CookieBanner />
		</>
	);
};

const App = () => {
	const [showLoader, setShowLoader] = useState(false);

	// Initialize GA4 on mount
	useEffect(() => {
		initGA();
	}, []);

	// Show loader only if page takes more than 1.5s to load
	useEffect(() => {
		const loadStartTime = performance.now();

		const checkLoadTime = () => {
			const loadTime = performance.now() - loadStartTime;
			// If page took more than 1.5s, show loader
			if (loadTime > 1500 && document.readyState !== "complete") {
				setShowLoader(true);
			}
		};

		// Check after 1.5s if page is still loading
		const timer = setTimeout(checkLoadTime, 1500);

		// If page loads before 1.5s, don't show loader
		const handleLoad = () => {
			clearTimeout(timer);
			setShowLoader(false);
		};

		if (document.readyState === "complete") {
			clearTimeout(timer);
		} else {
			window.addEventListener("load", handleLoad);
		}

		return () => {
			clearTimeout(timer);
			window.removeEventListener("load", handleLoad);
		};
	}, []);

	const handleLoaderComplete = useCallback(() => {
		setShowLoader(false);
	}, []);

	return (
		<HelmetProvider>
			<QueryClientProvider client={queryClient}>
				<TooltipProvider>
					<Toaster />
					<Sonner />
					<BrowserRouter>
						{/* Show loader only if loading takes more than 1.5s */}
						{showLoader && (
							<AppLoader
								onComplete={handleLoaderComplete}
								minDisplayTime={500}
							/>
						)}

						<AppContent />
					</BrowserRouter>
				</TooltipProvider>
			</QueryClientProvider>
		</HelmetProvider>
	);
};

export default App;
