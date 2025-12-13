import { NextConfig } from 'next'
import { loadEnvConfig } from '@next/env'
import path from 'path'

const projectRoot = path.resolve(__dirname, '../../')
loadEnvConfig(projectRoot)

const nextConfig: NextConfig = {
  reactStrictMode: true,
  basePath: '',
  experimental: {
    authInterrupts: true,
  },
  images: {
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'static-cdn.jtvnw.net',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
