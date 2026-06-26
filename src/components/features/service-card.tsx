"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Search, Palette, Bot, MessageSquare, TrendingUp, MapPin, Smartphone, Globe, BarChart3, Megaphone, PenTool, ShoppingCart, Users, Star, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
    >
      <Card className="group relative overflow-hidden p-6 sm:p-8 h-full hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1.5 border-border/50">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full transition-all duration-500 group-hover:scale-150 pointer-events-none" />
        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-primary/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="relative z-10">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-orange-600/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:from-primary/30 group-hover:to-orange-600/30 transition-all duration-300">
            <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
          </div>
          <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
            {service.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            {service.description}
          </p>
          <ul className="flex flex-wrap gap-2 mb-6" aria-label={`${service.title} benefits`}>
            {service.benefits.map((benefit) => (
              <li
                key={benefit}
                className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground border border-border/50"
              >
                {benefit}
              </li>
            ))}
          </ul>
          <Button variant="ghost" size="sm" className="gap-1 group/btn" asChild>
            <Link href={`/services/${service.slug}`}>
              {service.cta}
              <ArrowRight size={14} className="transition-transform duration-200 group-hover/btn:translate-x-0.5" />
            </Link>
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
