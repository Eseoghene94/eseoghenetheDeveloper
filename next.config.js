/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Lets a verification build run alongside `next dev` without sharing .next.
  distDir: process.env.NEXT_DIST_DIR || '.next',
  poweredByHeader: false,
  experimental: {
    // Lets the old capitalised URLs (/About, /Projects) redirect to the new
    // lower-case ones without matching themselves.
    caseSensitiveRoutes: true,
  },
  async redirects() {
    return [
      { source: '/About', destination: '/about', permanent: true },
      { source: '/Projects', destination: '/projects', permanent: true },
      { source: '/Articles', destination: '/', permanent: false },
      { source: '/articles', destination: '/', permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
