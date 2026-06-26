"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function LocaleNotFound() {
  const params = useParams();
  const locale = params.locale as string;
  const t = useTranslations("common");

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-3">{t("notFound")}</h2>
        <p className="text-muted-foreground mb-8">{t("notFoundDescription")}</p>
        <Link
          href={`/${locale}`}
          className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
        >
          {t("backToHome")}
        </Link>
      </div>
    </div>
  );
}
