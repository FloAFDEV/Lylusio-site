/**
 * Structured Data (JSON-LD) — rendu SSR inline
 *
 * ⚠️ Ne pas utiliser next/script ici : strategy="afterInteractive" exclut ces schemas
 *    du HTML initial et les rend invisibles aux crawlers non-JS (Bing, réseaux sociaux).
 *    L'injection inline via dangerouslySetInnerHTML garantit leur présence dans le view-source.
 *
 * Source unique de vérité pour le LocalBusiness.
 * Tous les autres schemas qui référencent Lylusio doivent pointer vers :
 *   "@id": "https://lylusio.fr/#local-business"
 */

const BASE_URL = 'https://lylusio.fr';

// ─── LocalBusiness ────────────────────────────────────────────────────────────
// @type en tableau : LocalBusiness (base) + HealthAndBeautyBusiness (Reiki)
// + ProfessionalService (Astrologie). Permet un matching plus précis dans
// Google Business et les moteurs spécialisés bien-être.
const localBusinessData = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'HealthAndBeautyBusiness', 'ProfessionalService'],
  '@id': `${BASE_URL}/#local-business`,
  name: 'Lylusio',
  alternateName: 'Lylusio - Émilie Perez',
  description:
    'Astrologie humaniste, Reiki et accompagnement holistique à Cépet (Toulouse Nord). Consultation en cabinet ou à distance, accessible depuis Toulouse et Montauban.',
  image: {
    '@type': 'ImageObject',
    url: `${BASE_URL}/og-image.jpg`,
    width: 1200,
    height: 630,
  },
  logo: {
    '@type': 'ImageObject',
    url: `${BASE_URL}/assets/logo-lylusio.webp`,
    width: 400,
    height: 400,
  },
  url: BASE_URL,
  telephone: '+33619151959',
  email: 'contact@lylusio.fr',
  currenciesAccepted: 'EUR',
  paymentAccepted: 'Cash, Credit Card, Bank Transfer',
  knowsLanguage: 'fr',
  founder: {
    '@type': 'Person',
    '@id': `${BASE_URL}/emilie-perez#person`,
    name: 'Émilie Perez',
    jobTitle: 'Astrologue & Praticienne Reiki',
    url: `${BASE_URL}/emilie-perez`,
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '49 route de Labastide',
    addressLocality: 'Cépet',
    addressRegion: 'Occitanie',
    postalCode: '31620',
    addressCountry: 'FR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 43.7349,
    longitude: 1.4678,
  },
  hasMap: 'https://maps.google.com/?q=49+route+de+Labastide+C%C3%A9pet+31620',
  areaServed: [
    { '@type': 'City', name: 'Cépet' },
    { '@type': 'City', name: 'Toulouse' },
    { '@type': 'City', name: 'Montauban' },
    { '@type': 'AdministrativeArea', name: 'Haute-Garonne' },
    { '@type': 'Country', name: 'France' },
  ],
  priceRange: '€€',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '19:00',
    },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+33619151959',
    email: 'contact@lylusio.fr',
    contactType: 'customer service',
    areaServed: 'FR',
    availableLanguage: 'French',
  },
  sameAs: [
    'https://www.instagram.com/lylusio.toulouse',
    'https://www.facebook.com/lylusio',
    'https://www.linkedin.com/company/lylusio',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services Lylusio',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Consultation Astrologique',
          description: 'Lecture de votre thème natal, transits et cycles de vie',
          provider: { '@id': `${BASE_URL}/#local-business` },
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Séance Reiki',
          description: 'Soin énergétique pour libérer les tensions',
          provider: { '@id': `${BASE_URL}/#local-business` },
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Accompagnement Holistique',
          description: 'Coaching personnalisé pour vos transitions de vie',
          provider: { '@id': `${BASE_URL}/#local-business` },
        },
      },
    ],
  },
};

// ─── WebSite ──────────────────────────────────────────────────────────────────
// potentialAction (SearchAction) : signale à Google le moteur de recherche interne.
// Utile pour les sitelinks search box dans les SERPs.
const websiteData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  url: BASE_URL,
  name: 'Lylusio',
  description: 'Astrologie humaniste, Reiki et accompagnement holistique à Toulouse',
  inLanguage: 'fr-FR',
  publisher: { '@id': `${BASE_URL}/#local-business` },
};

// ─── React components (SSR inline) ───────────────────────────────────────────

export function LocalBusinessSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }}
    />
  );
}

export function WebsiteSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
    />
  );
}
