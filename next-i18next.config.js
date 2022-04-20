const path = require('path')

const { isDev } = require('./src/config/node')

/** @type {import('next-i18next').UserConfig} */
const nextConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru', 'ua'],
  },
  reloadOnPrerender: !isDev,
  localePath: path.resolve('./public/locales'),
}

module.exports = nextConfig
