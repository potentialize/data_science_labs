module.exports = (seed) => {
  let count = seed

  return {
    value: () => count,
    increment: () => ++count,
  }
}
