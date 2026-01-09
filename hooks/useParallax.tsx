"use client";

import { useEffect, useState } from "react";

export const useParallax = (speed: number = 0.3) => {
  // Default to 0 for SSR - same value client-side before hydration
  const [offset, setOffset] = useState(0);
  // Default to false for SSR - mobile detection happens client-side only
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount and on resize (client-side only)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Disable parallax on mobile for performance
    if (isMobile) {
      setOffset(0);
      return;
    }

    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          // Direct update without interpolation - no delay
          setOffset(window.scrollY * speed);
          rafId = null;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial value
    setOffset(window.scrollY * speed);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [speed, isMobile]);

  // Return 0 for SSR and initial client render (no hydration mismatch)
  return offset;
};
