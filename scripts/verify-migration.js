#!/usr/bin/env node

/**
 * Script de vérification de la migration
 * Vérifie que tous les fichiers sont correctement configurés
 */

const fs = require("fs");
const path = require("path");

const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const YELLOW = "\x1b[33m";
const RESET = "\x1b[0m";
const BLUE = "\x1b[34m";

let errorsCount = 0;
let warningsCount = 0;
let successCount = 0;

function log(message, type = "info") {
	const prefix = {
		success: `${GREEN}✓${RESET}`,
		error: `${RED}✗${RESET}`,
		warning: `${YELLOW}⚠${RESET}`,
		info: `${BLUE}ℹ${RESET}`,
	};
	console.log(`${prefix[type]} ${message}`);
}

function checkFileExists(filePath, description) {
	const fullPath = path.join(process.cwd(), filePath);
	if (fs.existsSync(fullPath)) {
		log(`${description} existe`, "success");
		successCount++;
		return true;
	} else {
		log(`${description} manquant : ${filePath}`, "error");
		errorsCount++;
		return false;
	}
}

function checkFileContains(filePath, searchString, description) {
	const fullPath = path.join(process.cwd(), filePath);
	if (!fs.existsSync(fullPath)) {
		log(`Fichier ${filePath} n'existe pas`, "error");
		errorsCount++;
		return false;
	}

	const content = fs.readFileSync(fullPath, "utf8");
	if (content.includes(searchString)) {
		log(`${description} OK`, "success");
		successCount++;
		return true;
	} else {
		log(`${description} manquant dans ${filePath}`, "warning");
		warningsCount++;
		return false;
	}
}

function checkEnvVariable(filePath, variable, expectedValue = null) {
	const fullPath = path.join(process.cwd(), filePath);
	if (!fs.existsSync(fullPath)) {
		log(`Fichier ${filePath} n'existe pas`, "error");
		errorsCount++;
		return false;
	}

	const content = fs.readFileSync(fullPath, "utf8");
	const regex = new RegExp(`${variable}=(.+)`, "i");
	const match = content.match(regex);

	if (match) {
		const value = match[1];
		if (expectedValue && value === expectedValue) {
			log(`Variable ${variable}=${value} OK`, "success");
			successCount++;
			return true;
		} else if (expectedValue && value !== expectedValue) {
			log(
				`Variable ${variable}=${value} devrait être ${expectedValue}`,
				"warning"
			);
			warningsCount++;
			return false;
		} else {
			log(`Variable ${variable} définie`, "success");
			successCount++;
			return true;
		}
	} else {
		log(`Variable ${variable} manquante dans ${filePath}`, "error");
		errorsCount++;
		return false;
	}
}

console.log(
	`${BLUE}=====================================${RESET}`
);
console.log(`${BLUE}🔍 Vérification de la migration${RESET}`);
console.log(
	`${BLUE}=====================================${RESET}\n`
);

// 1. Vérifier les nouveaux fichiers
console.log(`${BLUE}1. Vérification des nouveaux fichiers${RESET}`);
checkFileExists("app/api/wp-image/route.ts", "Edge Function images WordPress");
checkFileExists("lib/wordpress-images.ts", "Helpers transformation images");
checkFileExists("components/WordPressImage.tsx", "Composants React optimisés");
checkFileExists("MIGRATION_GUIDE.md", "Guide de migration");
checkFileExists("README_MIGRATION.md", "Documentation technique");
checkFileExists("EXAMPLES_CORRECTED.md", "Exemples de code");
console.log("");

// 2. Vérifier les variables d'environnement
console.log(`${BLUE}2. Vérification des variables d'environnement${RESET}`);
checkEnvVariable(".env", "NEXT_PUBLIC_WP_API_URL");
checkEnvVariable(".env", "NEXT_PUBLIC_GA_ID", "G-0895ZEQQY4");
checkEnvVariable(".env", "NEXT_PUBLIC_SITE_URL");
console.log("");

