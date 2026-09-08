import type { MetadataRoute } from "next";
import { articleUrl, blogPosts } from "@/lib/blog-posts";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-07");
  const routes = [
    { path: "/", priority: 1 },
    { path: "/shop", priority: 0.8 },
    { path: "/why-makhana", priority: 0.7 },
    { path: "/our-story", priority: 0.6 },
    { path: "/makhana-classic-roasted", priority: 0.8 },
    { path: "/office-snacks", priority: 0.7 },
    { path: "/student-snacks", priority: 0.7 },
    { path: "/delhi", priority: 0.6 },
    { path: "/blog", priority: 0.7 },
    { path: "/privacy-policy", priority: 0.3 }
  ];
  const articleRoutes = blogPosts.map((article) => ({
    path: articleUrl(article.slug),
    priority: 0.7
  }));

  return [...routes, ...articleRoutes].map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: "weekly",
    priority: route.priority
  }));
}
