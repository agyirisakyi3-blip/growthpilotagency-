"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, TrendingUp, Zap, Target, Lock, Unlock, Mail } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { gateCaseStudy } from "@/app/actions/case-studies";

type Study = {
  title: string;
  slug: string;
  industry: string;
  before: string;
  after: string;
  metrics: Record<string, string>;
};

type GatedData = {
  challenge: string;
  solution: string;
  results: string;
  client: string;
} | null;

export function CaseStudyDetailContent({
  study,
  gated,
  locale,
}: {
  study: Study;
  gated: GatedData;
  locale: string;
}) {
  const t = useTranslations("caseStudies");

  const [email, setEmail] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [gatedContent, setGatedContent] = useState<GatedData>(gated);

  useEffect(() => {
    const key = `cs_unlocked_${study.slug}`;
    if (localStorage.getItem(key) === "true" && gated) {
      setUnlocked(true);
    }
  }, [study.slug, gated]);

  async function handleGate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const fd = new FormData();
    fd.set("email", email);
    fd.set("slug", study.slug);

    const res = await gateCaseStudy(fd);
    setLoading(false);

    if (res.success && res.data) {
      setGatedContent(res.data);
      setUnlocked(true);
      localStorage.setItem(`cs_unlocked_${study.slug}`, "true");
    } else {
      setError(res.message || "Something went wrong.");
    }
  }

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

          <Card className="p-6 sm:p-8 border-border/50 mb-10">
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

          {gated && !unlocked && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl border border-border/50 bg-gradient-to-br from-primary/5 to-orange-600/5 p-8 sm:p-12 text-center"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
                Get the Full Case Study
              </h2>
              <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
                Enter your email to unlock the full story including our strategy, implementation process, and detailed results.
              </p>
              <form onSubmit={handleGate} className="max-w-sm mx-auto space-y-3">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="text-center"
                />
                {error && <p className="text-xs text-red-500">{error}</p>}
                <Button type="submit" variant="gradient" className="w-full gap-2" disabled={loading}>
                  {loading ? "Unlocking..." : (
                    <>
                      <Mail size={14} />
                      Unlock Full Case Study
                    </>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground">
                  No spam. Unsubscribe anytime.
                </p>
              </form>
            </motion.div>
          )}

          {gated && unlocked && gatedContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-2 text-emerald-500 text-sm font-medium">
                <Unlock size={14} />
                Full case study unlocked
              </div>

              <Card className="p-6 sm:p-8 border-border/50">
                <h2 className="text-lg font-semibold mb-3">The Challenge</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {gatedContent.challenge}
                </p>
              </Card>

              <Card className="p-6 sm:p-8 border-border/50">
                <h2 className="text-lg font-semibold mb-3">Our Solution</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {gatedContent.solution}
                </p>
              </Card>

              <Card className="p-6 sm:p-8 border-emerald-500/10 bg-emerald-500/5">
                <h2 className="text-lg font-semibold mb-3">The Results</h2>
                <p className="text-foreground leading-relaxed whitespace-pre-line">
                  {gatedContent.results}
                </p>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
