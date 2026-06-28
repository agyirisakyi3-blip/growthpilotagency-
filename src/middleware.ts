import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "@/i18n/routing";

const FRENCH_COUNTRIES = new Set([
  "FR", "BE", "CH", "MC", "LU",
  "CD", "CI", "CM", "SN", "ML", "MA", "TN", "DZ", "HT",
  "BF", "BJ", "BI", "CF", "CG", "DJ", "GA", "GN", "GQ",
  "KM", "MG", "MR", "MU", "NE", "RW", "SC", "TD", "TG",
]);

function detectLocale(geo: { country?: string }): string {
  if (geo.country && FRENCH_COUNTRIES.has(geo.country)) return "fr";
  return "en";
}

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const geo = (request as { geo?: { city?: string; country?: string; region?: string; regionCode?: string } }).geo || {};

  const geoData = {
    city: geo.city || "",
    country: geo.country || "",
    region: geo.region || "",
    regionCode: geo.regionCode || "",
    timezone: request.cookies.get("timezone")?.value || "",
  };

  const response =
    pathname === "/"
      ? NextResponse.redirect(new URL(`/${detectLocale(geo)}`, request.url))
      : intlMiddleware(request);

  response.cookies.set("geo_data", JSON.stringify(geoData), {
    maxAge: 60 * 60 * 24,
    path: "/",
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
