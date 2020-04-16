const { Transform } = require('stream')
const { hasOwnProperty } = require('../../helpers')

// in: any object
// out: any object

// dictionary = { inKey1: outKey1, ... }
// keys not in the dictionary are removed from the output

class CopyStream extends Transform {
  constructor (dictionary) {
    super({
      objectMode: true,
    })

    this.dictionary = dictionary
  }

  _transform (inObj, encoding, callback) {
    const outObj = {}

    for (const inKey in this.dictionary) {
      // skip if inObj does not have inKey
      if (!hasOwnProperty(inObj, inKey)) continue

      const outKey = this.dictionary[inKey]

      // copy data
      outObj[outKey] = inObj[inKey]
    }

    // stream outObj
    this.push(outObj)

    // done
    callback()
  }
}

module.exports = CopyStream
