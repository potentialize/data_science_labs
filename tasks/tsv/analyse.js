const fs = require('fs')
const readline = require('readline')
const path = require('path')

const file = path.resolve(__dirname, '..', '..', 'data', 'title.ratings.tsv')

const rl = readline.createInterface({
  input: fs.createReadStream(file, 'utf8'),
  terminal: false,
})

// stats
let idMin = Infinity
let idMax = -Infinity
let rateMin = Infinity
let rateMax = -Infinity
let votesMin = Infinity
let votesMax = -Infinity

rl.on('line', (line) => {
  // ignore lines that do not start with tt
  if (!/^tt/.test(line)) return

  // split line at whitespace
  const [_id, _rate, _votes] = line.split(/\s+/)

  // format data
  const id = parseInt(_id.replace(/^tt0*/, ''))
  const rate = parseFloat(_rate)
  const votes = parseInt(_votes)

  // update stats
  if (id < idMin) idMin = id
  if (id > idMax) idMax = id
  if (rate < rateMin) rateMin = rate
  if (rate > rateMax) rateMax = rate
  if (votes < votesMin) votesMin = votes
  if (votes > votesMax) votesMax = votes
})

rl.on('close', () => {
  console.log(`id (int) = [${idMin};${idMax}]`)
  console.log(`rate (float) = [${rateMin};${rateMax}]`)
  console.log(`votes (int) = [${votesMin};${votesMax}]`)
})
