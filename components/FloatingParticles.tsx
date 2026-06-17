"use client";

import { memo } from "react";

interface FloatingParticlesProps {
	count?: number;
	className?: string;
}

// Décor de particules flottantes retiré (premium pass) pour réduire le bruit
// visuel et les animations en boucle. Composant conservé comme no-op afin de
// préserver les imports existants sans modifier la structure des pages.
const FloatingParticles = memo((_props: FloatingParticlesProps) => null);

FloatingParticles.displayName = "FloatingParticles";

export default FloatingParticles;
