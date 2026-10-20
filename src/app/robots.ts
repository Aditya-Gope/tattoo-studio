import type { MetadataRoute } from "next";
import { seo } from "@/lib/content";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? seo.siteUrl ?? "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
