import type { Metadata } from "next";

import dynamic from "next/dynamic";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { FacebookPixel } from "@/components/features/FacebookPixel";
import { JsonLd } from "@/components/features/JsonLd";
import { ExitIntentPopup } from "@/components/features/ExitIntentPopup";
import { SocialProof } from "@/components/features/SocialProof";
import { LanguageSwitcher } from "@/components/features/LanguageSwitcher";
import "@/app/globals.css";

const ScrollProgress = dynamic(
  () => import("@/components/features/scroll-progress").then((m) => ({ default: m.ScrollProgress })),
);

const MouseGradient = dynamic(
  () => import("@/components/features/mouse-gradient").then((m) => ({ default: m.MouseGradient })),
);

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: {
      default: "GrowthPilot Agency | SEO, Websites & AI Automation Agency",
      template: "%s | GrowthPilot Agency",
    },
    description:
      "We help businesses grow faster with SEO, high-converting websites, AI automation, and WhatsApp lead generation.",
    keywords: [
      "SEO Agency", "Web Design Agency", "AI Automation Agency",
      "Lead Generation Services", "Digital Marketing Agency", "Local SEO Services",
      "WhatsApp Marketing Agency", "Côte d'Ivoire Digital Agency",
      "Abidjan SEO Agency", "Agence SEO Abidjan", "Agence Marketing Digital Côte d'Ivoire",
    ],
    authors: [{ name: "Agyiri Sakyi" }],
    creator: "GrowthPilot Agency",
    publisher: "GrowthPilot Agency",
    metadataBase: new URL("https://growthpilotagency.com"),
    alternates: {
      canonical: "/",
      languages: {
        en: "/en",
        fr: "/fr",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_CI" : "en_US",
      url: "https://growthpilotagency.com",
      siteName: "GrowthPilot Agency",
      title: "GrowthPilot Agency | SEO, Websites & AI Automation Agency",
      description:
        "We help businesses grow faster with SEO, high-converting websites, AI automation, and WhatsApp lead generation.",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "GrowthPilot Agency" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "GrowthPilot Agency | SEO, Websites & AI Automation Agency",
      description:
        "We help businesses grow faster with SEO, high-converting websites, AI automation, and WhatsApp lead generation.",
      images: ["/og.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: { icon: "/growth_logo.png" },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <script
        id="locale-init"
        dangerouslySetInnerHTML={{
          __html: `
            document.documentElement.lang = '${locale}';
            document.documentElement.dataset.scrollBehavior = 'smooth';
            try {
              var theme = localStorage.getItem('theme');
              if (!theme) {
                theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              }
              document.documentElement.classList.remove('light', 'dark');
              document.documentElement.classList.add(theme);
            } catch(e) {}
          `,
        }}
      />
      <JsonLd locale={locale} />
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <ThemeProvider>
        <ScrollProgress />
        <MouseGradient />
        <Navbar />
        <LanguageSwitcher />
        <WhatsAppButton />
        <main id="main-content" className="flex-1" role="main">
          {children}
        </main>
        <Footer />
        <CookieConsent />
        <FacebookPixel />
        <ExitIntentPopup />
        <SocialProof />
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
