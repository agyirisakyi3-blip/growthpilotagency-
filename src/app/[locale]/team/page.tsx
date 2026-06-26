import { getTranslations } from "next-intl/server";
import { TeamPageContent } from "./TeamPageContent";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "team" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: `/${locale}/team` },
    openGraph: {
      url: `https://growthpilotagency.com/${locale}/team`,
    },
  };
}

export default function TeamPage() {
  return <TeamPageContent />;
}
