"use client";

import { useCallback } from 'react';

// Configuration GA4
// ID de mesure : G-0895ZEQQY4
// ID de flux : 6111910808
// URL de flux : https://lylusio.fr/
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-0895ZEQQY4';

// Vérifie si on est en production
const isProduction = () => {
  return window.location.hostname === 'lylusio.fr' || 
         window.location.hostname === 'www.lylusio.fr';
};

// Types pour gtag
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

// Initialise GA4 uniquement en production
export const initGA = () => {
  if (!isProduction()) {
    console.log('[GA4] Mode développement - Analytics désactivé');
    return;
  }

  // Vérifie si déjà chargé
  if (window.gtag) return;

  // Créer dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false, // On gère manuellement les pageviews
  });

  // Charger le script gtag
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  console.log('[GA4] Analytics initialisé');
};

// Fonction pour tracker les pages vues manuellement
export const trackPageView = (url: string) => {
  if (!isProduction() || !window.gtag) return;

  window.gtag('event', 'page_view', {
    page_path: url,
    page_title: document.title,
    page_location: window.location.href,
  });
};

// Hook pour envoyer des événements personnalisés
export const useAnalyticsEvent = () => {
  const trackEvent = useCallback((
    eventName: string,
    eventParams?: Record<string, string | number | boolean>
  ) => {
    if (!isProduction() || !window.gtag) {
      console.log('[GA4 Dev]', eventName, eventParams);
      return;
    }

    window.gtag('event', eventName, eventParams);
  }, []);

  // Événements pré-définis pour le site
  const trackBookingClick = useCallback((service: string) => {
    trackEvent('booking_click', {
      service_name: service,
      button_location: window.location.pathname,
    });
  }, [trackEvent]);

  const trackContactClick = useCallback((method: 'phone' | 'email') => {
    trackEvent('contact_click', {
      contact_method: method,
    });
  }, [trackEvent]);

  const trackServiceView = useCallback((serviceName: string) => {
    trackEvent('service_view', {
      service_name: serviceName,
    });
  }, [trackEvent]);

  const trackBlogArticleView = useCallback((articleSlug: string, articleTitle: string) => {
    trackEvent('article_view', {
      article_slug: articleSlug,
      article_title: articleTitle,
    });
  }, [trackEvent]);

  const trackCTAClick = useCallback((ctaName: string, ctaLocation: string) => {
    trackEvent('cta_click', {
      cta_name: ctaName,
      cta_location: ctaLocation,
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackBookingClick,
    trackContactClick,
    trackServiceView,
    trackBlogArticleView,
    trackCTAClick,
  };
};

export default useAnalyticsEvent;
