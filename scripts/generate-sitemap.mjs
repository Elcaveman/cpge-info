import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const rawSiteUrl = (process.env.SITE_URL || "").trim();
const siteUrl = (rawSiteUrl || "https://odextech.uk").replace(/\/$/, "");

if (!rawSiteUrl) {
  console.warn("[seo] SITE_URL is not set. Falling back to https://odextech.uk. Set SITE_URL before building for production SEO.");
}

const routes = [
  "/",
  "/prepa-info/",
  "/prepa-info/resources",
  "/prepa-info/stats",
  "/prepa-info/sql",
  "/prepa-info/python",
  "/prepa-info/cnc",
  "/prepa-info/concours",
  "/prepa-info/sujet-editor",
  "/prepa-info/contact",
];

const now = new Date().toISOString();

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
  .map((route) => `  <url>\n    <loc>${siteUrl}${route}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${route === "/" ? "1.0" : "0.8"}</priority>\n  </url>`)
  .join("\n")}\n</urlset>\n`;

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;

const publicDir = resolve("public");
mkdirSync(publicDir, { recursive: true });

writeFileSync(resolve(publicDir, "sitemap.xml"), sitemap, "utf8");
writeFileSync(resolve(publicDir, "robots.txt"), robots, "utf8");

console.log("[seo] Generated public/sitemap.xml and public/robots.txt");
