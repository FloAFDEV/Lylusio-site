import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	compress: true,
	poweredByHeader: false,

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
		// ✅ Ajout pour que quality={50} ou autres fonctionne
		qualities: [40, 50, 65, 75, 85, 90, 95],
	},

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

			// Anciennes URLs simples
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

	async headers() {
		return [
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
							"script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://region1.google-analytics.com https://calendly.com",
							"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
							"font-src 'self' https://fonts.gstatic.com data:",
							"img-src 'self' data: https: blob:",
							"media-src 'self' https:",
							"connect-src 'self' https://lylusio.fr https://admin.lylusio.fr https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://region1.analytics.google.com https://www.google.com https://www.googletagmanager.com",
							"frame-src 'self' https://calendly.com https://www.youtube.com https://www.youtube-nocookie.com https://www.googletagmanager.com https://www.google.com",
							"object-src 'none'",
							"base-uri 'self'",
							"form-action 'self'",
							"frame-ancestors 'self'",
							"upgrade-insecure-requests",
						].join("; "),
					},
					{ key: "X-Frame-Options", value: "SAMEORIGIN" },
					{ key: "X-Content-Type-Options", value: "nosniff" },
					{ key: "X-XSS-Protection", value: "1; mode=block" },
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
