"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Post = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  image: string;
  author: string;
  createdAt: Date;
};

function formatDate(date: Date, locale: string) {
  return date.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function LatestBlogPostsClient({
  posts,
  locale,
}: {
  posts: Post[];
  locale: string;
}) {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="text-sm font-medium text-primary mb-3 tracking-wide">
            Our Blog
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 max-w-2xl">
            Latest{" "}
            <span className="text-primary">Blog Posts</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl">
            Insights and strategies to grow your business with SEO, GEO, AI automation, and modern web design.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {posts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Link href={`/${locale}/blog/${post.slug}`}>
                <Card className="group h-full overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1.5 border-border/50">
                  <div className="aspect-[16/9] bg-muted overflow-hidden relative">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/5 to-orange-600/5" />
                    )}
                  </div>
                  <div className="p-5 flex flex-col h-full">
                    <Badge variant="secondary" className="text-xs mb-3 w-fit">
                      {post.category}
                    </Badge>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
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
                        {formatDate(new Date(post.createdAt), locale)}
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href={`/${locale}/blog`}>
            <Button variant="outline" size="lg" className="gap-2 group">
              View All Posts
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
