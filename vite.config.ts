import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
	server: {
		host: "::",
		port: 8080,
		allowedHosts: true,
	},
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	build: {
		// Optimize chunk splitting for better mobile performance
		rollupOptions: {
			output: {
				manualChunks: {
					// Vendor chunks - loaded on all pages
					"vendor-react": ["react", "react-dom"],
					"vendor-router": ["react-router-dom"],
					// UI components - lazy loaded
					"ui-components": [
						"@radix-ui/react-accordion",
						"@radix-ui/react-dialog",
						"@radix-ui/react-dropdown-menu",
						"@radix-ui/react-popover",
						"@radix-ui/react-tooltip",
					],
				},
			},
		},
		// Reduce chunk size for faster mobile loading
		chunkSizeWarningLimit: 500,
	},
	// Optimize dependencies
	optimizeDeps: {
		include: ["react", "react-dom", "react-router-dom"],
	},
}));
