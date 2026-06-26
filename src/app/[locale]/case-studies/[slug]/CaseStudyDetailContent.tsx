"use client";

import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, Zap, Target } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";

type Study = {
  title: string;
  slug: string;
  industry: string;
  before: string;
  after: string;
  metrics: Record<string, string>;
};

export function CaseStudyDetailContent({ study }: { study: Study }) {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("caseStudies");

  const metricIcons = [TrendingUp, Zap, Target];

  return (
    <div className="min-h-screen pt-24 sm:pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Link
          href={`/${locale}/case-studies`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          {t("backToCaseStudies")}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="secondary" className="mb-4">{study.industry}</Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">{study.title}</h1>

          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            <Card className="p-6 border-border/50">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">{t("before")}</p>
              <p className="text-muted-foreground">{study.before}</p>
            </Card>
            <Card className="p-6 border-emerald-500/10 bg-emerald-500/5">
              <p className="text-xs font-medium text-emerald-500 uppercase tracking-wider mb-2">{t("after")}</p>
              <p className="text-foreground font-medium">{study.after}</p>
            </Card>
          </div>

          <Card className="p-6 sm:p-8 border-border/50">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">{t("keyMetrics")}</p>
            <div className="grid sm:grid-cols-3 gap-6">
              {Object.entries(study.metrics).map(([key, value], i) => {
                const Icon = metricIcons[i] || Target;
                return (
                  <div key={key} className="text-center p-4 rounded-lg bg-secondary/30">
                    <Icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                    <p className="text-2xl font-bold gradient-text mb-1">{value}</p>
                    <p className="text-xs text-muted-foreground">{t(`metricLabels.${key}`)}</p>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
