import { Metadata } from 'next';

const baseUrl = 'https://lylusio.fr';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Lylusio - Astrologie & Thérapie Énergétique à Toulouse',
    template: '%s | Lylusio',
  },
  description: 'Émilie Perez, praticienne en astrologie psychologique, Reiki et accompagnement holistique à Toulouse. Consultations en cabinet et à distance.',
  keywords: ['astrologie', 'reiki', 'thérapie énergétique', 'Toulouse', 'accompagnement holistique', 'thème natal', 'développement personnel'],
  authors: [{ name: 'Émilie Perez' }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: baseUrl,
    siteName: 'Lylusio',
    title: 'Lylusio - Astrologie & Thérapie Énergétique à Toulouse',
    description: 'Émilie Perez, praticienne en astrologie psychologique, Reiki et accompagnement holistique à Toulouse.',
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
    description: 'Émilie Perez, praticienne en astrologie et Reiki à Toulouse',
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
    description: 'Émilie Perez accompagne les femmes en transition avec astrologie symbolique, Reiki et écoute profonde. Séances sur-mesure en cabinet à Cépet (Toulouse Nord) ou en ligne. Découvrez votre parcours en 3 étapes.',
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
    description: 'Consultation astrologique à Toulouse : thème natal, transit, révolution solaire. Explorez votre carte du ciel avec Émilie Perez, astrologue certifiée.',
    canonical: `${baseUrl}/astrologie-toulouse`,
    keywords: ['astrologie toulouse', 'thème natal', 'astrologue toulouse', 'carte du ciel', 'consultation astrologique', 'astrologie psychologique'],
    openGraph: {
      url: `${baseUrl}/astrologie-toulouse`,
      title: 'Astrologie Psychologique à Toulouse',
      description: 'Consultation de thème natal, transits et révolution solaire avec Émilie Perez',
      images: [{ url: '/assets/travail-astro.webp', width: 1200, height: 630 }],
    },
  },

  reiki: {
    title: 'Reiki Usui à Toulouse - Soins Énergétiques & Formation',
    description: 'Praticienne Reiki Usui à Toulouse. Soins énergétiques en cabinet et à distance. Formations Reiki 1er, 2ème et 3ème degré.',
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
    description: 'Accompagnement personnalisé combinant astrologie, Reiki et développement personnel à Toulouse. Séances en cabinet ou à distance.',
    canonical: `${baseUrl}/accompagnement-toulouse`,
    keywords: ['accompagnement holistique toulouse', 'thérapie énergétique', 'développement personnel', 'coaching holistique'],
    openGraph: {
      url: `${baseUrl}/accompagnement-toulouse`,
      title: 'Accompagnement Holistique à Toulouse',
      description: 'Accompagnement personnalisé alliant astrologie, Reiki et développement personnel',
      images: [{ url: '/assets/seance-astro.webp', width: 1200, height: 630 }],
    },
  },

  therapieEnergetique: {
    title: 'Thérapie Énergétique à Toulouse - Soins Holistiques',
    description: 'Thérapie énergétique holistique à Toulouse : Reiki, harmonisation des chakras, libération émotionnelle. Approche bienveillante et personnalisée.',
    canonical: `${baseUrl}/therapie-energetique`,
    keywords: ['thérapie énergétique toulouse', 'soins holistiques', 'harmonisation chakras', 'libération émotionnelle'],
    openGraph: {
      url: `${baseUrl}/therapie-energetique`,
      title: 'Thérapie Énergétique à Toulouse',
      description: 'Soins énergétiques holistiques pour harmoniser corps et esprit',
      images: [{ url: '/assets/reiki-histoire.webp', width: 1200, height: 630 }],
    },
  },

  approche: {
    title: 'Mon Approche Thérapeutique - Astrologie & Reiki Holistique',
    description: 'Découvrez mon approche holistique combinant astrologie psychologique et Reiki pour un accompagnement global et bienveillant.',
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
    description: 'Émilie Perez, certifiée en astrologie psychologique et Reiki Usui. Mon parcours, mes formations et ma vision de l\'accompagnement holistique.',
    canonical: `${baseUrl}/emilie-perez`,
    keywords: ['émilie perez', 'astrologue toulouse', 'praticienne reiki toulouse', 'thérapeute énergétique'],
    openGraph: {
      url: `${baseUrl}/emilie-perez`,
      title: 'Émilie Perez - Astrologue & Praticienne Reiki',
      description: 'Mon parcours et ma vision de l\'accompagnement holistique',
      images: [{ url: '/assets/logo-lylusio.webp', width: 1200, height: 630 }],
    },
  },

  contact: {
    title: 'Contact - Prendre Rendez-vous | Lylusio Toulouse',
    description: 'Contactez Émilie Perez pour une consultation en astrologie ou Reiki. Cabinet à Toulouse et consultations à distance. Réponse sous 24h.',
    canonical: `${baseUrl}/contact`,
    openGraph: {
      url: `${baseUrl}/contact`,
      title: 'Contact - Prendre Rendez-vous',
      description: 'Contactez-moi pour une consultation en astrologie ou Reiki',
      images: [{ url: '/assets/logo-lylusio.webp', width: 1200, height: 630 }],
    },
  },

  blog: {
    title: 'Blog Astrologie & Reiki - Articles & Conseils | Lylusio',
    description: 'Articles sur l\'astrologie psychologique, le Reiki, la spiritualité et le développement personnel. Conseils pratiques et réflexions.',
    canonical: `${baseUrl}/blog`,
    openGraph: {
      url: `${baseUrl}/blog`,
      title: 'Blog Astrologie & Reiki',
      description: 'Articles, conseils et réflexions sur l\'astrologie et le Reiki',
      images: [{ url: '/assets/logo-lylusio.webp', width: 1200, height: 630 }],
    },
  },

  ressources: {
    title: 'Ressources Gratuites - Vidéos, Ateliers & Articles | Lylusio',
    description: 'Découvrez mes contenus gratuits : vidéos pédagogiques sur YouTube, ateliers lives sur Instagram, articles de blog approfondis sur l\'astrologie et le Reiki.',
    canonical: `${baseUrl}/ressources`,
    keywords: ['ressources astrologie', 'vidéos reiki', 'ateliers lives', 'contenus gratuits astrologie', 'youtube astrologie toulouse'],
    openGraph: {
      url: `${baseUrl}/ressources`,
      title: 'Ressources Gratuites - Vidéos, Ateliers & Articles',
      description: 'Vidéos pédagogiques, ateliers lives et articles approfondis pour enrichir votre chemin',
      images: [{ url: '/assets/logo-lylusio.webp', width: 1200, height: 630 }],
    },
  },

  faq: {
    title: 'Questions Fréquentes - Astrologie & Reiki | Lylusio',
    description: 'Réponses aux questions fréquentes sur les consultations d\'astrologie, les soins Reiki, les tarifs et le déroulement des séances.',
    canonical: `${baseUrl}/faq`,
    openGraph: {
      url: `${baseUrl}/faq`,
      title: 'Questions Fréquentes - FAQ',
      description: 'Toutes les réponses à vos questions sur mes services',
      images: [{ url: '/assets/logo-lylusio.webp', width: 1200, height: 630 }],
    },
  },

  mentionsLegales: {
    title: 'Mentions Légales | Lylusio',
    description: 'Mentions légales du site Lylusio.fr - Informations juridiques et éditoriales.',
    canonical: `${baseUrl}/mentions-legales`,
    robots: {
      index: false,
      follow: true,
    },
  },

  confidentialite: {
    title: 'Politique de Confidentialité | Lylusio',
    description: 'Politique de confidentialité et protection des données personnelles du site Lylusio.fr.',
    canonical: `${baseUrl}/confidentialite`,
    robots: {
      index: false,
      follow: true,
    },
  },

  cgu: {
    title: 'Conditions Générales d\'Utilisation | Lylusio',
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
