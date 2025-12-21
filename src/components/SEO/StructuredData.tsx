import { Helmet } from "react-helmet-async";

const StructuredData = () => {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://lylusio.fr/#business",
    name: "Lylusio - Émilie Perez",
    alternateName: "Lylusio Astrologie Reiki Toulouse",
    description: "Astrologue humaniste et praticienne Reiki 3ème degré à Toulouse et Cépet (31). Consultations en astrologie symbolique, séances de thérapie énergétique Reiki et accompagnement des transitions de vie.",
    url: "https://lylusio.fr",
    telephone: "+33619151959",
    email: "contact@lylusio.fr",
    image: "https://lylusio.fr/og-image.jpg",
    logo: "https://lylusio.fr/favicon.png",
    priceRange: "€€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Espèces, Virement bancaire",
    address: {
      "@type": "PostalAddress",
      streetAddress: "49 route de Labastide",
      addressLocality: "Cépet",
      postalCode: "31620",
      addressRegion: "Occitanie",
      addressCountry: "FR"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.7484,
      longitude: 1.4298
    },
    areaServed: [
      { "@type": "City", name: "Toulouse" },
      { "@type": "City", name: "Cépet" },
      { "@type": "City", name: "Fronton" },
      { "@type": "City", name: "Villaudric" },
      { "@type": "City", name: "Bouloc" },
      { "@type": "AdministrativeArea", name: "Haute-Garonne" },
      { "@type": "AdministrativeArea", name: "Occitanie" }
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "17:00"
      }
    ],
    sameAs: [
      "https://www.facebook.com/lylusio/",
      "https://www.instagram.com/emilie.perez_astroreiki_/"
    ],
    founder: {
      "@type": "Person",
      name: "Émilie Perez",
      jobTitle: "Astrologue et Praticienne Reiki",
      description: "Astrologue humaniste et praticienne Reiki Usui 3ème degré"
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services Lylusio",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Lecture de Thème Natal",
            description: "Consultation astrologique approfondie - 1h30 à 2h",
            url: "https://lylusio.fr/astrologie-toulouse"
          },
          price: "90",
          priceCurrency: "EUR"
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Lecture de Thème Natal avec support écrit",
            description: "Consultation astrologique avec document personnalisé",
            url: "https://lylusio.fr/astrologie-toulouse"
          },
          price: "120",
          priceCurrency: "EUR"
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Lecture des Transits",
            description: "Analyse des cycles planétaires actuels - 1h",
            url: "https://lylusio.fr/astrologie-toulouse"
          },
          price: "60",
          priceCurrency: "EUR"
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Séance Reiki en présentiel",
            description: "Soin énergétique Reiki Usui au cabinet - 1h",
            url: "https://lylusio.fr/reiki-toulouse"
          },
          price: "60",
          priceCurrency: "EUR"
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Séance Reiki à distance",
            description: "Soin énergétique Reiki Usui en visio - 45min à 1h",
            url: "https://lylusio.fr/reiki-toulouse"
          },
          price: "50",
          priceCurrency: "EUR"
        }
      ]
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "47",
      bestRating: "5",
      worstRating: "1"
    }
  };

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://lylusio.fr/#person",
    name: "Émilie Perez",
    givenName: "Émilie",
    familyName: "Perez",
    jobTitle: "Astrologue et Praticienne Reiki",
    description: "Astrologue humaniste et praticienne Reiki Usui 3ème degré à Toulouse et Cépet. Spécialisée dans l'accompagnement des femmes en transition de vie.",
    url: "https://lylusio.fr/emilie-perez",
    image: "https://lylusio.fr/og-image.jpg",
    sameAs: [
      "https://www.facebook.com/lylusio/",
      "https://www.instagram.com/emilie.perez_astroreiki_/"
    ],
    worksFor: {
      "@id": "https://lylusio.fr/#business"
    },
    knowsAbout: [
      "Astrologie symbolique",
      "Astrologie psychologique", 
      "Reiki Usui",
      "Thérapie énergétique",
      "Développement personnel",
      "Accompagnement thérapeutique"
    ]
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://lylusio.fr/#website",
    url: "https://lylusio.fr",
    name: "Lylusio",
    description: "Astrologie et Reiki à Toulouse et Cépet avec Émilie Perez",
    publisher: {
      "@id": "https://lylusio.fr/#business"
    },
    inLanguage: "fr-FR"
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: "https://lylusio.fr/"
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(localBusiness)}</script>
      <script type="application/ld+json">{JSON.stringify(person)}</script>
      <script type="application/ld+json">{JSON.stringify(website)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
    </Helmet>
  );
};

export default StructuredData;
