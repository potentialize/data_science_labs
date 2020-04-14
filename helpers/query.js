const pool = require('../helpers/pool.js')

module.exports = (sql, sqlVars) => new Promise((resolve, reject) => {
    pool().query(sql, sqlVars, (error, results, fields) => {
        // query failed
        if (error) reject(error)

        // query succeeded
        resolve(results)
    })
})