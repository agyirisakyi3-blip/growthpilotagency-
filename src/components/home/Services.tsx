"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ServiceCard } from "@/components/features/service-card";
import { useTranslations } from "next-intl";
import { services } from "@/lib/constants";

export function Services() {
  const t = useTranslations("services");
  const list = t.raw("list") as {
    title: string;
    description: string;
    benefits: string[];
    cta: string;
  }[];
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-50px" });

  return (
    <section id="services" className="relative py-24 sm:py-32" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-background/50 text-xs sm:text-sm text-muted-foreground mb-4">
            {t("badge")}
          </div>
          <h2 id="services-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {t("title")}{" "}
            <span className="gradient-text">{t("highlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("description")}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={{
                ...service,
                title: list[index]?.title ?? service.title,
                description: list[index]?.description ?? service.description,
                benefits: list[index]?.benefits ?? service.benefits,
                cta: list[index]?.cta ?? service.cta,
              }}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
