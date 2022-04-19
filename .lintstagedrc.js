const path = require('path')

const lint = (filenames) =>
  `next lint --fix --file ${filenames
    .map((file) => path.relative(process.cwd(), file))
    .join(' --file ')}`

const pretty = 'prettier -u -w'

module.exports = {
  '**/*': [pretty],
  '**/*.{js,jsx,ts,tsx}': [lint],
}
