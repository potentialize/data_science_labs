const {
  ArrayStream,
  EditStream,
  LogStream,
} = require('../streams')

;(async () => {
  const arrayStream = new ArrayStream([
    { id: 0, letter: 'a' },
    { id: 1, letter: 'b' },
    { id: 2, letter: 'c' },
    { id: 3, letter: 'd' },
    { id: 4, letter: 'e' },
    { id: 5, letter: 'f' },
  ])

  const callbacks = {
    id: (id) => `awesome row with id ${id}`,
    letter: (letter) => `awesome row with letter ${letter}`,
  }

  arrayStream
    .pipe(new EditStream(callbacks))
    .pipe(new LogStream())
})()
