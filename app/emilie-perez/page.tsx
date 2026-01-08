import { Metadata } from 'next';
import About from '@/src/page-components/About';
import { generateMetadata as genMeta } from '@/content/seo';
import { personSchema } from '@/content/schema';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = genMeta('emilie');

export default function EmiliePage() {
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
        "name": "Émilie Perez",
        "item": "https://lylusio.fr/emilie-perez"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <About />
    </>
  );
}
