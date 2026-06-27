import { getTranslations } from "next-intl/server";
import { CaseStudiesContent } from "./CaseStudiesContent";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "caseStudies" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `/${locale}/case-studies`,
      languages: {
        en: "/en/case-studies",
        fr: "/fr/case-studies",
      },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `https://growthpilotagency.com/${locale}/case-studies`,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "GrowthPilot Agency" }],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/og.png"],
    },
  };
}

export default function CaseStudiesPage() {
  return <CaseStudiesContent />;
}
