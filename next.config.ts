import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    /* M5: @dimforge/rapier2d ships real .wasm assets (no base64 inflation
       like the -compat build) — enable async WebAssembly for the lazy
       physics chunk. */
    config.experiments = { ...config.experiments, asyncWebAssembly: true };
    return config;
  },
};

export default nextConfig;
