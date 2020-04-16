const {
  queryStream,
  InsertStream,
  BatchStream,
  CopyStream,
  EditStream,
  LogStream,
} = require('../streams')
const pool = require('../helpers/pool')

const inTable = 'nameBasics'
const outTable = 'PEOPLE'
const sql = `SELECT nconst, primaryName, birthYear, deathYear FROM ${inTable}`
const batchSize = 1000
const dictionary = {
  nconst: 'id',
  primaryName: 'name',
  birthYear: 'birthYear',
  deathYear: 'deathYear',
}
const callbacks = {
  id: (id) => parseInt(id.replace(/^nm0*/, '')),
}

queryStream(sql)
  .pipe(new CopyStream(dictionary))
  .pipe(new EditStream(callbacks))
  // .pipe(new LogStream())
  .pipe(new BatchStream(batchSize))
  .pipe(new InsertStream(outTable))
  .on('finish', () => {
    pool().end()
  })
