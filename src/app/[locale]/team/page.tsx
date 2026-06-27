import { getTranslations } from "next-intl/server";
import { TeamPageContent } from "./TeamPageContent";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "team" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `/${locale}/team`,
      languages: {
        en: "/en/team",
        fr: "/fr/team",
      },
    },
    openGraph: {
      url: `https://growthpilotagency.com/${locale}/team`,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "GrowthPilot Agency" }],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/og.png"],
    },
  };
}

export default function TeamPage() {
  return <TeamPageContent />;
}
