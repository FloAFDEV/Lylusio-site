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
    let gaInitialized = false;

    // CWV Fix: Vérifier le consentement existant au chargement
    const checkExistingConsent = () => {
      try {
        const savedPreferences = localStorage.getItem('lylusio-cookie-preferences');
        console.log('[GA4] Vérification consentement localStorage:', savedPreferences);
        if (savedPreferences) {
          const prefs = JSON.parse(savedPreferences);
          if (prefs?.analytics && !gaInitialized) {
            console.log('[GA4] Consentement trouvé, initialisation GA4...');
            gaInitialized = true;
            setHasConsent(true);
            initGA();
          }
        }
      } catch (error) {
        console.error('[GA4] Error checking consent:', error);
      }
    };

    // CWV Fix: Écouter l'événement de consentement depuis le cookie banner
    const handleConsentGranted = (event: Event) => {
      const customEvent = event as CustomEvent;
      const { analytics } = customEvent.detail || {};
      console.log('[GA4] Événement cookieConsentGranted reçu:', { analytics, gaInitialized });
      if (analytics && !gaInitialized) {
        console.log('[GA4] Initialisation GA4 via événement...');
        gaInitialized = true;
        setHasConsent(true);
        initGA();
      }
    };

    checkExistingConsent();
    window.addEventListener('cookieConsentGranted', handleConsentGranted);

    return () => {
      window.removeEventListener('cookieConsentGranted', handleConsentGranted);
    };
  }, []); // Suppression de la dépendance hasConsent pour éviter les re-exécutions

  return (
    <>
      <Suspense fallback={null}>
        <AnalyticsTracker />
      </Suspense>
      {children}
    </>
  );
}
