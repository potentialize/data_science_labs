const { Transform } = require('stream')

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
    this.push(this.buffer)
    this.buffer = []
    this.push(null)
    callback()
  }
}

module.exports = BatchStream
