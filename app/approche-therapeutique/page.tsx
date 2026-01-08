import { Metadata } from 'next';
import MonApproche from '@/src/page-components/MonApproche';
import { generateMetadata as genMeta } from '@/content/seo';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = genMeta('approche');

export default function ApprochePage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Mon Approche Thérapeutique Holistique",
    "description": "Découvrez mon approche holistique combinant astrologie psychologique et Reiki pour un accompagnement global et bienveillant.",
    "author": {
      "@type": "Person",
      "name": "Émilie Perez",
      "url": "https://lylusio.fr/emilie-perez"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Lylusio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://lylusio.fr/assets/logo-lylusio.webp"
      }
    },
    "image": "https://lylusio.fr/assets/approche-arbre.webp",
    "datePublished": "2024-01-01",
    "dateModified": "2026-01-08",
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
