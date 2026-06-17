// Server Component - SSR activé pour éliminer le double chargement
import dynamic from "next/dynamic";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";

// CWV Fix: Lazy-load TOUTES sections below-the-fold pour maximiser score LCP
// Sur mobile (viewport principal PageSpeed), Hero seul = above-the-fold
// Réduction chunk JS initial : ~60% (-240KB estimé)
const ApprochSection = dynamic(
  () => import("@/components/sections/ApprochSection"),
  { loading: () => <div className="section-padding" /> }
);

const ServicesPreview = dynamic(
  () => import("@/components/sections/ServicesPreview"),
  { loading: () => <div className="section-padding" /> }
);

const QuiSuisJeSection = dynamic(
  () => import("@/components/sections/QuiSuisJeSection"),
  { loading: () => <div className="section-padding" /> }
);

const ProcessSection = dynamic(
  () => import("@/components/sections/ProcessSection"),
  { loading: () => <div className="section-padding" /> }
);

const RecentArticlesSection = dynamic(
  () => import("@/components/sections/RecentArticlesSection"),
  { loading: () => <div className="section-padding" /> }
);

const TestimonialsSection = dynamic(
  () => import("@/components/sections/TestimonialsSection"),
  { loading: () => <div className="section-padding" /> }
);

const RessourcesCTA = dynamic(
  () => import("@/components/sections/RessourcesCTA"),
  { loading: () => <div className="section-padding" /> }
);

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
          <TestimonialsSection />
          <RecentArticlesSection />
          <RessourcesCTA />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
