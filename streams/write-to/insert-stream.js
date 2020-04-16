const { Writable } = require('stream')
const query = require('../../helpers/query')
const mysql = require('mysql')

// in: object (insert single row, object keys map to column)
//     array of objects (insert multiple rows...)

// use columns array to add to a subset of table columns
// columns array is more efficient than detecting columns automatically

class InsertStream extends Writable {
  constructor (table, columns = false) {
    super({
      objectMode: true, // accept js objects
    })

    this.table = table

    if (!(columns instanceof Array) && columns !== false) throw new Error('columns should either be an array or false')
    this.columns = columns
  }

  async _write (rows, encoding, callback) {
    // normalize input
    if (!(rows instanceof Array)) rows = [rows]

    // get columns
    const cols = this.columns || this.detectColumns(rows)
    const colStr = `(${cols.join(', ')})`

    // get values
    const valStr = rows
      .map((row) => this.rowStr(cols, row))
      .join(', ')

    // INSERT query
    const sql = `
      INSERT INTO ${this.table} ${colStr}
      VALUES ${valStr};
    `

    // execute query
    await query(sql)

    callback()
  }

  // rows => [col1, col2, ...]
  detectColumns (rows) {
    return rows
      .flatMap((row) => Object.keys(row))
      .filter((value, index, self) => self.indexOf(value) === index) // filter duplicates
  }

  // row => ('val1', 'val2', ...)
  rowStr (cols, row) {
    const rowStr = cols.map((col) => this.prepareValue(row[col])).join(', ')

    return `(${rowStr})`
  }

  // handle special values, wrap in single quotes
  prepareValue (value) {
    if (value === undefined) return ''

    if (value === null) return 'NULL'

    return mysql.escape(value)
  }
}

module.exports = InsertStream
