"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, TrendingUp, Globe, CheckCircle2, XCircle, AlertTriangle, ArrowRight, Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { runAudit } from "@/app/actions/audit";

type Check = {
  category: string;
  label: string;
  passed: boolean;
  value: string;
  recommendation: string;
};

type Result = {
  success: boolean;
  message?: string;
  url: string;
  score: number;
  checks: Check[];
};

export default function AuditPage() {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const categories = result?.checks
    ? [...new Set(result.checks.map((c) => c.category))]
    : [];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setResult(null);

    const fd = new FormData();
    fd.set("url", url);
    fd.set("email", email);

    const res = await runAudit(fd);
    setLoading(false);

    if (res.success) {
      setResult(res as Result);
    } else {
      setError(res.message || "Something went wrong.");
    }
  }

  function getScoreColor(score: number) {
    if (score >= 80) return "text-emerald-500";
    if (score >= 50) return "text-amber-500";
    return "text-red-500";
  }

  function getScoreBarColor(score: number) {
    if (score >= 80) return "bg-emerald-500";
    if (score >= 50) return "bg-amber-500";
    return "bg-red-500";
  }

  return (
    <div className="min-h-screen pt-24 sm:pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-background/50 text-sm text-muted-foreground mb-4">
            <Search size={12} className="text-primary" />
            Free SEO & GEO Audit
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Audit Your{" "}
            <span className="gradient-text">Website</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Get a free analysis of your site&apos;s SEO, GEO readiness, and performance. Enter your URL and receive actionable recommendations in seconds.
          </p>
        </div>

        <Card className="p-6 sm:p-8 border-border/50 mb-10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Website URL</label>
              <div className="flex gap-3">
                <Input
                  type="url"
                  placeholder="yoursite.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit" variant="gradient" className="gap-2 shrink-0" disabled={loading}>
                  {loading ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
                  {loading ? "Scanning..." : "Audit"}
                </Button>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Email <span className="text-muted-foreground font-normal">(optional — get the full report sent to you)</span>
              </label>
              <Input
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </form>
        </Card>

        {loading && (
          <div className="text-center py-16">
            <Loader2 size={32} className="animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Analyzing your website...</p>
            <div className="max-w-xs mx-auto mt-4">
              <Progress value={45} className="h-1.5" indicatorClassName="bg-primary" />
            </div>
          </div>
        )}

        {result && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <Card className="p-8 sm:p-10 text-center border-border/50">
              <div className={`text-6xl font-bold mb-2 ${getScoreColor(result.score)}`}>
                {result.score}
                <span className="text-2xl text-muted-foreground">/100</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                SEO & GEO Audit Score for <span className="font-medium text-foreground">{result.url}</span>
              </p>
              <Progress value={result.score} className="h-2 max-w-xs mx-auto" indicatorClassName={getScoreBarColor(result.score)} />
              <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CheckCircle2 size={12} className="text-emerald-500" />
                  {result.checks.filter((c) => c.passed).length} passed
                </span>
                <span className="flex items-center gap-1">
                  <XCircle size={12} className="text-red-500" />
                  {result.checks.filter((c) => !c.passed).length} failed
                </span>
                <span className="flex items-center gap-1">
                  <AlertTriangle size={12} className="text-amber-500" />
                  {result.checks.length} total checks
                </span>
              </div>
            </Card>

            {categories.map((category) => {
              const categoryChecks = result.checks.filter((c) => c.category === category);
              const catPassed = categoryChecks.filter((c) => c.passed).length;
              return (
                <div key={category}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">{category}</h2>
                    <Badge variant="secondary" className="text-xs">
                      {catPassed}/{categoryChecks.length}
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    {categoryChecks.map((check, i) => (
                      <motion.div
                        key={check.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Card className={`p-4 border-l-4 ${check.passed ? "border-l-emerald-500" : "border-l-red-500"} border-border/50`}>
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 shrink-0">
                              {check.passed
                                ? <CheckCircle2 size={16} className="text-emerald-500" />
                                : <XCircle size={16} className="text-red-500" />
                              }
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-sm font-medium">{check.label}</span>
                                <span className="text-xs text-muted-foreground truncate">{check.value}</span>
                              </div>
                              <p className="text-xs text-muted-foreground">{check.recommendation}</p>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}

            <div className="text-center pt-8">
              <p className="text-sm text-muted-foreground mb-4">
                Want a more detailed audit with personalized recommendations?
              </p>
              <Button variant="gradient" size="lg" className="gap-2">
                <Mail size={14} />
                Get a Full SEO & GEO Audit Report
                <ArrowRight size={14} />
              </Button>
            </div>
          </motion.div>
        )}

        {!result && !loading && (
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: Search, title: "SEO Analysis", desc: "Check meta tags, headings, content structure, and keyword optimization." },
              { icon: Globe, title: "GEO Readiness", desc: "See if your site is optimized for AI search engines like ChatGPT, Perplexity, and Gemini." },
              { icon: TrendingUp, title: "Performance Check", desc: "Review Core Web Vitals signals, compression, and mobile readiness." },
            ].map((item) => (
              <Card key={item.title} className="p-6 text-center border-border/50">
                <item.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
