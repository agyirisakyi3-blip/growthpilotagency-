"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import {
  Search, Code2, Globe, Cloud, Bot, TrendingUp,
} from "lucide-react";
import { useTranslations } from "next-intl";

const skillIcons = [Search, Code2, Globe, Globe, Cloud, Bot, TrendingUp];

export function About() {
  const t = useTranslations("about");
  const skills = t.raw("skills") as string[];
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-50px" });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-labelledby="about-heading"
    >
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:col-span-2"
          >
            <div className="relative">
              <div className="w-full aspect-[3/4] rounded-2xl bg-gradient-to-br from-primary/20 to-orange-600/20 flex items-center justify-center overflow-hidden">
                <Image
                  src="/agyiri.png"
                  alt={t("title")}
                  width={400}
                  height={533}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-lg animate-float">
                {t("years")}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-background/50 text-xs sm:text-sm text-muted-foreground mb-4">
              {t("badge")}
            </div>
            <h2 id="about-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-2">
              {t("name")}
            </h2>
            <p className="text-lg text-primary font-medium mb-6">
              {t("title")}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-xl">
              {t("description")}
            </p>
            <div className="flex flex-wrap gap-2" role="list" aria-label="Skills and expertise">
              {skills.map((skill, i) => {
                const Icon = skillIcons[i] || Globe;
                return (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-secondary text-secondary-foreground border border-border transition-all duration-200 hover:border-primary/30 hover:bg-secondary/80"
                    role="listitem"
                  >
                    <Icon className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                    {skill}
                  </span>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
