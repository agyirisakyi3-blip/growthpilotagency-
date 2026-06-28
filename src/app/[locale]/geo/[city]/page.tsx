import { notFound } from "next/navigation";
import Link from "next/link";
import { cities, type City } from "@/data/cities";
import { services } from "@/lib/constants";
import { MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Props = { params: Promise<{ locale: string; city: string }> };

const serviceSlugs = [
  "seo-services",
  "local-seo",
  "website-design",
  "lead-generation",
  "ai-automation",
  "social-media-management",
  "google-ads-ppc",
  "content-creation",
];

function localeFor(locale: string, city: City) {
  return locale === "fr"
    ? { description: city.descriptionFr, keywords: city.keywordsFr }
    : { description: city.descriptionEn, keywords: city.keywordsEn };
}

export async function generateMetadata({ params }: Props) {
  const { locale, city: slug } = await params;
  const city = cities.find((c) => c.slug === slug && c.locales.includes(locale as "en" | "fr"));
  if (!city) return { title: "Not Found" };

  const l = localeFor(locale, city);
  const title = locale === "fr"
    ? `Services SEO & GEO à ${city.name} - GrowthPilot Agency`
    : `SEO & GEO Services in ${city.name} - GrowthPilot Agency`;

  return {
    title,
    description: l.description,
    keywords: l.keywords.join(", "),
    alternates: {
      canonical: `/${locale}/geo/${city.slug}`,
      languages: { en: `/en/geo/${city.slug}`, fr: `/fr/geo/${city.slug}` },
    },
    openGraph: {
      title,
      description: l.description,
      url: `https://growthpilotagency.com/${locale}/geo/${city.slug}`,
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { locale, city: slug } = await params;
  const city = cities.find((c) => c.slug === slug && c.locales.includes(locale as "en" | "fr"));
  if (!city) notFound();

  const l = localeFor(locale, city);
  const cityServices = services.filter((s) => serviceSlugs.includes(s.slug));

  const h2 = locale === "fr" ? "Comment nous aidons les entreprises à" : "How We Help Businesses in";
  const h2Highlight = city.name;
  const ctaTitle = locale === "fr" ? "Prêt à développer votre entreprise ?" : "Ready to Grow Your Business?";
  const ctaDesc = locale === "fr"
    ? `Discutons de la façon dont GrowthPilot peut aider votre entreprise à ${city.name} à dominer la recherche locale et IA.`
    : `Let's discuss how GrowthPilot can help your business in ${city.name} dominate local and AI search.`;
  const ctaBtn = locale === "fr" ? "Réserver une consultation gratuite" : "Book a Free Consultation";

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "GrowthPilot Agency",
    description: l.description,
    areaServed: {
      "@type": "City",
      name: city.name,
      sameAs: `https://en.wikipedia.org/wiki/${city.name.replace(/\s+/g, "_")}`,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: city.region,
      addressCountry: city.countryCode,
    },
  };

  return (
    <div className="min-h-screen pt-24 sm:pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-background/50 text-sm text-muted-foreground mb-4">
            <MapPin size={12} className="text-primary" />
            {city.name}, {city.country}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            {locale === "fr" ? "Services SEO & GEO à" : "SEO & GEO Services in"}{" "}
            <span className="gradient-text">{city.name}</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {l.description}
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {l.keywords.slice(0, 4).map((kw) => (
              <Badge key={kw} variant="secondary" className="text-xs">
                {kw}
              </Badge>
            ))}
          </div>
        </div>

        <section className="mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-10 text-center">
            {h2} <span className="gradient-text">{h2Highlight}</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {cityServices.map((s) => (
              <Link key={s.slug} href={`/${locale}/services/${s.slug}`}>
                <div className="group p-5 rounded-xl border border-border/50 bg-card/50 hover:border-primary/20 hover:bg-card transition-all duration-300 h-full">
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {s.description}
                  </p>
                  <ul className="space-y-1">
                    {s.benefits.slice(0, 3).map((b) => (
                      <li key={b} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 size={12} className="text-primary shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 text-center">
            {locale === "fr" ? "Pourquoi choisir GrowthPilot à" : "Why Choose GrowthPilot in"}{" "}
            <span className="gradient-text">{city.name}?</span>
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            {[
              {
                title: locale === "fr" ? "Expertise Locale" : "Local Expertise",
                desc: locale === "fr"
                  ? "Nous comprenons le marché local et les spécificités de recherche propres à votre région."
                  : "We understand the local market and search nuances unique to your region.",
              },
              {
                title: locale === "fr" ? "Stratégies Bilingues" : "Bilingual Strategies",
                desc: locale === "fr"
                  ? "Des campagnes optimisées en anglais et en français pour maximiser votre portée."
                  : "Campaigns optimized in both English and French to maximize your reach.",
              },
              {
                title: locale === "fr" ? "Résultats Mesurables" : "Measurable Results",
                desc: locale === "fr"
                  ? "Rapports transparents avec des indicateurs clairs de positionnement, trafic et conversions."
                  : "Transparent reporting with clear rankings, traffic, and conversion metrics.",
              },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-xl border border-border/50 bg-card/50">
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center rounded-2xl border border-border/50 bg-gradient-to-br from-primary/5 to-orange-600/5 p-10 sm:p-14">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            {ctaTitle}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            {ctaDesc}
          </p>
          <Button variant="gradient" size="lg" className="gap-2" asChild>
            <Link href={`/${locale}/contact`}>
              {ctaBtn}
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
