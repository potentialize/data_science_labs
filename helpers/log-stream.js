const { Writable } = require('stream')

class LogStream extends Writable {
  constructor () {
    super({
      objectMode: true, // accept js objects
    })
  }

  _write (chunk, encoding, callback) {
    console.log(chunk)
    callback()
  }
}

module.exports = LogStream
