const { Transform } = require('stream')

// in: arrays (represent a row)
// out: tsv formatted string

class ArrayToTsvStream extends Transform {
  constructor (header) {
    super({
      objectMode: true,
    })

    // array with header titles (add as first line of file)
    this.header = header || []
    this.firstLine = true
  }

  _transform (row, encoding, callback) {
    // write header once
    if (this.firstLine) {
      const headerStr = this.rowToString(this.header)
      this.push(headerStr)
      this.firstLine = false
    }

    // write row
    const rowStr = this.rowToString(row)
    this.push(rowStr)

    // done with row
    callback()
  }

  rowToString (row) {
    return row.join('\t') + '\n'
  }
}

module.exports = ArrayToTsvStream
