import { Metadata } from 'next';
import Reiki from '@/src/page-components/Reiki';
import { generateMetadata as genMeta } from '@/content/seo';
import { generateServiceSchema } from '@/content/schema';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = genMeta('reiki');

export default function ReikiPage() {
  const serviceSchema = generateServiceSchema({
    name: 'Reiki Usui',
    description: 'Soins énergétiques Reiki Usui et formations certifiantes (1er, 2ème et 3ème degré)',
    url: 'https://lylusio.fr/reiki-toulouse',
    image: 'https://lylusio.fr/assets/reiki-histoire.webp',
    price: '70',
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
        "name": "Reiki Toulouse",
        "item": "https://lylusio.fr/reiki-toulouse"
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
      <Reiki />
    </>
  );
}
