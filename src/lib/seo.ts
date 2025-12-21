/**
 * SEO Utilities - Canonical URL management and SEO helpers
 */

const BASE_URL = "https://lylusio.fr";

/**
 * Generate the canonical URL for a given pathname
 * - Home page keeps trailing slash
 * - Other pages have no trailing slash
 * - Always uses https://
 */
export const getCanonicalUrl = (pathname: string): string => {
  // Normalize pathname
  let normalizedPath = pathname.trim();
  
  // Home page case - keep trailing slash
  if (normalizedPath === "/" || normalizedPath === "") {
    return `${BASE_URL}/`;
  }
  
  // Remove trailing slash for all other pages
  if (normalizedPath.endsWith("/")) {
    normalizedPath = normalizedPath.slice(0, -1);
  }
  
  // Ensure starts with /
  if (!normalizedPath.startsWith("/")) {
    normalizedPath = `/${normalizedPath}`;
  }
  
  return `${BASE_URL}${normalizedPath}`;
};

/**
 * Generate Open Graph URL (same as canonical)
 */
export const getOgUrl = (pathname: string): string => {
  return getCanonicalUrl(pathname);
};

/**
 * SEO configuration per page
 */
export interface PageSEOConfig {
  title: string;
  description: string;
  canonical: string;
  ogType?: "website" | "article" | "profile";
  ogImage?: string;
  keywords?: string;
  noindex?: boolean;
}

/**
 * Default OG image URL
 */
export const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;

/**
 * Site name for Open Graph
 */
export const SITE_NAME = "Lylusio";

/**
 * Default author
 */
export const DEFAULT_AUTHOR = "Émilie Perez - Lylusio";

