/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    unoptimized: true, // Required for Cloudflare Pages static export
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }
    return config
  },
  // Improve chunk loading
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  // Cloudflare Pages compatibility
  output: 'export',
  trailingSlash: false,
  distDir: 'out',
}

module.exports = nextConfig
