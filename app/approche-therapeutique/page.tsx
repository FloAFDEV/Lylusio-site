import { Metadata } from 'next';
import MonApproche from '@/src/page-components/MonApproche';
import { generateMetadata as genMeta } from '@/content/seo';

export const metadata: Metadata = genMeta('approche');

export default function ApprochePage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Mon Approche - Accompagnement des Femmes en Transition",
    "description": "J'accompagne les femmes en période de transition : astrologie thérapeutique, Reiki et parole consciente. En cabinet à Cépet (Toulouse Nord) ou à distance.",
    "author": {
      "@type": "Person",
      "@id": "https://lylusio.fr/emilie-perez#person",
      "name": "Émilie Perez",
      "url": "https://lylusio.fr/emilie-perez"
    },
    "publisher": {
      "@type": "Organization",
      "@id": "https://lylusio.fr/#local-business",
      "name": "Lylusio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://lylusio.fr/assets/logo-lylusio.webp"
      }
    },
    "image": "https://lylusio.fr/assets/approche-arbre.webp",
    "datePublished": "2024-01-01",
    "dateModified": "2026-09-24",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://lylusio.fr/approche-therapeutique"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": "https://lylusio.fr"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Mon Approche Thérapeutique",
        "item": "https://lylusio.fr/approche-therapeutique"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <MonApproche />
    </>
  );
}
