import Script from 'next/script'

export function LocalBusinessSchema() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://lylusio.fr/#organization',
    name: 'Lylusio',
    alternateName: 'Lylusio - Émilie Perez',
    description: 'Astrologie humaniste, Reiki et accompagnement holistique à Toulouse. Consultation en présentiel à Cépet ou à distance.',
    image: 'https://lylusio.fr/og-image.jpg',
    logo: 'https://lylusio.fr/assets/logo-lylusio.webp',
    url: 'https://lylusio.fr',
    telephone: '+33619151959',
    email: 'contact@lylusio.fr',
    founder: {
      '@type': 'Person',
      name: 'Émilie Perez',
      jobTitle: 'Astrologue & Praticienne Reiki',
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
    areaServed: [
      {
        '@type': 'City',
        name: 'Toulouse',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Haute-Garonne',
      },
      {
        '@type': 'Country',
        name: 'France',
      },
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
            provider: {
              '@type': 'LocalBusiness',
              name: 'Lylusio',
            },
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: '80',
            priceCurrency: 'EUR',
            valueAddedTaxIncluded: true,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Séance Reiki',
            description: 'Soin énergétique pour libérer les tensions',
            provider: {
              '@type': 'LocalBusiness',
              name: 'Lylusio',
            },
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: '60',
            priceCurrency: 'EUR',
            valueAddedTaxIncluded: true,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Accompagnement Holistique',
            description: 'Coaching personnalisé pour vos transitions de vie',
            provider: {
              '@type': 'LocalBusiness',
              name: 'Lylusio',
            },
          },
        },
      ],
    },
  }

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}

export function WebsiteSchema() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://lylusio.fr/#website',
    url: 'https://lylusio.fr',
    name: 'Lylusio',
    description: 'Astrologie humaniste, Reiki et accompagnement holistique à Toulouse',
    publisher: {
      '@id': 'https://lylusio.fr/#organization',
    },
    inLanguage: 'fr-FR',
  }

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}
