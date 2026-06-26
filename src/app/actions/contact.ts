"use server";

import { createElement } from "react";
import { render } from "@react-email/render";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { ContactConfirmationEmail, NewLeadNotificationEmail } from "@/emails";
import { verifySession } from "@/lib/admin-auth";
import { contactFormSchema } from "@/lib/validations/email";

export async function submitContact(formData: FormData) {
  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    subject: formData.get("subject") as string,
    message: formData.get("message") as string,
  };

  const parsed = contactFormSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0].message };
  }

  const { name, email, phone, subject, message } = parsed.data;

  try {
    await prisma.contact.create({
      data: { name, email, phone, subject, message },
    });

    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_TO || "agyirisakyi3@gmail.com";

    const [userHtml, adminHtml] = await Promise.all([
      render(createElement(ContactConfirmationEmail, { name, message })),
      render(createElement(NewLeadNotificationEmail, {
        name,
        email,
        company: subject,
        phone: phone || undefined,
        message,
      })),
    ]);

    await Promise.allSettled([
      sendEmail({ to: email, subject: "We received your message - GrowthPilot Agency", html: userHtml }),
      sendEmail({ to: adminEmail, subject: `New Contact: ${subject} - ${name}`, html: adminHtml }),
    ]);

    return {
      success: true,
      message: "Thank you! We'll get back to you within 24 hours.",
    };
  } catch (error) {
    console.error("Failed to submit contact:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

export async function getContacts() {
  if (!(await verifySession())) {
    return { success: false, data: [] };
  }
  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: contacts };
  } catch (error) {
    console.error("Failed to fetch contacts:", error);
    return { success: false, data: [] };
  }
}

export async function deleteContact(id: string) {
  if (!(await verifySession())) {
    return { success: false };
  }
  try {
    await prisma.contact.delete({ where: { id } });
    return { success: true };
  } catch (error) {
    console.error("Failed to delete contact:", error);
    return { success: false };
  }
}
