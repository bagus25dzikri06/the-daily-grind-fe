import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5001', // Change this if your backend/image source runs on a different port (e.g., 1337, 8000)
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
