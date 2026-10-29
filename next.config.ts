import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  trailingSlash: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75]
  },
  turbopack: {
    root: process.cwd()
  }
};

export default nextConfig;
