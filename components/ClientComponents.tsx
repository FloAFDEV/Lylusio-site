"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import ScrollReset from '@/components/ScrollReset';
import CookieBanner from '@/components/CookieBanner';

// Lazy-load non-critical UI components with SSR enabled
// Components have mounted pattern (return null if !mounted) to prevent window errors
const ScrollToTop = dynamic(() => import('@/components/ScrollToTop'), {
  ssr: true,
  loading: () => null,
});

const FloatingCTA = dynamic(() => import('@/components/FloatingCTA'), {
  ssr: true,
  loading: () => null,
});

export default function ClientComponents() {
  // CookieBanner est importé en eager pour réduire le délai de paint (LCP).
  // Le mounted check remplace ssr:false — évite localStorage au SSR.
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      <ScrollReset />
      <ScrollToTop />
      <FloatingCTA />
      {mounted && <CookieBanner />}
    </>
  );
}
