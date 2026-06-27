"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Search, Palette, Bot, MessageSquare, TrendingUp, MapPin, Smartphone, Globe, BarChart3, Megaphone, PenTool, ShoppingCart, Users, Star, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import type { LucideIcon } from "lucide-react";
import type { Service } from "@/lib/types";

const iconMap: Record<string, LucideIcon> = {
  Search, Palette, Bot, MessageSquare, TrendingUp, MapPin, Smartphone,
  Globe, BarChart3, Megaphone, PenTool, ShoppingCart, Users, Star, Wrench,
};

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = iconMap[service.icon] || Search;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const isFeatured = index < 3;

  if (isFeatured) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={index === 0 ? "lg:col-span-2 lg:row-span-2" : ""}
      >
        <div className="group relative h-full p-8 sm:p-10 rounded-2xl border border-border bg-card hover:border-primary/20 transition-all duration-500">
          <div className="flex flex-col h-full">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Icon className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold tracking-tight mb-3">
              {service.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {service.description}
            </p>
            <ul className="space-y-2.5 mb-8 mt-auto">
              {service.benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
            <Button variant="ghost" size="sm" className="gap-1 self-start group/btn" asChild>
              <Link href={`/services/${service.slug}`}>
                {service.cta}
                <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="group relative p-5 sm:p-6 rounded-xl border border-border bg-card hover:border-primary/15 transition-all duration-300 h-full">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold mb-1.5 group-hover:text-primary transition-colors duration-300">
              {service.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {service.description}
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {service.benefits.slice(0, 2).map((benefit) => (
              <span key={benefit} className="text-[11px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                {benefit}
              </span>
            ))}
          </div>
          <Button variant="ghost" size="sm" className="gap-1 shrink-0 group/btn" asChild>
            <Link href={`/services/${service.slug}`}>
              <ArrowRight size={12} className="transition-transform group-hover/btn:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
