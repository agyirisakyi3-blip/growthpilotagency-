import { cities, type City } from "@/data/cities";
import { countries, type Country } from "@/data/countries";
import Link from "next/link";
import { Globe, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Props = { params: Promise<{ locale: string }> };

function localeFor(locale: string, city: City) {
  return locale === "fr"
    ? { description: city.descriptionFr, keywords: city.keywordsFr }
    : { description: city.descriptionEn, keywords: city.keywordsEn };
}

function countryLocaleFor(locale: string, country: Country) {
  return locale === "fr"
    ? { description: country.descriptionFr, keywords: country.keywordsFr }
    : { description: country.descriptionEn, keywords: country.keywordsEn };
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const title = locale === "fr"
    ? "Services SEO & GEO par ville et pays - GrowthPilot Agency"
    : "SEO & GEO Services by City and Country - GrowthPilot Agency";
  const description = locale === "fr"
    ? "Découvrez nos services SEO et GEO adaptés à votre ville ou pays. GrowthPilot Agency offre des stratégies de croissance digitale localisées en Afrique et dans le monde."
    : "Find SEO and GEO services tailored to your city or country. GrowthPilot Agency delivers localized digital growth strategies across Africa and worldwide.";

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/geo`,
      languages: { en: "/en/geo", fr: "/fr/geo" },
    },
    openGraph: { title, description, url: `https://growthpilotagency.com/${locale}/geo` },
  };
}

export default async function GeoIndexPage({ params }: Props) {
  const { locale } = await params;
  const localizedCities = cities.filter((c) => c.locales.includes(locale as "en" | "fr"));
  const localizedCountries = countries.filter((c) => c.locales.includes(locale as "en" | "fr"));

  const title = locale === "fr" ? "Services par" : "Services by";
  const highlight = locale === "fr" ? "Pays et Ville" : "Country and City";
  const desc = locale === "fr"
    ? "Des stratégies SEO et GEO adaptées à votre marché local."
    : "SEO and GEO strategies tailored to your local market.";
  const badge = locale === "fr" ? "Géo Ciblage" : "Geo Targeting";
  const cta = locale === "fr" ? "Discutons de votre projet" : "Let's Talk About Your Project";

  const regions = [...new Set(localizedCountries.map((c) => c.region))];

  return (
    <div className="min-h-screen pt-24 sm:pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-background/50 text-sm text-muted-foreground mb-4">
            <Globe size={12} className="text-primary" />
            {badge}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            {title}{" "}
            <span className="gradient-text">{highlight}</span>
          </h1>
          <p className="text-lg text-muted-foreground">{desc}</p>
        </div>

        {regions.map((region) => {
          const regionCountries = localizedCountries.filter((c) => c.region === region);
          return (
            <section key={region} className="mb-16">
              <h2 className="text-2xl font-bold tracking-tight mb-8 text-center">
                <span className="gradient-text">{region}</span>
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {regionCountries.map((country) => {
                  const l = countryLocaleFor(locale, country);
                  return (
                    <Link key={country.slug} href={`/${locale}/geo/countries/${country.slug}`}>
                      <Card className="group h-full p-5 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1 border-border/50">
                        <div className="flex items-start gap-3 mb-2">
                          <Globe className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <div>
                            <h3 className="font-semibold group-hover:text-primary transition-colors">
                              {country.name}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {locale === "fr" ? "Capitale" : "Capital"}: {country.capital}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {l.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {locale === "fr" ? "Population" : "Population"}: {country.population}
                          </span>
                          <ArrowRight size={14} className="text-primary transition-transform group-hover:translate-x-1" />
                        </div>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}

        <section className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-8 text-center">
            {locale === "fr" ? "Nos" : "Our"}{" "}
            <span className="gradient-text">{locale === "fr" ? "Villes" : "Cities"}</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {localizedCities.map((city) => {
              const l = localeFor(locale, city);
              return (
                <Link key={city.slug} href={`/${locale}/geo/${city.slug}`}>
                  <Card className="group h-full p-6 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1 border-border/50">
                    <div className="flex items-start gap-3 mb-3">
                      <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                          {city.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {city.region}, {city.country}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {l.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Population: {city.population}
                      </span>
                      <ArrowRight size={14} className="text-primary transition-transform group-hover:translate-x-1" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        <div className="text-center mt-16">
          <Button variant="gradient" size="lg" asChild>
            <Link href={`/${locale}/contact`}>
              {cta} <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
