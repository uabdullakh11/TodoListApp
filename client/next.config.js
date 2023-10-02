/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // path: 'http://localhost:5000',
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        // pathname: '/account123/**',
      },
    ],
  },
}

module.exports = nextConfig
