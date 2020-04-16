const pool = require('../helpers/pool')
const {
  count,
  countValue,
  countDuplicates,
  range,
  size,
} = require('../analyse')

;(async () => {
  const results = await Promise.all([
    // count('_test'),
    // countValue('_test', 'text', 'random'),
    range('nameBasics', 'deathYear'),
    // size('nameBasics', 'primaryName'),
    // countDuplicates('nameBasics', 'primaryName'),
  ])

  console.log(results[0])

  pool().end()
})()
