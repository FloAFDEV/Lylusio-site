"use client";

import { useEffect, useState, useMemo, memo } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  drift: number;
}

interface FloatingParticlesProps {
  count?: number;
  className?: string;
}

// Memoized particle component for better performance
const ParticleElement = memo(({ particle }: { particle: Particle }) => (
  <div
    className="absolute rounded-full bg-accent animate-float-particle will-change-transform"
    style={{
      left: `${particle.x}%`,
      top: `${particle.y}%`,
      width: `${particle.size}px`,
      height: `${particle.size}px`,
      opacity: particle.opacity,
      animationDuration: `${particle.duration}s`,
      animationDelay: `${particle.delay}s`,
      boxShadow: `0 0 ${particle.size * 3}px hsl(var(--accent) / 0.4)`,
      ["--drift" as string]: `${particle.drift}px`,
    }}
    aria-hidden="true"
  />
));

ParticleElement.displayName = "ParticleElement";

const FloatingParticles = memo(({ count = 30, className = "" }: FloatingParticlesProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // Check for mobile and reduced motion preference
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    checkMobile();
    setShouldRender(!prefersReducedMotion);
    
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Reduce particle count on mobile for performance (50% less)
  const actualCount = isMobile ? Math.floor(count * 0.5) : count;

  // Generate particles only once using useMemo
  const particles = useMemo(() => {
    const generatedParticles: Particle[] = [];
    for (let i = 0; i < actualCount; i++) {
      generatedParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 2,
        opacity: 0.15 + Math.random() * 0.35,
        duration: 15 + Math.random() * 25,
        delay: Math.random() * 10,
        drift: -20 + Math.random() * 40,
      });
    }
    return generatedParticles;
  }, [actualCount]);

  // Don't render if reduced motion is preferred
  if (!shouldRender) return null;

  return (
    <div 
      className={`fixed inset-0 overflow-hidden pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    >
      {particles.map((particle) => (
        <ParticleElement key={particle.id} particle={particle} />
      ))}
    </div>
  );
});

FloatingParticles.displayName = "FloatingParticles";

export default FloatingParticles;