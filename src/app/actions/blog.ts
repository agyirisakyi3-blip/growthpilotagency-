"use server";

import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/admin-auth";
import { z } from "zod";

const blogSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200),
  excerpt: z.string().min(1).max(500),
  content: z.string().min(1),
  category: z.string().min(1).max(100),
  image: z.string().max(500).optional().default(""),
  author: z.string().max(100).optional().default(""),
  published: z.boolean().optional().default(false),
});

async function requireAdmin() {
  if (!(await verifySession())) throw new Error("Unauthorized");
}

export async function getBlogPosts() {
  await requireAdmin();
  try {
    const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
    return { success: true as const, data: posts };
  } catch {
    return { success: false as const, data: [] };
  }
}

export async function getBlogPost(id: string) {
  await requireAdmin();
  try {
    const post = await prisma.blogPost.findUnique({ where: { id } });
    return { success: true as const, data: post };
  } catch {
    return { success: false as const, data: null };
  }
}

export async function createBlogPost(formData: FormData) {
  await requireAdmin();
  const raw = Object.fromEntries(formData);
  const parsed = blogSchema.safeParse({
    ...raw,
    published: raw.published === "true",
  });
  if (!parsed.success) return { success: false as const, message: parsed.error.issues[0].message };

  try {
    await prisma.blogPost.create({ data: parsed.data });
    return { success: true as const, message: "Post created" };
  } catch (error) {
    console.error("Failed to create blog post:", error);
    return { success: false as const, message: "Failed to create post" };
  }
}

export async function updateBlogPost(id: string, formData: FormData) {
  await requireAdmin();
  const raw = Object.fromEntries(formData);
  const parsed = blogSchema.safeParse({
    ...raw,
    published: raw.published === "true",
  });
  if (!parsed.success) return { success: false as const, message: parsed.error.issues[0].message };

  try {
    await prisma.blogPost.update({ where: { id }, data: parsed.data });
    return { success: true as const, message: "Post updated" };
  } catch (error) {
    console.error("Failed to update blog post:", error);
    return { success: false as const, message: "Failed to update post" };
  }
}

export async function deleteBlogPost(id: string) {
  await requireAdmin();
  try {
    await prisma.blogPost.delete({ where: { id } });
    return { success: true as const };
  } catch {
    return { success: false as const };
  }
}

export async function toggleBlogPost(id: string, published: boolean) {
  await requireAdmin();
  try {
    await prisma.blogPost.update({ where: { id }, data: { published } });
    return { success: true as const };
  } catch {
    return { success: false as const };
  }
}
