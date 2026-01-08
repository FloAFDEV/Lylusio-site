"use client";

import * as React from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * Hook to detect mobile viewport
 * Hydration-safe: Returns false during SSR and initial render,
 * then updates to actual value after mount
 */
export function useIsMobile() {
  // Initialize with false to match SSR output
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  React.useEffect(() => {
    // Only access window in useEffect (client-side only)
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    mql.addEventListener("change", onChange);

    // Set initial value after mount
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}
