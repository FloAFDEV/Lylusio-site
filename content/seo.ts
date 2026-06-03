import { Metadata } from 'next';

const baseUrl = 'https://lylusio.fr';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Lylusio - Astrologie & Thérapie Énergétique à Toulouse',
    template: '%s | Lylusio',
  },
  description: 'Émilie Perez, astrologue et praticienne Reiki à Cépet (Toulouse Nord). Thème natal, soins énergétiques et accompagnement holistique en cabinet ou à distance.',
  keywords: ['astrologie', 'reiki', 'thérapie énergétique', 'Toulouse', 'accompagnement holistique', 'thème natal', 'développement personnel'],
  authors: [{ name: 'Émilie Perez' }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: baseUrl,
    siteName: 'Lylusio',
    title: 'Lylusio - Astrologie & Thérapie Énergétique à Toulouse',
    description: 'Émilie Perez, astrologue certifiée en astrologie humaniste, praticienne Reiki et accompagnement holistique à Toulouse.',
    images: [
      {
        url: '/assets/logo-lylusio.webp',
        width: 1200,
        height: 630,
        alt: 'Lylusio - Astrologie & Reiki Toulouse',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lylusio - Astrologie & Thérapie Énergétique',
    description: 'Émilie Perez, astrologue certifiée et praticienne Reiki à Toulouse',
    images: ['/assets/logo-lylusio.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const pageMetadata = {
  home: {
    title: 'Lylusio - Astrologie & Thérapie Énergétique à Toulouse',
    description: 'Émilie Perez, astrologue certifiée, accompagne les femmes en transition avec astrologie humaniste, Reiki et écoute profonde. Consultations de thème natal sur-mesure en cabinet à Cépet (Toulouse Nord) ou en ligne.',
    canonical: baseUrl,
    openGraph: {
      url: baseUrl,
      title: 'Lylusio - Accompagnement Holistique pour Femmes en Transition | Toulouse',
      description: 'Astrologie psychologique, Reiki Usui et accompagnement personnalisé. Séances sur-mesure en cabinet à Cépet ou en ligne. Parcours en 3 étapes : échange initial, séance adaptée, suivi bienveillant.',
      images: [{ url: '/assets/emilie-about.webp', width: 1200, height: 630 }],
    },
  },

  astrologie: {
    title: 'Astrologie Psychologique à Toulouse - Consultation Thème Natal',
    description: 'Consultation astrologique à Cépet et Toulouse : thème natal, transit, révolution solaire. Explorez votre carte du ciel avec Émilie Perez, astrologue certifiée.',
    canonical: `${baseUrl}/astrologie-toulouse`,
    keywords: ['astrologie toulouse', 'thème natal', 'astrologue toulouse', 'carte du ciel', 'consultation astrologique', 'astrologie thérapeutique'],
    openGraph: {
      url: `${baseUrl}/astrologie-toulouse`,
      title: 'Astrologie Psychologique à Toulouse',
      description: 'Consultation de thème natal, transits et révolution solaire avec Émilie Perez',
      images: [{ url: '/assets/travail-astro.webp', width: 1200, height: 630 }],
    },
  },

  reiki: {
    title: 'Reiki Usui à Toulouse - Soins Énergétiques & Formation',
    description: 'Praticienne Reiki Usui à Cépet, au nord de Toulouse. Soins énergétiques en cabinet et à distance. Formations Reiki 1er, 2ème et 3ème degré.',
    canonical: `${baseUrl}/reiki-toulouse`,
    keywords: ['reiki toulouse', 'soin énergétique', 'reiki usui', 'formation reiki', 'praticien reiki toulouse'],
    openGraph: {
      url: `${baseUrl}/reiki-toulouse`,
      title: 'Reiki Usui à Toulouse - Soins & Formations',
      description: 'Soins énergétiques Reiki et formations certifiantes avec Émilie Perez',
      images: [{ url: '/assets/reiki-histoire.webp', width: 1200, height: 630 }],
    },
  },

  accompagnement: {
    title: 'Accompagnement Holistique à Toulouse - Thérapie Énergétique',
    description: 'Accompagnement personnalisé combinant astrologie, Reiki et développement personnel. En cabinet à Cépet (Toulouse Nord) ou à distance.',
    canonical: `${baseUrl}/accompagnement-toulouse`,
    keywords: ['accompagnement holistique toulouse', 'thérapie énergétique', 'développement personnel', 'coaching holistique'],
    openGraph: {
      url: `${baseUrl}/accompagnement-toulouse`,
      title: 'Accompagnement Holistique à Toulouse',
      description: 'Accompagnement personnalisé alliant astrologie, Reiki et développement personnel',
      images: [{ url: '/assets/seance-astro.webp', width: 1200, height: 630 }],
    },
  },

  therapieHolistique: {
    title: 'Thérapeute Holistique à Toulouse - Thérapie Holistique',
    description: 'Thérapie holistique à Cépet, près de Toulouse : approche globale corps-esprit combinant Reiki, astrologie et accompagnement personnalisé. Émilie Perez, thérapeute holistique certifiée.',
    canonical: `${baseUrl}/therapie-holistique`,
    keywords: ['thérapie holistique toulouse', 'thérapeute holistique toulouse', 'soins holistiques toulouse', 'accompagnement holistique', 'thérapie énergétique holistique', 'approche holistique corps-esprit'],
    openGraph: {
      url: `${baseUrl}/therapie-holistique`,
      title: 'Thérapeute Holistique à Toulouse - Thérapie Holistique',
      description: 'Approche globale corps-esprit combinant Reiki, astrologie et accompagnement personnalisé pour retrouver équilibre et harmonie',
      images: [{ url: '/assets/golden-mandala-holistic.webp', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Thérapeute Holistique à Toulouse - Thérapie Holistique',
      description: 'Approche globale corps-esprit combinant Reiki, astrologie et accompagnement personnalisé pour retrouver équilibre et harmonie',
      images: ['/assets/golden-mandala-holistic.webp'],
    },
  },

  approche: {
    title: 'Approche Thérapeutique Holistique - Astrologie & Reiki',
    description: 'Découvrez mon approche holistique combinant astrologie thérapeutique et Reiki. Accompagnement global et bienveillant, en cabinet à Cépet (Toulouse Nord) ou à distance.',
    canonical: `${baseUrl}/approche-therapeutique`,
    openGraph: {
      url: `${baseUrl}/approche-therapeutique`,
      title: 'Mon Approche Thérapeutique Holistique',
      description: 'Une approche intégrative alliant astrologie, Reiki et développement personnel',
      images: [{ url: '/assets/approche-arbre.webp', width: 1200, height: 630 }],
    },
  },

  emilie: {
    title: 'Émilie Perez - Astrologue & Praticienne Reiki à Toulouse',
    description: 'Émilie Perez, astrologue certifiée en astrologie humaniste et praticienne Reiki Usui 3ème degré, en cabinet à Cépet au nord de Toulouse. Mon parcours, mes formations et ma vision de l\'accompagnement astrologique holistique.',
    canonical: `${baseUrl}/emilie-perez`,
    keywords: ['émilie perez', 'astrologue toulouse', 'praticienne reiki toulouse', 'thérapeute énergétique'],
    openGraph: {
      url: `${baseUrl}/emilie-perez`,
      title: 'Émilie Perez - Astrologue & Praticienne Reiki',
      description: 'Astrologue certifiée en astrologie humaniste, praticienne Reiki Usui 3ème degré à Cépet (Toulouse Nord). Parcours, formations et vision de l\'accompagnement holistique.',
      images: [{ url: '/assets/logo-lylusio.webp', width: 1200, height: 630 }],
    },
  },

  contact: {
    title: 'Contact - Prendre Rendez-vous à Toulouse',
    description: 'Contactez Émilie Perez pour une consultation en astrologie ou Reiki. Cabinet à Cépet (Toulouse Nord), consultations à distance. Réponse sous 24h.',
    canonical: `${baseUrl}/contact`,
    openGraph: {
      url: `${baseUrl}/contact`,
      title: 'Contacter Émilie Perez - Prendre Rendez-vous à Toulouse',
      description: 'Contactez Émilie Perez pour une consultation en astrologie ou Reiki à Cépet (Toulouse Nord). Séances en cabinet et à distance. Réponse sous 24h.',
      images: [{ url: '/assets/logo-lylusio.webp', width: 1200, height: 630 }],
    },
  },

  blog: {
    title: 'Blog Astrologie & Reiki à Toulouse - Lectures & Réflexions',
    description: 'Articles inspirants et analyses approfondies sur l\'astrologie humaniste, le Reiki et votre cheminement personnel. Blog par Émilie Perez à Toulouse.',
    canonical: `${baseUrl}/blog`,
    keywords: ['blog astrologie toulouse', 'lectures inspirantes reiki', 'réflexions spirituelles', 'articles développement personnel', 'analyses astrologie'],
    openGraph: {
      url: `${baseUrl}/blog`,
      title: 'Blog Astrologie & Reiki - Lectures & Réflexions',
      description: 'Articles inspirants et analyses approfondies sur l\'astrologie humaniste, le Reiki et votre cheminement personnel',
      images: [{ url: '/assets/logo-lylusio.webp', width: 1200, height: 630 }],
    },
  },

  ressources: {
    title: 'Ressources Gratuites - Astrologie & Reiki à Toulouse',
    description: 'Vidéos pédagogiques, ateliers & lives pour enrichir votre chemin. Ressources gratuites sur l\'astrologie et le Reiki par Émilie Perez à Toulouse.',
    canonical: `${baseUrl}/ressources`,
    keywords: ['ressources gratuites astrologie', 'vidéos pédagogiques reiki', 'ateliers lives toulouse', 'contenus pratiques gratuits', 'youtube astrologie'],
    openGraph: {
      url: `${baseUrl}/ressources`,
      title: 'Ressources Gratuites - Astrologie & Reiki',
      description: 'Vidéos pédagogiques, ateliers et lives sur l\'astrologie humaniste et le Reiki par Émilie Perez à Toulouse. Accès gratuit à tous les contenus.',
      images: [{ url: '/assets/logo-lylusio.webp', width: 1200, height: 630 }],
    },
  },

  faq: {
    title: 'Questions Fréquentes - Astrologie, Reiki & Tarifs',
    description: 'Réponses aux questions fréquentes sur les consultations d\'astrologie, les soins Reiki, les tarifs et le déroulement des séances.',
    canonical: `${baseUrl}/faq`,
    openGraph: {
      url: `${baseUrl}/faq`,
      title: 'Questions Fréquentes - Astrologie, Reiki & Tarifs',
      description: 'Réponses sur les consultations d\'astrologie, soins Reiki, tarifs et déroulement des séances avec Émilie Perez à Toulouse.',
      images: [{ url: '/assets/logo-lylusio.webp', width: 1200, height: 630 }],
    },
  },

  mentionsLegales: {
    title: 'Mentions Légales',
    description: 'Mentions légales du site Lylusio.fr - Informations juridiques et éditoriales.',
    canonical: `${baseUrl}/mentions-legales`,
    robots: {
      index: false,
      follow: true,
    },
  },

  confidentialite: {
    title: 'Politique de Confidentialité',
    description: 'Politique de confidentialité et protection des données personnelles du site Lylusio.fr.',
    canonical: `${baseUrl}/confidentialite`,
    robots: {
      index: false,
      follow: true,
    },
  },

  cgu: {
    title: 'Conditions Générales d\'Utilisation',
    description: 'Conditions générales d\'utilisation du site Lylusio.fr.',
    canonical: `${baseUrl}/cgu`,
    robots: {
      index: false,
      follow: true,
    },
  },
};

export function generateMetadata(page: keyof typeof pageMetadata): Metadata {
  const pageMeta = pageMetadata[page];

  const hasOpenGraph = 'openGraph' in pageMeta;

  return {
    title: pageMeta.title,
    description: pageMeta.description,
    keywords: 'keywords' in pageMeta ? pageMeta.keywords : undefined,
    alternates: {
      canonical: pageMeta.canonical,
    },
    ...(hasOpenGraph && {
      openGraph: {
        ...defaultMetadata.openGraph,
        ...pageMeta.openGraph,
        type: 'website',
        locale: 'fr_FR',
        siteName: 'Lylusio',
      },
      twitter: {
        ...defaultMetadata.twitter,
        title: pageMeta.openGraph.title,
        description: pageMeta.openGraph.description,
        images: pageMeta.openGraph.images,
      },
    }),
    robots: 'robots' in pageMeta ? pageMeta.robots : defaultMetadata.robots,
  };
}
