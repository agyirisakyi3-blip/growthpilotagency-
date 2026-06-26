"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, BarChart3, Sparkles, ArrowLeft, ArrowRight, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const ctaIcons = [Search, ChevronRight, BarChart3, Search, BarChart3] as const;
const ctaHref: Record<number, string> = {
  0: "#seo-audit",
  1: "#case-studies",
  2: "#seo-audit",
  3: "#seo-audit",
  4: "#seo-audit",
};
const cta2Href: Record<number, string> = {
  0: "#services",
  1: "/contact",
  2: "#services",
  3: "#services",
  4: "/contact",
};

function ParticleCanvas({ canvasRef }: { canvasRef: React.RefObject<HTMLCanvasElement | null> }) {
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;

    const isMobile = window.innerWidth < 768;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isMobile || prefersReduced) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const ctx = el.getContext("2d")!;
    let w = window.innerWidth;
    let h = window.innerHeight;
    el.width = w * dpr;
    el.height = h * dpr;
    ctx.scale(dpr, dpr);

    const count = Math.min(30, Math.floor((w * h) / 40000));
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    let animationId: number;
    let running = true;

    const c = ctx;

    function animate() {
      if (!running) return;
      c.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        c.beginPath();
        c.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        c.fillStyle = `rgba(217, 119, 6, ${p.alpha})`;
        c.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x;
          const dy = particles[j].y - p.y;
          if (dx > 120 || dy > 120) continue;
          const dist = dx * dx + dy * dy;
          if (dist < 10000) {
            const alpha = 0.03 * (1 - Math.sqrt(dist) / 100);
            c.beginPath();
            c.moveTo(p.x, p.y);
            c.lineTo(particles[j].x, particles[j].y);
            c.strokeStyle = `rgba(217, 119, 6, ${alpha})`;
            c.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      el.width = w * dpr;
      el.height = h * dpr;
      ctx.scale(dpr, dpr);
    };
    const handleVisibility = () => {
      running = !document.hidden;
      if (running && !animationId) animate();
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [canvasRef]);

  return null;
}

const slideVariants = {
  enter: { opacity: 0, y: 30 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
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

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    intervalRef.current = setInterval(next, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [next]);

  const slide = slides[current];
  const Icon = ctaIcons[current];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      />
      <ParticleCanvas canvasRef={canvasRef} />

      <div className="absolute inset-0 z-0 aurora-bg animate-aurora" aria-hidden="true" />

      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="absolute inset-0 hero-grid z-0" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-0" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-16 w-full">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-background/50 text-xs text-muted-foreground mb-6 backdrop-blur-sm">
              <Sparkles size={14} className="text-primary" />
              {slide.badge}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-4">
              {slide.headline1}
              <br />
              <span className="gradient-text">{slide.headline2}</span>
              <br />
              {slide.headline3}
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
              {slide.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="gradient"
                size="xl"
                className="gap-2 w-full sm:w-auto text-base sm:text-lg"
                asChild
              >
                <Link href={ctaHref[current] || "#seo-audit"}>
                  {slide.cta}
                  <Icon size={18} />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="gap-2 w-full sm:w-auto text-base sm:text-lg"
                asChild
              >
                <Link href={cta2Href[current] || "#services"}>
                  {slide.cta2}
                  <ChevronRight size={18} />
                </Link>
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={prev}
            className="p-2 rounded-full border border-border hover:bg-accent/50 transition-colors focus-visible:outline-2 focus-visible:outline-ring"
            aria-label={t("previous")}
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
                aria-label={`${t("slide")} ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-ring ${
                  i === current ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-2 rounded-full border border-border hover:bg-accent/50 transition-colors focus-visible:outline-2 focus-visible:outline-ring"
            aria-label={t("next")}
          >
            <ArrowRight size={16} />
          </button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            {t("noCommitment")}
          </span>
          <span className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            {t("freeStrategyReport")}
          </span>
          <span className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            {t("turnaround")}
          </span>
        </div>

        <div className="mt-8 flex items-center justify-center gap-8">
          {["Google", "Meta", "HubSpot", "Salesforce"].map((name) => (
            <span
              key={name}
              className="text-xs sm:text-sm text-muted-foreground/30 font-semibold tracking-widest uppercase"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
