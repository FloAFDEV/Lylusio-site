'use client';

import { useEffect } from 'react';
import {
  CONSENT_CHANGE_EVENT,
  PREFERENCES_KEY,
  readConsent,
  type ConsentPreferences,
} from '@/lib/consent';
import { applyConsent, handleContactLinkClick } from '@/lib/google-tag';

/**
 * Applique le consentement enregistré au Google tag et mesure les clics
 * tel:/mailto:. Aucun page_view manuel : voir lib/google-tag.ts.
 */
export function AnalyticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const safeRead = () => {
      try {
        return readConsent(window.localStorage);
      } catch {
        return null;
      }
    };

    applyConsent(safeRead());

    const handleConsentChange = (event: Event) => {
      const prefs = (event as CustomEvent<ConsentPreferences | null>).detail ?? null;
      applyConsent(prefs);
    };

    // Choix modifié dans un autre onglet
    const handleStorage = (event: StorageEvent) => {
      if (event.key === null || event.key === PREFERENCES_KEY) applyConsent(safeRead());
    };

    // Page restaurée depuis le bfcache : le choix a pu changer entre-temps
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) applyConsent(safeRead());
    };

    const handleClick = (event: MouseEvent) => {
      handleContactLinkClick(event.target);
    };

    window.addEventListener(CONSENT_CHANGE_EVENT, handleConsentChange);
    window.addEventListener('storage', handleStorage);
    window.addEventListener('pageshow', handlePageShow);
    document.addEventListener('click', handleClick, { capture: true });

    return () => {
      window.removeEventListener(CONSENT_CHANGE_EVENT, handleConsentChange);
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('pageshow', handlePageShow);
      document.removeEventListener('click', handleClick, { capture: true });
    };
  }, []);

  return <>{children}</>;
}
