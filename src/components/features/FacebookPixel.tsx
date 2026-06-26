"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: unknown[][];
  }
}

function loadPixel() {
  if (!PIXEL_ID || typeof window === "undefined") return;
  if (document.querySelector(`script[data-pixel-id="${PIXEL_ID}"]`)) return;

  const script = document.createElement("script");
  script.async = true;
  script.dataset.pixelId = PIXEL_ID;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";

  const first = document.getElementsByTagName("script")[0];
  first?.parentNode?.insertBefore(script, first);

  window.fbq = window.fbq || function (...args: unknown[]) {
    (window._fbq = window._fbq || []).push(args);
  };

  window.fbq("init", PIXEL_ID);
  window.fbq("track", "PageView");
}

export function FacebookPixel() {
  const pathname = usePathname();

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (consent !== "accepted") return;
    loadPixel();
  }, []);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (consent !== "accepted" || !PIXEL_ID || typeof window.fbq !== "function") return;
    window.fbq("track", "PageView");
  }, [pathname]);

  return null;
}
