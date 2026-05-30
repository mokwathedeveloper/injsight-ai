/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Compiler ───────────────────────────────────────────────────────────────
  swcMinify:           true,
  reactStrictMode:     true,
  poweredByHeader:     false,
  eslint:     { ignoreDuringBuilds: true },   // TypeScript catches real errors
  typescript: { ignoreBuildErrors: false },

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
    // NOTE: Do NOT alias lodash → lodash-es. Recharts uses lodash/isEqual
    // (CommonJS) internally and the alias breaks Vercel builds.
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks?.cacheGroups,
          recharts: {
            name:     "recharts",
            test:     /[\\/]node_modules[\\/](recharts|d3-.+)[\\/]/,
            chunks:   "all",
            priority: 30,
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
