const baseUrl = 'https://lylusio.fr';

/**
 * Référence JSON-LD vers le LocalBusiness canonique (source unique de vérité).
 * Défini dans components/SEO/StructuredData.tsx (@id: baseUrl/#local-business).
 * À utiliser partout où un champ provider/publisher/worksFor référence Lylusio —
 * évite d'embarquer les données complètes et garantit la cohérence entre schemas.
 */
const localBusinessRef = { '@id': `${baseUrl}/#local-business` } as const;

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${baseUrl}/#local-business`,
  name: 'Lylusio',
  url: baseUrl,
  logo: {
    '@type': 'ImageObject',
    url: `${baseUrl}/assets/logo-lylusio.webp`,
    width: 490,
    height: 192,
  },
  description: 'Cabinet d\'astrologie thérapeutique et de Reiki à Cépet (Toulouse Nord)',
  email: 'contact@lylusio.fr',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '49 route de Labastide',
    addressLocality: 'Cépet',
    postalCode: '31620',
    addressRegion: 'Occitanie',
    addressCountry: 'FR',
  },
  sameAs: [
    'https://www.instagram.com/lylusio.toulouse',
    'https://www.facebook.com/lylusio',
    'https://www.linkedin.com/company/lylusio',
  ],
};

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${baseUrl}/emilie-perez#person`,
  name: 'Émilie Perez',
  url: `${baseUrl}/emilie-perez`,
  image: {
    '@type': 'ImageObject',
    url: `${baseUrl}/assets/logo-lylusio.webp`,
    width: 400,
    height: 400,
  },
  jobTitle: 'Astrologue & Praticienne Reiki',

  // ✅ SEO Entity: Occupation structurée pour désambiguïsation Google
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Astrologue',
    occupationalCategory: {
      '@type': 'CategoryCode',
      inCodeSet: {
        '@type': 'CategoryCodeSet',
        name: 'ISCO-08',
      },
      codeValue: '3412', // Social work and counselling professionals (inclut astrologues)
    },
    occupationLocation: {
      '@type': 'City',
      name: 'Cépet',
      addressCountry: 'FR',
    },
  },

  // ✅ SEO Entity: Désambiguïsation explicite homonyme
  disambiguatingDescription: 'Astrologue professionnelle spécialisée en astrologie humaniste et psychologique (Lylusio), praticienne Reiki certifiée. Basée à Cépet près de Toulouse. Approche basée sur l\'analyse du thème natal et l\'accompagnement holistique, distincte de la voyance ou médiumnité.',

  // Référence par @id uniquement — évite d'embarquer tout l'organizationSchema
  worksFor: { '@id': `${baseUrl}/#local-business` },

  description: 'Astrologue professionnelle en astrologie humaniste et psychologique, praticienne Reiki Usui 3ème degré à Cépet (Toulouse Nord). Spécialisée dans l\'analyse de thème natal, transits astrologiques et accompagnement holistique.',

  knowsAbout: [
    'Astrologie humaniste',
    'Astrologie psychologique',
    'Thème natal',
    'Transits astrologiques',
    'Révolution solaire',
    'Reiki Usui',
    'Accompagnement holistique',
    'Développement personnel',
  ],

  // ✅ SEO Entity: Compétence linguistique structurée
  knowsLanguage: {
    '@type': 'Language',
    name: 'French',
    alternateName: 'fr',
  },

  address: {
    '@type': 'PostalAddress',
    streetAddress: '49 route de Labastide',
    addressLocality: 'Cépet',
    postalCode: '31620',
    addressRegion: 'Occitanie',
    addressCountry: 'FR',
  },
};

// websiteSchema supprimé : le WebSite canonique est géré dans
// components/SEO/StructuredData.tsx (WebsiteSchema) injecté dans app/layout.tsx.

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
    // Référence par @id — aucun objet dupliqué
    provider: localBusinessRef,
    areaServed: [
      { '@type': 'City', name: 'Cépet' },
      { '@type': 'City', name: 'Toulouse' },
      { '@type': 'AdministrativeArea', name: 'Haute-Garonne' },
      { '@type': 'Country', name: 'France' },
    ],
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: props.url,
      serviceLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '49 route de Labastide',
          addressLocality: 'Cépet',
          postalCode: '31620',
          addressRegion: 'Occitanie',
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
        availability: 'https://schema.org/InStock',
        priceValidUntil: new Date(new Date().getFullYear() + 1, 11, 31)
          .toISOString()
          .split('T')[0],
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
  wordCount?: number;
  hasVideo?: boolean;
}

export function generateBlogPostSchema(props: BlogPostSchemaProps) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: props.title,
    description: props.description,
    url: props.url,
    image: props.image || `${baseUrl}/og-image.jpg`,
    datePublished: props.datePublished,
    dateModified: props.dateModified || props.datePublished,
    inLanguage: 'fr-FR',
    author: {
      '@type': 'Person',
      // Référence par @id vers la fiche Person canonique
      '@id': `${baseUrl}/emilie-perez#person`,
      name: props.author || 'Émilie Perez',
      url: `${baseUrl}/emilie-perez`,
    },
    // Référence par @id — évite d'embarquer tout l'organizationSchema
    publisher: localBusinessRef,
    isPartOf: { '@id': `${baseUrl}/#website` },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': props.url,
    },
  };

  // Ajouter wordCount si disponible
  if (props.wordCount) {
    schema.wordCount = props.wordCount;
  }

  // Ajouter uploadDate si vidéo présente
  if (props.hasVideo) {
    schema.uploadDate = props.datePublished;
    schema.video = {
      '@type': 'VideoObject',
      uploadDate: props.datePublished,
    };
  }

  return schema;
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

// BreadcrumbList schema generator for better SEO
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  // Always include home as first item
  const allItems = [
    { name: 'Accueil', url: baseUrl },
    ...items,
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
