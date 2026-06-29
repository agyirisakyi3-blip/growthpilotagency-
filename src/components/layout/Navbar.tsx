"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";
import { usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const t = useTranslations("nav");

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  const navLinks = [
    { label: t("services"), href: "/services" },
    { label: t("pricing"), href: "/pricing" },
    { label: t("caseStudies"), href: "/case-studies" },
    { label: t("team"), href: "/team" },
    { label: "Blog", href: "/blog" },
  ];

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMenu = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#0a0f1e]/80 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/10"
          : "bg-transparent"
      )}
      role="banner"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 h-16 sm:h-[72px]">
        <Link
          href="/"
          className="flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 rounded-lg"
          aria-label="GrowthPilot Agency - Home"
        >
          <Logo />
          <span className="font-semibold text-lg tracking-tight text-white">
            GrowthPilot<span className="text-[#3b82f6]">Agency</span>
          </span>
        </Link>

        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors rounded-lg"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            size="sm"
            className="hidden sm:inline-flex gap-2 bg-[#3b82f6] text-white hover:bg-[#2563eb] shadow-lg shadow-[#3b82f6]/20"
            asChild
          >
            <Link href="/contact">
              {t("contact")}
              <ArrowRight size={14} />
            </Link>
          </Button>

          <button
            ref={toggleRef}
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2.5 rounded-lg text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={t("openMenu")}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-60 bg-[#0a0f1e] md:hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/[0.06]">
              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={closeMenu}
              >
                <Logo />
                <span className="font-semibold text-lg text-white">
                  GrowthPilot<span className="text-[#3b82f6]">Agency</span>
                </span>
              </Link>
              <button
                onClick={closeMenu}
                className="p-2.5 rounded-lg text-white/50 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={t("closeMenu")}
                autoFocus
              >
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-col p-4 gap-2" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="px-4 py-3.5 text-lg text-white/60 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-white/[0.06]">
                <Button
                  size="lg"
                  className="w-full gap-2 min-h-[48px] bg-[#3b82f6] text-white hover:bg-[#2563eb]"
                  asChild
                >
                  <Link href="/contact" onClick={closeMenu}>
                    {t("contact")}
                    <ArrowRight size={16} />
                  </Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
