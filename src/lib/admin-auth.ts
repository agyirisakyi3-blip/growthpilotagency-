import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "admin_session";

export function createSession(): string {
  const exp = Date.now() + 24 * 60 * 60 * 1000;
  const payload = JSON.stringify({ role: "admin", exp });
  const secret = process.env.ADMIN_PASSWORD || "";
  const hmac = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return Buffer.from(`${payload}.${hmac}`).toString("base64");
}

export async function verifySession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return false;

    const decoded = Buffer.from(token, "base64").toString();
    const dotIndex = decoded.lastIndexOf(".");
    if (dotIndex === -1) return false;

    const payload = decoded.slice(0, dotIndex);
    const signature = decoded.slice(dotIndex + 1);
    const secret = process.env.ADMIN_PASSWORD || "";
    const expected = crypto.createHmac("sha256", secret).update(payload).digest("hex");

    if (signature.length !== expected.length) return false;
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false;

    const { exp } = JSON.parse(payload);
    if (Date.now() > exp) return false;

    return true;
  } catch {
    return false;
  }
}
