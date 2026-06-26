import { Resend } from "resend";
import { render } from "@react-email/render";
import { prisma } from "@/lib/prisma";

type SendEmailParams = {
  to: string | string[];
  subject: string;
  react?: React.ReactElement;
  html?: string;
  replyTo?: string;
};

export async function sendEmail({ to, subject, react, html, replyTo }: SendEmailParams) {
  if (!process.env.RESEND_API_KEY) {
    console.log("Email not sent: RESEND_API_KEY not configured");
    return { success: false as const, error: "Resend not configured" };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const finalHtml = react ? await render(react) : html || "";

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "GrowthPilot Agency <onboarding@resend.dev>",
      to: Array.isArray(to) ? to : [to],
      subject,
      html: finalHtml,
      replyTo,
    });

    if (error) throw error;

    await logEmail(to, subject, "sent");

    return { success: true as const, data };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to send email";
    await logEmail(to, subject, "failed", message);
    console.error("Email send failed:", message);
    return { success: false as const, error: message };
  }
}

async function logEmail(recipient: string | string[], subject: string, status: string, error?: string) {
  try {
    await prisma.emailLog.create({
      data: {
        recipient: Array.isArray(recipient) ? recipient.join(", ") : recipient,
        subject,
        type: "outbound",
        status,
        error,
      },
    });
  } catch {
    console.error("Failed to log email");
  }
}
