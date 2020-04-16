const { Transform } = require('stream')
const { hasOwnProperty } = require('../../helpers')

// in: any object
// out: result of func with object as input

// funcs can be a function (apply to inObj) or an object of functions (match function and data by inObj key)

class EditStream extends Transform {
  constructor (funcs) {
    super({
      objectMode: true,
    })

    // edit selectively? (key by key)
    this.selective = typeof funcs !== 'function'
    this.funcs = funcs
  }

  _transform (input, encoding, callback) {
    const output = this.selective ? this.selectiveEdit(input) : this.funcs(input)

    this.push(output)

    callback()
  }

  selectiveEdit (obj) {
    for (const key in obj) {
      if (!hasOwnProperty(obj, key)) continue

      const input = obj[key]
      const func = this.funcs[key]

      obj[key] = func(input)
    }

    return obj
  }
}

module.exports = EditStream
