/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

const withPWA = require('next-pwa')({
  dest: 'public',
})
module.exports = withPWA({
  pwa: {
    register: true,
    disable: process.env.NODE_ENV === 'development',
    skipWaiting: true,
  },
})
