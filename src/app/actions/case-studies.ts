"use server";

import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/admin-auth";
import { z } from "zod";

const caseStudySchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200),
  client: z.string().min(1).max(200),
  industry: z.string().min(1).max(100),
  challenge: z.string().min(1).max(10000),
  solution: z.string().min(1).max(10000),
  results: z.string().min(1).max(10000),
  metrics: z.string().max(5000).optional().default("{}"),
  image: z.string().max(500).optional().default(""),
  published: z.boolean().optional().default(false),
});

async function requireAdmin() {
  if (!(await verifySession())) throw new Error("Unauthorized");
}

export async function getCaseStudies() {
  await requireAdmin();
  try {
    const studies = await prisma.caseStudy.findMany({ orderBy: { createdAt: "desc" } });
    return { success: true as const, data: studies };
  } catch {
    return { success: false as const, data: [] };
  }
}

export async function getCaseStudy(id: string) {
  await requireAdmin();
  try {
    const study = await prisma.caseStudy.findUnique({ where: { id } });
    return { success: true as const, data: study };
  } catch {
    return { success: false as const, data: null };
  }
}

export async function createCaseStudy(formData: FormData) {
  await requireAdmin();
  const raw = Object.fromEntries(formData);
  const parsed = caseStudySchema.safeParse({
    ...raw,
    published: raw.published === "true",
  });
  if (!parsed.success) return { success: false as const, message: parsed.error.issues[0].message };

  try {
    await prisma.caseStudy.create({ data: parsed.data });
    return { success: true as const, message: "Case study created" };
  } catch (error) {
    console.error("Failed to create case study:", error);
    return { success: false as const, message: "Failed to create case study" };
  }
}

export async function updateCaseStudy(id: string, formData: FormData) {
  await requireAdmin();
  const raw = Object.fromEntries(formData);
  const parsed = caseStudySchema.safeParse({
    ...raw,
    published: raw.published === "true",
  });
  if (!parsed.success) return { success: false as const, message: parsed.error.issues[0].message };

  try {
    await prisma.caseStudy.update({ where: { id }, data: parsed.data });
    return { success: true as const, message: "Case study updated" };
  } catch (error) {
    console.error("Failed to update case study:", error);
    return { success: false as const, message: "Failed to update case study" };
  }
}

export async function deleteCaseStudy(id: string) {
  await requireAdmin();
  try {
    await prisma.caseStudy.delete({ where: { id } });
    return { success: true as const };
  } catch {
    return { success: false as const };
  }
}

export async function toggleCaseStudy(id: string, published: boolean) {
  await requireAdmin();
  try {
    await prisma.caseStudy.update({ where: { id }, data: { published } });
    return { success: true as const };
  } catch {
    return { success: false as const };
  }
}
