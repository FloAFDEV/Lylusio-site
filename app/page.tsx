import { Metadata } from 'next';
import Index from '@/src/page-components/Index';
import { generateMetadata as genMeta } from '@/content/seo';
import { websiteSchema, organizationSchema, howToSchema, localBusinessSchema } from '@/content/schema';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = genMeta('home');

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <Index />
    </>
  );
}
