import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'minio.nutech-integrasi.com'
      }
    ]
  }
};

export default nextConfig;
