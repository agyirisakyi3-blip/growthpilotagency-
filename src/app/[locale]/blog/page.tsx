import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { BlogListContent } from "./BlogListContent";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: `/${locale}/blog` },
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: `https://growthpilotagency.com/${locale}/blog`,
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;

  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    select: {
      title: true,
      slug: true,
      excerpt: true,
      category: true,
      image: true,
      author: true,
      createdAt: true,
    },
  });

  return <BlogListContent posts={posts} locale={locale} />;
}
