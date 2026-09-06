import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  trailingSlash: false,
  turbopack: {
    root: process.cwd()
  }
};

export default nextConfig;
