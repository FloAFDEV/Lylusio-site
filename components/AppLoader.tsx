"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
// import plantLogo from "@/assets/plant-decoration.webp"; // Now using /assets/plant-decoration.webp

interface AppLoaderProps {
  onComplete: () => void;
  minDisplayTime?: number;
}

const AppLoader = ({ onComplete, minDisplayTime = 800 }: AppLoaderProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isContentReady, setIsContentReady] = useState(false);

  useEffect(() => {
    // Mark content as ready after minimum display time
    const minTimer = setTimeout(() => {
      setIsContentReady(true);
    }, minDisplayTime);

    return () => clearTimeout(minTimer);
  }, [minDisplayTime]);

  useEffect(() => {
    // Only exit when content is ready
    if (isContentReady) {
      setIsExiting(true);
      const exitTimer = setTimeout(onComplete, 400);
      return () => clearTimeout(exitTimer);
    }
  }, [isContentReady, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-background transition-opacity duration-400 ease-out ${
        isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-label="Chargement de Lylusio"
      role="progressbar"
    >
      <div className="relative flex flex-col items-center gap-5">
        {/* Logo container with animations */}
        <div className="relative">
          {/* Soft glow ring */}
          <div
            className="absolute -inset-6 rounded-full animate-pulse"
            style={{
              background: "radial-gradient(circle, hsl(var(--accent) / 0.15) 0%, transparent 70%)",
            }}
          />
          
          {/* Logo with gentle float */}
          <Image
            src="/assets/plant-decoration.webp"
            alt=""
            width={96}
            height={96}
            className="w-20 h-20 md:w-24 md:h-24 rounded-full animate-float-slow"
            style={{
              filter: "drop-shadow(0 0 24px hsl(var(--accent) / 0.3))",
            }}
            priority
            aria-hidden="true"
          />
        </div>

        {/* Brand name with fade */}
        <div className="flex flex-col items-center gap-3 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <span className="font-display text-2xl md:text-3xl text-foreground/90">
            Lylusio
          </span>
          {/* Loading dots */}
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-accent/60"
                style={{ 
                  animation: "gentle-pulse 1.2s ease-in-out infinite",
                  animationDelay: `${i * 0.15}s` 
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gentle-pulse {
          0%, 100% { opacity: 0.4; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default AppLoader;
