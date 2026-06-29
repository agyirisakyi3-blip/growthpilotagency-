import { prisma } from "@/lib/prisma";
import { LatestBlogPostsClient } from "./LatestBlogPostsClient";

type Props = { locale: string };

export async function LatestBlogPosts({ locale }: Props) {
  let posts: { title: string; slug: string; excerpt: string; category: string; image: string; author: string; createdAt: Date }[] = [];

  try {
    posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 3,
      select: { title: true, slug: true, excerpt: true, category: true, image: true, author: true, createdAt: true },
    });
  } catch {
    return null;
  }

  if (posts.length === 0) return null;

  return <LatestBlogPostsClient posts={posts} locale={locale} />;
}
