import type { Metadata, Viewport } from "next";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryProvider } from "@/components/providers/query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AnalyticsProvider } from "@/components/providers/analytics-provider";
import {
	LocalBusinessSchema,
	WebsiteSchema,
} from "@/components/SEO/StructuredData";
import ClientComponents from "@/components/ClientComponents";
import PageTransition from "@/components/PageTransition";
import EnvChecker from "@/components/EnvChecker";
import "@/app/globals.css";

/**
 * Phase 3 Optimization: Self-hosted fonts via Fontsource
 * Fonts are now loaded from local npm packages instead of Google Fonts CDN
 * This reduces DNS lookups, improves FCP, and ensures GDPR compliance
 *
 * Font stacks are defined in Tailwind config with proper fallbacks
 */

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
				{/* Preconnect for critical third-party origins - Google Tag Manager */}
				<link
					rel="preconnect"
					href="https://www.googletagmanager.com"
				/>
				<link
					rel="preconnect"
					href="https://www.google-analytics.com"
				/>

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
			<body className="font-body antialiased">
				{/* Skip to main content link for accessibility */}
				<a
					href="#main-content"
					className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-6 focus:py-3 focus:bg-accent focus:text-accent-foreground focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-4 focus:ring-gold/50"
				>
					Aller au contenu principal
				</a>

				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem={false}
					disableTransitionOnChange
				>
					<QueryProvider>
						<TooltipProvider>
							<AnalyticsProvider>
								<PageTransition>{children}</PageTransition>
								<ClientComponents />
								{process.env.NODE_ENV === "development" && (
									<EnvChecker />
								)}
								<Toaster />
								<Sonner />
							</AnalyticsProvider>
						</TooltipProvider>
					</QueryProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
