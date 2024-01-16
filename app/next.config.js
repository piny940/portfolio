/** @type {import('next').NextConfig} */

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: './.env.development' })
}
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig
