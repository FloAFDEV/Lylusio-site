import { Metadata } from 'next';
import FAQ from '@/src/page-components/FAQ';
import { faqStructuredData } from '@/content/faq-data';
import { generateMetadata as genMeta } from '@/content/seo';

export const metadata: Metadata = genMeta('faq');

export default function FAQPage() {
  return (
    <>
      {/* FAQPage schema inline → présent dans le HTML SSR, lu par tous les crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <FAQ />
    </>
  );
}
