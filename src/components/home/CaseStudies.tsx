"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, TrendingUp, Clock, Target } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const metricIcons = [TrendingUp, Clock, Target];

export function CaseStudies() {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("caseStudies");
  const list = t.raw("list") as {
    title: string;
    slug: string;
    industry: string;
    before: string;
    after: string;
    metrics: Record<string, string>;
  }[];
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-50px" });

  return (
    <section
      id="case-studies"
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-labelledby="case-studies-heading"
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
          <h2 id="case-studies-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 max-w-2xl">
            {t("title")}{" "}
            <span className="text-primary">{t("highlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl">
            {t("description")}
          </p>
        </motion.div>

        <div className="space-y-6">
          {list.map((study, index) => {
            const metricEntries = Object.entries(study.metrics);
            return (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="group relative rounded-2xl border border-border bg-card p-6 sm:p-8 hover:border-primary/20 transition-all duration-300">
                  <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                    <div className="lg:col-span-5">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-secondary text-xs font-medium text-muted-foreground mb-3">
                        {study.industry}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-semibold tracking-tight mb-3 group-hover:text-primary transition-colors duration-300">
                        {study.title}
                      </h3>
                      <div className="space-y-3">
                        <div className="border-l-2 border-border pl-4">
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                            {t("before")}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {study.before}
                          </p>
                        </div>
                        <div className="border-l-2 border-primary pl-4">
                          <p className="text-xs font-medium text-primary uppercase tracking-wider mb-1">
                            {t("after")}
                          </p>
                          <p className="text-sm text-foreground font-medium">
                            {study.after}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-4">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
                        {t("keyMetrics")}
                      </p>
                      <div className="grid grid-cols-1 gap-4">
                        {metricEntries.map(([key, value], mi) => {
                          const MetricIcon = metricIcons[mi] || Target;
                          return (
                            <div key={key} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                              <MetricIcon className="w-5 h-5 text-primary shrink-0" />
                              <div className="min-w-0">
                                <p className="text-xs text-muted-foreground truncate">
                                  {t(`metricLabels.${key}`)}
                                </p>
                                <p className="text-sm font-semibold text-primary">
                                  {value}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="lg:col-span-3 lg:text-right self-end">
                      <Link href={`/${locale}/case-studies/${study.slug}`}>
                        <Button variant="outline" size="sm" className="gap-2 group/btn w-full lg:w-auto">
                          {t("viewCaseStudy")}
                          <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                      </Link>
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
