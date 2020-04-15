const pool = require('../helpers/pool')
const {
  count,
  countValue,
  countDuplicates,
  range,
} = require('../analyse')

;(async () => {
  const results = await Promise.all([
    count('_test'),
    countValue('_test', 'text', 'random'),
    range('_test', 'nr'),
    countDuplicates('_test', 'nr'),
  ])

  pool().end()
})()
