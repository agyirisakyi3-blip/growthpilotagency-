const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const { marked } = require("marked");

const mdPath = path.resolve("src/data/marketing-playbook.md");
const htmlPath = path.resolve("src/data/marketing-playbook.html");

const md = fs.readFileSync(mdPath, "utf-8");
const body = marked.parse(md, { breaks: false });

const fullHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; max-width: 780px; margin: 0 auto; padding: 40px 20px; color: #1a1a2e; line-height: 1.6; font-size: 14px; }
    h1 { font-size: 26px; border-bottom: 3px solid #f97316; padding-bottom: 6px; margin: 10px 0 20px; }
    h2 { font-size: 20px; margin: 28px 0 12px; color: #f97316; }
    h3 { font-size: 16px; margin: 20px 0 8px; }
    blockquote { background: #f6f8fa; border-left: 4px solid #f97316; padding: 10px 14px; margin: 12px 0; border-radius: 4px; }
    blockquote p { margin: 2px 0; }
    ul, ol { padding-left: 22px; }
    li { margin-bottom: 3px; }
    hr { border: none; border-top: 1px solid #d0d7de; margin: 28px 0; }
    table { width: 100%; border-collapse: collapse; margin: 14px 0; font-size: 13px; }
    th, td { border: 1px solid #d0d7de; padding: 6px 10px; text-align: left; }
    th { background: #f6f8fa; font-weight: 600; }
    strong { color: #111; }
    .header { text-align: center; margin-bottom: 28px; }
    .header h1 { border: none; margin-bottom: 2px; font-size: 28px; color: #f97316; }
    .header p { color: #57606a; font-size: 13px; margin: 0; }
    p { margin: 8px 0; }
  </style>
</head>
<body>
  <div class="header">
    <h1>GrowthPilot Agency</h1>
    <p>Marketing Playbook &mdash; June 2026</p>
  </div>
  ${body}
</body>
</html>`;

fs.writeFileSync(htmlPath, fullHtml, "utf-8");

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const pdfPath = path.resolve("src/data/marketing-playbook.pdf");

const cmd = `"${chromePath}" --headless=new --disable-gpu --print-to-pdf="${pdfPath}" --no-margins --virtual-time-budget=10000 "file:///${htmlPath.replace(/\\/g, "/")}"`;

console.log("Generating PDF...");
execSync(cmd, { timeout: 20000, shell: true });
console.log("PDF saved to", pdfPath);

fs.unlinkSync(htmlPath);
