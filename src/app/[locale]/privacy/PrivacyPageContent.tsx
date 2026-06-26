"use client";

import { useTranslations } from "next-intl";

export function PrivacyPageContent() {
  const t = useTranslations("privacy");
  const sections = t.raw("sections") as {
    heading: string;
    content: string;
    items?: string[];
  }[];

  return (
    <div className="min-h-screen pt-24 sm:pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-8">{t("title")}</h1>
        <p className="text-sm text-muted-foreground mb-12">{t("lastUpdated")}</p>

        <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none space-y-8">
          {sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-xl font-semibold mb-3">{section.heading}</h2>
              <p className="text-muted-foreground leading-relaxed">{section.content}</p>
              {section.items && (
                <ul className="list-disc pl-6 text-muted-foreground leading-relaxed space-y-2 mt-3">
                  {section.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
