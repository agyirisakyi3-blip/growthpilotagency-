import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "../i18n/routing";

const i18nMiddleware = createMiddleware(routing);

const ALLOWED_ORIGINS = [
  "https://growthpilotagency.com",
  "https://www.growthpilotagency.com",
  "http://localhost:3000",
];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isStatic = pathname.startsWith("/_next") || pathname.startsWith("/api")
    || pathname === "/favicon.ico" || pathname === "/robots.txt"
    || pathname === "/sitemap.xml" || pathname === "/manifest.json"
    || pathname === "/security.txt" || pathname.startsWith("/.well-known")
    || pathname.startsWith("/images");

  if (!isStatic) {
    const origin = request.headers.get("origin");
    if (origin) {
      try {
        const parsed = new URL(origin);
        if (!ALLOWED_ORIGINS.some((allowed) => parsed.origin === allowed || parsed.href.startsWith(allowed))) {
          return new NextResponse(null, { status: 403 });
        }
      } catch {
        return new NextResponse(null, { status: 403 });
      }
    }
  }

  const nonce = crypto.randomUUID();
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  const response = isStatic
    ? NextResponse.next({ request: { headers: requestHeaders } })
    : i18nMiddleware(request);

  response.headers.set("x-nonce", nonce);
  response.headers.set("Content-Security-Policy", [
    `default-src 'self'`,
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://connect.facebook.net https://www.googletagmanager.com`,
    `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
    `font-src 'self' https://fonts.gstatic.com`,
    `img-src 'self' data: blob: https://www.facebook.com https://www.googletagmanager.com`,
    `connect-src 'self' https://api.resend.com https://tursodb.com`,
    `frame-src 'self' https://www.facebook.com`,
    `base-uri 'self'`,
    `form-action 'self'`,
  ].join("; "));
  response.headers.set("X-DNS-Prefetch-Control", "on");
  response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), interest-cohort=()");
  response.headers.set("X-Frame-Options", "DENY");

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|admin|.*\\..*).*)"],
};
