"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Target, Zap, Cpu, Wallet, Headphones } from "lucide-react";
import { useTranslations } from "next-intl";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Target, Zap, Cpu, Wallet, Headphones,
};

export function WhyChooseUs() {
  const t = useTranslations("whyChooseUs");
  const items = t.raw("items") as { title: string; description: string; icon?: string }[];
  const tags = t.raw("tags") as string[];
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-50px" });

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden" aria-labelledby="why-choose-us-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-16"
        >
          <p className="text-sm font-medium text-primary mb-3 tracking-wide">
            {t("badge")}
          </p>
          <h2 id="why-choose-us-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {t("title")}{" "}
            <span className="text-primary">{t("highlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t("description")}
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-secondary text-secondary-foreground border border-border"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {items.map((item, index) => {
            const Icon = iconMap[Object.keys(iconMap)[index]] || Target;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="bg-card p-8 sm:p-10 flex flex-col items-start text-left hover:bg-secondary/50 transition-colors duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 shrink-0">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
