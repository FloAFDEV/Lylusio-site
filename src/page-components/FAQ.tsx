"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useInView } from "@/hooks/useInView";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Star, Hand, Heart, FileText, Sparkles } from "lucide-react";

// Animated FAQ Category Component
const AnimatedFAQCategory = ({ category, categoryIndex }: { category: typeof faqCategories[0], categoryIndex: number }) => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  
  return (
    <div 
      ref={ref}
      className={`bg-card/50 rounded-xl border border-border/20 p-5 md:p-6 transition-all duration-700 ease-out ${
        isInView 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${categoryIndex * 100}ms` }}
    >
      <h2 className="font-display text-xl text-foreground mb-4 flex items-center gap-2.5">
        <category.icon className="w-4 h-4 text-accent" strokeWidth={1.5} aria-hidden="true" />
        {category.title}
      </h2>
      
      <Accordion type="single" collapsible className="space-y-1">
        {category.questions.map((item, index) => (
          <AccordionItem 
            key={index} 
            value={`${categoryIndex}-${index}`}
            className="border-b border-border/15 last:border-0"
          >
            <AccordionTrigger className="text-left py-3 text-base text-foreground hover:text-accent transition-colors font-medium">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-3">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

const faqCategories = [
  {
    title: "Astrologie",
    icon: Star,
    questions: [
      {
        question: "Qu'est-ce qu'un thème astral ?",
        answer: "Le thème astral (ou carte du ciel natale) est une photographie du ciel au moment précis de votre naissance. Il révèle la position des planètes dans les signes du zodiaque et les maisons astrologiques. C'est un outil puissant de connaissance de soi qui éclaire vos talents, défis, et chemins d'évolution."
      },
      {
        question: "Comment se déroule une consultation d'astrologie ?",
        answer: "La séance dure environ 1h30. Je prépare votre thème avant notre rendez-vous à partir de vos données de naissance (date, heure exacte, lieu). Pendant la consultation, nous explorons ensemble les grandes lignes de votre thème : votre personnalité profonde, vos besoins émotionnels, votre façon de communiquer, vos talents... Vous repartez avec un enregistrement audio de la séance."
      },
      {
        question: "Ai-je besoin de connaître mon heure de naissance exacte ?",
        answer: "L'heure exacte de naissance est idéale pour une analyse complète car elle détermine l'Ascendant et les maisons astrologiques. Si vous ne la connaissez pas, je peux tout de même établir un thème partiel basé sur les positions planétaires. Vous pouvez aussi demander votre acte de naissance complet à la mairie de votre lieu de naissance."
      },
      {
        question: "Quelle est la différence entre astrologie et voyance ?",
        answer: "L'astrologie n'est pas de la voyance. C'est un outil symbolique de connaissance de soi basé sur les cycles planétaires. Je ne prédis pas l'avenir de façon déterministe. Je vous aide à comprendre les énergies à l'œuvre dans votre vie et les périodes propices aux changements, tout en rappelant que vous restez maître de vos choix."
      }
    ]
  },
  {
    title: "Reiki",
    icon: Hand,
    questions: [
      {
        question: "Qu'est-ce que le Reiki ?",
        answer: "Le Reiki est une pratique énergétique d'origine japonaise qui favorise la relaxation profonde et l'équilibre énergétique. Par l'imposition des mains, le praticien canalise l'énergie universelle pour harmoniser les centres énergétiques (chakras) et soutenir les capacités naturelles d'auto-guérison du corps."
      },
      {
        question: "Comment se déroule une séance de Reiki ?",
        answer: "La séance dure environ 1h. Vous restez habillé(e), allongé(e) confortablement sur une table de massage. Je pose délicatement mes mains sur différentes parties du corps (ou légèrement au-dessus selon votre préférence). Vous pouvez ressentir de la chaleur, des picotements, ou simplement une profonde détente. Chaque expérience est unique."
      },
      {
        question: "Le Reiki peut-il remplacer un traitement médical ?",
        answer: "Non, le Reiki est une pratique complémentaire et ne se substitue en aucun cas à un suivi médical. Il peut accompagner un traitement conventionnel en favorisant la détente et le bien-être général, mais ne doit jamais être considéré comme un traitement médical. Je vous encourage à consulter un médecin pour tout problème de santé."
      },
      {
        question: "Combien de séances de Reiki sont recommandées ?",
        answer: "Cela dépend de vos besoins et objectifs. Une seule séance peut déjà apporter du bienfait, notamment pour la relaxation. Pour un travail plus profond (stress chronique, période de transition...), 3 à 4 séances espacées de 2-3 semaines peuvent être bénéfiques. Nous en discutons ensemble lors de notre première rencontre."
      }
    ]
  },
  {
    title: "Thérapie Holistique",
    icon: Sparkles,
    questions: [
      {
        question: "Qu'est-ce qu'une thérapie holistique ?",
        answer: "La thérapie holistique est une approche globale qui considère l'être humain dans sa totalité : physique, émotionnel, mental et énergétique. Elle associe différentes pratiques pour vous accompagner vers un bien-être profond et durable."
      },
      {
        question: "Pour qui est-elle recommandée ?",
        answer: (
          <div className="space-y-2">
            <p>La thérapie holistique est particulièrement adaptée si vous souffrez de :</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Anxiété, stress</li>
              <li>Surcharge émotionnelle</li>
              <li>Difficulté à lâcher prise sur les événements ou les personnes</li>
              <li>Troubles du sommeil</li>
              <li>Épuisement, fatigue, manque d'entrain</li>
              <li>Manque de confiance en soi, blocages pour avancer ou décider</li>
              <li>Peurs, phobies</li>
            </ul>
          </div>
        )
      },
      {
        question: "La thérapie holistique remplace-t-elle un suivi médical ?",
        answer: "Non. Il ne s'agit ni d'un diagnostic ni d'un traitement médical. C'est un accompagnement complémentaire."
      },
      {
        question: "Le Reiki fait-il partie de la thérapie holistique ?",
        answer: (
          <span>
            Oui, le Reiki fait partie des approches énergétiques intégrées. Découvrez-en plus sur la{" "}
            <Link href="/reiki-toulouse" className="text-accent hover:underline">
              page Reiki
            </Link>
            .
          </span>
        )
      },
      {
        question: "Combien de séances sont nécessaires ?",
        answer: "Chaque parcours est unique. Le nombre de séances dépend des besoins, objectifs et blocages de la personne."
      }
    ]
  },
  {
    title: "Accompagnement",
    icon: Heart,
    questions: [
      {
        question: "Qu'est-ce que l'accompagnement holistique ?",
        answer: "L'accompagnement holistique combine plusieurs outils (astrologie, énergétique, coaching) pour vous aider à traverser une période de transition, clarifier un projet, ou mieux vous connaître. C'est un parcours personnalisé sur plusieurs séances qui prend en compte toutes les dimensions de votre être."
      },
      {
        question: "Comment savoir si j'ai besoin d'un accompagnement ?",
        answer: "Si vous traversez une période de questionnement, de transition (professionnelle, personnelle), si vous ressentez un décalage entre votre vie actuelle et vos aspirations profondes, ou si vous souhaitez simplement mieux vous connaître, l'accompagnement peut vous aider. N'hésitez pas à me contacter pour un premier échange gratuit."
      }
    ]
  },
  {
    title: "Tarifs & Pratique",
    icon: FileText,
    questions: [
      {
        question: "Quels sont vos tarifs ?",
        answer: "Les tarifs varient selon les prestations : consultation d'astrologie (thème natal) à partir de 90€, séance de Reiki à partir de 60€, accompagnement sur mesure selon le forfait choisi. Tous les détails sont disponibles sur les pages de chaque service. Des facilités de paiement peuvent être envisagées."
      },
      {
        question: "Les consultations se font-elles en présentiel ou à distance ?",
        answer: "Je propose les deux formules. Les consultations en présentiel ont lieu à Toulouse. Les séances à distance se font par visioconférence (Zoom ou Google Meet) et sont tout aussi efficaces pour l'astrologie et le coaching. Pour le Reiki, le présentiel est privilégié, mais des séances à distance sont également possibles."
      },
      {
        question: "Comment prendre rendez-vous ?",
        answer: "Vous pouvez réserver directement en ligne via les liens Calendly disponibles sur chaque page de service, ou me contacter par email ou téléphone pour échanger avant de réserver. Je vous répondrai dans les 48h ouvrées."
      },
      {
        question: "Quelle est votre politique d'annulation ?",
        answer: "Toute annulation doit être effectuée au moins 48h avant le rendez-vous pour un remboursement intégral. En cas d'annulation tardive ou d'absence sans prévenir, la séance sera due. En cas d'imprévu de mon côté, je vous proposerai bien sûr un nouveau créneau dans les meilleurs délais."
      }
    ]
  }
];

export const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqCategories.flatMap(category =>
    category.questions.map(q => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer
      }
    }))
  )
};

