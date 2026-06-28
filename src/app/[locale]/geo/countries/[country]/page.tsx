import { notFound } from "next/navigation";
import Link from "next/link";
import { countries, type Country } from "@/data/countries";
import { cities } from "@/data/cities";
import { services } from "@/lib/constants";
import { Globe, MapPin, CheckCircle2, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Props = { params: Promise<{ locale: string; country: string }> };

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

function localeFor(locale: string, country: Country) {
  return locale === "fr"
    ? { description: country.descriptionFr, keywords: country.keywordsFr }
    : { description: country.descriptionEn, keywords: country.keywordsEn };
}

export async function generateMetadata({ params }: Props) {
  const { locale, country: slug } = await params;
  const country = countries.find((c) => c.slug === slug && c.locales.includes(locale as "en" | "fr"));
  if (!country) return { title: "Not Found" };

  const l = localeFor(locale, country);
  const title = locale === "fr"
    ? `Services SEO & GEO au ${country.name} - GrowthPilot Agency`
    : `SEO & GEO Services in ${country.name} - GrowthPilot Agency`;

  return {
    title,
    description: l.description,
    keywords: l.keywords.join(", "),
    alternates: {
      canonical: `/${locale}/geo/countries/${country.slug}`,
      languages: { en: `/en/geo/countries/${country.slug}`, fr: `/fr/geo/countries/${country.slug}` },
    },
    openGraph: {
      title,
      description: l.description,
      url: `https://growthpilotagency.com/${locale}/geo/countries/${country.slug}`,
    },
  };
}

export default async function CountryPage({ params }: Props) {
  const { locale, country: slug } = await params;
  const country = countries.find((c) => c.slug === slug && c.locales.includes(locale as "en" | "fr"));
  if (!country) notFound();

  const l = localeFor(locale, country);
  const countryServices = services.filter((s) => serviceSlugs.includes(s.slug));
  const countryCities = cities.filter((c) => c.countryCode === country.countryCode && c.locales.includes(locale as "en" | "fr"));

  const h2 = locale === "fr" ? "Comment nous aidons les entreprises au" : "How We Help Businesses in";
  const h2Highlight = country.name;
  const ctaTitle = locale === "fr" ? "Prêt à développer votre entreprise ?" : "Ready to Grow Your Business?";
  const ctaDesc = locale === "fr"
    ? `Discutons de la façon dont GrowthPilot peut aider votre entreprise au ${country.name} à dominer la recherche locale et IA.`
    : `Let's discuss how GrowthPilot can help your business in ${country.name} dominate local and AI search.`;
  const ctaBtn = locale === "fr" ? "Réserver une consultation gratuite" : "Book a Free Consultation";

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "GrowthPilot Agency",
    description: l.description,
    areaServed: {
      "@type": "Country",
      name: country.name,
      sameAs: `https://en.wikipedia.org/wiki/${country.name.replace(/\s+/g, "_")}`,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: country.capital,
      addressCountry: country.countryCode,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: locale === "fr"
          ? `Quels services SEO et GEO proposez-vous au ${country.name} ?`
          : `What SEO and GEO services do you offer in ${country.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: locale === "fr"
            ? `GrowthPilot Agency propose des services complets de SEO, GEO, conception de sites web, automatisation IA, génération de leads, et marketing digital adaptés au marché ${country.name}.`
            : `GrowthPilot Agency offers comprehensive SEO, GEO, website design, AI automation, lead generation, and digital marketing services tailored to the ${country.name} market.`,
        },
      },
      {
        "@type": "Question",
        name: locale === "fr"
          ? `Combien de temps faut-il pour voir des résultats SEO au ${country.name} ?`
          : `How long does it take to see SEO results in ${country.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: locale === "fr"
            ? "La plupart des clients constatent des améliorations significatives en 3 à 6 mois. Les résultats GEO (optimisation pour les IA génératives) peuvent être visibles plus rapidement, souvent en 4 à 8 semaines."
            : "Most clients see meaningful improvements within 3-6 months. GEO (Generative Engine Optimization) results can appear faster, often within 4-8 weeks.",
        },
      },
      {
        "@type": "Question",
        name: locale === "fr"
          ? `Pourquoi choisir GrowthPilot Agency au ${country.name} ?`
          : `Why choose GrowthPilot Agency in ${country.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: locale === "fr"
            ? `Nous comprenons le marché local ${country.name}, nous proposons des stratégies bilingues (français et anglais), et nous utilisons des technologies IA de pointe pour maximiser votre retour sur investissement. Notre équipe basée en Afrique connaît parfaitement les spécificités du marché régional.`
            : `We understand the ${country.name} local market, offer bilingual strategies (French and English), and use cutting-edge AI technologies to maximize your ROI. Our Africa-based team knows the regional market specifics firsthand.`,
        },
      },
      {
        "@type": "Question",
        name: locale === "fr"
          ? `Qu'est-ce que le GEO et pourquoi est-ce important au ${country.name} ?`
          : `What is GEO and why is it important in ${country.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: locale === "fr"
            ? `Le GEO (Generative Engine Optimization) optimise votre contenu pour les moteurs de recherche IA comme ChatGPT, Perplexity et Gemini. Avec l'adoption croissante de l'IA au ${country.name}, le GEO est essentiel pour rester visible dans les réponses générées par IA.`
            : `GEO (Generative Engine Optimization) optimizes your content for AI search engines like ChatGPT, Perplexity, and Gemini. With growing AI adoption in ${country.name}, GEO is essential to stay visible in AI-generated answers.`,
        },
      },
      {
        "@type": "Question",
        name: locale === "fr"
          ? `Proposez-vous des services de conception de sites web au ${country.name} ?`
          : `Do you offer website design services in ${country.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: locale === "fr"
            ? `Oui, nous créons des sites web modernes, rapides et optimisés SEO avec Next.js et Tailwind CSS. Nos sites sont conçus pour convertir les visiteurs en clients, avec une adaptation parfaite au marché ${country.name}.`
            : `Yes, we build modern, fast, SEO-optimized websites using Next.js and Tailwind CSS. Our sites are designed to convert visitors into customers, perfectly adapted to the ${country.name} market.`,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen pt-24 sm:pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-background/50 text-sm text-muted-foreground mb-4">
            <Globe size={12} className="text-primary" />
            {country.name} — {locale === "fr" ? "Services SEO & GEO" : "SEO & GEO Services"}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            {locale === "fr" ? "Services SEO & GEO" : "SEO & GEO Services"}{" "}
            {locale === "fr" ? "au" : "in"}{" "}
            <span className="gradient-text">{country.name}</span>
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

        {countryCities.length > 0 && (
          <section className="mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-10 text-center">
              {locale === "fr" ? "Nos services dans les villes" : "Our Services in Cities"}
              {" "}<span className="gradient-text">{country.name}</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {countryCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/${locale}/geo/${city.slug}`}
                  className="group p-4 rounded-xl border border-border/50 bg-card/50 hover:border-primary/20 transition-all duration-300 flex items-center gap-3"
                >
                  <MapPin size={16} className="text-primary shrink-0" />
                  <div>
                    <p className="font-medium group-hover:text-primary transition-colors">{city.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {locale === "fr" ? "Population" : "Population"}: {city.population}
                    </p>
                  </div>
                  <ArrowRight size={14} className="ml-auto text-primary transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-10 text-center">
            {h2} <span className="gradient-text">{h2Highlight}</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {countryServices.map((s) => (
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

        <section className="mb-20" itemScope itemType="https://schema.org/FAQPage">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-10 text-center">
            {locale === "fr" ? "Questions fréquentes" : "Frequently Asked Questions"}
            {" "}<span className="gradient-text">{locale === "fr" ? `sur le ${country.name}` : `about ${country.name}`}</span>
          </h2>
          <div className="space-y-4 max-w-2xl mx-auto">
            {[
              {
                q: locale === "fr"
                  ? `Quels services SEO et GEO proposez-vous au ${country.name} ?`
                  : `What SEO and GEO services do you offer in ${country.name}?`,
                a: locale === "fr"
                  ? `GrowthPilot Agency propose des services complets de SEO, GEO, conception de sites web, automatisation IA, génération de leads, et marketing digital adaptés au marché ${country.name}.`
                  : `GrowthPilot Agency offers comprehensive SEO, GEO, website design, AI automation, lead generation, and digital marketing services tailored to the ${country.name} market.`,
              },
              {
                q: locale === "fr"
                  ? `Combien de temps faut-il pour voir des résultats SEO au ${country.name} ?`
                  : `How long does it take to see SEO results in ${country.name}?`,
                a: locale === "fr"
                  ? "La plupart des clients constatent des améliorations significatives en 3 à 6 mois. Les résultats GEO (optimisation pour les IA génératives) peuvent être visibles plus rapidement, souvent en 4 à 8 semaines."
                  : "Most clients see meaningful improvements within 3-6 months. GEO (Generative Engine Optimization) results can appear faster, often within 4-8 weeks.",
              },
              {
                q: locale === "fr"
                  ? `Qu'est-ce que le GEO et pourquoi est-ce important au ${country.name} ?`
                  : `What is GEO and why is it important in ${country.name}?`,
                a: locale === "fr"
                  ? `Le GEO (Generative Engine Optimization) optimise votre contenu pour les moteurs de recherche IA comme ChatGPT, Perplexity et Gemini. Avec l'adoption croissante de l'IA au ${country.name}, le GEO est essentiel pour rester visible dans les réponses générées par IA.`
                  : `GEO (Generative Engine Optimization) optimizes your content for AI search engines like ChatGPT, Perplexity, and Gemini. With growing AI adoption in ${country.name}, GEO is essential to stay visible in AI-generated answers.`,
              },
              {
                q: locale === "fr"
                  ? `Pourquoi choisir GrowthPilot Agency au ${country.name} ?`
                  : `Why choose GrowthPilot Agency in ${country.name}?`,
                a: locale === "fr"
                  ? `Nous comprenons le marché local ${country.name}, nous proposons des stratégies bilingues (français et anglais), et nous utilisons des technologies IA de pointe pour maximiser votre retour sur investissement.`
                  : `We understand the ${country.name} local market, offer bilingual strategies (French and English), and use cutting-edge AI technologies to maximize your ROI.`,
              },
              {
                q: locale === "fr"
                  ? `Proposez-vous des services de conception de sites web au ${country.name} ?`
                  : `Do you offer website design services in ${country.name}?`,
                a: locale === "fr"
                  ? `Oui, nous créons des sites web modernes, rapides et optimisés SEO avec Next.js et Tailwind CSS, parfaitement adaptés au marché ${country.name}.`
                  : `Yes, we build modern, fast, SEO-optimized websites using Next.js and Tailwind CSS, perfectly adapted to the ${country.name} market.`,
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="group rounded-xl border border-border/50 bg-card/50 [&[open]]:border-primary/20 transition-all"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <summary
                  itemProp="name"
                  className="flex items-center justify-between p-4 cursor-pointer font-medium text-sm hover:text-primary transition-colors list-none [&::-webkit-details-marker]:hidden"
                >
                  {faq.q}
                  <ChevronDown size={16} className="text-muted-foreground transition-transform group-open:rotate-180 shrink-0 ml-2" />
                </summary>
                <div
                  className="px-4 pb-4 text-sm text-muted-foreground"
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <p itemProp="text">{faq.a}</p>
                </div>
              </details>
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
