"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

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
      className="relative py-24 sm:py-32"
      aria-labelledby="case-studies-heading"
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
          <h2 id="case-studies-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {t("title")}{" "}
            <span className="gradient-text">{t("highlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("description")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {list.map((study, index) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Card className="group h-full overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1.5 border-border/50">
                <div className="p-6 sm:p-8 flex flex-col h-full">
                  <Badge variant="secondary" className="self-start mb-3">
                    {study.industry}
                  </Badge>
                  <h3 className="text-lg font-semibold mb-4 group-hover:text-primary transition-colors duration-300">
                    {study.title}
                  </h3>

                  <div className="space-y-4 mb-6 flex-1">
                    <div className="p-3 rounded-lg bg-secondary/50">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                        {t("before")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {study.before}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                      <p className="text-xs font-medium text-emerald-500 uppercase tracking-wider mb-1">
                        {t("after")}
                      </p>
                      <p className="text-sm text-foreground font-medium">
                        {study.after}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-border">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                        {t("keyMetrics")}
                      </p>
                      <div className="space-y-2.5">
                        {Object.entries(study.metrics).map(
                          ([key, value]) => (
                            <div
                              key={key}
                              className="flex items-center justify-between"
                            >
                              <span className="text-xs text-muted-foreground">
                                {t(`metricLabels.${key}`)}
                              </span>
                              <span className="text-sm font-semibold gradient-text">
                                {value}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  <Link href={`/${locale}/case-studies/${study.slug}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1 self-start group/btn"
                      aria-label={`${t("viewCaseStudy")} ${study.title}`}
                    >
                      {t("viewCaseStudy")}
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-200 group-hover/btn:translate-x-0.5"
                      />
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
