"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };

    const handleMenuToggle = (event: CustomEvent<{ isOpen: boolean }>) => {
      setIsMenuOpen(event.detail.isOpen);
    };

    window.addEventListener("scroll", toggleVisibility);
    window.addEventListener("mobileMenuToggle", handleMenuToggle as EventListener);
    
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      window.removeEventListener("mobileMenuToggle", handleMenuToggle as EventListener);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Hide when menu is open
  const shouldShow = isVisible && !isMenuOpen;

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gold hover:brightness-110 text-white shadow-gold hover:shadow-glow flex items-center justify-center transition-all duration-500 hover:scale-110 border-0 ${
        shouldShow ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-label="Retourner en haut de la page"
    >
      <ChevronUp className="w-5 h-5" aria-hidden="true" />
    </button>
  );
};

export default ScrollToTop;
