"use strict";

/** @type {import('next').NextConfig} */
var nextConfig = {
  reactStrictMode: true
};
module.exports = nextConfig;
var prod = process.env.NODE_ENV === 'production';

var withPWA = require('next-pwa')({
  dest: 'public',
  disable: prod ? false : true
});

module.exports = withPWA({
  pwa: {
    register: true,
    disable: process.env.NODE_ENV === 'development',
    skipWaiting: true
  }
});