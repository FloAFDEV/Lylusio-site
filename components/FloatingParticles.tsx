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
	scintillate?: boolean;
}

interface FloatingParticlesProps {
	count?: number;
	className?: string;
}

// CSS keyframes pour scintillement subtil
const style = `
@keyframes scintillate {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.5; }
}
`;

if (typeof window !== "undefined") {
	const styleEl = document.createElement("style");
	styleEl.textContent = style;
	document.head.appendChild(styleEl);
}

// Particle component
const ParticleElement = memo(({ particle }: { particle: Particle }) => (
	<div
		className="absolute rounded-full animate-float-particle will-change-transform"
		style={{
			left: `${particle.x}%`,
			top: `${particle.y}%`,
			width: `${particle.size}px`,
			height: `${particle.size}px`,
			opacity: particle.opacity,
			animationDuration: `${particle.duration}s`,
			animationDelay: `${particle.delay}s`,
			backgroundColor: "#d9c9a6",
			boxShadow: `0 0 ${particle.size * 4}px #d9c9a6`,
			animationName: particle.scintillate
				? "float-particle, scintillate"
				: "float-particle",
			animationTimingFunction: "linear, ease-in-out",
			animationIterationCount: "infinite",
			["--drift" as string]: `${particle.drift}px`,
		}}
		aria-hidden="true"
	/>
));

ParticleElement.displayName = "ParticleElement";

const FloatingParticles = memo(
	({ count = 50, className = "" }: FloatingParticlesProps) => {
		const [isMobile, setIsMobile] = useState(false);
		const [shouldRender, setShouldRender] = useState(false);

		useEffect(() => {
			const checkMobile = () => setIsMobile(window.innerWidth < 768);

			const prefersReducedMotion = window.matchMedia(
				"(prefers-reduced-motion: reduce)"
			).matches;

			checkMobile();
			setShouldRender(!prefersReducedMotion);

			window.addEventListener("resize", checkMobile, { passive: true });
			return () => window.removeEventListener("resize", checkMobile);
		}, []);

		const actualCount = isMobile ? Math.floor(count * 0.5) : count;

		const particles = useMemo(() => {
			const generated: Particle[] = [];
			for (let i = 0; i < actualCount; i++) {
				generated.push({
					id: i,
					x: Math.random() * 100,
					y: Math.random() * 100,
					size: 1.5 + Math.random() * 3, // 1.5px à 4.5px
					opacity: 0.2 + Math.random() * 0.3, // 0.2 à 0.5
					duration: 15 + Math.random() * 20, // plus doux
					delay: Math.random() * 10,
					drift: -15 + Math.random() * 30,
					scintillate: Math.random() < 0.2, // 20% scintillent
				});
			}
			return generated;
		}, [actualCount]);

		if (!shouldRender) return null;

		return (
			<div
				className={`fixed inset-0 overflow-hidden pointer-events-none z-0 ${className}`}
				aria-hidden="true"
			>
				{particles.map((p) => (
					<ParticleElement key={p.id} particle={p} />
				))}
			</div>
		);
	}
);

FloatingParticles.displayName = "FloatingParticles";

export default FloatingParticles;
