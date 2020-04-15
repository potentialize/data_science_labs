const pool = require('../../helpers/pool')

// out: sql data row

module.exports = (sql, sqlVars, highWaterMark) => pool().query(sql, sqlVars).stream({
  highWaterMark: highWaterMark || 1000,
})
