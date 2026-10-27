import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  trailingSlash: false,
  images: {
    qualities: [70, 75]
  },
  turbopack: {
    root: process.cwd()
  }
};

export default nextConfig;
