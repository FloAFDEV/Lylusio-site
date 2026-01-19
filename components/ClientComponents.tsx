"use client";

import dynamic from 'next/dynamic';
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

// ✅ CWV Fix: CookieBanner lazy-loadé pour réduire JS initial (-45KB)
// ssr: false car dépend de localStorage (client-only)
// S'affiche dès le mount, RGPD-compliant (aucun tracker avant consentement)
const CookieBanner = dynamic(() => import('@/components/CookieBanner'), {
  ssr: false,
  loading: () => null,
});

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
