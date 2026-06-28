"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Code, Copy, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const defaultValues = {
  businessName: "GrowthPilot Agency",
  siteUrl: "https://growthpilotagency.com",
  tagline: "Expert SEO & GEO services to grow your business",
  description: "GrowthPilot Agency helps businesses dominate search and AI-generated answers with data-driven SEO, GEO, and AI automation strategies.",
  locale: "en_US",
  twitterHandle: "@growthpilot",
  logoUrl: "https://growthpilotagency.com/og.png",
};

export default function GeoMetaGeneratorPage() {
  const [form, setForm] = useState(defaultValues);
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLPreElement>(null);

  function generateMetaTags() {
    const { businessName, siteUrl, tagline, description, locale, twitterHandle, logoUrl } = form;
    return `<!-- Primary Meta Tags -->
<title>${businessName} — ${tagline}</title>
<meta name="title" content="${businessName} — ${tagline}" />
<meta name="description" content="${description}" />
<meta name="keywords" content="SEO, GEO services, digital marketing, AI automation, search optimization" />
<link rel="canonical" href="${siteUrl}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${siteUrl}" />
<meta property="og:title" content="${businessName} — ${tagline}" />
<meta property="og:description" content="${description}" />
<meta property="og:image" content="${logoUrl}" />
<meta property="og:locale" content="${locale}" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="${siteUrl}" />
<meta property="twitter:title" content="${businessName} — ${tagline}" />
<meta property="twitter:description" content="${description}" />
<meta property="twitter:image" content="${logoUrl}" />
${twitterHandle ? `<meta property="twitter:site" content="${twitterHandle}" />` : ""}

<!-- GEO / AI Search Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "${businessName}",
  "url": "${siteUrl}",
  "description": "${description}",
  "logo": "${logoUrl}",
  "sameAs": [
    "${siteUrl}"
  ]
}
</script>

<!-- WebSite Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "${businessName}",
  "url": "${siteUrl}",
  "description": "${description}"
}
</script>`;
  }

  async function handleCopy() {
    const code = generateMetaTags();
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="min-h-screen pt-24 sm:pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-background/50 text-sm text-muted-foreground mb-4">
            <Sparkles size={12} className="text-primary" />
            Free Tool
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            GEO Meta Tag{" "}
            <span className="gradient-text">Generator</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Generate optimized meta tags, Open Graph, Twitter Cards, and JSON-LD structured data — ready for AI search engines like ChatGPT, Perplexity, and Gemini.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-6 border-border/50">
            <h2 className="font-semibold mb-4">Your Business Info</h2>
            <div className="space-y-4">
              {[
                { label: "Business Name", key: "businessName" as const, placeholder: "My Business" },
                { label: "Website URL", key: "siteUrl" as const, placeholder: "https://example.com" },
                { label: "Tagline", key: "tagline" as const, placeholder: "Best services in town" },
                { label: "Description (120–160 chars)", key: "description" as const, placeholder: "Description..." },
                { label: "Locale", key: "locale" as const, placeholder: "en_US" },
                { label: "Twitter Handle", key: "twitterHandle" as const, placeholder: "@handle" },
                { label: "Logo URL", key: "logoUrl" as const, placeholder: "https://example.com/logo.png" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">{field.label}</label>
                  <Input
                    value={form[field.key]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 border-border/50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Generated Code</h2>
              <Button variant="outline" size="sm" className="gap-1.5 text-xs" onClick={handleCopy}>
                {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                {copied ? "Copied!" : "Copy All"}
              </Button>
            </div>
            <pre
              ref={codeRef}
              className="bg-muted rounded-lg p-4 text-xs leading-relaxed overflow-x-auto max-h-[500px] overflow-y-auto font-mono"
            >
              <code>{generateMetaTags()}</code>
            </pre>
          </Card>
        </div>

        <div className="mt-12 grid sm:grid-cols-3 gap-6">
          {[
            {
              title: "AI Search Ready",
              desc: "Optimized for ChatGPT, Perplexity, Google AI Overviews, and Gemini.",
            },
            {
              title: "Schema Included",
              desc: "Auto-generates Organization and WebSite JSON-LD structured data.",
            },
            {
              title: "Copy & Paste",
              desc: "No signup required. Just enter your info and copy the code.",
            },
          ].map((item) => (
            <Card key={item.title} className="p-5 text-center border-border/50">
              <Badge variant="secondary" className="mb-2">{item.title}</Badge>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
