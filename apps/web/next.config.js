const { createContentlayerPlugin } = require('next-contentlayer2')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  transpilePackages: ['@shaddy/use-typed-hooks'],
}

const withContentlayer = createContentlayerPlugin({})

const withNextIntl = require('next-intl/plugin')('./src/i18n')

module.exports = withNextIntl(withContentlayer(nextConfig))
