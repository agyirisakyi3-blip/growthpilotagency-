import { NextRequest, NextResponse } from "next/server";
import { extractMessageText } from "@/lib/whatsapp/client";
import { handleIncomingMessage, handleButtonReply } from "@/lib/whatsapp/bot";

export async function GET(req: NextRequest) {
  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN || "growthpilot_verify_2024";
  const searchParams = req.nextUrl.searchParams;
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === verifyToken) {
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse("Verification failed", { status: 403 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const entry = body?.entry?.[0];
    if (!entry) {
      return NextResponse.json({ status: "ok" });
    }

    const changes = entry.changes?.[0];
    const value = changes?.value;

    if (value?.statuses) {
      return NextResponse.json({ status: "ok" });
    }

    const message = extractMessageText(entry);
    if (!message) {
      const buttonReply = value?.messages?.[0]?.interactive?.button_reply;
      const listReply = value?.messages?.[0]?.interactive?.list_reply;
      const replyId = buttonReply?.id || listReply?.id;

      if (replyId) {
        const waId = value?.contacts?.[0]?.wa_id || value?.messages?.[0]?.from;
        if (waId) {
          await handleButtonReply(waId, replyId);
        }
      }
      return NextResponse.json({ status: "ok" });
    }

    await handleIncomingMessage(message.waId, message.text);

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("WhatsApp webhook error:", error);
    return NextResponse.json({ status: "error", message: (error as Error).message }, { status: 500 });
  }
}
