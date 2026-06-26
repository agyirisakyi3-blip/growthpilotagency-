import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { CaseStudyDetailContent } from "./CaseStudyDetailContent";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "caseStudies" });
  const list = t.raw("list") as {
    title: string;
    slug: string;
    metaDescription: string;
    industry: string;
  }[];
  const study = list.find((s) => s.slug === slug);
  if (!study) return { title: "Not Found" };

  return {
    title: study.title,
    description: study.metaDescription,
    alternates: { canonical: `/${locale}/case-studies/${slug}` },
    openGraph: {
      title: study.title,
      description: study.metaDescription,
      url: `https://growthpilotagency.com/${locale}/case-studies/${slug}`,
    },
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "caseStudies" });
  const list = t.raw("list") as {
    title: string;
    slug: string;
    industry: string;
    before: string;
    after: string;
    metrics: Record<string, string>;
  }[];
  const study = list.find((s) => s.slug === slug);
  if (!study) notFound();

  return <CaseStudyDetailContent study={study} />;
}
