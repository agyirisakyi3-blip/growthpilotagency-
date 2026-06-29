"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, TrendingUp, BarChart3, Sparkles } from "lucide-react";
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

const slideIcons = [TrendingUp, BarChart3, Sparkles, TrendingUp, BarChart3];

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
  const SlideIcon = slideIcons[current] || TrendingUp;

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-[#0a0f1e]">
      <div className="absolute inset-0 hero-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 -right-48 w-[500px] h-[500px] rounded-full bg-[#3b82f6]/[0.04] blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -left-48 w-[400px] h-[400px] rounded-full bg-[#46c4ff]/[0.03] blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-20 sm:pt-32 sm:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            key={`text-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.03] text-white/50 text-xs mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
              {slide.badge}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05] text-white mb-5">
              {slide.headline1}{" "}
              <span className="bg-gradient-to-r from-[#3b82f6] to-[#46c4ff] bg-clip-text text-transparent">{slide.headline2}</span>
              <br />
              {slide.headline3}
            </h1>

            <p className="text-base sm:text-lg text-white/50 leading-relaxed max-w-lg mb-8">
              {slide.description}
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Button
                size="lg"
                className="gap-2 w-full sm:w-auto text-base bg-[#3b82f6] text-white hover:bg-[#2563eb] shadow-lg shadow-[#3b82f6]/20"
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
                className="gap-2 w-full sm:w-auto text-base border-white/20 text-white/70 hover:bg-white/[0.06] hover:text-white"
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
              <div className="glass-card rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center gap-3 mb-6 px-1">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                    <div className="w-3 h-3 rounded-full bg-green-400/60" />
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/40 font-mono">dashboard.preview</span>
                      <span className="text-[10px] text-white/30">Last 30 days</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#3b82f6]/15 flex items-center justify-center">
                        <SlideIcon className="w-5 h-5 text-[#3b82f6]" />
                      </div>
                      <div>
                        <p className="text-sm text-white/40 font-mono">Organic Traffic</p>
                        <p className="text-2xl font-bold text-white">+{current === 0 ? "350" : current === 1 ? "85" : current === 2 ? "200" : current === 3 ? "45" : "92"}%</p>
                      </div>
                    </div>
                    <div className="w-20 h-8 rounded-lg bg-[#3b82f6]/10 flex items-center justify-center">
                      <span className="text-[10px] font-medium text-[#3b82f6]">Live</span>
                    </div>
                  </div>

                  <div className="h-px bg-white/[0.06]" />

                  <div className="grid grid-cols-3 gap-3">
                    {["SEO", "GEO", "AI"].map((label, i) => (
                      <div key={label} className="rounded-lg bg-white/[0.03] p-3 text-center border border-white/[0.04]">
                        <p className="text-lg font-bold text-white">{["98", "76", "100"][i]}</p>
                        <p className="text-[10px] text-white/40">{label} Score</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-5 -right-5 w-36 h-24 rounded-xl glass-card p-4 hidden xl:flex flex-col justify-center shadow-xl">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-[10px] text-white/40">Active Growth</span>
                </div>
                <div className="text-xl font-bold bg-gradient-to-r from-[#3b82f6] to-[#46c4ff] bg-clip-text text-transparent">
                  +350%
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-16">
          <button
            onClick={prev}
            className="p-2 rounded-full border border-white/20 text-white/40 hover:text-white hover:border-white/40 transition-colors"
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
                  i === current ? "w-8 bg-[#3b82f6]" : "w-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-2 rounded-full border border-white/20 text-white/40 hover:text-white hover:border-white/40 transition-colors"
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
