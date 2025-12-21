import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initGA, usePageTracking } from '@/hooks/useAnalytics';

/**
 * Composant qui initialise GA4 et track les pages vues
 * À placer dans l'App wrapper
 */
const AnalyticsProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  // Initialise GA4 au montage
  useEffect(() => {
    initGA();
  }, []);

  // Track les changements de page
  usePageTracking();

  return <>{children}</>;
};

export default AnalyticsProvider;
