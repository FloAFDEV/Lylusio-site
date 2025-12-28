"use client";

import { useEffect, useState } from "react";

export const useParallax = (speed: number = 0.3) => {
  const [offset, setOffset] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount and on resize
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

  return offset;
};
