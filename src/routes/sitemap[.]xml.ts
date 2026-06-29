import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://beelovefarm.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/about", changefreq: "monthly", priority: "0.8" },
          { path: "/shop", changefreq: "weekly", priority: "0.9" },
          { path: "/shop/beekeeping", changefreq: "weekly", priority: "0.9" },
          { path: "/shop/fish", changefreq: "weekly", priority: "0.9" },
          { path: "/training/beekeeping", changefreq: "monthly", priority: "0.7" },
          { path: "/training/fish", changefreq: "monthly", priority: "0.7" },
          { path: "/map", changefreq: "monthly", priority: "0.6" },
          { path: "/hive-sensors", changefreq: "monthly", priority: "0.6" },
          { path: "/journal", changefreq: "weekly", priority: "0.6" },
          { path: "/contact", changefreq: "monthly", priority: "0.7" },
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
