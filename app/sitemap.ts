import type { MetadataRoute } from "next";
import { articleUrl, blogPosts } from "@/lib/blog-posts";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1, lastModified: "2026-09-07" },
    { path: "/shop", priority: 0.8, lastModified: "2026-09-07" },
    { path: "/flavours", priority: 0.8, lastModified: "2026-10-28" },
    { path: "/why-makhana", priority: 0.7, lastModified: "2026-09-07" },
    { path: "/our-story", priority: 0.6, lastModified: "2026-09-07" },
    { path: "/makhana-classic-roasted", priority: 0.8, lastModified: "2026-09-08" },
    { path: "/office-snacks", priority: 0.7, lastModified: "2026-09-07" },
    { path: "/student-snacks", priority: 0.7, lastModified: "2026-09-07" },
    { path: "/delhi", priority: 0.6, lastModified: "2026-09-07" },
    { path: "/blog", priority: 0.7, lastModified: "2026-10-29" },
    { path: "/privacy-policy", priority: 0.3, lastModified: "2026-10-27" }
  ];
  const articleRoutes = blogPosts.map((article) => ({
    path: articleUrl(article.slug),
    priority: 0.7,
    lastModified: article.lastModified
  }));

  return [...routes, ...articleRoutes].map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: route.lastModified,
    changeFrequency: "weekly",
    priority: route.priority
  }));
}
