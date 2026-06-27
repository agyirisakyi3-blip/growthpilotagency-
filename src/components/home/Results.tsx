"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

function AnimatedCounter({
  value,
  suffix,
  label,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
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
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="tabular-nums text-5xl sm:text-6xl font-bold tracking-tight text-primary">
        {count.toLocaleString()}
        <span className="text-foreground">{suffix}</span>
      </div>
      <p className="text-muted-foreground text-sm mt-1">
        {label}
      </p>
    </motion.div>
  );
}

export function Results() {
  const t = useTranslations("results");
  const stats = t.raw("stats") as { value: number; suffix: string; label: string }[];

  return (
    <section
      id="results"
      className="relative py-24 sm:py-32 border-t border-border"
      aria-labelledby="results-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-2">
            <p className="text-sm font-medium text-primary mb-3 tracking-wide">
              {t("badge")}
            </p>
            <h2 id="results-heading" className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              {t("title")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("description")}
            </p>
          </div>

          <div className="lg:col-span-3 grid grid-cols-2 gap-x-12 gap-y-10">
            {stats.map((stat, i) => (
              <AnimatedCounter
                key={stat.label}
                {...stat}
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
