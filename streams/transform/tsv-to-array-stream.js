const { Transform } = require('stream')
const util = require('util')

// in: tsv formatted file stream
// out: rows (each row is array of strings)

class TsvToArrayStream extends Transform {
  constructor () {
    super({
      objectMode: true,
    })

    // first line of TSV file (header) should be skipped
    this.firstLine = true
    this.remainder = '' // never contains \n, see regex
  }

  _transform (chunk, encoding, callback) {
    // manage chunk transitions
    chunk = this.glueChunks(chunk)

    // process chunk and push lines
    this.handleChunk(chunk)

    // done with chunk
    callback()
  }

  handleChunk (chunk) {
    // lines
    const lines = chunk
      .split('\n')
      .filter(field => field.length)

    // skip first line of file
    if (lines.length && this.firstLine) {
      lines.shift()
      this.firstLine = false
    }

    // turn rows into arrays
    for (const line of lines) {
      this.push(line.split('\t'))
    }
  }

  _flush (callback) {
    this.handleChunk(this.remainder)
    callback()
  }

  glueChunks (chunk) {
    // incomplete line regex
    // NOTE: . does not match \n
    const incompleteLine = /^.*$|\n.*$/g

    // add previous remainder to top of chunk
    chunk = this.remainder + chunk

    // find remainder of current chunk
    const [remainder] = chunk.match(incompleteLine) || ['']
    this.remainder = remainder
    return chunk.replace(incompleteLine, '')
  }
}

module.exports = TsvToArrayStream
