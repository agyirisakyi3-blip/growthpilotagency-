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
      className="relative py-24 sm:py-32 border-t border-border"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="w-full aspect-[4/5] rounded-2xl bg-secondary overflow-hidden">
              <Image
                src="/agyiri.png"
                alt={t("title")}
                width={400}
                height={533}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-3 -right-3 w-20 h-20 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shadow-sm">
              {t("years")}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          >
            <p className="text-sm font-medium text-primary mb-3 tracking-wide">
              {t("badge")}
            </p>
            <h2 id="about-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-2">
              {t("name")}
            </h2>
            <p className="text-lg text-primary font-medium mb-6">
              {t("title")}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-xl">
              {t("description")}
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => {
                const Icon = skillIcons[i] || Globe;
                return (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-secondary text-secondary-foreground border border-border"
                  >
                    <Icon className="w-3.5 h-3.5 text-primary" />
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
