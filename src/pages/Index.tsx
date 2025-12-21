import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ApprochSection from "@/components/sections/ApprochSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ServicesPreview from "@/components/sections/ServicesPreview";
import StructuredData from "@/components/SEO/StructuredData";
import SEOHead from "@/components/SEO/SEOHead";

const Index = () => {
  return (
    <>
      <SEOHead
        title="Astrologue & Praticienne Reiki Toulouse Cépet | Lylusio - Émilie Perez"
        description="Émilie Perez, astrologue humaniste et praticienne Reiki 3ème degré à Toulouse et Cépet (31). Consultations thème natal, séances Reiki et accompagnement transitions de vie. En cabinet ou en ligne."
        pathname="/"
        keywords="astrologie toulouse, reiki toulouse, astrologue cépet, praticien reiki, thème natal, soin énergétique, accompagnement transition de vie"
      />
      
      <StructuredData />
      
      <div className="min-h-screen bg-background">
        <a href="#main-content" className="skip-link">
          Aller au contenu principal
        </a>
        <Header />
        <main id="main-content" role="main">
          <HeroSection />
          <ApprochSection />
          <ServicesPreview />
          <TestimonialsSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
