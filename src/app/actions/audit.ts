"use server";

import { prisma } from "@/lib/prisma";

type AuditResult = {
  url: string;
  score: number;
  checks: {
    category: string;
    label: string;
    passed: boolean;
    value: string;
    recommendation: string;
  }[];
};

export async function runAudit(formData: FormData): Promise<AuditResult & { success: boolean; message?: string }> {
  const url = (formData.get("url") as string || "").trim();
  const email = (formData.get("email") as string || "").trim();

  if (!url) return { success: false, message: "Please enter a URL.", url: "", score: 0, checks: [] };

  let normalizedUrl = url;
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    normalizedUrl = "https://" + url;
  }

  let html = "";
  let headers: Record<string, string> = {};
  let status = 0;

  try {
    const res = await fetch(normalizedUrl, {
      signal: AbortSignal.timeout(10000),
      headers: { "User-Agent": "GrowthPilotAudit/1.0" },
    });
    html = await res.text();
    status = res.status;
    res.headers.forEach((v, k) => { headers[k.toLowerCase()] = v; });
  } catch {
    return {
      success: false,
      message: "Could not reach that URL. Please check it and try again.",
      url: normalizedUrl,
      score: 0,
      checks: [],
    };
  }

  const checks: AuditResult["checks"] = [];

  // --- Basic SEO ---
  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : "";
  checks.push({
    category: "Basic SEO",
    label: "Page Title",
    passed: title.length >= 10 && title.length <= 70,
    value: title || "Missing",
    recommendation: title.length < 10
      ? "Your title is too short. Use 10–70 characters with your primary keyword."
      : title.length > 70
      ? "Your title is too long. Keep it under 70 characters for optimal display."
      : "Good title length.",
  });

  const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i);
  const description = descMatch ? descMatch[1].trim() : "";
  checks.push({
    category: "Basic SEO",
    label: "Meta Description",
    passed: description.length >= 50 && description.length <= 160,
    value: description.slice(0, 120) || "Missing",
    recommendation: !description
      ? "Add a meta description (50–160 characters) to improve click-through rates."
      : description.length < 50
      ? "Your meta description is too short."
      : description.length > 160
      ? "Your meta description is too long."
      : "Good meta description.",
  });

  // --- Headings ---
  const h1s = html.match(/<h1[^>]*>([^<]*)<\/h1>/gi);
  const h1Count = h1s?.length || 0;
  checks.push({
    category: "Content Structure",
    label: "H1 Headings",
    passed: h1Count === 1,
    value: `${h1Count} H1 tag${h1Count !== 1 ? "s" : ""}`,
    recommendation: h1Count === 0
      ? "Every page needs exactly one H1 heading for SEO."
      : h1Count > 1
      ? "You have multiple H1 tags. Use only one per page."
      : "Perfect — exactly one H1.",
  });

  const h2s = html.match(/<h2[^>]*>/gi);
  checks.push({
    category: "Content Structure",
    label: "H2 Subheadings",
    passed: (h2s?.length || 0) >= 2,
    value: `${h2s?.length || 0} H2 tag${(h2s?.length || 0) !== 1 ? "s" : ""}`,
    recommendation: !h2s?.length
      ? "Add H2 subheadings to structure your content and improve readability."
      : "Good use of subheadings.",
  });

  // --- Images ---
  const imgs = html.match(/<img[^>]+>/gi);
  const imgsWithoutAlt = html.match(/<img(?![^>]*\balt=)[^>]+>/gi);
  checks.push({
    category: "Content Structure",
    label: "Image Alt Text",
    passed: !imgsWithoutAlt?.length,
    value: `${imgsWithoutAlt?.length || 0} of ${imgs?.length || 0} images missing alt text`,
    recommendation: imgsWithoutAlt?.length
      ? `Add alt text to ${imgsWithoutAlt?.length} image(s) for accessibility and SEO.`
      : "All images have alt text.",
  });

  // --- Performance ---
  const hasViewport = html.includes('name="viewport"');
  checks.push({
    category: "Performance",
    label: "Viewport Meta Tag",
    passed: hasViewport,
    value: hasViewport ? "Present" : "Missing",
    recommendation: hasViewport
      ? "Good — viewport tag ensures proper mobile rendering."
      : "Add a viewport meta tag for mobile responsiveness.",
  });

  const hasGzip = headers["content-encoding"]?.includes("gzip") || headers["content-encoding"]?.includes("br");
  checks.push({
    category: "Performance",
    label: "Compression",
    passed: !!hasGzip,
    value: hasGzip ? `${headers["content-encoding"]} enabled` : "No compression detected",
    recommendation: hasGzip
      ? "Good — compression is enabled."
      : "Enable Gzip or Brotli compression to reduce page load times.",
  });

  // --- Core Web Vitals hints ---
  const clsMatch = html.match(/CLS[:\s]*([0-9.]+)/i);
  const lcpMatch = html.match(/LCP[:\s]*([0-9.]+)/i);
  const fidMatch = html.match(/(FID|INP)[:\s]*([0-9.]+)/i);
  checks.push({
    category: "Performance",
    label: "Core Web Vitals",
    passed: !!(clsMatch || lcpMatch || fidMatch),
    value: clsMatch || lcpMatch || fidMatch
      ? "Monitoring detected"
      : "Not found in source",
    recommendation: !(clsMatch || lcpMatch || fidMatch)
      ? "Consider adding RUM monitoring (e.g., web-vitals library) to track Core Web Vitals."
      : "Good — Core Web Vitals monitoring is present.",
  });

  // --- GEO / AI Search Readiness ---
  const hasSchema = html.includes('application/ld+json');
  checks.push({
    category: "GEO Readiness",
    label: "Structured Data (JSON-LD)",
    passed: hasSchema,
    value: hasSchema ? "Found" : "Not found",
    recommendation: hasSchema
      ? "Great — structured data helps AI search engines understand your content."
      : "Add JSON-LD structured data (e.g., Organization, FAQ, Article schema) for better AI search visibility.",
  });

  const hasOpenGraph = html.includes('og:title') || html.includes('og:description') || html.includes('og:image');
  checks.push({
    category: "GEO Readiness",
    label: "Open Graph Tags",
    passed: hasOpenGraph,
    value: hasOpenGraph ? "Found" : "Not found",
    recommendation: hasOpenGraph
      ? "Open Graph tags improve how your page appears on social media and AI platforms."
      : "Add Open Graph tags for better visibility on social media and AI-generated snippets.",
  });

  const hasTwitterCard = html.includes('twitter:card') || html.includes('twitter:title');
  checks.push({
    category: "GEO Readiness",
    label: "Twitter Card Tags",
    passed: hasTwitterCard,
    value: hasTwitterCard ? "Found" : "Not found",
    recommendation: hasTwitterCard
      ? "Twitter Cards help with social sharing."
      : "Add Twitter Card meta tags for better link previews.",
  });

  const hasCanonical = html.includes('rel="canonical"') || html.includes("rel='canonical'");
  checks.push({
    category: "GEO Readiness",
    label: "Canonical URL",
    passed: hasCanonical,
    value: hasCanonical ? "Found" : "Not found",
    recommendation: hasCanonical
      ? "Canonical tags prevent duplicate content issues."
      : "Add a canonical URL tag to prevent duplicate content issues.",
  });

  const hasFaqSchema = html.includes('"@type":"FAQ"') || html.includes('"@type": "FAQ"');
  checks.push({
    category: "GEO Readiness",
    label: "FAQ Schema",
    passed: hasFaqSchema,
    value: hasFaqSchema ? "Found" : "Not found",
    recommendation: hasFaqSchema
      ? "FAQ schema helps your content appear in AI-generated answers."
      : "Add FAQ structured data — pages with FAQ schema rank better in AI search results.",
  });

  // --- Mobile ---
  checks.push({
    category: "Mobile",
    label: "HTTP Status",
    passed: status >= 200 && status < 400,
    value: `${status}`,
    recommendation: status >= 200 && status < 400
      ? "Page is accessible."
      : `Page returned status ${status}. Fix this for proper indexing.`,
  });

  // --- Calculate score ---
  const passedChecks = checks.filter((c) => c.passed).length;
  const score = Math.round((passedChecks / checks.length) * 100);

  // Save lead if email provided
  if (email) {
    try {
      await prisma.subscriber.upsert({
        where: { email },
        update: {},
        create: { email, source: "audit-tool" },
      });
    } catch {
      // ignore duplicate or db errors
    }
  }

  return { success: true, url: normalizedUrl, score, checks };
}
