const path = require('path')

const withBundleAnalyzer = require('@next/bundle-analyzer')
const withMDX = require('@next/mdx')
const { withAxiom } = require('next-axiom')
const { withPlugins } = require('next-compose-plugins')
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

const { i18n } = require('./next-i18next.config')
const { isIgnoreBuildErrors, isAnalyze, isDev } = require('./src/config/node')

const headers = [
  // { key: 'Content-Security-Policy', value: 'default-src "self"' },
  // { key: 'Permissions-Policy', value: 'interest-cohort=()' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Frame-Options', value: 'sameorigin' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
]

const plugins = [
  [withBundleAnalyzer({ enabled: isAnalyze })],
  [withPWA],
  [withMDX({ options: { providerImportSource: '@mdx-js/react' } })],
  [withAxiom],
]

/** @type {import("next").NextConfig} */
const nextConfig = {
  compiler: { reactRemoveProperties: { properties: ['^data-custom$'] } },
  devIndicators: { buildActivity: false },
  env: {},
  eslint: { ignoreDuringBuilds: isIgnoreBuildErrors },
  experimental: {
    esmExternals: true,
    externalDir: true,
    outputFileTracingRoot: path.join(__dirname),
    runtime: 'experimental-edge',
    swcFileReading: false,
  },
  headers: async () => [{ source: '/(.*)', headers }],
  i18n,
  images: { domains: [] },
  outputFileTracing: true,
  pageExtensions: [
    'page.js',
    'page.jsx',
    'page.md',
    'page.mdx',
    'page.ts',
    'page.tsx',
  ],
  poweredByHeader: false,
  pwa: {
    buildExcludes: [],
    dest: 'public',
    disable: isDev,
    mode: 'production',
    runtimeCaching,
  },
  reactStrictMode: true,
  swcMinify: true,
  typescript: { ignoreBuildErrors: isIgnoreBuildErrors },
  webpack: (config) => {
    config.experiments.topLevelAwait = true
    config.watchOptions.aggregateTimeout = 300
    config.watchOptions.poll = 1000
    return config
  },
}

module.exports = withPlugins(plugins, nextConfig)
