/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Compiler ───────────────────────────────────────────────────────────────
  swcMinify:           true,  // faster + smaller bundles
  reactStrictMode:     true,
  poweredByHeader:     false, // remove X-Powered-By header

  // ── Images ─────────────────────────────────────────────────────────────────
  images: {
    formats:        ["image/avif", "image/webp"],
    deviceSizes:    [640, 750, 828, 1080, 1200],
    imageSizes:     [16, 32, 48, 64, 96],
    minimumCacheTTL: 2592000, // 30 days
  },

  // ── Headers — caching + security ───────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/logo.svg",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/(.*\\.png|.*\\.jpg|.*\\.ico|.*\\.svg|.*\\.woff2)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/_next/static/(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options",    value: "nosniff"      },
          { key: "X-Frame-Options",            value: "DENY"         },
          { key: "Referrer-Policy",            value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",         value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },

  // ── Webpack bundle optimisation ────────────────────────────────────────────
  webpack(config, { dev, isServer }) {
    // Tree-shake lodash (if used transitively)
    config.resolve.alias = {
      ...config.resolve.alias,
      lodash: "lodash-es",
    };

    if (!dev && !isServer) {
      // Split recharts into its own chunk — heavy, rarely changes
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks?.cacheGroups,
          recharts: {
            name:     "recharts",
            test:     /[\\/]node_modules[\\/](recharts|d3-.+|victory-.+)[\\/]/,
            chunks:   "all",
            priority: 30,
          },
          supabase: {
            name:     "supabase",
            test:     /[\\/]node_modules[\\/](@supabase)[\\/]/,
            chunks:   "all",
            priority: 20,
          },
        },
      };
    }
    return config;
  },

  // ── Experimental ──────────────────────────────────────────────────────────
  experimental: {
    // optimizeCss removed — requires 'critters' package, breaks Vercel build
    optimizePackageImports: [
      "lucide-react",
      "recharts",
      "@tanstack/react-query",
    ],
  },
};

export default nextConfig;
