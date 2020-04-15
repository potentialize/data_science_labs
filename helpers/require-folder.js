const path = require('path')
const glob = require('glob')
const dashToCamel = require('../helpers/dash-to-camel')

module.exports = (folder, ignoreIndex = true) => {
  const globPath = path.join(folder, '**/*.js')

  const options = {}

  if (ignoreIndex) options.ignore = path.join(folder, '**/index.js')

  const scripts = glob.sync(globPath, options)

  const out = {}
  for (const script of scripts) {
    const moduleContent = require(script)
    const fileName = path.basename(script, path.extname(script))
    const importName = moduleContent.name || dashToCamel(fileName)

    out[importName] = moduleContent
  }

  return out
}
