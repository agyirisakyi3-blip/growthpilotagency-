import type { MetadataRoute } from "next";
import { services } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { cities } from "@/data/cities";
import { countries } from "@/data/countries";

const baseUrl = "https://growthpilotagency.com";
const locales = ["en", "fr"] as const;

const caseStudySlugs = ["law-firm-lead-generation", "insurance-whatsapp-automation", "clinic-website-seo"];

function alternateUrls(path: string): MetadataRoute.Sitemap[number]["alternates"] {
  return {
    languages: Object.fromEntries(
      locales.map((locale) => [locale, `${baseUrl}/${locale}${path}`]),
    ),
  };
}

const staticPages: MetadataRoute.Sitemap = [
  {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
    alternates: alternateUrls(""),
  },
  {
    url: `${baseUrl}/services`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
    alternates: alternateUrls("/services"),
  },
  {
    url: `${baseUrl}/contact`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
    alternates: alternateUrls("/contact"),
  },
  {
    url: `${baseUrl}/team`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
    alternates: alternateUrls("/team"),
  },
  {
    url: `${baseUrl}/blog`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
    alternates: alternateUrls("/blog"),
  },
  {
    url: `${baseUrl}/case-studies`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
    alternates: alternateUrls("/case-studies"),
  },
  {
    url: `${baseUrl}/privacy`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    url: `${baseUrl}/terms`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    url: `${baseUrl}/audit`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
    alternates: alternateUrls("/audit"),
  },
];

const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
  url: `${baseUrl}/services/${service.slug}`,
  lastModified: new Date(),
  changeFrequency: "monthly",
  priority: 0.8,
  alternates: alternateUrls(`/services/${service.slug}`),
}));

const caseStudyPages: MetadataRoute.Sitemap = caseStudySlugs.map((slug) => ({
  url: `${baseUrl}/case-studies/${slug}`,
  lastModified: new Date(),
  changeFrequency: "monthly",
  priority: 0.8,
  alternates: alternateUrls(`/case-studies/${slug}`),
}));

function geoPages(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    for (const city of cities.filter((c) => c.locales.includes(locale))) {
      pages.push({
        url: `${baseUrl}/${locale}/geo/${city.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }
  return pages;
}

function countryPages(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    for (const country of countries.filter((c) => c.locales.includes(locale))) {
      pages.push({
        url: `${baseUrl}/${locale}/geo/countries/${country.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }
  return pages;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogPages: MetadataRoute.Sitemap = [];

  try {
    const blogPosts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });

    blogPages = blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: alternateUrls(`/blog/${post.slug}`),
    }));
  } catch {
    // DB unavailable during build — skip blog entries
  }

  return [
    ...staticPages,
    ...caseStudyPages,
    ...servicePages,
    ...blogPages,
    ...geoPages(),
    ...countryPages(),
  ];
}
