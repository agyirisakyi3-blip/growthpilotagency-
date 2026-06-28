"use server";

import { createElement } from "react";
import { render } from "@react-email/render";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { NewLeadNotificationEmail } from "@/emails";
import { verifySession } from "@/lib/admin-auth";
import { leadSchema } from "@/lib/validations/email";
import { checkServerActionRateLimit, sanitize } from "@/lib/rate-limit";


export async function submitLead(formData: FormData) {
  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    company: formData.get("company") as string,
    website: formData.get("website") as string,
    message: formData.get("message") as string,
  };

  const { allowed } = await checkServerActionRateLimit(3, 60_000);
  if (!allowed) {
    return { success: false, message: "Too many requests. Please try again later." };
  }

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0].message };
  }

  const { name, email, phone, company, website, message } = parsed.data;
  const clean = {
    name: sanitize(name),
    email: sanitize(email),
    phone: sanitize(phone || ""),
    company: sanitize(company),
    website: sanitize(website || ""),
    message: sanitize(message || ""),
  };

  try {
    await prisma.lead.create({
      data: {
        name: clean.name,
        email: clean.email,
        phone: clean.phone,
        company: clean.company,
        website: clean.website,
        message: clean.message,
        status: "new",
        source: "seo-audit",
      },
    });

    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_TO || "agyirisakyi3@gmail.com";

    const html = await render(createElement(NewLeadNotificationEmail, {
      name: clean.name,
      email: clean.email,
      company: clean.company,
      phone: clean.phone || undefined,
      message: clean.message || "SEO & GEO audit requested via website form",
    }));

    await sendEmail({ to: adminEmail, subject: `New SEO & GEO Audit Lead: ${name} - ${company}`, html });

    return {
      success: true,
      message:
        "Thank you! We'll review your website and send your free SEO & GEO audit report within 1-2 hours.",
    };
  } catch (error) {
    console.error("Failed to submit lead:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

export async function getLeads() {
  if (!(await verifySession())) {
    return { success: false, data: [] };
  }
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: leads };
  } catch (error) {
    console.error("Failed to fetch leads:", error);
    return { success: false, data: [] };
  }
}

export async function deleteLead(id: string) {
  if (!(await verifySession())) {
    return { success: false };
  }
  try {
    await prisma.lead.delete({ where: { id } });
    return { success: true };
  } catch (error) {
    console.error("Failed to delete lead:", error);
    return { success: false };
  }
}

export async function updateLeadStatus(id: string, status: string) {
  if (!(await verifySession())) {
    return { success: false };
  }
  try {
    await prisma.lead.update({
      where: { id },
      data: { status },
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to update lead status:", error);
    return { success: false };
  }
}
