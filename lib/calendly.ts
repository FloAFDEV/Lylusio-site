/**
 * Centralized Calendly URL Configuration
 *
 * This file contains all Calendly booking links used across the application.
 * Using a centralized config ensures:
 * - Consistency across the entire site
 * - Easy updates when URLs change
 * - Better analytics tracking
 * - Dynamic month parameter for better user experience
 */

// Base Calendly URL
const CALENDLY_BASE = "https://calendly.com/lylusio-fr";

// Get current month parameter (format: YYYY-MM)
const getCurrentMonth = (): string => {
	const now = new Date();
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, "0");
	return `${year}-${month}`;
};

/**
 * Calendly URLs for different services
 */
export const CALENDLY_URLS = {
	/**
	 * General booking page (shows all available services)
	 */
	GENERAL: CALENDLY_BASE,

	/**
	 * Astrology Services
	 */
	THEME_NATAL: `${CALENDLY_BASE}/themenatal?month=${getCurrentMonth()}`,
	TRANSITS: `${CALENDLY_BASE}/consultation-d-astrologie-energies-de-l-annee?month=${getCurrentMonth()}`, // Same as Theme Natal for now
	BILAN_PRO: `${CALENDLY_BASE}/bilan-astro-orientationpro?month=${getCurrentMonth()}`, // Same as Theme Natal for now

	/**
	 * Reiki Energy Healing
	 */
	REIKI: `${CALENDLY_BASE}/soin-energetique-reiki?month=${getCurrentMonth()}`,

	/**
	 * Holistic Accompaniment (combines Astrology + Reiki)
	 */
	ACCOMPAGNEMENT_GLOBAL: `${CALENDLY_BASE}/accompagnement-global?month=${getCurrentMonth()}`,
} as const;

/**
 * Get a Calendly URL by service type
 * @param service - The service type
 * @returns The complete Calendly booking URL
 */
export const getCalendlyUrl = (service: keyof typeof CALENDLY_URLS): string => {
	return CALENDLY_URLS[service];
};

/**
 * Open Calendly in a new window/tab
 * @param service - The service type
 */
export const openCalendly = (service: keyof typeof CALENDLY_URLS): void => {
	if (typeof window !== "undefined") {
		window.open(getCalendlyUrl(service), "_blank", "noopener,noreferrer");
	}
};

// Export for convenience
export default CALENDLY_URLS;
