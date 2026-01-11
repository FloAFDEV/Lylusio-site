// Server Component - SSR activé pour éliminer le double chargement
import dynamic from "next/dynamic";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ApprochSection from "@/components/sections/ApprochSection";
import QuiSuisJeSection from "@/components/sections/QuiSuisJeSection";

// Lazy-load below-the-fold content (SSR activé, pas de ssr: false)
const ServicesPreview = dynamic(
  () => import("@/components/sections/ServicesPreview"),
  { loading: () => <div className="section-padding" /> }
);

const ProcessSection = dynamic(
  () => import("@/components/sections/ProcessSection"),
  { loading: () => <div className="section-padding" /> }
);

const TestimonialsSection = dynamic(
  () => import("@/components/sections/TestimonialsSection"),
  { loading: () => <div className="section-padding" /> }
);

const RecentArticlesSection = dynamic(
  () => import("@/components/sections/RecentArticlesSection"),
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
