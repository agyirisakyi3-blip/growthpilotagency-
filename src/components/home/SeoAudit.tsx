"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Search, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { submitLead } from "@/app/actions/leads";

export function SeoAudit() {
  const t = useTranslations("seoAudit");
  const benefits = t.raw("benefits") as string[];
  const [state, setState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);

  async function handleSubmit(formData: FormData) {
    setState("loading");
    setMessage("");

    const honeypot = formData.get("website_url") as string;
    if (honeypot) {
      setState("success");
      setMessage(t("successMessage"));
      return;
    }

    const result = await submitLead(formData);

    if (result.success) {
      setState("success");
      setMessage(result.message || t("successMessage"));
    } else {
      setState("error");
      setMessage(result.message || "Something went wrong. Please try again.");
      errorRef.current?.focus();
    }
  }

  if (state === "success") {
    return (
      <section
        id="seo-audit"
        className="relative py-24 sm:py-32 bg-gradient-to-b from-background via-primary/5 to-background"
        aria-labelledby="audit-success-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-lg mx-auto text-center"
          >
            <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </div>
            <h2 id="audit-success-heading" className="text-3xl font-bold tracking-tight mb-3">
              {t("successTitle")}
            </h2>
            <p className="text-muted-foreground text-lg">{message}</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="seo-audit"
      className="relative py-24 sm:py-32 bg-gradient-to-b from-background via-primary/5 to-background overflow-hidden"
      aria-labelledby="audit-heading"
    >
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-600/5 rounded-full blur-3xl" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-background/50 text-xs sm:text-sm text-muted-foreground mb-4 backdrop-blur-sm">
              <Sparkles size={12} className="text-primary" />
              {t("badge")}
            </div>
            <h2 id="audit-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
              {t("title")}{" "}
              <span className="gradient-text">{t("highlight")}</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              {t("description")}
            </p>
            <ul className="space-y-3" aria-label="Audit benefits">
              {benefits.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
          >
            <Card className="p-6 sm:p-8 border-border/50 shadow-xl">
              <form
                ref={formRef}
                action={handleSubmit}
                className="space-y-5"
                noValidate
                aria-label="Free SEO audit request form"
              >
                <div className="space-y-2">
                  <Label htmlFor="audit-name">{t("form.fullName")}</Label>
                  <Input
                    id="audit-name"
                    name="name"
                    placeholder={t("form.fullNamePlaceholder")}
                    required
                    aria-required="true"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="audit-email">{t("form.email")}</Label>
                  <Input
                    id="audit-email"
                    name="email"
                    type="email"
                    placeholder={t("form.emailPlaceholder")}
                    required
                    aria-required="true"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="audit-phone">{t("form.phone")}</Label>
                  <Input
                    id="audit-phone"
                    name="phone"
                    type="tel"
                    placeholder={t("form.phonePlaceholder")}
                    required
                    aria-required="true"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="audit-company">{t("form.company")}</Label>
                  <Input
                    id="audit-company"
                    name="company"
                    placeholder={t("form.companyPlaceholder")}
                    required
                    aria-required="true"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="audit-website">{t("form.website")}</Label>
                  <Input
                    id="audit-website"
                    name="website"
                    type="url"
                    placeholder={t("form.websitePlaceholder")}
                    required
                    aria-required="true"
                    className="h-11"
                  />
                </div>

                <div className="hidden" aria-hidden="true">
                  <input
                    name="website_url"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {state === "error" && (
                  <div
                    role="alert"
                    className="p-3 rounded-lg bg-destructive/10 border border-destructive/20"
                  >
                    <p
                      ref={errorRef}
                      id="audit-error"
                      className="text-sm text-destructive"
                      tabIndex={-1}
                    >
                      {message}
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  variant="gradient"
                  size="lg"
                  className="w-full gap-2 h-12 text-base"
                  disabled={state === "loading"}
                  aria-busy={state === "loading"}
                >
                  {state === "loading" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                      {t("form.processing")}
                    </>
                  ) : (
                    <>
                      {t("form.submit")}
                      <Search size={16} aria-hidden="true" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  {t("form.privacy")}
                </p>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
