"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!GA_ID) return;
    const consent = localStorage.getItem("cookie-consent");
    if (consent !== "accepted") return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function (...args: unknown[]) { window.dataLayer.push(args); };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID, { page_path: pathname, send_page_view: false });
    window.gtag("event", "page_view", { page_path: pathname });
  }, [pathname]);

  if (!GA_ID) return null;

  return (
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      strategy="afterInteractive"
      id="ga-gtag"
    />
  );
}
