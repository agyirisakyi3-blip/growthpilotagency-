const baseUrl = "https://growthpilotagency.com";

function buildSchemas(locale: string) {
  const inLanguage = locale === "fr" ? "fr-CI" : "en-US";

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GrowthPilot Agency",
    url: baseUrl,
    logo: `${baseUrl}/og.png`,
    description:
      "We help businesses grow faster with SEO, high-converting websites, AI automation, and WhatsApp lead generation.",
    foundingDate: "2023",
    founder: { "@type": "Person", name: "Agyiri Sakyi" },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+225-0141317315",
      contactType: "customer service",
      email: "agyirisakyi3@gmail.com",
      availableLanguage: ["English", "French"],
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Yopougon",
      addressRegion: "Abidjan",
      addressCountry: "CI",
    },
    sameAs: [
      "https://x.com/GrowthPilotAgency",
      "https://facebook.com/GrowthPilotAgency",
      "https://instagram.com/GrowthPilotAgency",
      "https://linkedin.com/company/GrowthPilotAgency",
      "https://github.com/GrowthPilotAgency",
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GrowthPilot Agency",
    url: baseUrl,
    description:
      "SEO, web design, AI automation, and lead generation agency helping businesses grow faster.",
    inLanguage,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/?s={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "GrowthPilot Agency",
    image: `${baseUrl}/og.png`,
    url: baseUrl,
    telephone: "+225-0141317315",
    email: "agyirisakyi3@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Yopougon",
      addressRegion: "Abidjan",
      addressCountry: "CI",
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "08:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "08:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "08:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "08:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "08:00", closes: "18:00" },
    ],
    sameAs: [
      "https://x.com/GrowthPilotAgency",
      "https://facebook.com/GrowthPilotAgency",
      "https://instagram.com/GrowthPilotAgency",
      "https://linkedin.com/company/GrowthPilotAgency",
    ],
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Digital Marketing Services",
    provider: { "@type": "Organization", name: "GrowthPilot Agency" },
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "GrowthPilot Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO Services" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website Design" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Automation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "WhatsApp Automation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lead Generation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Local SEO" } },
      ],
    },
  };

  return [organization, website, localBusiness, service];
}

export function JsonLd({ locale = "en" }: { locale?: string }) {
  const schemas = buildSchemas(locale);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemas, null, 2),
      }}
    />
  );
}
