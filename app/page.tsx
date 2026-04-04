import { Metadata } from 'next';
import Index from '@/src/page-components/Index';
import { generateMetadata as genMeta } from '@/content/seo';
import { organizationSchema, howToSchema } from '@/content/schema';

export const metadata: Metadata = genMeta('home');

// 🚀 PERFORMANCE: Force Static Generation + ISR (Incremental Static Regeneration)
// Génère le HTML au build, revalide toutes les 6h
// TTFB: 2500ms → <100ms (gain: -2400ms sur mobile 4G)
export const revalidate = 21600; // 6 heures

export default function HomePage() {
  return (
    <>
      {/* LocalBusiness + WebSite schemas injectés via app/layout.tsx (SSR inline) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <Index />
    </>
  );
}
