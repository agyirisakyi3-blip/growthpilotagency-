import { getTranslations } from "next-intl/server";
import { PricingPageContent } from "./PricingPageContent";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricing" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `/${locale}/pricing`,
      languages: {
        en: "/en/pricing",
        fr: "/fr/pricing",
      },
    },
    openGraph: {
      url: `https://growthpilotagency.com/${locale}/pricing`,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "GrowthPilot Agency" }],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/og.png"],
    },
  };
}

export default function PricingPage() {
  return <PricingPageContent />;
}
