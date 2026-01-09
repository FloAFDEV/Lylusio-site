import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// Configuration stricte pour Next.js 15
	reactStrictMode: true,

	// Optimisations
	compress: true,
	poweredByHeader: false,

	// Experimental features pour meilleures performances
	experimental: {
		optimizePackageImports: [
			"lucide-react",
			"@radix-ui/react-icons",
			"react-icons/fa",
		],
		webpackBuildWorker: true,
		optimizeCss: true, // Inline critical CSS
		webpackMemoryOptimizations: true,
	},

	// Turbopack configuration (Next.js 16+)
	turbopack: {},

	// Support des images externes
	images: {
		remotePatterns: [
			// Images WordPress via Edge Function
			{
				protocol: "https",
				hostname: "lylusio.fr",
				pathname: "/api/wp-image",
			},
			// Images locales (assets)
			{
				protocol: "https",
				hostname: "lylusio.fr",
				pathname: "/assets/**",
			},
			{
				protocol: "https",
				hostname: "lylusio.fr",
				pathname: "/*.{jpg,jpeg,png,webp,svg}",
			},
			// YouTube thumbnails
			{
				protocol: "https",
				hostname: "i.ytimg.com",
				pathname: "/vi/**",
			},
			// WordPress direct (fallback - devrait passer par Edge Function)
			{
				protocol: "https",
				hostname: "admin.lylusio.fr",
				pathname: "/wp-content/uploads/**",
			},
		],
		formats: ["image/avif", "image/webp"],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		minimumCacheTTL: 31536000, // 1 year cache for optimized images
		dangerouslyAllowSVG: true,
		contentDispositionType: "attachment",
		contentSecurityPolicy:
			"default-src 'self'; script-src 'none'; sandbox;",
		// Configure quality levels used in the app
		qualities: [50, 65, 75, 85, 95],
		unoptimized: false,
		// Loader personnalisé pour les images WordPress
		loader: "default",
	},

	// Redirections WordPress
	async redirects() {
		return [
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
			{
				source: "/astrologue-cepet-toulouse/accompagnements/:path*",
				destination: "/accompagnement-toulouse",
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

			// Redirections catégories blog WordPress
			{
				source: "/astrologue-cepet-toulouse/blog/astrologie/:path*",
				destination: "/category/blog/astrologie/",
				permanent: true,
			},
			{
				source: "/astrologue-cepet-toulouse/blog/reiki/:path*",
				destination: "/category/blog/reiki/",
				permanent: true,
			},
			{
				source: "/astrologue-cepet-toulouse/blog/developpement-personnel/:path*",
				destination: "/category/blog/developpement-personnel/",
				permanent: true,
			},

			// Anciennes URLs simples (redirections internes)
			{
				source: "/mon-approche",
				destination: "/approche-therapeutique",
				permanent: true,
			},
			{
				source: "/services",
				destination: "/accompagnement-toulouse",
				permanent: true,
			},
			{
				source: "/therapie-energetique",
				destination: "/accompagnement-toulouse",
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
				source: "/accompagnement",
				destination: "/accompagnement-toulouse",
				permanent: true,
			},
			{
				source: "/a-propos",
				destination: "/emilie-perez",
				permanent: true,
			},
		];
	},

	// Headers de sécurité et performance
	async headers() {
		return [
			{
				source: "/:path*",
				headers: [
					// 🔒 HSTS - Force HTTPS avec preload
					{
						key: "Strict-Transport-Security",
						value: "max-age=63072000; includeSubDomains; preload",
					},

					// 🔒 CSP - Content Security Policy COMPLET
					{
						key: "Content-Security-Policy",
						value: [
							"default-src 'self'",
							"script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://region1.google-analytics.com https://calendly.com",
							"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
							"font-src 'self' https://fonts.gstatic.com data:",
							"img-src 'self' data: https: blob:",
							"media-src 'self' https:",
							"connect-src 'self' https://lylusio.fr https://admin.lylusio.fr https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://region1.analytics.google.com",
							"frame-src 'self' https://calendly.com https://www.youtube.com https://www.youtube-nocookie.com",
							"object-src 'none'",
							"base-uri 'self'",
							"form-action 'self'",
							"frame-ancestors 'self'",
							"upgrade-insecure-requests",
						].join("; "),
					},

					// 🔒 Clickjacking protection
					{
						key: "X-Frame-Options",
						value: "SAMEORIGIN",
					},

					// 🔒 MIME type sniffing protection
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},

					// 🔒 XSS Filter (legacy mais utile)
					{
						key: "X-XSS-Protection",
						value: "1; mode=block",
					},

					// 🔒 Referrer Policy
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},

					// 🔒 Permissions Policy (étendu)
					{
						key: "Permissions-Policy",
						value: "camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(self), usb=()",
					},

					// ⚡ Performance
					{
						key: "X-DNS-Prefetch-Control",
						value: "on",
					},
				],
			},
			// Cache headers for static assets
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
			// Cache headers for JS and CSS chunks
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
