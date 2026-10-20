import type { MetadataRoute } from "next";
import { seo, featuredPortfolio, artists } from "@/lib/content";
import { slugify } from "@/lib/utils";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? seo.siteUrl ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/portfolio`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/artists`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/studio`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/reviews`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/aftercare`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/book`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/booking-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const portfolioRoutes: MetadataRoute.Sitemap = featuredPortfolio.map((item) => ({
    url: `${baseUrl}/portfolio/${item.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const artistRoutes: MetadataRoute.Sitemap = artists.map((artist) => ({
    url: `${baseUrl}/artists/${slugify(artist.name)}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...portfolioRoutes, ...artistRoutes];
}
