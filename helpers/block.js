// for testing only!

module.exports = (ms) => {
  const end = Date.now() + ms
  while (Date.now() < end) continue
}
