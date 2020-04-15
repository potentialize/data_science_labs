const capitalize = (word) => {
  if (word.length === 0) return ''

  return word[0].toUpperCase() + word.slice(1)
}

module.exports = (dashStr) => dashStr
  .toLowerCase()
  .replace(/-([^-]*)/g, (match, word) => capitalize(word))
