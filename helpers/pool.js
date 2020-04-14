const mysql = require('mysql')

// load environment variables
require('dotenv').config()

// share connection pool with all dependents
let pool = null

// create connection pool from .env
const createPool = () => mysql.createPool({
    connectionLimit: process.env['DB_CONNECTION_LIMIT'],
    host: process.env['DB_HOST'],
    user: process.env['DB_USER'],
    password: process.env['DB_PASSWORD'],
    database: process.env['DB_NAME'],
})

// get/create connection pool
module.exports = () => pool || (pool = createPool())

// make .catch optional
process.on('unhandledRejection', error => {
    console.error(error)
    process.exit(1)
});