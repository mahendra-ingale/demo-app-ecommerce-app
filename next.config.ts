import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    loader: "custom",
    // Point to our custom loader file (see lib/cloudinaryLoader.ts)
    loaderFile: "./lib/cloudinaryLoader.ts",
    remotePatterns: [
      // DummyJSON image hosts used by the example data
      { protocol: "https", hostname: "dummyjson.com" },
      { protocol: "https", hostname: "i.dummyjson.com" },
      { protocol: "https", hostname: "cdn.dummyjson.com" },
      // Cloudinary - restrict to the configured cloud name and image upload path
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        // Allow any Cloudinary image subpath (upload/fetch/etc.) for the configured cloud name
        pathname: `dqxtvd7ab`,
      },
    ],
  },
};

export default nextConfig;
