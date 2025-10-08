/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Comentado para permitir API routes
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  productionBrowserSourceMaps: true, // Enable source maps for production

  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Remove console logs in production
    reactRemoveProperties: process.env.NODE_ENV === 'production', // Remove React properties in production
    emotion: false,
    styledComponents: false,
  },

  // Modern JavaScript output
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'], // Tree-shake these packages
  },

  // CSS optimization
  swcMinify: true, // Enable SWC minification for faster builds

  // Cache headers for bfcache compatibility
  async headers() {
    return [
      {
        // Cache static assets aggressively
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache images
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // HTML pages - enable bfcache with short cache
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
