"use client";

import { use, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, CheckCircle2, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { services } from "@/lib/constants";
import { notFound } from "next/navigation";
import {
  Search, Palette, Bot, MessageSquare, TrendingUp, MapPin, Smartphone,
  Globe, BarChart3, Megaphone, PenTool, ShoppingCart, Users, Star, Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Search, Palette, Bot, MessageSquare, TrendingUp, MapPin, Smartphone,
  Globe, BarChart3, Megaphone, PenTool, ShoppingCart, Users, Star, Wrench,
};

type Props = { params: Promise<{ locale: string; slug: string }> };

export default function ServiceDetailPage({ params }: Props) {
  const { slug } = use(params);
  const t = useTranslations("services");
  const list = t.raw("list") as {
    title: string;
    slug: string;
    description: string;
    detailedDescription: string;
    benefits: string[];
    cta: string;
    process: { step: string; description: string }[];
    faq: { q: string; a: string }[];
  }[];

  const serviceIndex = services.findIndex((s) => s.slug === slug);
  if (serviceIndex === -1) notFound();

  const service = services[serviceIndex];
  const localized = list[serviceIndex];
  const Icon = iconMap[service.icon] || Search;

  const baseUrl = "https://growthpilotagency.com";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Services", item: `${baseUrl}/services` },
      { "@type": "ListItem", position: 3, name: localized?.title ?? service.title },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: localized?.title ?? service.title,
    description: localized?.detailedDescription ?? localized?.description ?? service.description,
    provider: { "@type": "Organization", name: "GrowthPilot Agency" },
    areaServed: "Worldwide",
  };

  const faqSchema = localized?.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: localized.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }
    : null;

  const howToSchema = localized?.process?.length
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: `How Our ${localized?.title ?? service.title} Service Works`,
        description: `Step-by-step process for ${localized?.title ?? service.title}`,
        step: localized.process.map((step, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: step.step,
          text: step.description,
        })),
      }
    : null;

  const schemas = [breadcrumbSchema, serviceSchema, faqSchema, howToSchema].filter(Boolean);

  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-50px" });

  return (
    <div className="min-h-screen pt-24 sm:pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-background/50 text-sm text-muted-foreground mb-4">
            <Sparkles size={12} className="text-primary" />
            Service
          </div>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-orange-600/20 flex items-center justify-center mx-auto mb-6">
            <Icon className="w-8 h-8 text-primary" aria-hidden="true" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            {localized?.title ?? service.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {localized?.detailedDescription ?? localized?.description ?? service.description}
          </p>
        </motion.div>

        {localized?.process && localized.process.length > 0 && (
          <section className="mb-20" aria-labelledby="process-heading">
            <h2 id="process-heading" className="text-2xl sm:text-3xl font-bold tracking-tight mb-10 text-center">
              How It <span className="gradient-text">Works</span>
            </h2>
            <div className="space-y-6">
              {localized.process.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
                  className="relative flex gap-6 items-start group"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                      {i + 1}
                    </div>
                    {i < localized.process.length - 1 && (
                      <div className="w-0.5 h-full min-h-[2rem] bg-gradient-to-b from-primary/30 to-transparent mt-2" />
                    )}
                  </div>
                  <div className="pb-8 pt-1.5">
                    <h3 className="text-lg font-semibold mb-1.5">{step.step}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        <section className="mb-20" aria-labelledby="benefits-heading">
          <h2 id="benefits-heading" className="text-2xl sm:text-3xl font-bold tracking-tight mb-10 text-center">
            What You <span className="gradient-text">Get</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {(localized?.benefits ?? service.benefits).map((benefit) => (
              <div key={benefit} className="flex items-start gap-3 p-4 rounded-xl border border-border/50 bg-card/50">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </section>

        {localized?.faq && localized.faq.length > 0 && (
          <section className="mb-20" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-2xl sm:text-3xl font-bold tracking-tight mb-10 text-center">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <div className="space-y-3">
              {localized.faq.map((item, i) => (
                <details
                  key={i}
                  className="group rounded-xl border border-border/50 bg-card/50 p-4 open:border-primary/30 open:bg-primary/[0.02] transition-all duration-200"
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none text-sm font-medium">
                    {item.q}
                    <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-3">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </section>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center rounded-2xl border border-border/50 bg-gradient-to-br from-primary/5 to-orange-600/5 p-10 sm:p-14"
        >
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Let&apos;s discuss how {localized?.title ?? service.title} can help your business grow. No commitment, just a friendly chat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="lg" className="gap-2" asChild>
              <Link href="/contact">
                Book a Free Consultation
                <ArrowRight size={16} />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/#seo-audit">
                Get Free SEO & GEO Audit
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
