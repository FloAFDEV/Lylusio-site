import { Metadata } from 'next';
import About from '@/src/page-components/About';
import { generateMetadata as genMeta } from '@/content/seo';
import { personSchema } from '@/content/schema';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = genMeta('emilie');

export default function EmiliePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <About />
    </>
  );
}
