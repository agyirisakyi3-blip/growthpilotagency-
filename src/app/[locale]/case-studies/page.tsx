import { getTranslations } from "next-intl/server";
import { CaseStudiesContent } from "./CaseStudiesContent";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "caseStudies" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: `/${locale}/case-studies` },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `https://growthpilotagency.com/${locale}/case-studies`,
    },
  };
}

export default function CaseStudiesPage() {
  return <CaseStudiesContent />;
}
