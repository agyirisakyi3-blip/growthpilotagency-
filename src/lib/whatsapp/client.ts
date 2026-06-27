const WHATSAPP_API = "https://graph.facebook.com/v18.0";

function getConfig() {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!token || !phoneNumberId) {
    throw new Error("WHATSAPP_ACCESS_TOKEN and WHATSAPP_PHONE_NUMBER_ID must be set");
  }
  return { token, phoneNumberId };
}

export interface WhatsAppTextMessage {
  messaging_product: "whatsapp";
  to: string;
  type: "text";
  text: { body: string; preview_url?: boolean };
}

export interface WhatsAppInteractiveMessage {
  messaging_product: "whatsapp";
  to: string;
  type: "interactive";
  interactive: {
    type: "button" | "list";
    header?: { type: "text"; text: string };
    body: { text: string };
    footer?: { text: string };
    action: Record<string, unknown>;
  };
}

export async function sendWhatsAppMessage(
  payload: WhatsAppTextMessage | WhatsAppInteractiveMessage
): Promise<{ success: boolean; error?: string }> {
  try {
    const config = getConfig();
    const res = await fetch(
      `${WHATSAPP_API}/${config.phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data?.error?.message || "Unknown error" };
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
}

export function sendText(to: string, text: string) {
  return sendWhatsAppMessage({
    messaging_product: "whatsapp",
    to,
    type: "text",
    text: { body: text, preview_url: false },
  });
}

export function sendButtonList(
  to: string,
  body: string,
  header: string,
  buttons: { id: string; title: string }[]
) {
  return sendWhatsAppMessage({
    messaging_product: "whatsapp",
    to,
    type: "interactive",
    interactive: {
      type: "list",
      header: { type: "text", text: header },
      body: { text: body },
      action: {
        button: "Choose an option",
        sections: [
          {
            title: "Options",
            rows: buttons.map((b) => ({ id: b.id, title: b.title })),
          },
        ],
      },
    },
  });
}

export function sendReplyButtons(
  to: string,
  body: string,
  buttons: { id: string; title: string }[]
) {
  return sendWhatsAppMessage({
    messaging_product: "whatsapp",
    to,
    type: "interactive",
    interactive: {
      type: "button",
      body: { text: body },
      action: {
        buttons: buttons.map((b) => ({
          type: "reply",
          reply: { id: b.id, title: b.title.slice(0, 20) },
        })),
      },
    },
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function extractMessageText(entry: any): {
  from: string;
  text: string;
  messageId: string;
  waId: string;
} | null {
  try {
    const change = entry?.changes?.[0];
    const value = change?.value;
    const message = value?.messages?.[0];
    if (!message) return null;
    return {
      from: message.from,
      text: message.text?.body || "",
      messageId: message.id,
      waId: value?.contacts?.[0]?.wa_id || message.from,
    };
  } catch {
    return null;
  }
}
