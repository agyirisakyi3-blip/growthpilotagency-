"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";

export function Testimonials() {
  const t = useTranslations("testimonials");
  const list = t.raw("list") as {
    name: string;
    role: string;
    company: string;
    content: string;
  }[];
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-50px" });

  return (
    <section
      className="relative py-24 sm:py-32 border-t border-border"
      aria-labelledby="testimonials-heading"
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
          <h2 id="testimonials-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 max-w-2xl">
            {t("title")}{" "}
            <span className="text-primary">{t("highlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl">
            {t("description")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {list.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card h-full relative hover:border-primary/10 transition-colors duration-300">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <blockquote className="mb-6">
                  <p className="text-muted-foreground leading-relaxed">
                    &ldquo;{item.content}&rdquo;
                  </p>
                </blockquote>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary shrink-0">
                    {item.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.role}, {item.company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
