import { getTranslations } from "next-intl/server";
import { PrivacyPageContent } from "./PrivacyPageContent";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `/${locale}/privacy`,
      languages: {
        en: "/en/privacy",
        fr: "/fr/privacy",
      },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `https://growthpilotagency.com/${locale}/privacy`,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "GrowthPilot Agency" }],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/og.png"],
    },
  };
}

export default function PrivacyPage() {
  return <PrivacyPageContent />;
}
