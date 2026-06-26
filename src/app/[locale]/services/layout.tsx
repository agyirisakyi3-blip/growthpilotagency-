import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "https://growthpilotagency.com";
  const url = `/${locale}/services`;

  return {
    title: "Services",
    description:
      "Explore our full range of digital growth services — SEO, website design, AI automation, WhatsApp automation, lead generation, and more.",
    alternates: {
      canonical: url,
      languages: {
        en: "/en/services",
        fr: "/fr/services",
      },
    },
    openGraph: {
      title: "Services | GrowthPilot Agency",
      description: "Digital growth services including SEO, web design, AI automation, and lead generation.",
      url: `${baseUrl}${url}`,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "GrowthPilot Agency Services" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Services | GrowthPilot Agency",
      description: "Digital growth services including SEO, web design, AI automation, and lead generation.",
      images: ["/og.png"],
    },
  };
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
