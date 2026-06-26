"use server";

import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/admin-auth";

async function requireAdmin() {
  if (!(await verifySession())) {
    throw new Error("Unauthorized");
  }
}

export async function getSubscribers() {
  await requireAdmin();
  try {
    const subscribers = await prisma.subscriber.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true as const, data: subscribers };
  } catch (error) {
    console.error("Failed to fetch subscribers:", error);
    return { success: false as const, data: [] };
  }
}

export async function deleteSubscriber(id: string) {
  await requireAdmin();
  try {
    await prisma.subscriber.delete({ where: { id } });
    return { success: true as const };
  } catch (error) {
    console.error("Failed to delete subscriber:", error);
    return { success: false as const };
  }
}

export async function getEmailLogs() {
  await requireAdmin();
  try {
    const logs = await prisma.emailLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 500,
    });
    return { success: true as const, data: logs };
  } catch (error) {
    console.error("Failed to fetch email logs:", error);
    return { success: false as const, data: [] };
  }
}

export async function deleteEmailLog(id: string) {
  await requireAdmin();
  try {
    await prisma.emailLog.delete({ where: { id } });
    return { success: true as const };
  } catch (error) {
    console.error("Failed to delete email log:", error);
    return { success: false as const };
  }
}
