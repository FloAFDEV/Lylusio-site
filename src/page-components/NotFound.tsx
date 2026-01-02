"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GoldenPlantBadge from "@/components/GoldenPlantBadge";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", window.location.pathname);
  }, []);

  return (
    <>
      {/* SEO metadata handled by Next.js Metadata API */}

      <div className="min-h-screen bg-background relative flex flex-col">
        {/* Decorative background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-accent/15 rounded-full animate-gentle-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        <Header />
        
        <main className="flex-1 flex items-center justify-center px-4 py-16 relative">
          <div className="max-w-lg mx-auto text-center">
            {/* Logo plant decoration */}
            <div className="mb-8 flex justify-center">
              <GoldenPlantBadge size="xl" className="animate-gentle-pulse" />
            </div>
            
            {/* 404 Number */}
            <h1 className="font-display text-7xl md:text-9xl text-accent/30 mb-4 leading-none">
              404
            </h1>
            
            {/* Message */}
            <h2 className="font-display text-2xl md:text-3xl text-foreground mb-4">
              Page non trouvée
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Oups ! La page que vous recherchez semble s'être égarée dans les étoiles...
              <br />
              Elle n'existe pas ou a été déplacée.
            </p>

            {/* Navigation buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-white gap-2">
                  <Home className="w-4 h-4" />
                  Retour à l'accueil
                </Button>
              </Link>
              <Button 
                variant="outline" 
                onClick={() => window.history.back()}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Page précédente
              </Button>
            </div>

            {/* Helpful links */}
            <div className="mt-12 p-6 bg-card/50 rounded-2xl border border-border/20">
              <p className="text-sm text-muted-foreground mb-4">
                Vous cherchez peut-être :
              </p>
              <nav className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/astrologie"
                  className="text-accent hover:underline text-sm"
                >
                  Astrologie
                </Link>
                <span className="text-border">•</span>
                <Link
                  href="/reiki"
                  className="text-accent hover:underline text-sm"
                >
                  Reiki
                </Link>
                <span className="text-border">•</span>
                <Link
                  href="/blog"
                  className="text-accent hover:underline text-sm"
                >
                  Blog
                </Link>
                <span className="text-border">•</span>
                <Link
                  href="/contact"
                  className="text-accent hover:underline text-sm"
                >
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default NotFound;
