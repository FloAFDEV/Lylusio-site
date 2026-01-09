"use client";

import { useEffect, useState } from "react";

export const useParallax = (speed: number = 0.3) => {
  // Default to 0 for SSR - same value client-side before hydration
  const [offset, setOffset] = useState(0);
  // Default to false for SSR - mobile detection happens client-side only
  const [isMobile, setIsMobile] = useState(false);
  // Track mount state to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);

  // Mark as mounted to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Check if mobile on mount and on resize (client-side only)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });

    return () => window.removeEventListener("resize", checkMobile);
  }, [mounted]);

  useEffect(() => {
    // Disable parallax if not mounted or on mobile for performance
    if (!mounted || isMobile) {
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
    // DO NOT initialize offset immediately - keep it at 0 on mount to prevent flash
    // This ensures SSR and initial client render match (both offset = 0)
    // Offset will update on first scroll event only

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [speed, isMobile, mounted]);

  // Always return 0 if not mounted to ensure SSR/client match
  return mounted ? offset : 0;
};
