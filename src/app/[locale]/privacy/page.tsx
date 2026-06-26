import { getTranslations } from "next-intl/server";
import { PrivacyPageContent } from "./PrivacyPageContent";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: `/${locale}/privacy` },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `https://growthpilotagency.com/${locale}/privacy`,
    },
  };
}

export default function PrivacyPage() {
  return <PrivacyPageContent />;
}
