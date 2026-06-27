"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3, ArrowLeft, ArrowRight, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const ctaHref: Record<number, string> = {
  0: "#seo-audit",
  1: "#case-studies",
  2: "#seo-audit",
  3: "#seo-audit",
  4: "#seo-audit",
};

const slideContent = [
  {
    stat: "350%",
    statLabel: "Avg traffic increase",
    graphic: (
      <svg viewBox="0 0 400 400" className="w-full h-full" fill="none">
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0d7377" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#14a3a8" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="180" fill="url(#g1)" stroke="currentColor" strokeWidth="0.5" className="text-primary/20" />
        <path d="M80 280 L160 220 L220 240 L320 160" stroke="#0d7377" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-60" />
        <path d="M80 280 L160 220 L220 240 L320 160" stroke="#14a3a8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-30" transform="translate(0, 4)" />
        <circle cx="320" cy="160" r="6" fill="#0d7377" className="opacity-70" />
        <rect x="100" y="250" width="40" height="8" rx="4" fill="#0d7377" className="opacity-30" />
        <rect x="180" y="210" width="30" height="8" rx="4" fill="#0d7377" className="opacity-20" />
        <rect x="270" y="180" width="35" height="8" rx="4" fill="#0d7377" className="opacity-40" />
      </svg>
    ),
  },
  {
    stat: "200%",
    statLabel: "More leads generated",
    graphic: (
      <svg viewBox="0 0 400 400" className="w-full h-full" fill="none">
        <defs>
          <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0d7377" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#14a3a8" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="180" fill="url(#g2)" stroke="currentColor" strokeWidth="0.5" className="text-primary/20" />
        <rect x="120" y="160" width="50" height="100" rx="6" fill="#0d7377" className="opacity-20" />
        <rect x="180" y="120" width="50" height="140" rx="6" fill="#0d7377" className="opacity-35" />
        <rect x="240" y="80" width="50" height="180" rx="6" fill="#0d7377" className="opacity-55" />
        <line x1="100" y1="280" x2="320" y2="280" stroke="currentColor" strokeWidth="1" className="text-primary/20" strokeDasharray="4 4" />
      </svg>
    ),
  },
  {
    stat: "85%",
    statLabel: "Better rankings",
    graphic: (
      <svg viewBox="0 0 400 400" className="w-full h-full" fill="none">
        <defs>
          <linearGradient id="g3" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0d7377" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#14a3a8" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="180" fill="url(#g3)" stroke="currentColor" strokeWidth="0.5" className="text-primary/20" />
        <circle cx="200" cy="200" r="80" stroke="#0d7377" strokeWidth="2" className="opacity-30" fill="none" />
        <circle cx="200" cy="200" r="50" stroke="#0d7377" strokeWidth="2" className="opacity-50" fill="none" />
        <circle cx="200" cy="200" r="20" fill="#0d7377" className="opacity-60" />
        <path d="M200 20 L200 40" stroke="#0d7377" strokeWidth="2" className="opacity-40" />
        <path d="M200 360 L200 380" stroke="#0d7377" strokeWidth="2" className="opacity-40" />
      </svg>
    ),
  },
];

export function Hero() {
  const t = useTranslations("hero");
  const slides = t.raw("slides") as {
    badge: string;
    headline1: string;
    headline2: string;
    headline3: string;
    description: string;
    cta: string;
    cta2: string;
  }[];

  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    intervalRef.current = setInterval(next, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [next]);

  const slide = slides[current];
  const graphic = slideContent[current % slideContent.length];

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-background">
      <div className="absolute inset-0 section-grid opacity-50 pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16 sm:pt-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            key={`text-${current}`}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-5">
              {slide.headline1}{" "}
              <span className="text-primary">{slide.headline2}</span>
              <br />
              {slide.headline3}
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg mb-8">
              {slide.description}
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Button
                variant="accent"
                size="lg"
                className="gap-2 w-full sm:w-auto text-base"
                asChild
              >
                <Link href={ctaHref[current] || "#seo-audit"}>
                  {slide.cta}
                  <ChevronRight size={16} />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="gap-2 w-full sm:w-auto text-base"
                asChild
              >
                <Link href={"/services"}>
                  {slide.cta2}
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            key={`graphic-${current}`}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-72 h-72 rounded-full border border-primary/10" />
                <div className="absolute w-48 h-48 rounded-full border border-primary/10" />
              </div>
              <div className="relative z-10 w-full h-full text-primary/80">
                {graphic.graphic}
              </div>
              <motion.div
                key={`stat-${current}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-card border border-border rounded-xl px-6 py-3 text-center shadow-sm"
              >
                <div className="text-2xl font-bold text-primary">{graphic.stat}</div>
                <div className="text-xs text-muted-foreground">{graphic.statLabel}</div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-16">
          <button
            onClick={prev}
            className="p-2 rounded-full border border-border hover:bg-secondary transition-colors"
            aria-label="Previous slide"
          >
            <ArrowLeft size={16} />
          </button>

          <div className="flex items-center gap-2" role="tablist" aria-label="Slide navigation">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                role="tab"
                aria-selected={i === current}
                aria-label={`Slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "w-8 bg-primary" : "w-1.5 bg-muted-foreground/25"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-2 rounded-full border border-border hover:bg-secondary transition-colors"
            aria-label="Next slide"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
