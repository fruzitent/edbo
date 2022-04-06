const lint = 'eslint --fix'
const pretty = 'prettier -u -w'

module.exports = {
  '**/*': [pretty],
  '**/*.{js,ts}': [lint],
}
