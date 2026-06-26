import type { MetadataRoute } from "next";
import { services } from "@/lib/constants";
import { prisma } from "@/lib/prisma";

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await prisma.blogPost.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
    alternates: alternateUrls(`/blog/${post.slug}`),
  }));

  return [
    ...staticPages,
    ...caseStudyPages,
    ...servicePages,
    ...blogPages,
  ];
}
