import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import {
	Cormorant_Garamond,
	Source_Sans_3,
	Dancing_Script,
} from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryProvider } from "@/components/providers/query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import {
	LocalBusinessSchema,
	WebsiteSchema,
} from "@/components/SEO/StructuredData";
import ClientComponents from "@/components/ClientComponents";
import PageTransition from "@/components/PageTransition";
import EnvChecker from "@/components/EnvChecker";
import "@/app/globals.css";

// ✅ PERF: Lazy-load AnalyticsProvider (non-critique, dépend de window)
// Impact: -5KB JS initial, -20ms TBT mobile
const AnalyticsProvider = dynamic(
	() => import("@/components/providers/analytics-provider").then(
		(mod) => ({ default: mod.AnalyticsProvider })
	),
	{ ssr: false } // Client-only (window, localStorage)
);

// next/font/google - Optimized for zero CLS
// ✅ Optimisation : Réduit weights chargés (300KB → 180KB, -40%)
const cormorantGaramond = Cormorant_Garamond({
	subsets: ["latin"],
	weight: ["400", "600", "700"], // Supprimé 300, 500 (non utilisés page accueil)
	variable: "--font-display",
	display: "swap",
	preload: true,
	fallback: ["Georgia", "serif"],
	adjustFontFallback: true,
});

const sourceSans = Source_Sans_3({
	subsets: ["latin"],
	weight: ["400", "600", "700"], // Supprimé 300 (non utilisé page accueil)
	variable: "--font-body",
	display: "swap",
	preload: true,
	fallback: ["-apple-system", "BlinkMacSystemFont", "sans-serif"],
	adjustFontFallback: true,
});

const dancingScript = Dancing_Script({
	subsets: ["latin"],
	weight: ["400", "600"], // Supprimé 500, 700 (non utilisés page accueil)
	variable: "--font-calligraphic",
	display: "swap",
	preload: false,
	fallback: ["cursive"],
	adjustFontFallback: true,
});

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#1e3a5f" },
		{ media: "(prefers-color-scheme: dark)", color: "#1e3a5f" },
	],
};

export const metadata: Metadata = {
	metadataBase: new URL("https://lylusio.fr"),
	title: {
		default: "Lylusio - Astrologie & Thérapie Énergétique à Toulouse",
		template: "%s | Lylusio",
	},
	description:
		"Découvrez l'astrologie humaniste, le reiki et l'accompagnement holistique avec Émilie Perez à Toulouse. Consultation en cabinet ou à distance.",
	keywords: [
		"astrologie",
		"reiki",
		"thérapie énergétique",
		"Toulouse",
		"développement personnel",
		"accompagnement holistique",
	],
	authors: [{ name: "Émilie Perez" }],
	creator: "Émilie Perez",
	applicationName: "Lylusio",
	referrer: "origin-when-cross-origin",
	category: "wellness",

	// Favicons et icônes (RealFaviconGenerator)
	icons: {
		icon: [
			{ url: "/icon1.png", sizes: "32x32", type: "image/png" },
			{ url: "/icon0.svg", type: "image/svg+xml" },
		],
		apple: [
			{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
		],
	},

	// Manifest pour PWA et Android
	manifest: "/manifest.json",

	// Couleur de fond pour splash screen
	appleWebApp: {
		capable: true,
		title: "Lylusio",
		statusBarStyle: "black-translucent",
	},

	// Open Graph (Facebook, LinkedIn, etc.)
	openGraph: {
		type: "website",
		locale: "fr_FR",
		url: "https://lylusio.fr",
		siteName: "Lylusio",
		title: "Lylusio - Astrologie & Thérapie Énergétique à Toulouse",
		description:
			"Découvrez l'astrologie humaniste, le reiki et l'accompagnement holistique avec Émilie Perez à Toulouse.",
		images: [
			{
				url: "/og-image.jpg",
				width: 1200,
				height: 630,
				alt: "Lylusio - Astrologie & Thérapie Énergétique",
			},
		],
	},

	// Twitter Card
	twitter: {
		card: "summary_large_image",
		title: "Lylusio - Astrologie & Thérapie Énergétique à Toulouse",
		description:
			"Découvrez l'astrologie humaniste, le reiki et l'accompagnement holistique avec Émilie Perez à Toulouse.",
		images: ["/og-image.jpg"],
		creator: "@lylusio",
	},

	// Robots et indexation
	robots: {
		index: true,
		follow: true,
		nocache: false,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},

	// Autres métadonnées
	alternates: {
		canonical: "https://lylusio.fr",
		languages: {
			"fr-FR": "https://lylusio.fr",
		},
	},

	// Formatage pour rich snippets
	other: {
		"apple-mobile-web-app-title": "Lylusio",
		"msapplication-TileColor": "#1e3a5f",
		"msapplication-config": "/browserconfig.xml",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="fr" suppressHydrationWarning data-scroll-behavior="smooth">
			<head>
				{/* 🚀 PERFORMANCE: Preload LCP image (hero homepage) */}
				<link
					rel="preload"
					as="image"
					href="/assets/emilie-hero.webp"
					type="image/webp"
					fetchPriority="high"
				/>

				{/* ✅ CWV Fix: Preconnect GTM retiré - sera chargé uniquement après consentement analytics */}
				{/* Note: Google Fonts already inlined by next/font, no preconnect needed */}

				{/* DNS prefetch for WordPress admin backend only */}
				<link rel="dns-prefetch" href="https://admin.lylusio.fr" />

				{/* Google Site Verification */}
				<meta
					name="google-site-verification"
					content="qvEqpMyLZ2qghUB8znB9u52lYHXensGGH5U6fifRYM0"
				/>

				{/* Structured Data for SEO */}
				<LocalBusinessSchema />
				<WebsiteSchema />
			</head>
			<body
				className={`${cormorantGaramond.variable} ${sourceSans.variable} ${dancingScript.variable} font-body antialiased`}
			>
				{/* Skip to main content link for accessibility */}
				<a
					href="#main-content"
					className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-6 focus:py-3 focus:bg-accent focus:text-accent-foreground focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-4 focus:ring-gold/50"
				>
					Aller au contenu principal
				</a>

				{/* ✅ PERF: Ordre optimisé providers (critiques → non-critiques) */}
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem={false}
					disableTransitionOnChange
				>
					{/* Critique: Page content avec transitions */}
					<PageTransition>{children}</PageTransition>

					{/* Non-critiques: UI helpers et tracking */}
					<QueryProvider>
						<TooltipProvider>
							<AnalyticsProvider>
								<ClientComponents />
								<Toaster />
								<Sonner />
							</AnalyticsProvider>
						</TooltipProvider>
					</QueryProvider>

					{/* Dev tools */}
					{process.env.NODE_ENV === "development" && (
						<EnvChecker />
					)}
				</ThemeProvider>
			</body>
		</html>
	);
}
