/** @type {import('next').NextConfig} */
const nextConfig = {
  // Three.js ESM compatibility
  transpilePackages: ['three'],
  async rewrites() {
    const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:5001';
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
      {
        source: '/uploads/:path*',
        destination: `${backendUrl}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
