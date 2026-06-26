"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles } from "lucide-react";
import { ServiceCard } from "@/components/features/service-card";
import { useTranslations } from "next-intl";
import { services } from "@/lib/constants";

export default function ServicesPage() {
  const t = useTranslations("services");
  const list = t.raw("list") as {
    title: string;
    slug: string;
    description: string;
    benefits: string[];
    cta: string;
  }[];
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-50px" });

  return (
    <div className="min-h-screen pt-24 sm:pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-background/50 text-sm text-muted-foreground mb-4">
            <Sparkles size={12} className="text-primary" />
            {t("badge")}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            {t("title")}{" "}
            <span className="gradient-text">{t("highlight")}</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            {t("description")}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.slug}
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
    </div>
  );
}
