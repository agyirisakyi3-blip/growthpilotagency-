import type { Metadata } from "next";
import { services } from "@/lib/constants";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  const title = `${service.title} | GrowthPilot Agency`;
  const description = service.description;
  const canonical = `/${locale}/services/${slug}`;
  const baseUrl = "https://growthpilotagency.com";

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: `/en/services/${slug}`,
        fr: `/fr/services/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}${canonical}`,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: `${service.title} — GrowthPilot Agency` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
  };
}

export default function ServiceDetailLayout({ children }: { children: React.ReactNode }) {
  return children;
}
