import { Metadata } from 'next';
import Script from 'next/script';
import FAQ, { faqStructuredData } from '@/src/page-components/FAQ';
import { generateMetadata as genMeta } from '@/content/seo';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = genMeta('faq');

export default function FAQPage() {
  return (
    <>
      <Script
        id="faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        strategy="afterInteractive"
      />
      <FAQ />
    </>
  );
}
