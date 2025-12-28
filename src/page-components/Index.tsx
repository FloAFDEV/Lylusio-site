"use client";

import dynamic from "next/dynamic";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ApprochSection from "@/components/sections/ApprochSection";
import QuiSuisJeSection from "@/components/sections/QuiSuisJeSection";
import ServicesPreview from "@/components/sections/ServicesPreview";
import ProcessSection from "@/components/sections/ProcessSection";

// Lazy-load below-the-fold content
const RecentArticlesSection = dynamic(() => import("@/components/sections/RecentArticlesSection"), {
  loading: () => <div className="section-padding" />,
});

const TestimonialsSection = dynamic(() => import("@/components/sections/TestimonialsSection"), {
  loading: () => <div className="section-padding" />,
});

const Index = () => {
  return (
    <>
      {/* SEO metadata and structured data handled by layout.tsx */}
      <div className="min-h-screen bg-background">
        <Header />
        <main id="main-content" role="main">
          <HeroSection />
          <ApprochSection />
          <QuiSuisJeSection />
          <ServicesPreview />
          <ProcessSection />
          <RecentArticlesSection />
          <TestimonialsSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
