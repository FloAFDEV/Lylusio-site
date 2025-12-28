const baseUrl = 'https://lylusio.fr';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Lylusio',
  url: baseUrl,
  logo: `${baseUrl}/assets/logo-lylusio.webp`,
  description: 'Cabinet d\'astrologie psychologique et de Reiki à Toulouse',
  email: 'contact@lylusio.fr',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Toulouse',
    addressRegion: 'Occitanie',
    addressCountry: 'FR',
  },
  sameAs: [
    'https://www.instagram.com/lylusio',
    'https://www.facebook.com/lylusio',
  ],
};

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Émilie Perez',
  url: `${baseUrl}/emilie-perez`,
  image: `${baseUrl}/assets/logo-lylusio.webp`,
  jobTitle: 'Astrologue & Praticienne Reiki',
  worksFor: organizationSchema,
  description: 'Praticienne en astrologie psychologique et Reiki Usui à Toulouse',
  knowsAbout: ['Astrologie psychologique', 'Reiki Usui', 'Accompagnement holistique', 'Développement personnel'],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Toulouse',
    addressRegion: 'Occitanie',
    addressCountry: 'FR',
  },
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Lylusio',
  url: baseUrl,
  description: 'Cabinet d\'astrologie psychologique et de Reiki à Toulouse',
  publisher: organizationSchema,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${baseUrl}/blog?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Lylusio',
  image: `${baseUrl}/assets/logo-lylusio.webp`,
  '@id': baseUrl,
  url: baseUrl,
  telephone: '+33-X-XX-XX-XX-XX', // À remplacer par le vrai numéro
  email: 'contact@lylusio.fr',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Toulouse', // À compléter si adresse publique
    addressLocality: 'Toulouse',
    postalCode: '31000',
    addressRegion: 'Occitanie',
    addressCountry: 'FR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 43.604652,
    longitude: 1.444209,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '19:00',
    },
  ],
  priceRange: '€€',
  description: 'Cabinet d\'astrologie psychologique, Reiki et accompagnement holistique à Toulouse',
  sameAs: [
    'https://www.instagram.com/lylusio',
    'https://www.facebook.com/lylusio',
  ],
};

export interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  image?: string;
  price?: string;
}

export function generateServiceSchema(props: ServiceSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: props.name,
    name: props.name,
    description: props.description,
    provider: organizationSchema,
    areaServed: {
      '@type': 'City',
      name: 'Toulouse',
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: props.url,
      serviceLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Toulouse',
          addressCountry: 'FR',
        },
      },
    },
    ...(props.image && { image: props.image }),
    ...(props.price && {
      offers: {
        '@type': 'Offer',
        price: props.price,
        priceCurrency: 'EUR',
      },
    }),
  };
}

export interface BlogPostSchemaProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}

export function generateBlogPostSchema(props: BlogPostSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: props.title,
    description: props.description,
    url: props.url,
    image: props.image || `${baseUrl}/assets/logo-lylusio.webp`,
    datePublished: props.datePublished,
    dateModified: props.dateModified || props.datePublished,
    author: {
      '@type': 'Person',
      name: props.author || 'Émilie Perez',
      url: `${baseUrl}/emilie-perez`,
    },
    publisher: organizationSchema,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': props.url,
    },
  };
}

export interface FAQSchemaItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(items: FAQSchemaItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

// Schema HowTo pour le parcours d'accompagnement
export const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Comment se déroule un accompagnement chez Lylusio',
  description: 'Votre parcours en 3 étapes pour un accompagnement holistique personnalisé en astrologie et Reiki',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Échange initial',
      text: 'Un premier contact pour comprendre vos besoins et définir ensemble l\'accompagnement adapté.',
      url: `${baseUrl}/contact`,
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Séance sur-mesure',
      text: 'En cabinet à Cépet (Toulouse Nord) ou en ligne, une séance sur-mesure en astrologie ou Reiki selon vos attentes.',
      url: `${baseUrl}/accompagnement-toulouse`,
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Suivi bienveillant',
      text: 'Un accompagnement dans la durée pour intégrer les prises de conscience et avancer sereinement.',
      url: `${baseUrl}/approche-therapeutique`,
    },
  ],
  totalTime: 'PT1H',
  tool: ['Astrologie psychologique', 'Reiki Usui', 'Écoute profonde'],
};
