import { NextResponse } from "next/server";
import crypto from "crypto";
import { createSession } from "@/lib/admin-auth";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || request.headers.get("x-real-ip")
      || "unknown";

    const { allowed } = checkRateLimit(`admin-login:${ip}`, 5, 60_000);
    if (!allowed) {
      return NextResponse.json(
        { success: false, message: "Too many attempts. Try again later." },
        { status: 429 },
      );
    }

    const { password } = await request.json();

    if (!password || !process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 },
      );
    }

    const stored = process.env.ADMIN_PASSWORD;
    const [algo, hash] = stored.startsWith("$2") ? ["bcrypt", stored] : ["plain", stored];

    let valid = false;
    if (algo === "bcrypt") {
      const bcrypt = await import("bcryptjs");
      valid = await bcrypt.compare(password, hash);
    } else {
      const expected = crypto.createHash("sha256").update(stored).digest();
      const actual = crypto.createHash("sha256").update(password).digest();
      valid = crypto.timingSafeEqual(expected, actual);
    }

    if (!valid) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 },
      );
    }

    const session = createSession();

    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_session", session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 },
    );
  }
}
