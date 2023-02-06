/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
const prod = process.env.NODE_ENV === 'production'

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: prod ? false : true,
})

module.exports = withPWA({
  pwa: {
    register: true,
    disable: process.env.NODE_ENV === 'development',
    skipWaiting: true,
  },
})
