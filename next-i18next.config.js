const { isDev } = require('./src/config/node')

const nextConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru', 'ua'],
    reloadOnPrerender: !isDev,
  },
}

module.exports = nextConfig
