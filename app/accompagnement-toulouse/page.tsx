import { Metadata } from 'next';
import Accompagnement from '@/src/page-components/Accompagnement';
import { generateMetadata as genMeta } from '@/content/seo';
import { generateServiceSchema } from '@/content/schema';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = genMeta('accompagnement');

export default function AccompagnementPage() {
  const serviceSchema = generateServiceSchema({
    name: 'Accompagnement Holistique',
    description: 'Accompagnement personnalisé combinant astrologie, Reiki et développement personnel',
    url: 'https://lylusio.fr/accompagnement-toulouse',
    image: 'https://lylusio.fr/assets/seance-astro.webp',
    price: '110',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Accompagnement />
    </>
  );
}
