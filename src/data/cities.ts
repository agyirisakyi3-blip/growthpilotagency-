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
  {
    name: "Casablanca",
    slug: "casablanca",
    region: "Casablanca-Settat",
    country: "Morocco",
    countryCode: "MA",
    locales: ["fr"],
    descriptionEn:
      "SEO & GEO services in Casablanca. Help your Moroccan business dominate search and AI-generated results.",
    descriptionFr:
      "Services SEO et GEO à Casablanca. Aidez votre entreprise marocaine à dominer la recherche et les résultats générés par IA.",
    keywordsEn: [
      "SEO Casablanca",
      "GEO services Morocco",
      "digital marketing Casablanca",
      "SEO Africa",
    ],
    keywordsFr: [
      "SEO Casablanca",
      "services GEO Maroc",
      "marketing digital Casablanca",
      "référencement Maroc",
      "agence SEO Maroc",
    ],
    population: "3.4M",
  },
  {
    name: "Tunis",
    slug: "tunis",
    region: "Tunis",
    country: "Tunisia",
    countryCode: "TN",
    locales: ["fr"],
    descriptionEn:
      "Professional SEO and GEO services in Tunis. Grow your Tunisian business with AI-optimized digital strategies.",
    descriptionFr:
      "Services SEO et GEO professionnels à Tunis. Développez votre entreprise tunisienne avec des stratégies digitales optimisées par IA.",
    keywordsEn: [
      "SEO Tunis",
      "GEO services Tunisia",
      "digital marketing Tunis",
      "Tunisia SEO agency",
    ],
    keywordsFr: [
      "SEO Tunis",
      "services GEO Tunisie",
      "marketing digital Tunis",
      "agence SEO Tunisie",
      "référencement Tunis",
    ],
    population: "2.3M",
  },
  {
    name: "Dakar",
    slug: "dakar",
    region: "Dakar",
    country: "Senegal",
    countryCode: "SN",
    locales: ["fr"],
    descriptionEn:
      "SEO and GEO services in Dakar. Help your Senegalese business rank higher on Google and AI search engines.",
    descriptionFr:
      "Services SEO et GEO à Dakar. Aidez votre entreprise sénégalaise à mieux classer sur Google et les moteurs de recherche IA.",
    keywordsEn: [
      "SEO Dakar",
      "GEO services Senegal",
      "digital marketing Dakar",
      "Senegal SEO",
    ],
    keywordsFr: [
      "SEO Dakar",
      "services GEO Sénégal",
      "marketing digital Dakar",
      "agence SEO Sénégal",
      "référencement Dakar",
    ],
    population: "1.2M",
  },
  {
    name: "Abidjan",
    slug: "abidjan",
    region: "Abidjan",
    country: "Côte d'Ivoire",
    countryCode: "CI",
    locales: ["fr"],
    descriptionEn:
      "Top SEO and GEO services in Abidjan. Boost your Ivorian business visibility on Google and AI platforms.",
    descriptionFr:
      "Services SEO et GEO de premier plan à Abidjan. Boostez la visibilité de votre entreprise ivoirienne sur Google et les plateformes IA.",
    keywordsEn: [
      "SEO Abidjan",
      "GEO services Ivory Coast",
      "digital marketing Abidjan",
      "Ivory Coast SEO",
    ],
    keywordsFr: [
      "SEO Abidjan",
      "services GEO Côte d'Ivoire",
      "marketing digital Abidjan",
      "agence SEO Côte d'Ivoire",
      "référencement Abidjan",
    ],
    population: "5.2M",
  },
  {
    name: "Douala",
    slug: "douala",
    region: "Littoral",
    country: "Cameroon",
    countryCode: "CM",
    locales: ["fr"],
    descriptionEn:
      "SEO and GEO services in Douala. Help your Cameroonian business succeed in search and AI-generated answers.",
    descriptionFr:
      "Services SEO et GEO à Douala. Aidez votre entreprise camerounaise à réussir dans la recherche et les réponses générées par IA.",
    keywordsEn: [
      "SEO Douala",
      "GEO services Cameroon",
      "digital marketing Douala",
      "Cameroon SEO agency",
    ],
    keywordsFr: [
      "SEO Douala",
      "services GEO Cameroun",
      "marketing digital Douala",
      "agence SEO Cameroun",
      "référencement Douala",
    ],
    population: "2.8M",
  },
  {
    name: "Kinshasa",
    slug: "kinshasa",
    region: "Kinshasa",
    country: "DR Congo",
    countryCode: "CD",
    locales: ["fr"],
    descriptionEn:
      "SEO and GEO services in Kinshasa. Grow your Congolese business with data-driven digital strategies.",
    descriptionFr:
      "Services SEO et GEO à Kinshasa. Développez votre entreprise congolaise avec des stratégies digitales basées sur les données.",
    keywordsEn: [
      "SEO Kinshasa",
      "GEO services DR Congo",
      "digital marketing Kinshasa",
      "DRC SEO agency",
    ],
    keywordsFr: [
      "SEO Kinshasa",
      "services GEO RDC",
      "marketing digital Kinshasa",
      "agence SEO RDC",
      "référencement Kinshasa",
    ],
    population: "15M",
  },
  {
    name: "Algiers",
    slug: "algiers",
    region: "Algiers",
    country: "Algeria",
    countryCode: "DZ",
    locales: ["fr"],
    descriptionEn:
      "Professional SEO and GEO services in Algiers. Help your Algerian business dominate online search.",
    descriptionFr:
      "Services SEO et GEO professionnels à Alger. Aidez votre entreprise algérienne à dominer la recherche en ligne.",
    keywordsEn: [
      "SEO Algiers",
      "GEO services Algeria",
      "digital marketing Algiers",
      "Algeria SEO",
    ],
    keywordsFr: [
      "SEO Alger",
      "services GEO Algérie",
      "marketing digital Alger",
      "agence SEO Algérie",
      "référencement Alger",
    ],
    population: "3.4M",
  },
  {
    name: "Kigali",
    slug: "kigali",
    region: "Kigali",
    country: "Rwanda",
    countryCode: "RW",
    locales: ["fr"],
    descriptionEn:
      "SEO and GEO services in Kigali. Help your Rwandan business grow with modern search optimization.",
    descriptionFr:
      "Services SEO et GEO à Kigali. Aidez votre entreprise rwandaise à se développer avec une optimisation moderne de la recherche.",
    keywordsEn: [
      "SEO Kigali",
      "GEO services Rwanda",
      "digital marketing Kigali",
      "Rwanda SEO",
    ],
    keywordsFr: [
      "SEO Kigali",
      "services GEO Rwanda",
      "marketing digital Kigali",
      "agence SEO Rwanda",
      "référencement Kigali",
    ],
    population: "1.2M",
  },
  {
    name: "Ouagadougou",
    slug: "ouagadougou",
    region: "Centre",
    country: "Burkina Faso",
    countryCode: "BF",
    locales: ["fr"],
    descriptionEn:
      "SEO and GEO services in Ouagadougou. Help your Burkinabe business succeed in digital search.",
    descriptionFr:
      "Services SEO et GEO à Ouagadougou. Aidez votre entreprise burkinabè à réussir dans la recherche numérique.",
    keywordsEn: [
      "SEO Ouagadougou",
      "GEO services Burkina Faso",
      "digital marketing Ouagadougou",
      "Burkina Faso SEO",
    ],
    keywordsFr: [
      "SEO Ouagadougou",
      "services GEO Burkina Faso",
      "marketing digital Ouagadougou",
      "agence SEO Burkina Faso",
      "référencement Ouagadougou",
    ],
    population: "2.4M",
  },
  {
    name: "Antananarivo",
    slug: "antananarivo",
    region: "Analamanga",
    country: "Madagascar",
    countryCode: "MG",
    locales: ["fr"],
    descriptionEn:
      "SEO and GEO services in Antananarivo. Help your Malagasy business rank on Google and AI search.",
    descriptionFr:
      "Services SEO et GEO à Antananarivo. Aidez votre entreprise malgache à être classée sur Google et la recherche IA.",
    keywordsEn: [
      "SEO Antananarivo",
      "GEO services Madagascar",
      "digital marketing Antananarivo",
      "Madagascar SEO",
    ],
    keywordsFr: [
      "SEO Antananarivo",
      "services GEO Madagascar",
      "marketing digital Antananarivo",
      "agence SEO Madagascar",
      "référencement Antananarivo",
    ],
    population: "1.3M",
  },
];
