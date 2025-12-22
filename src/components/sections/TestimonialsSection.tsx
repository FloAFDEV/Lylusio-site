import { useInView } from "@/hooks/useInView";
import { useParallax } from "@/hooks/useParallax";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

const testimonials = [
  { name: "Christelle", text: "Super praticienne reiki. À l'écoute. Très professionnelle." },
  {
    name: "Lydie",
    text: "Je vous recommande de croiser le chemin d'Emilie pour toute personne qui souhaite travailler sur elle sans se cacher les yeux. Emilie est honnête et ne vous racontera pas de blabla mais vous fera avancer… Merci pour votre douceur et votre gentillesse.",
  },
  {
    name: "Stéphanie",
    text: "Ce rendez-vous a été une belle surprise et tellement parlant de vérité. Je vous remercie pour le travail fait sur mon thème et pour votre bienveillance tout au long de la séance.",
  },
  {
    name: "Anne",
    text: "Depuis que je vois régulièrement Émilie, j'ai vu un changement progressif et bénéfique sur ma santé, moral et mon comportement. J'ai appris à m'écouter, à faire la part des choses, à choisir ce qui est bon pour MOI.",
  },
  {
    name: "Nathalie",
    text: "Émilie est quelqu'un de très à l'écoute et bienveillante. Elle m'a permis de passer une étape de plus et importante dans ma vie.",
  },
  {
    name: "Virginie",
    text: "J'ai enfin compris pourquoi je me sentais bloquée dans mon travail. Son approche est à la fois douce et percutante, j'ai pu faire des choix alignés et aujourd'hui je me sens plus légère.",
  },
  {
    name: "Sandrine",
    text: "Je me suis sentie immédiatement comprise et en confiance, même sur des sujets très profonds pour moi.",
  },
  {
    name: "Angélique",
    text: "Je recommande chaleureusement l'accompagnement avec Emilie. Elle mêle avec douceur et ouverture l'astrologie, le coaching et la thérapie bien-être. Une Thérapeute qui prend vraiment le temps de vous ÉCOUTER.",
  },
  {
    name: "Marie",
    text: "Superbe expérience ! Un grand merci pour l'accueil et la qualité d'écoute. Séances Reiki qui me redonnent à chaque fois bien-être et énergie. J'en ressors toujours autant enthousiasmée.",
  },
  {
    name: "Amandine",
    text: "Je remercie mille fois Emilie que je recommande +++, pour la lecture de mon thème astral pour cette année 2025!! Mon année sera très intense sous le signe du travail, de l'émotion et de l'épanouissement !!!",
  },
];

const TestimonialsSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const parallaxOffset = useParallax(0.15);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 6000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section
    id="temoignages"
    className="py-20 md:py-28 lg:py-36 overflow-hidden bg-gradient-to-t from-sand/30 via-cream/20 to-background relative"
    aria-labelledby="temoignages-title"
    ref={ref}
    >
      {/* Decorative abstract shapes + stars with enhanced parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-5 sm:top-10 left-5 sm:left-10 w-36 sm:w-48 h-36 sm:h-48 bg-accent/8 rounded-full blur-3xl transition-transform duration-100"
          style={{ transform: `translateY(${parallaxOffset}px)` }}
        />
        <div
          className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-28 sm:w-36 h-28 sm:h-36 bg-gold/8 rounded-full blur-2xl transition-transform duration-100"
          style={{ transform: `translateY(${-parallaxOffset * 0.8}px)` }}
        />
        <div
          className="absolute top-1/4 right-[15%] w-16 sm:w-24 h-16 sm:h-24 border border-accent/12 rounded-full opacity-35 transition-transform duration-100"
          style={{ transform: `translateY(${parallaxOffset * 0.7}px)` }}
        />
        <div
          className="absolute bottom-1/4 left-[20%] w-10 sm:w-14 h-10 sm:h-14 border border-gold/12 rotate-45 opacity-30 transition-transform duration-100"
          style={{ transform: `translateY(${-parallaxOffset * 0.6}px) rotate(45deg)` }}
        />
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-accent/12 rounded-full transition-transform duration-100"
            style={{
              top: `${15 + ((i * 9) % 70)}%`,
              left: `${10 + ((i * 12) % 80)}%`,
              boxShadow: "0 0 3px hsl(var(--accent) / 0.15)",
              transform: `translateY(${parallaxOffset * 0.3 * (i % 2 === 0 ? 1 : -1)}px)`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header
          className={`text-center max-w-xl mx-auto mb-10 md:mb-14 transition-all duration-1000 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="section-label">Témoignages</p>
          <h2 id="temoignages-title" className="text-foreground mb-4">
            Ce qu'elles en disent
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Des femmes qui ont choisi de se reconnecter à elles-mêmes
          </p>
        </header>

        <div
          className={`relative transition-all duration-1000 delay-200 ${isInView ? "opacity-100" : "opacity-0"}`}
          role="region"
          aria-label="Carrousel de témoignages"
        >
          <button
            onClick={scrollPrev}
            className="hidden md:flex absolute -left-2 lg:-left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center bg-card/90 backdrop-blur-sm shadow-soft rounded-full text-foreground/50 hover:text-accent transition-all"
            aria-label="Témoignage précédent"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            onClick={scrollNext}
            className="hidden md:flex absolute -right-2 lg:-right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center bg-card/90 backdrop-blur-sm shadow-soft rounded-full text-foreground/50 hover:text-accent transition-all"
            aria-label="Témoignage suivant"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>

          <div className="overflow-hidden mx-0" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <article
                  key={index}
                  className="flex-[0_0_100%] sm:flex-[0_0_80%] md:flex-[0_0_48%] lg:flex-[0_0_32%] min-w-0 px-2 sm:px-3"
                  aria-label={`Témoignage de ${testimonial.name}`}
                >
                  <div className="bg-card/70 backdrop-blur-sm p-5 md:p-6 shadow-soft h-full flex flex-col border border-border/30 rounded-2xl hover:shadow-medium hover:border-gold/30 hover:-translate-y-1 transition-all duration-500">
                    <Quote className="w-6 h-6 text-accent/25 mb-4" aria-hidden="true" />
                    <div className="flex gap-1 mb-4" role="img" aria-label="5 étoiles">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-accent/60 text-accent/60" aria-hidden="true" />
                      ))}
                    </div>
                    <blockquote className="text-muted-foreground text-sm leading-relaxed mb-5 flex-grow">
                      <p>"{testimonial.text}"</p>
                    </blockquote>
                    <footer className="flex items-center gap-3 pt-4 border-t border-border/20">
                      <div
                        className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center opacity-70"
                        aria-hidden="true"
                      >
                        <span className="font-display text-xs text-accent">{testimonial.name.charAt(0)}</span>
                      </div>
                      <cite className="font-display text-base text-foreground not-italic">{testimonial.name}</cite>
                    </footer>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <nav className="flex justify-center items-center gap-1 md:gap-1.5 mt-6 md:mt-8" aria-label="Navigation témoignages">
            {(testimonials.length <= 5
              ? testimonials.map((_, i) => i)
              : [
                  0,
                  Math.max(1, selectedIndex - 1),
                  selectedIndex,
                  Math.min(testimonials.length - 2, selectedIndex + 1),
                  testimonials.length - 1,
                ]
            ).map((index, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`rounded-full transition-all duration-500 ease-out p-0 border-0 min-w-0 min-h-0 ${
                  selectedIndex === index 
                    ? "bg-gold/50 w-3 h-[3px] md:w-4 md:h-1 lg:w-5 lg:h-1" 
                    : "bg-accent/20 w-[3px] h-[3px] md:w-1 md:h-1 lg:w-1.5 lg:h-1.5 hover:bg-accent/30"
                }`}
                style={{ padding: 0, minWidth: 0, minHeight: 0 }}
                aria-label={`Témoignage ${index + 1}`}
                aria-current={selectedIndex === index ? "true" : undefined}
              />
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
