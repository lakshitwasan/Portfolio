import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: siteUrl, lastModified: now, priority: 1 },
    { url: `${siteUrl}/ai`, lastModified: now, priority: 0.9 },
    { url: `${siteUrl}/backend`, lastModified: now, priority: 0.9 },
  ];
}
