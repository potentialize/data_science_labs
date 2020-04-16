const {
  queryStream,
  InsertStream,
  BatchStream,
  CopyStream,
} = require('../streams')
const pool = require('../helpers/pool')

const inTable = '_test'
const outTable = '_test2'
const sql = `SELECT * FROM ${inTable}`
const batchSize = 1000
const dictionary = {
  id: 'id2',
  text: 'text2',
  nr: 'nr2',
}

queryStream(sql)
  .pipe(new CopyStream(dictionary))
  .pipe(new BatchStream(batchSize))
  .pipe(new InsertStream(outTable))
  .on('finish', () => {
    pool().end()
  })
