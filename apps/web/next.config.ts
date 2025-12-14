import { NextConfig } from 'next'
import path from 'path'
import { config } from 'dotenv'

const projectRoot = path.resolve(__dirname, '../../')
config({ path: path.join(projectRoot, '.env.local') })
config({ path: path.join(projectRoot, '.env') })

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
