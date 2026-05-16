/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'store.storeimages.cdn-apple.com',
      },
    ],
  },
  allowedDevOrigins: ['192.168.1.117'],
  turbopack: {
    root: process.cwd(),
  },
}

export default nextConfig
