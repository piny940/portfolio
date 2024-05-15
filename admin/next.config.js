/** @type {import('next').NextConfig} */

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: './.env.development' })
}
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.BACKEND_HOST}/v1/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
