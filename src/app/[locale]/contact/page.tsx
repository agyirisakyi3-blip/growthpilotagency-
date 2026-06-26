"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  Loader2,
  Send,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { submitContact } from "@/app/actions/contact";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const errorRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    setState("loading");
    setMessage("");
    const result = await submitContact(formData);
    if (result.success) {
      setState("success");
      setMessage(result.message || t("successMessage"));
    } else {
      setState("error");
      setMessage(result.message || "Something went wrong.");
      errorRef.current?.focus();
    }
  }

  if (state === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
          </div>
          <h1 className="text-3xl font-bold mb-3">{t("successTitle")}</h1>
          <p className="text-muted-foreground mb-8">{message}</p>
          <Button variant="outline" onClick={() => setState("idle")}>
            {t("sendAnother")}
          </Button>
        </motion.div>
      </div>
    );
  }

  const contactInfo = [
    { icon: Mail, label: t("email"), value: "agyirisakyi3@gmail.com", href: "mailto:agyirisakyi3@gmail.com" },
    { icon: Phone, label: t("phone"), value: "0141317315", href: "tel:+2250141317315" },
    { icon: MapPin, label: t("location"), value: "Yopougon, Abidjan, Côte d'Ivoire" },
    { icon: Clock, label: t("responseTime"), value: t("responseTimeValue") },
  ];

  return (
    <div className="min-h-screen pt-24 sm:pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
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

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="space-y-6">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-orange-600/20 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:from-primary/30 group-hover:to-purple-600/30 transition-all duration-300">
                    <item.icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="font-medium hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 rounded">
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl overflow-hidden border border-border h-64 bg-gradient-to-br from-primary/5 to-orange-600/5 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" aria-hidden="true" />
                <p className="text-sm font-medium">Yopougon, Abidjan</p>
                <p className="text-xs text-muted-foreground/60">Côte d&apos;Ivoire</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number], delay: 0.1 }}
            className="lg:col-span-3"
          >
            <Card className="p-6 sm:p-8 border-border/50 shadow-xl">
              <form
                ref={formRef}
                action={handleSubmit}
                className="space-y-5"
                noValidate
                aria-label="Contact form"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">{t("form.fullName")}</Label>
                    <Input id="contact-name" name="name" placeholder={t("form.fullNamePlaceholder")} required aria-required="true" className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">{t("form.email")}</Label>
                    <Input id="contact-email" name="email" type="email" placeholder={t("form.emailPlaceholder")} required aria-required="true" className="h-11" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">{t("form.phone")}</Label>
                    <Input id="contact-phone" name="phone" type="tel" placeholder={t("form.phonePlaceholder")} className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-subject">{t("form.subject")}</Label>
                    <Input id="contact-subject" name="subject" placeholder={t("form.subjectPlaceholder")} required aria-required="true" className="h-11" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-message">{t("form.message")}</Label>
                  <Textarea id="contact-message" name="message" placeholder={t("form.messagePlaceholder")} rows={5} required aria-required="true" />
                </div>
                {state === "error" && (
                  <div role="alert" className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <p ref={errorRef} id="contact-error" className="text-sm text-destructive" tabIndex={-1}>
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
                      {t("form.sending")}
                    </>
                  ) : (
                    <>
                      {t("form.send")}
                      <Send size={16} aria-hidden="true" />
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
