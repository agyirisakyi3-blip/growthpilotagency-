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

  const featured = services.slice(0, 3);
  const rest = services.slice(3);

  return (
    <section id="services" className="relative py-24 sm:py-32" aria-labelledby="services-heading">
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
          <h2 id="services-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 max-w-2xl">
            {t("title")}{" "}
            <span className="text-primary">{t("highlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl">
            {t("description")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6 mb-12">
          {featured.map((service, index) => (
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {rest.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={{
                ...service,
                title: list[index + 3]?.title ?? service.title,
                description: list[index + 3]?.description ?? service.description,
                benefits: list[index + 3]?.benefits ?? service.benefits,
                cta: list[index + 3]?.cta ?? service.cta,
              }}
              index={index + 3}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
