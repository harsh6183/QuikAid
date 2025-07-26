import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["yourdomain.com"],
  },
};
export default nextConfig;
