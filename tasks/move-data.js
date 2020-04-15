const queryStream = require('../streams/read-from/query-stream')
const pool = require('../helpers/pool')

const sql = `
  SELECT text FROM _test
`

queryStream(sql)
  .on('data', (data) => {
    console.log('data: ', data)
  })
  .on('close', () => {
    console.log('Query stream ended, closing pool...')
    pool().end()
  })
