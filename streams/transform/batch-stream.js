const { Transform } = require('stream')

// in: any object
// out: array of #bufferSize objects

class BatchStream extends Transform {
  constructor (bufferSize) {
    super({
      objectMode: true,
    })

    this.buffer = []
    this.bufferSize = bufferSize
  }

  _transform (chunk, encoding, callback) {
    // add chunk to buffer
    this.buffer.push(chunk)

    // empty buffer?
    if (this.buffer.length >= this.bufferSize) {
      this.push(this.buffer)
      this.buffer = []
    }

    // done with chunk
    callback()
  }

  _flush (callback) {
    if (this.buffer.length > 0) {
      this.push(this.buffer)
      this.buffer = []
    }
    callback()
  }
}

module.exports = BatchStream
