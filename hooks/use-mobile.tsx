"use client";

import * as React from "react";

const MOBILE_BREAKPOINT = 768;

// Initial check for SSR/hydration - avoids layout shift
const getInitialMobileState = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.innerWidth < MOBILE_BREAKPOINT;
};

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(getInitialMobileState);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    
    // Use passive listener for better scroll performance
    mql.addEventListener("change", onChange, { passive: true } as AddEventListenerOptions);
    
    // Initial check
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}