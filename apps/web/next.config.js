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
      {
        protocol: 'https',
        hostname: 'api.producthunt.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/r',
        destination: '/r/index.json',
        permanent: true,
      },
      {
        source: '/r/:name((?!index\\.json|styles/).*)',
        destination: '/r/styles/default/:name.json',
        permanent: true,
        missing: [
          {
            type: 'query',
            key: '_redirected',
            value: undefined,
          },
        ],
      },
    ]
  },
  transpilePackages: ['@shaddy/use-typed-hooks'],
}

const withContentlayer = createContentlayerPlugin({})

const withNextIntl = require('next-intl/plugin')('./src/i18n')

module.exports = withNextIntl(withContentlayer(nextConfig))
