import { NextRequest, NextResponse } from "next/server";
import { sendText } from "@/lib/whatsapp/client";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const authRes = await fetch(new URL("/api/admin/verify", req.url));
    if (!authRes.ok) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { conversationId, message } = await req.json();
    if (!conversationId || !message) {
      return NextResponse.json({ success: false, message: "Missing conversationId or message" }, { status: 400 });
    }

    const conversation = await prisma.whatsAppConversation.findUnique({
      where: { id: conversationId },
      include: { contact: true },
    });

    if (!conversation) {
      return NextResponse.json({ success: false, message: "Conversation not found" }, { status: 404 });
    }

    const result = await sendText(conversation.contact.waId, message);
    if (!result.success) {
      return NextResponse.json({ success: false, message: result.error }, { status: 500 });
    }

    await prisma.whatsAppMessage.create({
      data: {
        conversationId: conversation.id,
        fromMe: true,
        content: message,
        type: "text",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: (error as Error).message }, { status: 500 });
  }
}
