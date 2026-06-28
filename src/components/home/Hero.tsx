"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
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

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-[#0b1628]">
      <div className="absolute inset-0 hero-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] rounded-full bg-[#f5a623]/[0.03] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[#f5a623]/[0.02] blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-20 sm:pt-32 sm:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            key={`text-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] text-white/60 text-xs mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f5a623]" />
              {slide.badge}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05] text-white mb-5">
              {slide.headline1}{" "}
              <span className="text-[#f5a623]">{slide.headline2}</span>
              <br />
              {slide.headline3}
            </h1>

            <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-lg mb-8">
              {slide.description}
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Button
                variant="accent"
                size="lg"
                className="gap-2 w-full sm:w-auto text-base bg-[#f5a623] text-[#0b1628] hover:bg-[#e0981f]"
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
                className="gap-2 w-full sm:w-auto text-base border-white/20 text-white/80 hover:bg-white/[0.06] hover:text-white"
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg">
              <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-4 shadow-2xl">
                <div className="flex items-center gap-2 mb-4 px-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                  <div className="ml-4 h-5 flex-1 rounded-md bg-white/[0.06]" />
                </div>
                <div className="rounded-xl bg-white/[0.04] p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#f5a623]/20 flex items-center justify-center shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f5a623" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 3v18h18" /><path d="M7 16l4-8 4 4 4-6" />
                      </svg>
                    </div>
                    <div className="flex-1 h-3 rounded bg-white/[0.08]" />
                    <div className="w-16 h-6 rounded-md bg-[#f5a623]/15" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#f5a623]/20 flex items-center justify-center shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f5a623" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20V10" /><path d="M18 20V4" /><path d="M6 20v-4" />
                      </svg>
                    </div>
                    <div className="flex-1 h-3 rounded bg-white/[0.08]" />
                    <div className="w-16 h-6 rounded-md bg-[#f5a623]/15" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#f5a623]/20 flex items-center justify-center shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f5a623" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><line x1="21.17" y1="8" x2="12" y2="8" />
                      </svg>
                    </div>
                    <div className="flex-1 h-3 rounded bg-white/[0.08]" />
                    <div className="w-16 h-6 rounded-md bg-[#f5a623]/15" />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#f5a623]" />
                    <span className="text-xs text-white/40">Live dashboard</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-6 h-6 rounded bg-white/[0.06]" />
                    <div className="w-6 h-6 rounded bg-white/[0.06]" />
                    <div className="w-6 h-6 rounded bg-white/[0.06]" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-4 hidden xl:flex flex-col justify-center shadow-lg">
                <div className="text-2xl font-bold text-[#f5a623]">350%</div>
                <div className="text-xs text-white/50">Avg Traffic Increase</div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-16">
          <button
            onClick={prev}
            className="p-2 rounded-full border border-white/20 text-white/50 hover:text-white hover:border-white/40 transition-colors"
            aria-label="Previous slide"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
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
                  i === current ? "w-8 bg-[#f5a623]" : "w-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-2 rounded-full border border-white/20 text-white/50 hover:text-white hover:border-white/40 transition-colors"
            aria-label="Next slide"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
