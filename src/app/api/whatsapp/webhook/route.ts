import { NextRequest, NextResponse } from "next/server";
import { extractMessageText } from "@/lib/whatsapp/client";
import { handleIncomingMessage, handleButtonReply } from "@/lib/whatsapp/bot";

const META_IP_RANGES = [
  "3.208.120.0/24",
  "3.208.121.0/24",
  "3.209.200.0/24",
  "3.209.201.0/24",
  "3.209.202.0/24",
  "3.209.203.0/24",
  "3.209.204.0/24",
  "3.209.205.0/24",
  "3.209.206.0/24",
  "3.209.207.0/24",
  "3.227.248.0/24",
  "3.227.249.0/24",
  "3.227.250.0/24",
  "3.227.251.0/24",
  "3.227.252.0/24",
  "3.227.253.0/24",
  "3.227.254.0/24",
  "3.227.255.0/24",
  "18.205.240.0/24",
  "18.205.241.0/24",
  "18.205.242.0/24",
  "18.205.243.0/24",
  "44.195.128.0/24",
  "44.195.129.0/24",
  "44.195.130.0/24",
  "44.195.131.0/24",
  "52.4.160.0/24",
  "52.4.161.0/24",
  "52.4.162.0/24",
  "52.4.163.0/24",
  "54.83.23.0/24",
  "54.83.24.0/24",
  "54.83.25.0/24",
  "54.83.26.0/24",
  "54.87.168.0/24",
  "54.87.169.0/24",
  "54.87.170.0/24",
  "54.87.171.0/24",
];

function ipInRange(ip: string, cidr: string): boolean {
  const [rangeIP, bits] = cidr.split("/");
  const mask = ~(2 ** (32 - parseInt(bits)) - 1);
  const ipNum = ip.split(".").reduce((acc, oct) => (acc << 8) + parseInt(oct), 0) >>> 0;
  const rangeNum = rangeIP.split(".").reduce((acc, oct) => (acc << 8) + parseInt(oct), 0) >>> 0;
  return (ipNum & mask) === (rangeNum & mask);
}

function isMetaIP(ip: string): boolean {
  return META_IP_RANGES.some((cidr) => ipInRange(ip, cidr));
}

export async function GET(req: NextRequest) {
  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;
  if (!verifyToken) {
    return new NextResponse("Webhook not configured", { status: 500 });
  }

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
    if (process.env.NODE_ENV === "production") {
      const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
        || req.headers.get("x-real-ip")
        || "";
      if (ip && !isMetaIP(ip)) {
        return NextResponse.json({ status: "error", message: "Forbidden" }, { status: 403 });
      }
    }

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
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
