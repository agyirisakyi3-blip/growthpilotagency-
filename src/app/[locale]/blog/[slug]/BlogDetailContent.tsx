"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  author: string;
  createdAt: Date;
};

export function BlogDetailContent({
  post,
  locale,
}: {
  post: Post;
  locale: string;
}) {
  const t = useTranslations("blog");
  const formatDate = (date: Date) =>
    date.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="min-h-screen pt-24 sm:pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          {t("backToBlog")}
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {post.image && (
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-8 bg-muted">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          )}
          <Badge variant="secondary" className="mb-4">{post.category}</Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-10 pb-6 border-b border-border">
            <span className="flex items-center gap-1.5">
              <User size={14} />
              {t("by")} {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {t("publishedOn")} {formatDate(new Date(post.createdAt))}
            </span>
          </div>

          <div
            className="prose prose-sm sm:prose-base dark:prose-invert max-w-none leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.article>
      </div>
    </div>
  );
}
