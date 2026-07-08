import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tree-shake barrel imports. framer-motion is pulled into ~all templates
  // (dozens of `import { motion } from 'framer-motion'`); this trims each
  // template chunk to only the motion features it actually uses.
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },

  // Note: gallery/cover photos use next/image with a custom Cloudinary loader
  // (see src/components/Photo.tsx + src/lib/cloudinaryLoader.ts), so bytes are
  // resized/format-negotiated at Cloudinary's edge and never proxied through
  // the Next server. That's why no `images.remotePatterns` is needed here.

  // Drop console.* from production bundles (keep warn/error for diagnostics).
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },
};

export default nextConfig;
