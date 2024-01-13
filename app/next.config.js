/** @type {import('next').NextConfig} */

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: './.env.development' })
}
console.log('BACKEND_HOST: ', process.env.BACKEND_HOST)
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.BACKEND_HOST}/api/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
