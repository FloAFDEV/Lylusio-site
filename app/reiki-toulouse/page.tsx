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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Reiki />
    </>
  );
}
