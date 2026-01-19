// Server Component - SSR activé pour éliminer le double chargement
import dynamic from "next/dynamic";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ApprochSection from "@/components/sections/ApprochSection";
import ServicesPreview from "@/components/sections/ServicesPreview";

// ✅ CWV Fix: Lazy-load sections below-the-fold pour réduire TBT (690ms → <200ms)
// Ces sections ne sont pas visibles immédiatement et peuvent être chargées après le LCP
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