const FAQ = () => {
  // Generate star positions only on client side to avoid hydration mismatch
  const [stars, setStars] = useState<Array<{ top: number; left: number; delay: number }>>([]);

  useEffect(() => {
    // Generate random positions only after component mounts (client-side only)
    setStars(
      Array.from({ length: 15 }, () => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 5,
      }))
    );
  }, []);

  return (
    <>
      {/* SEO metadata handled by Next.js Metadata API */}

      <div className="min-h-screen bg-background relative">
        {/* Decorative background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {stars.map((star, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 bg-accent/15 rounded-full animate-gentle-pulse"
              style={{
                top: `${star.top}%`,
                left: `${star.left}%`,
                animationDelay: `${star.delay}s`,
              }}
            />
          ))}
        </div>

        <a href="#main-content" className="skip-link">Aller au contenu principal</a>
        <Header />
        <Breadcrumbs />
        
        <main id="main-content" className="pb-16 md:pb-20 relative">
          <section className="container mx-auto px-4 sm:px-6 lg:px-8" aria-labelledby="faq-title">
            {/* Header */}
            <header className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
              <p className="section-label">FAQ</p>
              <h1 id="faq-title" className="text-foreground mb-6 first-letter-fancy-lg">
                Questions Fréquentes
              </h1>
              <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
                Retrouvez ici les réponses aux questions les plus courantes sur mes pratiques, 
                les tarifs et le déroulement des séances.
              </p>
            </header>

            {/* FAQ Categories */}
            <div className="max-w-3xl mx-auto space-y-6">
              {faqCategories.map((category, categoryIndex) => (
                <AnimatedFAQCategory 
                  key={categoryIndex} 
                  category={category} 
                  categoryIndex={categoryIndex} 
                />
              ))}
            </div>

            {/* CTA Section */}
            <div className="max-w-2xl mx-auto text-center mt-16 p-8 bg-gradient-to-br from-accent/5 to-primary/5 rounded-2xl border border-accent/20">
              <h2 className="font-display text-xl md:text-2xl text-foreground mb-4">
                Vous avez d'autres questions ?
              </h2>
              <p className="text-muted-foreground mb-6">
                N'hésitez pas à me contacter, je serai ravie de vous répondre personnellement.
              </p>
              <Link href="/contact">
                <Button className="bg-accent hover:bg-accent/90 text-white">
                  Me contacter
                </Button>
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default FAQ;
