"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Sparkles, Target, BarChart3, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

const icons = [TrendingUp, Sparkles, Target, BarChart3, Zap];

export function SocialProof() {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const t = useTranslations("socialProof");
  const notifications = t.raw("notifications") as {
    title: string;
    description: string;
  }[];

  useEffect(() => {
    const dismissed = sessionStorage.getItem("social-proof-dismissed");
    if (dismissed) return;

    const showTimer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!visible || notifications.length < 2) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notifications.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [visible, notifications.length]);

  function dismiss() {
    setVisible(false);
    sessionStorage.setItem("social-proof-dismissed", "true");
  }

  if (notifications.length === 0) return null;

  const Icon = icons[currentIndex % icons.length];
  const notification = notifications[currentIndex];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className="fixed bottom-24 right-4 sm:right-6 z-50 max-w-xs cursor-pointer"
          onClick={dismiss}
        >
          <div className="bg-card/95 backdrop-blur-sm border border-border rounded-xl shadow-lg p-3 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10 shrink-0 mt-0.5">
              <Icon size={16} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{notification.title}</p>
              <p className="text-xs text-muted-foreground line-clamp-2">{notification.description}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
