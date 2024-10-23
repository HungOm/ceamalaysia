// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     output: 'export',
//     images: {
//       unoptimized: true,
//     },
//     basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
//     // Add this new configuration
//     webpack: (config, { isServer }) => {
//       if (!isServer) {
//         config.resolve.fallback = {
//           ...config.resolve.fallback,
//           punycode: false,
//         };
//       }
//       return config;
//     },
// }
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // No need for basePath when using custom domain
  trailingSlash: true,
}

export default nextConfig;
