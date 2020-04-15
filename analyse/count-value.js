const query = require('../helpers/query')

// count occurences of value in column

module.exports = async (table, column, value) => {
  const sql = `
    SELECT COUNT(${column}) AS count
    FROM ${table}
    WHERE ${column}='${value}'
  `

  const result = await query(sql)

  const count = result[0].count

  console.log(`Result: '${value}' in ${table}.${column}: ${count}`)

  return [count, result]
}
