"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Scale, Shield, Heart, Building2, GraduationCap, Home,
} from "lucide-react";
import { useTranslations } from "next-intl";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Scale, Shield, Heart, Building2, GraduationCap, Home,
};

export function Industries() {
  const t = useTranslations("industries");
  const list = t.raw("list") as { name: string; description: string }[];
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-50px" });

  return (
    <section
      className="relative py-24 sm:py-32 bg-secondary/50"
      aria-labelledby="industries-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-background/50 text-xs sm:text-sm text-muted-foreground mb-4">
            {t("badge")}
          </div>
          <h2 id="industries-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {t("title")}{" "}
            <span className="gradient-text">{t("highlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("description")}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((industry, index) => {
            const Icon = iconMap[Object.keys(iconMap)[index]] || Building2;
            return (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="group relative overflow-hidden p-6 rounded-xl border border-border bg-card hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 cursor-default">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full transition-all duration-500 group-hover:scale-150" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-orange-600/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:from-primary/30 group-hover:to-orange-600/30 transition-all duration-300">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {industry.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {industry.description}
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
