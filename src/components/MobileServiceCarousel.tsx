import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Euro, Check, Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface ServiceItem {
  id: string;
  icon: React.ReactNode;
  image?: string;
  title: string;
  subtitle?: string;
  description: string;
  price: string;
  priceNote?: string;
  duration: string;
  format: string;
  features?: string[];
  calendlyLink: string;
  isHighlighted?: boolean;
}

interface MobileServiceCarouselProps {
  services: ServiceItem[];
  className?: string;
}

const MobileServiceCarousel = ({ services, className = "" }: MobileServiceCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

      // Calculate active index
      const cardWidth = scrollRef.current.firstElementChild?.clientWidth || 0;
      const gap = 16; // gap-4 = 16px
      const index = Math.round(scrollLeft / (cardWidth + gap));
      setActiveIndex(Math.min(index, services.length - 1));
    }
  };

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (scrollEl) {
      scrollEl.addEventListener("scroll", updateScrollState, { passive: true });
      updateScrollState();
      return () => scrollEl.removeEventListener("scroll", updateScrollState);
    }
  }, [services.length]);

  const scrollToIndex = (index: number) => {
    if (scrollRef.current && scrollRef.current.firstElementChild) {
      const cardWidth = scrollRef.current.firstElementChild.clientWidth;
      const gap = 16;
      scrollRef.current.scrollTo({
        left: index * (cardWidth + gap),
        behavior: "smooth",
      });
    }
  };

  const scrollLeft = () => {
    if (activeIndex > 0) scrollToIndex(activeIndex - 1);
  };

  const scrollRight = () => {
    if (activeIndex < services.length - 1) scrollToIndex(activeIndex + 1);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Navigation arrows - hidden on mobile, visible on tablet */}
      <button
        onClick={scrollLeft}
        disabled={!canScrollLeft}
        className={`hidden sm:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-card/90 backdrop-blur-sm border border-border/30 shadow-soft transition-all ${
          canScrollLeft ? "opacity-100 hover:border-gold/30 hover:shadow-elegant" : "opacity-30 cursor-not-allowed"
        }`}
        aria-label="Précédent"
      >
        <ChevronLeft className="w-5 h-5 text-foreground" />
      </button>

      <button
        onClick={scrollRight}
        disabled={!canScrollRight}
        className={`hidden sm:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full bg-card/90 backdrop-blur-sm border border-border/30 shadow-soft transition-all ${
          canScrollRight ? "opacity-100 hover:border-gold/30 hover:shadow-elegant" : "opacity-30 cursor-not-allowed"
        }`}
        aria-label="Suivant"
      >
        <ChevronRight className="w-5 h-5 text-foreground" />
      </button>

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
        style={{ scrollPaddingLeft: "1rem" }}
      >
        {services.map((service, idx) => (
          <article
            key={service.id}
            className={`flex-shrink-0 w-[85vw] sm:w-[340px] snap-start bg-card/90 backdrop-blur-sm rounded-2xl overflow-hidden border transition-all duration-300 ${
              service.isHighlighted ? "border-gold/40 shadow-elegant" : "border-border/30 shadow-soft"
            }`}
          >
            {/* Image Header */}
            {service.image && (
              <div className="relative h-32 sm:h-40 overflow-hidden">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/30 to-transparent" />
                {/* Icon badge */}
                <div className="absolute bottom-3 left-4 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-card/90 backdrop-blur-sm border border-gold/30 flex items-center justify-center shadow-soft">
                  {service.icon}
                </div>
              </div>
            )}

            <div className="p-5 sm:p-6">
              {/* Header - without icon if image exists */}
              {!service.image && (
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-gold/20 to-accent/10 flex items-center justify-center flex-shrink-0">
                    {service.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-lg sm:text-xl text-foreground leading-tight truncate">
                      {service.title}
                    </h3>
                    {service.subtitle && (
                      <p className="text-accent text-xs sm:text-sm font-medium truncate">{service.subtitle}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Title for cards with image */}
              {service.image && (
                <div className="mb-3">
                  <h3 className="font-display text-lg sm:text-xl text-foreground leading-tight">{service.title}</h3>
                  {service.subtitle && <p className="text-accent text-xs sm:text-sm font-medium">{service.subtitle}</p>}
                </div>
              )}

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">{service.description}</p>

              {/* Features */}
              {service.features && service.features.length > 0 && (
                <ul className="space-y-1.5 mb-4">
                  {service.features.slice(0, 3).map((feature, fidx) => (
                    <li key={fidx} className="flex items-start gap-2 text-xs sm:text-sm text-foreground/80">
                      <Check className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Price & details */}
              <div className="flex flex-wrap items-center gap-3 mb-4 pb-4 border-b border-border/30">
                <div className="flex items-center gap-1.5">
                  <Euro className="w-4 h-4 text-gold" />
                  <span className="font-display text-xl text-gold">{service.price}</span>
                </div>
                {service.priceNote && <span className="text-xs text-muted-foreground">({service.priceNote})</span>}
              </div>

              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-accent" />
                  {service.duration}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-accent" />
                  <span className="truncate max-w-[100px]">{service.format}</span>
                </span>
              </div>

              {/* CTA Button - full width, proper touch target, unified color */}
              <Button
                variant="hero"
                size="default"
                className="w-full min-h-[44px] text-sm"
                onClick={() => window.open(service.calendlyLink, "_blank")}
              >
                <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate">Réserver</span>
                <ArrowRight className="w-4 h-4 ml-2 flex-shrink-0" />
              </Button>
            </div>
          </article>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center items-center gap-1 md:gap-1.5 mt-4">
        {services.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToIndex(idx)}
            className={`rounded-full transition-all duration-500 ease-out p-0 border-0 min-w-0 min-h-0 ${
              idx === activeIndex
                ? "bg-gold/50 w-3 h-[3px] md:w-4 md:h-1"
                : "bg-accent/20 w-[3px] h-[3px] md:w-1 md:h-1 hover:bg-accent/30"
            }`}
            style={{ padding: 0, minWidth: 0, minHeight: 0 }}
            aria-label={`Aller à la carte ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileServiceCarousel;
