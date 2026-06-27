import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://growthpilotagency.com";
  const url = `/${locale}/contact`;

  return {
    title: "Contact Us",
    description:
      "Get in touch with GrowthPilot Agency. Book a discovery call, send us a message, or find our contact details. We respond within 1-2 hours.",
    alternates: {
      canonical: url,
      languages: {
        en: "/en/contact",
        fr: "/fr/contact",
      },
    },
    openGraph: {
      title: "Contact Us | GrowthPilot Agency",
      description: "Contact GrowthPilot Agency for SEO & GEO, web design, and AI automation services.",
      url: `${baseUrl}${url}`,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "Contact GrowthPilot Agency" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Contact Us | GrowthPilot Agency",
      description: "Contact GrowthPilot Agency for SEO & GEO, web design, and AI automation services.",
      images: ["/og.png"],
    },
  };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
