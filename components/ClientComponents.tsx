"use client";

import dynamic from 'next/dynamic';

// Lazy-load non-critical UI components client-side only
const ScrollToTop = dynamic(() => import('@/components/ScrollToTop'), {
  ssr: false,
});

const FloatingCTA = dynamic(() => import('@/components/FloatingCTA'), {
  ssr: false,
});

const CookieBanner = dynamic(() => import('@/components/CookieBanner'), {
  ssr: false,
});

export default function ClientComponents() {
  return (
    <>
      <ScrollToTop />
      <FloatingCTA />
      <CookieBanner />
    </>
  );
}
