import { getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { TechStack } from "@/components/home/TechStack";
import { ServiceBanner } from "@/components/home/ServiceBanner";

const Results = dynamic(() => import("@/components/home/Results").then((m) => ({ default: m.Results })));
const WhyChooseUs = dynamic(() => import("@/components/home/WhyChooseUs").then((m) => ({ default: m.WhyChooseUs })));
const Industries = dynamic(() => import("@/components/home/Industries").then((m) => ({ default: m.Industries })));
const CaseStudies = dynamic(() => import("@/components/home/CaseStudies").then((m) => ({ default: m.CaseStudies })));
const SeoAudit = dynamic(() => import("@/components/home/SeoAudit").then((m) => ({ default: m.SeoAudit })));
const Testimonials = dynamic(() => import("@/components/home/Testimonials").then((m) => ({ default: m.Testimonials })));
const About = dynamic(() => import("@/components/home/About").then((m) => ({ default: m.About })));

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  return {
    title: "GrowthPilot Agency | SEO & GEO, Websites & AI Automation Agency",
    description: t("metaDescription"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        fr: "/fr",
      },
    },
    openGraph: {
      url: `https://growthpilotagency.com/${locale}`,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "GrowthPilot Agency" }],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/og.png"],
    },
  };
}

export default function Home() {
  return (
    <>
      <Hero />
      <TechStack />
      <Services />
      <ServiceBanner />
      <Results />
      <WhyChooseUs />
      <Industries />
      <CaseStudies />
      <SeoAudit />
      <Testimonials />
      <About />
    </>
  );
}
