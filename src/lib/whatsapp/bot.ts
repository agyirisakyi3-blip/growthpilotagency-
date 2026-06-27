import { prisma } from "@/lib/prisma";
import { sendText, sendReplyButtons } from "./client";

type Intent = "greeting" | "services" | "pricing" | "contact" | "booking" | "support" | "unknown";

const SERVICE_OPTIONS = [
  { id: "seo", title: "SEO & GEO" },
  { id: "website", title: "Website Design" },
  { id: "ai", title: "AI Automation" },
  { id: "whatsapp", title: "WhatsApp Bot" },
  { id: "leads", title: "Lead Gen" },
  { id: "ads", title: "Google Ads" },
  { id: "other", title: "Other" },
];

function detectIntent(text: string): Intent {
  const lower = text.toLowerCase();
  if (/^(hi|hello|hey|good morning|good afternoon|good evening|greetings|bonjour|salut)/.test(lower)) return "greeting";
  if (/\b(service|offer|do you|provide|what.*do|solution|capabilities)\b/.test(lower)) return "services";
  if (/\b(price|pricing|cost|how much|rate|fee|package|plan|budget|cheap|expensive)\b/.test(lower)) return "pricing";
  if (/\b(contact|speak|talk|human|agent|representative|call|phone|reach)\b/.test(lower)) return "contact";
  if (/\b(book|appointment|consultation|meet|schedule|call|discovery)\b/.test(lower)) return "booking";
  if (/\b(help|support|issue|problem|error|bug|not working|fix|assistance)\b/.test(lower)) return "support";
  return "unknown";
}

const RESPONSES: Record<string, (name: string) => string> = {
  greeting: (name) =>
    `Hello${name ? ` ${name}` : ""}! 👋 Welcome to GrowthPilot Agency.\n\nWe help businesses grow with SEO & GEO, web design, AI automation, WhatsApp bots, and lead generation.\n\nHow can I assist you today?`,
  services: () =>
    `Here are the services we offer:\n\n🔹 SEO & GEO Services\n🔹 Website Design\n🔹 AI Automation\n🔹 WhatsApp Chatbots\n🔹 Lead Generation\n🔹 Google Ads & PPC\n🔹 Social Media Management\n🔹 Content Creation\n🔹 CRM Setup & Automation\n\nWhich one interests you?`,
  pricing: () =>
    `Our pricing is tailored to each business. We offer:\n\n📌 One-time projects (websites, automation setup)\n📌 Monthly retainers (SEO & GEO, ads, social media)\n📌 Custom packages\n\nCould you tell me which service you're interested in so I can share relevant pricing?`,
  contact: () =>
    `I can connect you with our team! Please share your name and email so someone can reach out to you shortly.`,
  booking: () =>
    `I'd love to schedule a free consultation! Please share your name, email, and preferred time, and I'll get you booked in.`,
  support: () =>
    `I'm sorry you're having trouble. Let me connect you with our support team. Could you briefly describe the issue?`,
  unknown: () =>
    `Thanks for reaching out! I'm not sure I understood your request. Could you tell me more about what you're looking for?\n\nYou can also choose from the options below:`,
};

