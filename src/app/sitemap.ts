import type { MetadataRoute } from "next";
import { site, navLinks } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [...navLinks.map((l) => l.href), "/booking"];
  const unique = Array.from(new Set(routes));
  return unique.map((href) => ({
    url: `${site.domain}${href === "/" ? "" : href}`,
    lastModified: new Date(),
    changeFrequency: href === "/" ? "weekly" : "monthly",
    priority: href === "/" ? 1 : 0.7,
  }));
}
