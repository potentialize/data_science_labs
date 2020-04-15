const path = require('path')
const fs = require('fs')
const TsvStream = require('../../helpers/tsv-stream')
const BatchStream = require('../../helpers/batch-stream')
const pool = require('../../helpers/pool')
const query = require('../../helpers/query')

const filePath = path.resolve(__dirname, '..', '..', 'data', 'title.ratings.tsv')

const data = fs
  .createReadStream(filePath, 'utf-8')
  .pipe(new TsvStream())
  .pipe(new BatchStream(1000))

const queries = []

data.on('data', async (rows) => {
  const values = rows.map(([id, rate, votes]) => `(${id}, ${rate}, ${votes})`).join(', ')

  const sql = `INSERT INTO titleRatings VALUES ${values}`

  queries.push(query(sql))
})

data.on('finish', async () => {
  console.log('queries queued...')

  await Promise.all(queries)

  console.log('queries finished...')

  pool().end()
})
