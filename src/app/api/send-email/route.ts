import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { sendEmailSchema } from "@/lib/validations/email";
import { checkRateLimit, sanitize } from "@/lib/rate-limit";
import { validateOrigin } from "@/lib/csrf";

export async function POST(request: Request) {
  try {
    if (!validateOrigin(request)) {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
    }

    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const rate = checkRateLimit(`send-email:${ip}`, 10, 60000);
    if (!rate.allowed) {
      return NextResponse.json(
        { success: false, message: "Too many requests. Try again later." },
        { status: 429, headers: { "X-RateLimit-Reset": String(rate.resetAt) } }
      );
    }

    const body = await request.json();
    const parsed = sendEmailSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { to, subject, html } = parsed.data;

    const result = await sendEmail({
      to: sanitize(to),
      subject: sanitize(subject),
      html,
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.error || "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Send email API error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
