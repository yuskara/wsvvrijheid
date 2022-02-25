const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/tr/hakkimizda',
        destination: '/tr/over-ons',
        locale: false,
      },
      {
        source: '/en/about-us',
        destination: '/en/over-ons',
        locale: false,
      },
      {
        source: '/tr/aktiviteler',
        destination: '/tr/aktiviteler',
        locale: false,
      },
      {
        source: '/en/activities',
        destination: '/en/activities',
        locale: false,
      },
      {
        source: '/tr/kulup',
        destination: '/tr/club',
        locale: false,
      },
      {
        source: '/tr/gizlilik',
        destination: '/tr/privacy',
        locale: false,
      },
      {
        source: '/tr/kullanim-sartlari',
        destination: '/tr/voorwaarden',
        locale: false,
      },
      {
        source: '/en/terms',
        destination: '/en/voorwaarden',
        locale: false,
      },
      {
        source: '/tr/iletisim',
        destination: '/tr/contact',
        locale: false,
      },
      {
        source: '/en/contact',
        destination: '/en/contact',
        locale: false,
      },
    ]
  },
}

module.exports = nextConfig
