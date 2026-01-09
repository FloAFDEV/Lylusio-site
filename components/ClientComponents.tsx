"use client";

import dynamic from 'next/dynamic';
import CookieBanner from '@/components/CookieBanner';
import ScrollReset from '@/components/ScrollReset';

// Lazy-load non-critical UI components client-side only
const ScrollToTop = dynamic(() => import('@/components/ScrollToTop'), {
  ssr: false,
});

const FloatingCTA = dynamic(() => import('@/components/FloatingCTA'), {
  ssr: false,
});

// CookieBanner: Import direct (non lazy-loaded) pour conformité RGPD
// Le bandeau doit s'afficher immédiatement selon les recommandations CNIL

export default function ClientComponents() {
  return (
    <>
      <ScrollReset />
      <ScrollToTop />
      <FloatingCTA />
      <CookieBanner />
    </>
  );
}
