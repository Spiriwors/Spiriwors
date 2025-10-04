/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Comentado para permitir API routes
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  productionBrowserSourceMaps: true, // Enable source maps for production
};

module.exports = nextConfig;
