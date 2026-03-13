import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/heap-of-foods-the-recipe-book",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
