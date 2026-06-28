"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { cities } from "@/data/cities";

export function GeoBanner() {
  const params = useParams();
  const locale = params.locale as string;
  const [geo, setGeo] = useState<{ city: string; country: string } | null>(null);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    const raw = document.cookie
      .split("; ")
      .find((r) => r.startsWith("geo_data="));

    if (raw) {
      try {
        const data = JSON.parse(decodeURIComponent(raw.split("=")[1]));
        setGeo(data);
      } catch {
        // ignore
      }
    }

    const saved = localStorage.getItem("geo_banner_dismissed");
    if (saved !== "true") setDismissed(false);
  }, []);

  if (!geo?.city || dismissed) return null;

  const matchedCity = cities.find(
    (c) => c.name.toLowerCase() === geo.city.toLowerCase() && c.locales.includes(locale as "en" | "fr")
  );
  if (!matchedCity) return null;

  const text = locale === "fr"
    ? `Nous servons les entreprises à ${matchedCity.name}`
    : `We serve businesses in ${matchedCity.name}`;

  function handleDismiss() {
    setDismissed(true);
    localStorage.setItem("geo_banner_dismissed", "true");
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-gradient-to-r from-primary/10 via-primary/5 to-orange-600/10 border-b border-border/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm">
            <MapPin size={14} className="text-primary shrink-0" />
            <span className="text-muted-foreground">{text}.</span>
            <Link
              href={`/${locale}/geo/${matchedCity.slug}`}
              className="text-primary font-medium hover:underline inline-flex items-center gap-0.5"
            >
              {locale === "fr" ? "Voir nos services" : "View our services"}
              <ArrowRight size={12} />
            </Link>
          </div>
          <button
            onClick={handleDismiss}
            className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent shrink-0"
            aria-label="Dismiss"
          >
            <X size={14} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
