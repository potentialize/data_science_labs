const query = require('../helpers/query')

module.exports = async (table, column) => {
  const sql = `
    SELECT ${column} as value, COUNT(*) AS count
    FROM ${table}
    GROUP BY ${column}
    HAVING COUNT(*) > 1
  `

  const result = await query(sql)

  const count = result.length

  console.log(`Result: sets of duplicates in ${table}.${column}: ${count}`)

  return [count, result]
}
