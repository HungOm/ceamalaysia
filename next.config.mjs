/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  webpack: (config, { isServer }) => {
    // Force punycode to be ignored
    config.resolve.alias.punycode = false;

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        punycode: false,
      };
    }
    return config;
  },
  // Optimization options
  swcMinify: true,
  reactStrictMode: true,
  poweredByHeader: false,
}

export default nextConfig;
