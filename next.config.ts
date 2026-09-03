import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder visuals are rendered as CSS (no remote images to optimize).
    // Keeping optimization off avoids paying its build-time cost entirely
    // once real assets are uploaded, unless they're re-enabled deliberately.
    unoptimized: true,
  },
};

export default nextConfig;
