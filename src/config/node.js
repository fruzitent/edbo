const isAnalyze = process.env.ANALYZE === 'true'
module.exports.isAnalyze = isAnalyze

const isDebug = process.env.DEBUG === 'true'
module.exports.isDebug = isDebug

const isIgnoreBuildErrors = process.env.IGNORE_BUILD_ERRORS === 'true'
module.exports.isIgnoreBuildErrors = isIgnoreBuildErrors

const isDev = process.env.NODE_ENV === 'development'
module.exports.isDev = isDev
