const pool = require('../helpers/pool.js')
const query = require('../helpers/query.js')

;(async () => {
  const queries = [
    query('SELECT * FROM nameBasics LIMIT 1 OFFSET ?', [0]),
    query('SELECT * FROM nameBasics LIMIT 1 OFFSET ?', [1]),
    query('SELECT * FROM nameBasics LIMIT 1 OFFSET ?', [2]),
    query('SELECT * FROM nameBasics LIMIT 1 OFFSET ?', [3]),
  ]

  const results = await Promise.all(queries)

  console.log(results)

  pool().end()
})()
