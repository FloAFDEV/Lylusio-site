import { Metadata } from 'next';
import Astrologie from '@/src/page-components/Astrologie';
import { generateMetadata as genMeta } from '@/content/seo';
import { generateServiceSchema } from '@/content/schema';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = genMeta('astrologie');

export default function AstrologiePage() {
  const serviceSchema = generateServiceSchema({
    name: 'Consultation Astrologique',
    description: 'Consultation de thème natal, transits et révolution solaire avec analyse approfondie de votre carte du ciel',
    url: 'https://lylusio.fr/astrologie-toulouse',
    image: 'https://lylusio.fr/assets/travail-astro.webp',
    price: '90',
  });

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
        "name": "Astrologie Toulouse",
        "item": "https://lylusio.fr/astrologie-toulouse"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Astrologie />
    </>
  );
}
