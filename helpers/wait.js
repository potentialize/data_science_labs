// resolve promise after #ms
module.exports = (ms) => new Promise(resolve => setTimeout(resolve, ms))
