import { Metadata } from 'next';
import TherapieHolistique from '@/src/page-components/TherapieHolistique';
import { generateMetadata as genMeta } from '@/content/seo';
import { generateServiceSchema } from '@/content/schema';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = genMeta('therapieHolistique');

export default function TherapieHolistiquePage() {
  const serviceSchema = generateServiceSchema({
    name: 'Thérapie Holistique',
    description: 'Accompagnement holistique combinant Reiki, astrologie psychologique et libération émotionnelle pour un bien-être global corps-esprit',
    url: 'https://lylusio.fr/therapie-holistique',
    image: 'https://lylusio.fr/assets/golden-mandala-holistic.webp',
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
        "name": "Accompagnement",
        "item": "https://lylusio.fr/accompagnement-toulouse"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Thérapie Holistique",
        "item": "https://lylusio.fr/therapie-holistique"
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
      <TherapieHolistique />
    </>
  );
}
