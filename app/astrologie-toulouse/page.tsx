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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Astrologie />
    </>
  );
}
