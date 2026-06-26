export type EmailTemplate = {
  previewText: string;
  badge?: string;
  title: string;
  fields: { label: string; value: string }[];
  footer?: string;
};

const brand = {
  name: "GrowthPilot Agency",
  primary: "#d97706",
  primaryLight: "#fef3c7",
  bg: "#fafaf9",
  card: "#ffffff",
  text: "#1c1917",
  muted: "#78716c",
  border: "#e7e5e4",
};

export function buildEmailHtml(tpl: EmailTemplate): string {
  const fieldRows = tpl.fields
    .map(
      (f) => `
        <tr>
          <td style="padding: 6px 0; color: ${brand.muted}; font-size: 13px; width: 120px; vertical-align: top; white-space: nowrap;">${f.label}</td>
          <td style="padding: 6px 0; color: ${brand.text}; font-size: 14px; word-break: break-word;">${f.value}</td>
        </tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${tpl.title}</title>
  </head>
  <body style="margin:0;padding:0;background:${brand.bg};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${brand.bg};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:${brand.card};border-radius:12px;border:1px solid ${brand.border};overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.04);">

            <!-- Header -->
            <tr>
              <td style="background:${brand.primary};padding:28px 32px 22px;text-align:center;">
                <h1 style="margin:0;color:#fff;font-size:20px;font-weight:700;letter-spacing:-0.3px;">
                  &#9650; GrowthPilot Agency
                </h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:32px;">

                ${tpl.badge ? `<span style="display:inline-block;padding:3px 10px;border-radius:999px;background:${brand.primaryLight};color:${brand.primary};font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:12px;">${tpl.badge}</span>` : ""}

                <h2 style="margin:0 0 6px;font-size:18px;font-weight:600;color:${brand.text};">${tpl.title}</h2>

                <p style="margin:0 0 20px;color:${brand.muted};font-size:14px;">${tpl.previewText}</p>

                <div style="border-top:1px solid ${brand.border};margin-bottom:16px;"></div>

                <table role="presentation" cellpadding="0" cellspacing="0">
                  ${fieldRows}
                </table>

                ${tpl.footer ? `<p style="margin-top:20px;padding-top:16px;border-top:1px solid ${brand.border};color:${brand.muted};font-size:13px;">${tpl.footer}</p>` : ""}
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:${brand.bg};padding:20px 32px;text-align:center;border-top:1px solid ${brand.border};">
                <p style="margin:0;color:${brand.muted};font-size:12px;">
                  GrowthPilot Agency &mdash; Abidjan, C&ocirc;te d&rsquo;Ivoire
                </p>
                <p style="margin:4px 0 0;color:${brand.muted};font-size:12px;">
                  <a href="https://growthpilotagency.com" style="color:${brand.primary};text-decoration:none;">growthpilotagency.com</a>
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
