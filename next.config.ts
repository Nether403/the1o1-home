import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    /* M5: @dimforge/rapier2d ships real .wasm assets (no base64 inflation
       like the -compat build) — enable async WebAssembly for the lazy
       physics chunk. */
    config.experiments = { ...config.experiments, asyncWebAssembly: true };
    if (!isServer) config.target = ["web", "es2020"];
    return config;
  },
};

export default nextConfig;
