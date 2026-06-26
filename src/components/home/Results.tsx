"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Search, Users, DollarSign } from "lucide-react";
import { useTranslations } from "next-intl";

function AnimatedCounter({
  value,
  suffix,
  label,
  icon: Icon,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  delay: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative text-center p-6 sm:p-8 group"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-orange-600/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:from-primary/30 group-hover:to-orange-600/30 transition-all duration-300">
          <Icon className="w-7 h-7 text-primary" />
        </div>
        <div className="text-4xl sm:text-5xl font-bold tracking-tight mb-1">
          <span className="tabular-nums">{count.toLocaleString()}</span>
          <span className="gradient-text">{suffix}</span>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base">
          {label}
        </p>
      </div>
    </motion.div>
  );
}

const iconMap = [TrendingUp, Search, Users, DollarSign];

export function Results() {
  const t = useTranslations("results");
  const stats = t.raw("stats") as { value: number; suffix: string; label: string }[];

  return (
    <section
      id="results"
      className="relative py-24 sm:py-32 bg-secondary/50"
      aria-labelledby="results-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-background/50 text-xs sm:text-sm text-muted-foreground mb-4">
            {t("badge")}
          </div>
          <h2 id="results-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {t("title")}{" "}
            <span className="gradient-text">{t("highlight")}</span> {t("subtitle")}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 max-w-4xl mx-auto">
          {stats.map((stat, i) => (
            <AnimatedCounter
              key={stat.label}
              {...stat}
              icon={iconMap[i]}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
