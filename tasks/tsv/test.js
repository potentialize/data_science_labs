/* eslint-disable no-unused-vars */
const {
  TsvToArrayStream,
  ArrayToTsvStream,
} = require('../../streams')
const fs = require('fs')
const path = require('path')

const inFile = path.resolve(__dirname, '..', '..', 'data', 'title.ratings.tsv')
const outFile = path.resolve(__dirname, '..', '..', 'data', 'title.ratings2.tsv')

// remove outFile
if (fs.existsSync(outFile)) fs.unlinkSync(outFile)

const inStream = fs.createReadStream(inFile, { encoding: 'utf-8', highWaterMark: 100 })
const outStream = fs.createWriteStream(outFile, 'utf-8')

inStream
  .pipe(new TsvToArrayStream())
  .pipe(new ArrayToTsvStream(['name', 'message', 'id']))
  .pipe(outStream)

// test output with diff <file 1> <file 2>
