import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { BlogListContent } from "./BlogListContent";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `/${locale}/blog`,
      languages: {
        en: "/en/blog",
        fr: "/fr/blog",
      },
      types: {
        "application/rss+xml": "/feed.xml",
      },
    },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `https://growthpilotagency.com/${locale}/blog`,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: "GrowthPilot Agency" }],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/og.png"],
    },
  };
}

export default async function BlogPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { page: pageStr } = await searchParams;

  const page = Math.max(1, Number(pageStr) || 1);
  const perPage = 9;

  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
      select: {
        title: true,
        slug: true,
        excerpt: true,
        category: true,
        image: true,
        author: true,
        createdAt: true,
      },
    }),
    prisma.blogPost.count({ where: { published: true } }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / perPage));

  return (
    <BlogListContent
      posts={posts}
      locale={locale}
      currentPage={page}
      totalPages={totalPages}
    />
  );
}

export const revalidate = 3600;
