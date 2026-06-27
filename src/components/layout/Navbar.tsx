"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Moon, Sun, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { useTheme } from "@/components/layout/ThemeProvider";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";
import { usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const t = useTranslations("nav");

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const navLinks = [
    { label: t("services"), href: "/services" },
    { label: t("results"), href: "/#results" },
    { label: t("caseStudies"), href: "/case-studies" },
    { label: t("team"), href: "/team" },
    { label: "Blog", href: "/blog" },
    { label: t("contact"), href: "/contact" },
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
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-xs"
          : "bg-transparent"
      )}
      role="banner"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 h-16 sm:h-[72px]">
        <Link
          href="/"
          className="flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 rounded-lg"
          aria-label={t("home")}
        >
          <Logo />
          <span className="font-semibold text-lg tracking-tight">
            GrowthPilot<span className="text-primary">Agency</span>
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
              className={cn(
                "px-4 py-2.5 text-sm transition-colors rounded-lg",
                scrolled
                  ? "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/50"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className={cn(
              "p-2.5 rounded-lg transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 min-w-[44px] min-h-[44px] flex items-center justify-center",
              scrolled
                ? "text-muted-foreground hover:text-foreground hover:bg-secondary"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            )}
            aria-label={theme === "dark" ? t("switchToLight") : t("switchToDark")}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Button
            variant="accent"
            size="default"
            className="hidden sm:inline-flex gap-2"
            asChild
          >
            <Link href="/#seo-audit">
              {t("freeSeoAudit")}
              <ArrowRight size={14} />
            </Link>
          </Button>

          <button
            ref={toggleRef}
            onClick={() => setMobileOpen(true)}
            className={cn(
              "md:hidden p-2.5 rounded-lg transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 min-w-[44px] min-h-[44px] flex items-center justify-center",
              scrolled
                ? "text-muted-foreground hover:text-foreground hover:bg-secondary"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            )}
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
            className="fixed inset-0 z-60 bg-background md:hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={closeMenu}
              >
                <Logo />
                <span className="font-semibold text-lg">
                  GrowthPilot<span className="text-primary">Agency</span>
                </span>
              </Link>
              <button
                onClick={closeMenu}
                className="p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
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
                  className="px-4 py-3.5 text-lg text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-border">
                <Button
                  variant="accent"
                  size="lg"
                  className="w-full gap-2 min-h-[48px]"
                  asChild
                >
                  <Link href="/#seo-audit" onClick={closeMenu}>
                    {t("getFreeSeoAudit")}
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
