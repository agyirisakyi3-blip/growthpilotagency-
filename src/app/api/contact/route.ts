import { NextResponse } from "next/server";
import { createElement } from "react";
import { render } from "@react-email/render";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { contactSchema } from "@/lib/validations/email";
import { checkRateLimit, sanitize } from "@/lib/rate-limit";
import { validateOrigin } from "@/lib/csrf";
import { ContactConfirmationEmail, NewLeadNotificationEmail } from "@/emails";

export async function POST(request: Request) {
  try {
    if (!validateOrigin(request)) {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
    }

    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const rate = checkRateLimit(`contact:${ip}`, 3, 60000);
    if (!rate.allowed) {
      return NextResponse.json(
        { success: false, message: "Too many requests. Try again later." },
        { status: 429, headers: { "X-RateLimit-Reset": String(rate.resetAt) } }
      );
    }

    const body = await request.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { name, email, company, phone, message } = parsed.data;
    const clean = {
      name: sanitize(name),
      email: sanitize(email),
      company: sanitize(company || ""),
      phone: sanitize(phone || ""),
      message: sanitize(message),
    };

    await prisma.lead.create({
      data: {
        name: clean.name,
        email: clean.email,
        company: clean.company,
        phone: clean.phone,
        message: clean.message,
      },
    });

    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_TO || "agyirisakyi3@gmail.com";

    const [userHtml, adminHtml] = await Promise.all([
      render(createElement(ContactConfirmationEmail, { name: clean.name, message: clean.message })),
      render(createElement(NewLeadNotificationEmail, {
        name: clean.name,
        email: clean.email,
        company: clean.company || "N/A",
        phone: clean.phone,
        message: clean.message,
      })),
    ]);

    const emailResults = await Promise.allSettled([
      sendEmail({ to: clean.email, subject: "We received your message - GrowthPilot Agency", html: userHtml }),
      sendEmail({ to: adminEmail, subject: `New Lead: ${clean.name} - ${clean.company || "No company"}`, html: adminHtml }),
    ]);

    const emailFailed = emailResults.some(r => r.status === "rejected" || (r.status === "fulfilled" && !r.value.success));

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully! We'll get back to you within 1-2 hours.",
        emailSent: !emailFailed,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
