"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Palette, Bot, MessageSquare, TrendingUp,
  ChevronLeft, ChevronRight, Sparkles, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

type SlideService = {
  icon: string;
  title: string;
  slug: string;
  description: string;
  benefits: string[];
  cta: string;
};

const iconMap: Record<string, typeof Search> = {
  Search, Palette, Bot, MessageSquare, TrendingUp,
};

const gradients = [
  "from-blue-600 via-blue-700 to-indigo-800",
  "from-violet-600 via-purple-700 to-indigo-800",
  "from-emerald-500 via-teal-600 to-cyan-700",
  "from-orange-500 via-amber-600 to-red-700",
  "from-rose-500 via-pink-600 to-purple-700",
];

const slideIndices = [0, 1, 2, 3, 4];

export function ServiceBanner() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const t = useTranslations("services");
  const list = t.raw("list") as SlideService[];

  const slides = slideIndices.map((i) => ({
    ...list[i],
    gradient: gradients[i],
  }));

  const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  return (
    <section
      className="relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Service showcase"
    >
      <div className="relative h-[500px] sm:h-[560px]">
        <AnimatePresence mode="wait">
          {slides.map(
            (slide, i) =>
              i === current && (
                <motion.div
                  key={slide.slug}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}
                >
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

                  <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center">
                    <div className="grid lg:grid-cols-2 gap-10 items-center w-full">
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-white"
                      >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white/80 text-xs sm:text-sm mb-6">
                          <Sparkles size={14} />
                          Our Service
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-tight">
                          {slide.title}
                        </h2>
                        <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-6 max-w-xl">
                          {slide.description}
                        </p>
                        <ul className="space-y-2.5 mb-8">
                          {slide.benefits.map((b) => (
                            <li key={b} className="flex items-center gap-3 text-white/80">
                              <span className="w-1.5 h-1.5 rounded-full bg-white/50 shrink-0" />
                              {b}
                            </li>
                          ))}
                        </ul>
                        <Button
                          size="lg"
                          className="bg-white text-gray-900 hover:bg-white/90 hover:scale-105 transition-all gap-2 shadow-xl shadow-black/20"
                          asChild
                        >
                          <Link href={`/services/${slide.slug}`}>
                            {slide.cta}
                            <ArrowRight size={16} />
                          </Link>
                        </Button>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="hidden lg:flex items-center justify-center"
                      >
                        <div className="relative">
                          <div className="w-72 h-72 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                            {(() => {
                              const Icon = iconMap[slide.icon] || Search;
                              return <Icon size={120} className="text-white/90" strokeWidth={1.2} />;
                            })()}
                          </div>
                          <div className="absolute -top-4 -right-4 w-20 h-20 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                            <Sparkles size={32} className="text-yellow-300" />
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ),
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        {slides.map((slide, i) => (
          <button
            key={slide.slug}
            onClick={() => setCurrent(i)}
            className={`transition-all rounded-full cursor-pointer ${
              i === current
                ? "w-8 h-2.5 bg-white"
                : "w-2.5 h-2.5 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <button
        onClick={prev}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>
    </section>
  );
}
