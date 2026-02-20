import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep Turbopack rooted to this project folder (helps in monorepo/workspace setups).
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
