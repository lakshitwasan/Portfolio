import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a minimal standalone server for the Docker image.
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  // Lint is run explicitly via `npm run lint`; don't fail production builds on it.
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
