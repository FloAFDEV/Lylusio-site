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
			{
				protocol: "https",
				hostname: "lylusio.fr",
				pathname: "/wp-content/**",
			},
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
			{
				protocol: "https",
				hostname: "i.ytimg.com",
				pathname: "/vi/**",
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
					// Performance headers
					{
						key: "X-DNS-Prefetch-Control",
						value: "on",
					},
					// Security headers
					{
						key: "X-Frame-Options",
						value: "SAMEORIGIN",
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
					{
						key: "Permissions-Policy",
						value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
					},
					{
						key: "Strict-Transport-Security",
						value: "max-age=31536000; includeSubDomains",
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
