import { NextResponse } from "next/server";
import { createElement } from "react";
import { render } from "@react-email/render";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { NewsletterConfirmationEmail } from "@/emails";
import { subscribeSchema } from "@/lib/validations/email";
import { checkRateLimit, sanitize } from "@/lib/rate-limit";
import { validateOrigin } from "@/lib/csrf";

export async function POST(request: Request) {
  try {
    if (!validateOrigin(request)) {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
    }

    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const rate = checkRateLimit(`subscribe:${ip}`, 5, 60000);
    if (!rate.allowed) {
      return NextResponse.json(
        { success: false, message: "Too many requests. Try again later." },
        { status: 429, headers: { "X-RateLimit-Reset": String(rate.resetAt) } },
      );
    }

    const body = await request.json();
    const parsed = subscribeSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: parsed.error.issues[0].message },
        { status: 400 },
      );
    }

    const { email, source } = parsed.data;
    const cleanEmail = sanitize(email);

    const existing = await prisma.subscriber.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ success: true, message: "Already subscribed" });
    }

    await prisma.subscriber.create({
      data: { email, source: source || "website" },
    });

    const confirmationHtml = await render(createElement(NewsletterConfirmationEmail, { email }));
    await sendEmail({
      to: email,
      subject: "You're subscribed! - GrowthPilot Agency",
      html: confirmationHtml,
    });

    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_TO || "agyirisakyi3@gmail.com";
    await sendEmail({
      to: adminEmail,
      subject: "New SEO Checklist Subscriber",
      html: `<p>New subscriber: <strong>${cleanEmail}</strong></p><p>Source: ${source || "website"}</p>`,
    });

    return NextResponse.json({ success: true, message: "Subscribed successfully" }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to subscribe" },
      { status: 500 },
    );
  }
}
