const { Transform } = require('stream')
const util = require('util')

class TsvStream extends Transform {
  constructor () {
    super({
      objectMode: true,
    })

    this.remainder = ''
    this.remainderRegex = /\n(.+$)/g
  }

  _transform (chunk, encoding, callback) {
    // add previous remainder to top of chunk
    chunk = this.remainder + chunk

    // find remainder of current chunk
    const [remainder] = chunk.match(this.remainderRegex) || ['']
    this.remainder = remainder
    chunk = chunk.replace(this.remainderRegex, '')

    chunk
      .split('\n')
      .filter(line => /^tt/.test(line))
      .forEach(line => {
        const [_id, _rate, _votes] = line.split('\t')

        // format columns
        const id = parseInt(_id.replace(/^tt0*/, '0'))
        const rate = parseFloat(_rate) || 'NULL'
        const votes = parseInt(_votes) || 0

        // output data
        this.push([id, rate, votes])
      })

    // done with chunk
    callback()
  }
}

module.exports = TsvStream