export async function handleIncomingMessage(waId: string, text: string) {
  let contact = await prisma.whatsAppContact.findUnique({ where: { waId } });
  if (!contact) {
    contact = await prisma.whatsAppContact.create({
      data: { waId, name: "" },
    });
  }

  const activeConversation = await prisma.whatsAppConversation.findFirst({
    where: { contactId: contact.id, status: "active" },
    include: { messages: { orderBy: { createdAt: "desc" }, take: 5 } },
  });

  const conversation =
    activeConversation ||
    (await prisma.whatsAppConversation.create({
      data: { contactId: contact.id, status: "active" },
    }));

  await prisma.whatsAppMessage.create({
    data: {
      conversationId: conversation.id,
      fromMe: false,
      content: text,
      type: "text",
    },
  });

  if (conversation.status === "collecting_name") {
    const name = text.trim();
    await prisma.whatsAppContact.update({
      where: { id: contact.id },
      data: { name },
    });
    await prisma.whatsAppConversation.update({
      where: { id: conversation.id },
      data: { status: "collecting_email" },
    });
    await sendText(waId, `Nice to meet you, ${name}! 📧 What's your email address so we can follow up?`);
    return;
  }

  if (conversation.status === "collecting_email") {
    const email = text.trim();
    await prisma.whatsAppContact.update({
      where: { id: contact.id },
      data: { email },
    });
    await prisma.whatsAppConversation.update({
      where: { id: conversation.id },
      data: { status: "collecting_company" },
    });
    await sendText(waId, `Great, thanks! 🏢 What company or business do you represent?`);
    return;
  }

  if (conversation.status === "collecting_company") {
    const company = text.trim();
    await prisma.whatsAppContact.update({
      where: { id: contact.id },
      data: { company, status: "qualified" },
    });
    await prisma.whatsAppConversation.update({
      where: { id: conversation.id },
      data: { status: "qualified_lead" },
    });
    await sendText(
      waId,
      `Thank you, ${contact.name || "there"}! We've received your information. 🎉\n\nOne of our team members will reach out to you shortly to discuss how we can help ${company} grow.\n\nIn the meantime, feel free to tell me more about what you're looking for!`
    );
    return;
  }

  if (conversation.status === "awaiting_service_interest") {
    await prisma.whatsAppContact.update({
      where: { id: contact.id },
      data: { serviceInterest: text },
    });
    await prisma.whatsAppConversation.update({
      where: { id: conversation.id },
      data: { status: "qualified_lead" },
    });
    await sendText(
      waId,
      `Excellent choice! 🎯 We have great solutions for that.\n\nI'll have a specialist reach out to you with more details and pricing. Could you share your email so we can send you some info?`
    );
    await prisma.whatsAppConversation.update({
      where: { id: conversation.id },
      data: { status: "collecting_email" },
    });
    return;
  }

  const intent = detectIntent(text);

  if (intent === "services") {
    await sendText(waId, RESPONSES.services(contact.name || ""));
    await sendReplyButtons(
      waId,
      "Which service interests you?",
      SERVICE_OPTIONS.map((s) => ({ id: s.id, title: s.title }))
    );
    await prisma.whatsAppConversation.update({
      where: { id: conversation.id },
      data: { status: "awaiting_service_interest", intent },
    });
    return;
  }

  if (intent === "pricing" || intent === "booking") {
    await sendText(waId, RESPONSES[intent](contact.name || ""));
    await prisma.whatsAppConversation.update({
      where: { id: conversation.id },
      data: { status: "collecting_name", intent },
    });
    return;
  }

  if (intent === "contact" || intent === "support") {
    await sendText(waId, RESPONSES[intent](contact.name || ""));
    await prisma.whatsAppConversation.update({
      where: { id: conversation.id },
      data: { status: "collecting_name", intent },
    });
    return;
  }

  if (intent === "greeting") {
    await sendText(waId, RESPONSES.greeting(contact.name || ""));
    await sendReplyButtons(
      waId,
      "How can I help you?",
      [
        { id: "view_services", title: "Our Services" },
        { id: "get_pricing", title: "Get Pricing" },
        { id: "talk_human", title: "Talk to a Human" },
      ]
    );
    return;
  }

  await sendText(waId, RESPONSES.unknown(contact.name || ""));
  await sendReplyButtons(
    waId,
    "Choose an option:",
    [
      { id: "view_services", title: "View Services" },
      { id: "talk_human", title: "Talk to Us" },
    ]
  );
}

export async function handleButtonReply(waId: string, buttonId: string) {
  let contact = await prisma.whatsAppContact.findUnique({ where: { waId } });
  if (!contact) {
    contact = await prisma.whatsAppContact.create({ data: { waId } });
  }

  const activeConversation = await prisma.whatsAppConversation.findFirst({
    where: { contactId: contact.id, status: "active" },
  });

  const conversation =
    activeConversation ||
    (await prisma.whatsAppConversation.create({
      data: { contactId: contact.id, status: "active" },
    }));

  await prisma.whatsAppMessage.create({
    data: {
      conversationId: conversation.id,
      fromMe: false,
      content: `[Button: ${buttonId}]`,
      type: "button",
    },
  });

  switch (buttonId) {
    case "view_services":
      await sendText(waId, RESPONSES.services(contact.name || ""));
      await sendReplyButtons(
        waId,
        "Pick a service:",
        SERVICE_OPTIONS.map((s) => ({ id: s.id, title: s.title }))
      );
      await prisma.whatsAppConversation.update({
        where: { id: conversation.id },
        data: { status: "awaiting_service_interest", intent: "services" },
      });
      break;

    case "get_pricing":
      await sendText(waId, RESPONSES.pricing(contact.name || ""));
      await prisma.whatsAppConversation.update({
        where: { id: conversation.id },
        data: { status: "collecting_name", intent: "pricing" },
      });
      break;

    case "talk_human":
      await sendText(
        waId,
        "I'll connect you with our team! Please share your name and email so someone can follow up."
      );
      await prisma.whatsAppConversation.update({
        where: { id: conversation.id },
        data: { status: "collecting_name", intent: "contact" },
      });
      break;

    default:
      if (SERVICE_OPTIONS.some((s) => s.id === buttonId)) {
        const service = SERVICE_OPTIONS.find((s) => s.id === buttonId);
        await prisma.whatsAppContact.update({
          where: { id: contact.id },
          data: { serviceInterest: service?.title || buttonId },
        });
        await sendText(
          waId,
          `Great choice! 🎯 Our ${service?.title || buttonId} team would love to help.\n\nCould you share your email so we can send you more details?`
        );
        await prisma.whatsAppConversation.update({
          where: { id: conversation.id },
          data: { status: "collecting_email", intent: "services" },
        });
      }
      break;
  }
}
