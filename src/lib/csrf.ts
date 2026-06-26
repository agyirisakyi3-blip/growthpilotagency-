const ALLOWED_ORIGINS = [
  "https://growthpilotagency.com",
  "https://www.growthpilotagency.com",
  "http://localhost:3000",
];

export function validateOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  if (!origin && !referer) return false;

  const url = origin || referer;
  if (!url) return false;

  try {
    const parsed = new URL(url);
    return ALLOWED_ORIGINS.some(
      (allowed) => parsed.origin === allowed || parsed.href.startsWith(allowed),
    );
  } catch {
    return false;
  }
}
