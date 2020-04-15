const query = require('../helpers/query')

// get the minimum and maximum value of a column

module.exports = async (table, column) => {
  const sql = `
    SELECT MIN(${column}) AS min, MAX(${column}) AS max
    FROM ${table}
  `

  const result = await query(sql)

  const min = result[0].min
  const max = result[0].max

  console.log(`Result: range of ${table}.${column}: [${min};${max}]`)

  return [min, max, result]
}
