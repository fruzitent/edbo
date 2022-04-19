declare namespace NodeJS {
  interface ProcessEnv {
    ANALYZE: 'true' | 'false'
    DEBUG: 'true' | 'false'
    IGNORE_BUILD_ERRORS: 'true' | 'false'
    NODE_ENV: 'development' | 'production' | 'test'
  }
}
