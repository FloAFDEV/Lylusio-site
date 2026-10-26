import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	compress: true,
	poweredByHeader: false,
	trailingSlash: false,

	// Experimental pour performances et build
	experimental: {
		optimizePackageImports: [
			"lucide-react",
			"@radix-ui/react-icons",
			"react-icons/fa",
			"@radix-ui/react-dialog",
			"@radix-ui/react-dropdown-menu",
			"@radix-ui/react-toast",
			"@radix-ui/react-tooltip",
			"@radix-ui/react-popover",
			"date-fns",
		],
		webpackBuildWorker: true,
		optimizeCss: true,
		webpackMemoryOptimizations: true,
		// CSS critique inline dans HTML
		inlineCss: true,
	},

	compiler: {
		removeConsole:
			process.env.NODE_ENV === "production"
				? { exclude: ["error", "warn"] }
				: false,
	},

	turbopack: {
		root: process.cwd(),
	},

	// Config Images externe (WordPress, YouTube)
	images: {
		remotePatterns: [
			{
				protocol: "http",
				hostname: "admin.lylusio.fr",
				pathname: "/wp-content/uploads/**",
			},
			{
				protocol: "https",
				hostname: "admin.lylusio.fr",
				port: "", // port par défaut HTTPS
				pathname: "/wp-content/uploads/**",
			},
			{
				protocol: "https",
				hostname: "i.ytimg.com",
				pathname: "/vi/**",
			},
		],
		formats: ["image/avif", "image/webp"],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		minimumCacheTTL: 31536000,
		// Ajout pour que quality={50} ou autres fonctionne
		qualities: [40, 50, 55, 65, 75, 85, 90, 95],
	},

	async redirects() {
		return [
		// Domaine Vercel → domaine officiel
		{
			source: "/blog/transition-2025-\u2192-2026-janvier-nest-pas-un-sprint",
			destination: "/blog/transition-2025-2026-janvier-nest-pas-un-sprint",
			permanent: true,
		},
		// Ancienne URL de la page Consultations & Tarifs (route canonique désormais /accompagnement)
		{
			source: "/accompagnement-toulouse/:path*",
			destination: "/accompagnement",
			permanent: true,
		},
		{
			source: "/:path*",
			has: [
				{
					type: "host",
					value: "lylusio-site.vercel.app",
				},
			],
			destination: "https://lylusio.fr/:path*",
			permanent: true,
		},
			
			// Pages principales avec préfixe /astrologue-cepet-toulouse/
			{
				source: "/astrologue-cepet-toulouse/astrologie/:path*",
				destination: "/astrologie-toulouse",
				permanent: true,
			},
			{
				source: "/astrologue-cepet-toulouse/therapie_energetique_reiki/:path*",
				destination: "/reiki-toulouse",
				permanent: true,
			},
			// Ancienne URL Reiki (signalée) : /astrologue-cepet-toulouse/soins_reiki/
			{
				source: "/astrologue-cepet-toulouse/soins_reiki/:path*",
				destination: "/reiki-toulouse",
				permanent: true,
			},
			{
				source: "/astrologue-cepet-toulouse/accompagnements/:path*",
				destination: "/accompagnement",
				permanent: true,
			},
			{
				source: "/astrologue-cepet-toulouse/therapie_energetique_therapie_holistique/:path*",
				destination: "/therapie-holistique",
				permanent: true,
			},
			{
				source: "/astrologue-cepet-toulouse/mon-approche/:path*",
				destination: "/approche-therapeutique",
				permanent: true,
			},
			{
				source: "/astrologue-cepet-toulouse/a-propos/:path*",
				destination: "/emilie-perez",
				permanent: true,
			},
			// Catégories de blog sous l'ancien préfixe → nouvelles catégories
			// (doit être AVANT le catch-all /astrologue-cepet-toulouse/blog/:path*)
			{
				source: "/astrologue-cepet-toulouse/blog/astrologie",
				destination: "/category/blog/astrologie",
				permanent: true,
			},
			{
				source: "/astrologue-cepet-toulouse/blog/reiki",
				destination: "/category/blog/reiki",
				permanent: true,
			},
			{
				source: "/astrologue-cepet-toulouse/blog/developpement-personnel",
				destination: "/category/blog/developpement-personnel",
				permanent: true,
			},
			// Catch-all pour toute autre URL sous l'ancien préfixe blog
			{
				source: "/astrologue-cepet-toulouse/blog/:path*",
				destination: "/blog",
				permanent: true,
			},
			{
				source: "/astrologue-cepet-toulouse/politique-de-confidentialite/:path*",
				destination: "/confidentialite",
				permanent: true,
			},
			{
				source: "/astrologue-cepet-toulouse/newsletter/:path*",
				destination: "/contact",
				permanent: true,
			},
			// Racine de l'ancien site headless → nouvelle page d'accueil
			{
				source: "/astrologue-cepet-toulouse",
				destination: "/",
				permanent: true,
			},
			// Catch-all : toute URL héritée sous l'ancien préfixe non mappée
			// explicitement ci-dessus (les pages connues le sont déjà) → accueil.
			// Placé APRÈS toutes les règles spécifiques /astrologue-cepet-toulouse/*.
			{
				source: "/astrologue-cepet-toulouse/:path*",
				destination: "/",
				permanent: true,
			},

			// ── Structure WordPress encore plus ancienne : préfixe /accueil/ ──
			// (générations antérieures à /astrologue-cepet-toulouse/, retrouvées
			// dans les archives). Mêmes pages, correspondance certaine 1:1.
			{
				source: "/accueil/a-propos/:path*",
				destination: "/emilie-perez",
				permanent: true,
			},
			{
				source: "/accueil/accompagnements/:path*",
				destination: "/accompagnement",
				permanent: true,
			},
			{
				source: "/accueil/mon-approche/:path*",
				destination: "/approche-therapeutique",
				permanent: true,
			},
			{
				source: "/accueil/newsletter/:path*",
				destination: "/contact",
				permanent: true,
			},
			{
				source: "/accueil/politique-de-confidentialite/:path*",
				destination: "/confidentialite",
				permanent: true,
			},
			{
				source: "/accueil/soins_reiki/:path*",
				destination: "/reiki-toulouse",
				permanent: true,
			},
			{
				source: "/accueil/soins_therapie_holistique/:path*",
				destination: "/therapie-holistique",
				permanent: true,
			},
			// Catégories de blog (avant le catch-all /accueil/blog/:path*)
			{
				source: "/accueil/blog/astrologie",
				destination: "/category/blog/astrologie",
				permanent: true,
			},
			{
				source: "/accueil/blog/reiki",
				destination: "/category/blog/reiki",
				permanent: true,
			},
			{
				source: "/accueil/blog/developpement-personnel",
				destination: "/category/blog/developpement-personnel",
				permanent: true,
			},
			{
				source: "/accueil/blog/:path*",
				destination: "/blog",
				permanent: true,
			},
			// Racine + reliquat non mappé → accueil (après les règles spécifiques)
			{
				source: "/accueil",
				destination: "/",
				permanent: true,
			},
			{
				source: "/accueil/:path*",
				destination: "/",
				permanent: true,
			},

			// Anciennes URLs simples
			{
				source: "/mon-approche",
				destination: "/approche-therapeutique",
				permanent: true,
			},
			{
				source: "/services",
				destination: "/accompagnement",
				permanent: true,
			},
			{
				source: "/therapie-energetique",
				destination: "/accompagnement",
				permanent: true,
			},
			{
				source: "/astrologie",
				destination: "/astrologie-toulouse",
				permanent: true,
			},
			{
				source: "/reiki",
				destination: "/reiki-toulouse",
				permanent: true,
			},
			{
				source: "/a-propos",
				destination: "/emilie-perez",
				permanent: true,
			},
		];
	},

	async headers() {
		return [
			// Cache agressif pour page d'accueil (ISR)
			{
				source: "/",
				headers: [
					{
						key: "Cache-Control",
						value: "public, s-maxage=21600, stale-while-revalidate=43200",
					},
				],
			},
			{
				source: "/:path*",
				headers: [
					{
						key: "Strict-Transport-Security",
						value: "max-age=63072000; includeSubDomains; preload",
					},
					{
						key: "Content-Security-Policy",
						value: [
							"default-src 'self'",
							// Google tag (GA4 + destination Google Ads configurée côté Google).
							// 'unsafe-inline' : scripts inline Next.js (pas de nonce). Pas de 'unsafe-eval'.
							"script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://region1.google-analytics.com https://googleads.g.doubleclick.net https://www.googleadservices.com",
							"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.googleadservices.com",
							"font-src 'self' https://fonts.gstatic.com data:",
							// Images : site, médias WordPress, miniatures YouTube, texture de
							// /ressources (transparenttextures.com), pixels Google Ads.
							// Pas de `https:` générique : il laissait passer le ping Ads sans cookie
							// (pagead2.googlesyndication.com) envoyé en image sans consentement Marketing.
							"img-src 'self' data: blob: https://admin.lylusio.fr https://i.ytimg.com https://www.transparenttextures.com https://www.google.com https://googleads.g.doubleclick.net https://www.googleadservices.com",
							"media-src 'self' https:",
							// GA4 + Google Ads. ad.doubleclick.net et stats.g.doubleclick.net ne sont
							// utilisés qu'avec le consentement Marketing (ad_storage granted).
							// pagead2.googlesyndication.com volontairement absent (ici et dans img-src) :
							// il ne reçoit que les pings sans cookie émis sans consentement Marketing.
							"connect-src 'self' https://lylusio.fr https://admin.lylusio.fr https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://region1.analytics.google.com https://www.google.com https://www.googletagmanager.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://ad.doubleclick.net https://stats.g.doubleclick.net",
							// Google Ads iframes
							"frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://www.googletagmanager.com https://www.google.com https://bid.g.doubleclick.net",
							"object-src 'none'",
							"base-uri 'self'",
							"form-action 'self'",
							"frame-ancestors 'self'",
							"upgrade-insecure-requests",
						].join("; "),
					},
					{ key: "X-Frame-Options", value: "SAMEORIGIN" },
					{ key: "X-Content-Type-Options", value: "nosniff" },
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
					{
						key: "Permissions-Policy",
						value: "camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(self), usb=()",
					},
					{ key: "X-DNS-Prefetch-Control", value: "on" },
				],
			},
			{
				source: "/assets/:path*",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
			{
				source: "/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2)",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
			{
				source: "/_next/static/:path*",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
		];
	},
};

export default nextConfig;
