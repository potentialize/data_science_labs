const { Readable } = require('stream')
const wait = require('../../helpers/wait')
const block = require('../../helpers/block')

// stream elements in array

class ArrayStream extends Readable {
  constructor (data) {
    super({
      objectMode: true,
    })

    this.data = data // array
    this.index = 0
  }

  // streaming an array does not require buffering, hence we push only one item per read request
  _read (size) {
    // array exhausted, end stream
    if (this.index >= this.data.length) return this.push(null)

    // stream array value
    this.push(this.data[this.index])

    // increment
    this.index++
  }
}

module.exports = ArrayStream
