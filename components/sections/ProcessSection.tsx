"use client";

import { memo } from "react";
import Link from "next/link";
import { MessageCircle, Sparkles, Heart, ArrowRight } from "lucide-react";

import { useInView } from "@/hooks/useInView";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: MessageCircle,
    title: "Échange initial",
    description:
      "Un premier contact pour comprendre vos besoins et définir ensemble l'accompagnement adapté.",
  },
  {
    icon: Sparkles,
    title: "Séance sur-mesure",
    description:
      "En cabinet à Cépet ou en ligne, une séance sur-mesure en astrologie ou Reiki selon vos attentes.",
  },
  {
    icon: Heart,
    title: "Suivi bienveillant",
    description:
      "Un accompagnement dans la durée pour intégrer les prises de conscience et avancer sereinement.",
  },
];

const ProcessSection = memo(function ProcessSection() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-20 md:py-28 bg-gradient-sand-center"
      aria-labelledby="process-title"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`mb-12 text-center motion-safe:transition-all duration-700 md:mb-16 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="section-label">Le déroulement</p>
          <h2
            id="process-title"
            className="font-display text-2xl text-foreground sm:text-3xl lg:text-4xl"
          >
            <span className="font-calligraphic text-accent text-3xl sm:text-4xl lg:text-5xl inline-block align-baseline">
              V
            </span>
            otre parcours en 3 étapes
          </h2>
        </div>

        {/* Steps */}
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-10">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.title}
                  className={`relative text-center motion-safe:transition-all duration-700 ${
                    isInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Connector line (desktop only) */}
                  {index < steps.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="absolute left-[60%] top-10 hidden h-px w-[80%] bg-gradient-to-r from-accent/30 to-transparent md:block"
                    />
                  )}

                  {/* Step number */}
                  <div className="absolute -top-2 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border border-gold/30">
                    <span className="text-xs font-medium text-gold">
                      {index + 1}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-accent/10 bg-gradient-to-br from-accent/10 to-gold/10">
                    <Icon
                      className="h-8 w-8 text-accent"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Content */}
                  <h3 className="mb-2 font-display text-lg text-foreground sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div
          className={`mt-12 text-center motion-safe:transition-all duration-700 delay-500 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <Button asChild size="lg" className="group bg-gold-light hover:bg-navy text-foreground hover:text-white shadow-gold">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Prendre contact
              <ArrowRight className="h-4 w-4 motion-safe:transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
});

ProcessSection.displayName = "ProcessSection";

export default ProcessSection;
