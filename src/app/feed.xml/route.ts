import { prisma } from "@/lib/prisma";

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://growthpilotagency.com";
  let posts: { title: string; slug: string; excerpt: string; author: string; category: string; createdAt: Date }[] = [];

  try {
    posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
  } catch {
    // DB unavailable — return empty feed
  }

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/en/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/en/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <author>${post.author}</author>
      <category>${post.category}</category>
      <pubDate>${post.createdAt.toUTCString()}</pubDate>
    </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>GrowthPilot Agency Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Growth strategies, GEO, SEO, AI, and web design insights from GrowthPilot Agency</description>
    <language>en</language>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
