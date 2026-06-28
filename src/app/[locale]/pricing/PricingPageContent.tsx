"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

type PricingPlan = {
  name: string;
  price: string;
  description: string;
  features: string[];
};

export function PricingPageContent() {
  const t = useTranslations("pricing");
  const plans = t.raw("plans") as PricingPlan[];
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-50px" });

  return (
    <div className="min-h-screen pt-24 sm:pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
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

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start max-w-5xl mx-auto">
          {plans.map((plan, i) => {
            const isPopular = i === 1;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative"
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-primary text-primary-foreground shadow-sm">
                      <Sparkles size={10} />
                      {t("mostPopular")}
                    </span>
                  </div>
                )}
                <Card
                  className={`p-6 sm:p-8 h-full flex flex-col relative border-border/50 transition-all duration-300 ${
                    isPopular
                      ? "shadow-lg shadow-primary/10 border-primary/30 scale-[1.02] sm:scale-105"
                      : "hover:shadow-lg hover:shadow-primary/5"
                  }`}
                >
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-1">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {plan.description}
                    </p>
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-4xl font-bold tracking-tight">
                        {plan.price}
                      </span>
                      <span className="text-sm text-muted-foreground ml-1">
                        FCFA/{t("month")}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <Check
                          size={16}
                          className="mt-0.5 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={isPopular ? "accent" : "outline"}
                    size="lg"
                    className="w-full"
                    asChild
                  >
                    <Link href="/contact">{t("cta")}</Link>
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
