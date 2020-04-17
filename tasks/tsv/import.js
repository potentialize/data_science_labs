const path = require('path')
const fs = require('fs')
const {
  TsvToArrayStream,
  EditStream,
  BatchStream,
  InsertStream,
} = require('../../streams')
const pool = require('../../helpers/pool')

const inFile = path.resolve(__dirname, '..', '..', 'data', 'title.ratings.tsv')
const outTable = 'titleRatings'

const callback = ([id, rate, votes]) => ({
  id: parseInt(id.replace(/^tt0*/, '0')),
  averageRating: parseFloat(rate) || null,
  voteCount: parseInt(votes) || 0,
})

fs.createReadStream(inFile, 'utf-8')
  .pipe(new TsvToArrayStream())
  .pipe(new EditStream(callback))
  .pipe(new BatchStream(1000))
  .pipe(new InsertStream(outTable))
  .on('finish', () => {
    pool().end()
  })
