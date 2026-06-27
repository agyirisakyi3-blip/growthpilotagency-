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
      className="relative py-24 sm:py-32"
      aria-labelledby="industries-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="text-sm font-medium text-primary mb-3 tracking-wide">
            {t("badge")}
          </p>
          <h2 id="industries-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 max-w-2xl">
            {t("title")}{" "}
            <span className="text-primary">{t("highlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl">
            {t("description")}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((industry, index) => {
            const Icon = iconMap[Object.keys(iconMap)[index]] || Building2;
            const isLarge = index === 0;
            return (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className={isLarge ? "lg:col-span-2 lg:row-span-1" : ""}
              >
                <div className={`relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/20 ${isLarge ? 'p-8 sm:p-10' : 'p-6'}`}>
                  <div className={`${isLarge ? 'flex items-start gap-6' : ''}`}>
                    <div className={`${isLarge ? 'shrink-0' : ''} w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className={`font-semibold mb-2 ${isLarge ? 'text-xl' : 'text-base'}`}>
                        {industry.name}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {industry.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
