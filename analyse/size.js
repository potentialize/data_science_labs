const query = require('../helpers/query')

// get the size of a text column

module.exports = async (table, column) => {
  const sql = `
    SELECT ${column} AS str
    FROM ${table}
  `

  const result = await query(sql)

  const maxSize = result.reduce((maxSize, { str }) => str.length > maxSize ? str.length : maxSize, 0)

  console.log(`Result: maximum size of ${table}.${column}: ${maxSize}`)

  return [maxSize, result]
}
