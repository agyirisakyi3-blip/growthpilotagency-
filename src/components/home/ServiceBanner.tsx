"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

type SlideService = {
  icon: string;
  title: string;
  slug: string;
  description: string;
  cta: string;
};

const slideIndices = [0, 1, 2, 3, 4];

export function ServiceBanner() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const t = useTranslations("services");
  const list = t.raw("list") as SlideService[];

  const slides = slideIndices.map((i) => list[i]).filter(Boolean);

  const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const slide = slides[current];
  if (!slide) return null;

  return (
    <section
      className="relative overflow-hidden rounded-none sm:rounded-2xl mx-0 sm:mx-4 sm:mb-4 bg-primary"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Service showcase"
    >
      <div className="relative min-h-[320px] sm:min-h-[360px] flex items-center px-6 sm:px-12 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.slug}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="text-primary-foreground">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-foreground/10 text-primary-foreground/80 text-xs mb-4">
                  <Sparkles size={12} />
                  Our Service
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3">
                  {slide.title}
                </h2>
                <p className="text-primary-foreground/70 text-base sm:text-lg leading-relaxed max-w-xl mb-6">
                  {slide.description}
                </p>
                <Button
                  variant="secondary"
                  size="default"
                  className="gap-2"
                  asChild
                >
                  <Link href={`/services/${slide.slug}`}>
                    {slide.cta}
                    <ArrowRight size={14} />
                  </Link>
                </Button>
              </div>

              <div className="hidden lg:flex items-center justify-center">
                <div className="w-40 h-40 rounded-full bg-primary-foreground/5 flex items-center justify-center">
                  <Sparkles size={80} className="text-primary-foreground/20" strokeWidth={1} />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.slug}
            onClick={() => setCurrent(i)}
            className={`transition-all rounded-full cursor-pointer ${
              i === current
                ? "w-6 h-1.5 bg-primary-foreground"
                : "w-1.5 h-1.5 bg-primary-foreground/30"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/70 hover:bg-primary-foreground/20 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft size={16} />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/70 hover:bg-primary-foreground/20 transition-all"
        aria-label="Next slide"
      >
        <ChevronRight size={16} />
      </button>
    </section>
  );
}
