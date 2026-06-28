"use client";

import { motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

type Post = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  image: string;
  author: string;
  createdAt: Date;
};

export function BlogListContent({
  posts,
  locale,
  currentPage,
  totalPages,
}: {
  posts: Post[];
  locale: string;
  currentPage: number;
  totalPages: number;
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-background/50 text-xs sm:text-sm text-muted-foreground mb-4">
            {t("badge")}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {t("title")}{" "}
            <span className="gradient-text">{t("highlight")}</span>
          </h1>
          <p className="text-muted-foreground text-lg">{t("description")}</p>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">{t("noPosts")}</p>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <Link href={`/${locale}/blog/${post.slug}`}>
                    <Card className="group h-full overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1.5 border-border/50">
                      <div className="aspect-[16/9] bg-muted overflow-hidden relative">
                        {post.image ? (
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/5 to-orange-600/5" />
                        )}
                      </div>
                      <div className="p-5 flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                        </div>
                        <h2 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
                          <span className="flex items-center gap-1.5">
                            <User size={12} />
                            {post.author}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Calendar size={12} />
                            {formatDate(new Date(post.createdAt))}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>

            {totalPages > 1 && (
              <nav className="flex items-center justify-center gap-2 mt-16" aria-label="Pagination">
                {currentPage > 1 ? (
                  <Button variant="outline" size="icon" asChild>
                    <Link href={currentPage > 2 ? `/${locale}/blog?page=${currentPage - 1}` : `/${locale}/blog`} aria-label="Previous page">
                      <ChevronLeft className="h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button variant="outline" size="icon" disabled>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Button key={p} variant={p === currentPage ? "default" : "outline"} size="sm" asChild>
                    <Link href={p === 1 ? `/${locale}/blog` : `/${locale}/blog?page=${p}`}>{p}</Link>
                  </Button>
                ))}
                {currentPage < totalPages ? (
                  <Button variant="outline" size="icon" asChild>
                    <Link href={`/${locale}/blog?page=${currentPage + 1}`} aria-label="Next page">
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button variant="outline" size="icon" disabled>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </nav>
            )}
          </>
        )}
      </div>
    </div>
  );
}
