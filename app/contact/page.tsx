import { Metadata } from 'next';
import Contact from '@/src/page-components/Contact';
import { generateMetadata as genMeta } from '@/content/seo';
import { localBusinessSchema } from '@/content/schema';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = genMeta('contact');

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Contact />
    </>
  );
}
