import { NextResponse } from "next/server";
import { createElement } from "react";
import { render } from "@react-email/render";
import { sendEmail } from "@/lib/email";
import { passwordResetSchema } from "@/lib/validations/email";
import { checkRateLimit, sanitize } from "@/lib/rate-limit";
import { validateOrigin } from "@/lib/csrf";
import { prisma } from "@/lib/prisma";
import { PasswordResetEmail } from "@/emails";
import { v4 as uuid } from "uuid";

export async function POST(request: Request) {
  try {
    if (!validateOrigin(request)) {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
    }

    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const rate = checkRateLimit(`password-reset:${ip}`, 2, 60000);
    if (!rate.allowed) {
      return NextResponse.json(
        { success: false, message: "Too many requests. Try again later." },
        { status: 429, headers: { "X-RateLimit-Reset": String(rate.resetAt) } }
      );
    }

    const body = await request.json();
    const parsed = passwordResetSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email } = parsed.data;
    const cleanEmail = sanitize(email);
    const token = uuid();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const resetLink = `${siteUrl}/reset-password?token=${token}&email=${encodeURIComponent(cleanEmail)}`;

    await prisma.passwordResetToken.upsert({
      where: { email: cleanEmail },
      update: { token, expiresAt: new Date(Date.now() + 60 * 60 * 1000) },
      create: { email: cleanEmail, token, expiresAt: new Date(Date.now() + 60 * 60 * 1000) },
    });

    const resetHtml = await render(createElement(PasswordResetEmail, {
      name: cleanEmail.split("@")[0],
      resetLink,
    }));
    const result = await sendEmail({
      to: cleanEmail,
      subject: "Reset Your Password - GrowthPilot Agency",
      html: resetHtml,
    });

    return NextResponse.json(
      {
        success: true,
        message: "If the email exists, a reset link has been sent.",
        emailSent: result.success,
      },
    );
  } catch (error) {
    console.error("Password reset API error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