// 3. Vérifier next.config.ts
console.log(`${BLUE}3. Vérification de next.config.ts${RESET}`);
checkFileContains(
	"next.config.ts",
	"region1.google-analytics.com",
	"CSP autorise region1.google-analytics.com"
);
checkFileContains(
	"next.config.ts",
	"admin.lylusio.fr",
	"CSP autorise admin.lylusio.fr"
);
checkFileContains(
	"next.config.ts",
	"/api/wp-image",
	"Remote patterns pour Edge Function"
);
console.log("");

// 4. Vérifier hooks/useAnalytics.ts
console.log(`${BLUE}4. Vérification de Google Analytics${RESET}`);
checkFileContains(
	"hooks/useAnalytics.ts",
	"G-0895ZEQQY4",
	"ID Google Analytics configuré"
);
checkFileContains(
	"hooks/useAnalytics.ts",
	"process.env.NEXT_PUBLIC_GA_ID",
	"Variable d'environnement utilisée"
);
console.log("");

// 5. Vérifier lib/wordpress.ts
console.log(`${BLUE}5. Vérification de la configuration WordPress${RESET}`);
checkFileContains(
	"lib/wordpress.ts",
	"admin.lylusio.fr",
	"URL WordPress correcte"
);
console.log("");

// 6. Vérifier les API routes
console.log(`${BLUE}6. Vérification des API routes${RESET}`);
checkFileExists("app/api/posts/route.ts", "API route /api/posts");
checkFileExists("app/api/posts/[slug]/route.ts", "API route /api/posts/[slug]");
checkFileExists("app/api/categories/route.ts", "API route /api/categories");
console.log("");

// 7. Rechercher les problèmes potentiels
console.log(`${BLUE}7. Recherche de problèmes potentiels${RESET}`);

const filesToCheck = [
	"src/page-components/BlogPost.tsx",
	"src/page-components/Blog.tsx",
	"src/page-components/BlogCategory.tsx",
	"components/sections/RecentArticlesSection.tsx",
	"app/blog/page.tsx",
	"app/blog/[slug]/page.tsx",
];

filesToCheck.forEach((file) => {
	const fullPath = path.join(process.cwd(), file);
	if (fs.existsSync(fullPath)) {
		const content = fs.readFileSync(fullPath, "utf8");

		// Vérifier si le fichier utilise encore WP_API_URL directement
		if (content.includes('WP_API_URL + "/posts')) {
			log(
				`${file} utilise encore WP_API_URL directement (devrait utiliser /api/posts)`,
				"warning"
			);
			warningsCount++;
		}

		// Vérifier si le fichier transforme les URLs d'images
		if (
			content.includes("source_url") &&
			!content.includes("getOptimizedImageUrl")
		) {
			log(
				`${file} contient des images WordPress non optimisées (manque getOptimizedImageUrl)`,
				"warning"
			);
			warningsCount++;
		}

		// Vérifier si le fichier importe les helpers
		if (
			content.includes("source_url") &&
			!content.includes("wordpress-images")
		) {
			log(
				`${file} devrait importer les helpers depuis wordpress-images.ts`,
				"warning"
			);
			warningsCount++;
		}
	}
});

console.log("");

// 8. Résumé
console.log(`${BLUE}=====================================${RESET}`);
console.log(`${BLUE}📊 Résumé de la vérification${RESET}`);
console.log(`${BLUE}=====================================${RESET}`);
console.log(`${GREEN}✓ Succès : ${successCount}${RESET}`);
console.log(`${YELLOW}⚠ Avertissements : ${warningsCount}${RESET}`);
console.log(`${RED}✗ Erreurs : ${errorsCount}${RESET}`);
console.log("");

if (errorsCount > 0) {
	console.log(
		`${RED}❌ La migration n'est pas complète. Veuillez corriger les erreurs.${RESET}`
	);
	process.exit(1);
} else if (warningsCount > 0) {
	console.log(
		`${YELLOW}⚠️  La migration de base est OK, mais il reste des fichiers à corriger.${RESET}`
	);
	console.log(
		`${YELLOW}   Consultez MIGRATION_GUIDE.md pour plus de détails.${RESET}`
	);
	process.exit(0);
} else {
	console.log(
		`${GREEN}✅ Tous les vérifications sont passées avec succès !${RESET}`
	);
	console.log(
		`${GREEN}   Vous pouvez maintenant tester avec : npm run dev${RESET}`
	);
	process.exit(0);
}
