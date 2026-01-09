"use client";

import dynamic from 'next/dynamic';
import CookieBanner from '@/components/CookieBanner';
import ScrollReset from '@/components/ScrollReset';

// Lazy-load non-critical UI components with SSR enabled
// Components have mounted pattern (return null if !mounted) to prevent window errors
const ScrollToTop = dynamic(() => import('@/components/ScrollToTop'), {
  ssr: true, // ✅ Changed from false: prevents flash on mobile
  loading: () => null, // No fallback needed (component returns null if !mounted)
});

const FloatingCTA = dynamic(() => import('@/components/FloatingCTA'), {
  ssr: true, // ✅ Changed from false: prevents flash on mobile
  loading: () => null, // No fallback needed (component returns null if !mounted)
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
