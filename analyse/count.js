const query = require('../helpers/query')

// count number of rows in a table

module.exports = async (table) => {
  const sql = `
    SELECT COUNT(*) AS count
    FROM ${table}
  `

  const result = await query(sql)

  const count = result[0].count

  console.log(`Result: rows in ${table}: ${count}`)

  return [count, result]
}
