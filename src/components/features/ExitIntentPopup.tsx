"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { fbTrack } from "@/lib/track";

export function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const t = useTranslations("exitIntent");

  useEffect(() => {
    const dismissed = sessionStorage.getItem("exit-intent-dismissed");
    if (dismissed) return;

    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY > 0) return;
      setVisible(true);
    }
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Something went wrong");
      }
      setSubmitted(true);
      fbTrack("Lead", { value: 0, currency: "EUR" });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function dismiss() {
    setVisible(false);
    sessionStorage.setItem("exit-intent-dismissed", "true");
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl p-6 sm:p-8"
          >
            <button
              onClick={dismiss}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-accent/50 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={t("close")}
            >
              <X size={18} />
            </button>

            {submitted ? (
              <div className="text-center py-6">
                <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{t("thankYou")}</h3>
                <p className="text-muted-foreground">{t("checkInbox")}</p>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide mb-3">
                    {t("badge")}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">
                    {t("title")}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t("description")}
                  </p>
                </div>

                <ul className="space-y-2 mb-6">
                  {(t.raw("benefits") as string[]).map((benefit: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("placeholder")}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  {error && (
                    <p className="text-red-500 text-xs">{error}</p>
                  )}
                  <Button type="submit" variant="gradient" className="w-full" disabled={loading}>
                    {loading ? t("sending") : t("cta")}
                  </Button>
                </form>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  {t("noSpam")}
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
