/**
 * Layout Constants for consistent spacing
 * Ensures breadcrumbs are always visible below navbar
 */

// Navbar height (in pixels)
export const NAVBAR_HEIGHT = {
  mobile: 64, // 4rem
  desktop: 80, // 5rem
} as const;

// Breadcrumb container height (estimated)
export const BREADCRUMB_HEIGHT = {
  mobile: 56, // ~3.5rem
  desktop: 64, // 4rem
} as const;

// Total top offset needed for content to not be hidden under fixed elements
export const CONTENT_TOP_OFFSET = {
  // Navbar + Breadcrumb + small gap
  mobile: NAVBAR_HEIGHT.mobile + BREADCRUMB_HEIGHT.mobile + 8, // ~128px (pt-32)
  desktop: NAVBAR_HEIGHT.desktop + BREADCRUMB_HEIGHT.desktop + 8, // ~152px (pt-38)
} as const;

/**
 * Tailwind classes for consistent page spacing
 * Use these classes on page sections that appear right after breadcrumbs
 */
export const PAGE_SECTION_CLASSES = {
  // For hero sections or first sections on a page
  hero: 'pt-4 sm:pt-6 md:pt-8',

  // For sections after hero
  section: 'pt-8 sm:pt-12 md:pt-16',

  // For page with no breadcrumb (homepage)
  noBreadcrumb: 'pt-20 sm:pt-24 md:pt-28',
} as const;
