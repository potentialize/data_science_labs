const path = require('path')
const glob = require('glob')
const dashToCamel = require('../helpers/dash-to-camel')

// export all scripts in analyse folder

const globPath = path.join(__dirname, '**/*.js')

const scripts = glob.sync(globPath, {
  ignore: path.join(__dirname, '**/index.js'),
})

for (const script of scripts) {
  const fileName = path.basename(script, path.extname(script))
  const importName = dashToCamel(fileName)

  exports[importName] = require(script)
}
