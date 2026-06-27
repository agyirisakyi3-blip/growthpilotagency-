import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const authRes = await fetch(new URL("/api/admin/verify", req.url));
  if (!authRes.ok) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = req.nextUrl;
  const contactId = searchParams.get("contactId");

  if (contactId) {
    const conversations = await prisma.whatsAppConversation.findMany({
      where: { contactId },
      include: {
        messages: { orderBy: { createdAt: "asc" } },
        contact: true,
      },
      orderBy: { updatedAt: "desc" },
    });
    return NextResponse.json({ success: true, data: conversations });
  }

  const contacts = await prisma.whatsAppContact.findMany({
    include: {
      conversations: {
        include: {
          messages: { orderBy: { createdAt: "desc" }, take: 1 },
        },
        orderBy: { updatedAt: "desc" },
        take: 1,
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json({ success: true, data: contacts });
}
