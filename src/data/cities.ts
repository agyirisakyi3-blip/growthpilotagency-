export type City = {
  name: string;
  slug: string;
  region: string;
  country: string;
  countryCode: string;
  locales: ("en" | "fr")[];
  descriptionEn: string;
  descriptionFr: string;
  keywordsEn: string[];
  keywordsFr: string[];
  population: string;
};

export const cities: City[] = [
  {
    name: "New York",
    slug: "new-york",
    region: "New York",
    country: "United States",
    countryCode: "US",
    locales: ["en"],
    descriptionEn:
      "Premium SEO & GEO services for New York businesses. Dominate local search and AI-generated answers with GrowthPilot Agency.",
    descriptionFr:
      "Services SEO et GEO premium pour les entreprises new-yorkaises. Dominez la recherche locale et les réponses générées par IA.",
    keywordsEn: [
      "SEO New York",
      "GEO services NYC",
      "digital marketing agency New York",
      "local SEO New York",
      "AI automation NYC",
    ],
    keywordsFr: [
      "SEO New York",
      "services GEO New York",
      "agence marketing digital New York",
      "SEO local New York",
    ],
    population: "8.4M",
  },
  {
    name: "Los Angeles",
    slug: "los-angeles",
    region: "California",
    country: "United States",
    countryCode: "US",
    locales: ["en"],
    descriptionEn:
      "Data-driven SEO and GEO strategies for LA businesses. Get found on Google and AI search engines with GrowthPilot.",
    descriptionFr:
      "Stratégies SEO et GEO basées sur les données pour les entreprises de Los Angeles. Soyez trouvé sur Google et les IA.",
    keywordsEn: [
      "SEO Los Angeles",
      "GEO agency LA",
      "digital marketing Los Angeles",
      "local SEO California",
      "AI marketing Los Angeles",
    ],
    keywordsFr: [
      "SEO Los Angeles",
      "agence GEO Los Angeles",
      "marketing digital Los Angeles",
      "SEO local Californie",
    ],
    population: "3.8M",
  },
  {
    name: "London",
    slug: "london",
    region: "England",
    country: "United Kingdom",
    countryCode: "GB",
    locales: ["en"],
    descriptionEn:
      "Top-rated SEO & GEO agency in London. Grow your UK business with AI-optimized content and technical SEO that works.",
    descriptionFr:
      "Agence SEO et GEO primée à Londres. Développez votre entreprise au Royaume-Uni avec du contenu optimisé par IA.",
    keywordsEn: [
      "SEO London",
      "GEO agency UK",
      "digital marketing London",
      "technical SEO London",
      "AI automation UK",
    ],
    keywordsFr: [
      "SEO Londres",
      "agence GEO Royaume-Uni",
      "marketing digital Londres",
      "SEO technique Londres",
    ],
    population: "8.8M",
  },
  {
    name: "Manchester",
    slug: "manchester",
    region: "England",
    country: "United Kingdom",
    countryCode: "GB",
    locales: ["en"],
    descriptionEn:
      "Affordable SEO & GEO services in Manchester. Boost your local visibility with GrowthPilot Agency's proven strategies.",
    descriptionFr:
      "Services SEO et GEO abordables à Manchester. Augmentez votre visibilité locale avec GrowthPilot.",
    keywordsEn: [
      "SEO Manchester",
      "GEO services Manchester",
      "digital marketing Manchester",
      "local SEO UK",
      "lead generation Manchester",
    ],
    keywordsFr: [
      "SEO Manchester",
      "services GEO Manchester",
      "marketing digital Manchester",
      "SEO local Royaume-Uni",
    ],
    population: "550K",
  },
  {
    name: "Toronto",
    slug: "toronto",
    region: "Ontario",
    country: "Canada",
    countryCode: "CA",
    locales: ["en", "fr"],
    descriptionEn:
      "Bilingual SEO & GEO services in Toronto. Reach Canadian audiences in English and French with GrowthPilot Agency.",
    descriptionFr:
      "Services SEO et GEO bilingues à Toronto. Touchez les publics canadiens en anglais et en français.",
    keywordsEn: [
      "SEO Toronto",
      "GEO services Canada",
      "digital marketing Toronto",
      "bilingual SEO Canada",
      "AI marketing Toronto",
    ],
    keywordsFr: [
      "SEO Toronto",
      "services GEO Canada",
      "marketing digital Toronto",
      "SEO bilingue Canada",
      "marketing IA Toronto",
    ],
    population: "2.9M",
  },
  {
    name: "Montreal",
    slug: "montreal",
    region: "Quebec",
    country: "Canada",
    countryCode: "CA",
    locales: ["en", "fr"],
    descriptionEn:
      "Bilingual SEO & GEO services in Montreal. Grow your business with strategies tailored to the Quebec market.",
    descriptionFr:
      "Services SEO et GEO bilingues à Montréal. Développez votre entreprise avec des stratégies adaptées au marché québécois.",
    keywordsEn: [
      "SEO Montreal",
      "GEO services Quebec",
      "digital marketing Montreal",
      "bilingual SEO Canada",
      "AI automation Montreal",
    ],
    keywordsFr: [
      "SEO Montréal",
      "services GEO Québec",
      "marketing digital Montréal",
      "SEO bilingue Canada",
      "automatisation IA Montréal",
    ],
    population: "1.8M",
  },
  {
    name: "Paris",
    slug: "paris",
    region: "Île-de-France",
    country: "France",
    countryCode: "FR",
    locales: ["fr"],
    descriptionEn:
      "SEO & GEO agency in Paris. Optimize your visibility on Google and AI search engines with GrowthPilot.",
    descriptionFr:
      "Agence SEO et GEO à Paris. Optimisez votre visibilité sur Google et les IA génératives avec GrowthPilot Agency.",
    keywordsEn: [
      "SEO Paris",
      "GEO agency France",
      "digital marketing Paris",
      "local SEO Paris",
    ],
    keywordsFr: [
      "SEO Paris",
      "agence GEO France",
      "marketing digital Paris",
      "référencement local Paris",
      "automatisation IA France",
    ],
    population: "2.1M",
  },
  {
    name: "Lyon",
    slug: "lyon",
    region: "Auvergne-Rhône-Alpes",
    country: "France",
    countryCode: "FR",
    locales: ["fr"],
    descriptionEn:
      "SEO & GEO expert in Lyon. Attract more clients with high-performance digital growth strategies.",
    descriptionFr:
      "Expert SEO et GEO à Lyon. Attirez plus de clients avec des stratégies de croissance digitales performantes.",
    keywordsEn: [
      "SEO Lyon",
      "GEO Lyon",
      "digital marketing Lyon",
      "local SEO Lyon",
    ],
    keywordsFr: [
      "SEO Lyon",
      "GEO Lyon",
      "agence marketing Lyon",
      "référencement naturel Lyon",
      "génération de leads Lyon",
    ],
    population: "520K",
  },
  {
    name: "San Francisco",
    slug: "san-francisco",
    region: "California",
    country: "United States",
    countryCode: "US",
    locales: ["en"],
    descriptionEn:
      "Cutting-edge SEO & GEO for San Francisco startups and tech companies. Stay ahead of AI search with GrowthPilot.",
    descriptionFr:
      "SEO et GEO de pointe pour les startups et entreprises tech de San Francisco. Restez en avance sur la recherche IA.",
    keywordsEn: [
      "SEO San Francisco",
      "GEO services Bay Area",
      "digital marketing SF",
      "startup SEO",
      "AI automation Silicon Valley",
    ],
    keywordsFr: [
      "SEO San Francisco",
      "services GEO Bay Area",
      "marketing digital San Francisco",
      "SEO startup",
    ],
    population: "870K",
  },
  {
    name: "Miami",
    slug: "miami",
    region: "Florida",
    country: "United States",
    countryCode: "US",
    locales: ["en"],
    descriptionEn:
      "Results-driven SEO and GEO in Miami. Grow your Florida business with strategies optimized for AI and local search.",
    descriptionFr:
      "SEO et GEO axés sur les résultats à Miami. Développez votre entreprise en Floride avec des stratégies optimisées.",
    keywordsEn: [
      "SEO Miami",
      "GEO services Florida",
      "digital marketing Miami",
      "local SEO Florida",
      "lead generation Miami",
    ],
    keywordsFr: [
      "SEO Miami",
      "services GEO Floride",
      "marketing digital Miami",
      "SEO local Floride",
    ],
    population: "460K",
  },
];
