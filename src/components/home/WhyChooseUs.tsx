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
    <section className="relative py-24 sm:py-32" aria-labelledby="why-choose-us-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, x: -20 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-background/50 text-xs sm:text-sm text-muted-foreground mb-4">
              {t("badge")}
            </div>
            <h2 id="why-choose-us-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
              {t("title")}{" "}
              <span className="gradient-text">{t("highlight")}</span>
              , {t("subtitle")}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {t("description")}
            </p>
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-xs font-medium rounded-full bg-secondary text-secondary-foreground border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {items.map((item, index) => {
              const Icon = iconMap[Object.keys(iconMap)[index]] || Target;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <div className="group p-5 rounded-xl border border-border bg-card hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-orange-600/20 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:from-primary/30 group-hover:to-orange-600/30 transition-all duration-300">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-1.5">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
