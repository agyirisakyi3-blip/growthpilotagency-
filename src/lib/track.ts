const PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

export function fbTrack(event: string, data?: Record<string, unknown>) {
  if (!PIXEL_ID || typeof window.fbq !== "function") return;
  window.fbq("track", event, data);
}

export function fbTrackCustom(event: string, data?: Record<string, unknown>) {
  if (!PIXEL_ID || typeof window.fbq !== "function") return;
  window.fbq("trackCustom", event, data);
}
