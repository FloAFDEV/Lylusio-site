'use client';

import { Suspense, useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initGA, trackPageView } from '@/hooks/useAnalytics';

function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      trackPageView(url);
    }
  }, [pathname, searchParams]);

  return null;
}

export function AnalyticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // ✅ CWV Fix: Vérifier le consentement existant au chargement
    const checkExistingConsent = () => {
      try {
        const savedPreferences = localStorage.getItem('lylusio-cookie-preferences');
        if (savedPreferences) {
          const prefs = JSON.parse(savedPreferences);
          if (prefs?.analytics) {
            setHasConsent(true);
            initGA();
          }
        }
      } catch (error) {
        console.error('[GA4] Error checking consent:', error);
      }
    };

    // ✅ CWV Fix: Écouter l'événement de consentement depuis le cookie banner
    const handleConsentGranted = (event: Event) => {
      const customEvent = event as CustomEvent;
      const { analytics } = customEvent.detail || {};
      if (analytics && !hasConsent) {
        setHasConsent(true);
        initGA();
      }
    };

    checkExistingConsent();
    window.addEventListener('cookieConsentGranted', handleConsentGranted);

    return () => {
      window.removeEventListener('cookieConsentGranted', handleConsentGranted);
    };
  }, [hasConsent]);

  return (
    <>
      <Suspense fallback={null}>
        <AnalyticsTracker />
      </Suspense>
      {children}
    </>
  );
}
