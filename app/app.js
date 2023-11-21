const express = require('express')
const app = express()

const router = express.Router()

const { Pool } = require('pg')
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432
})

pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    pool.end()
})

router.get('/', (_req, res) => {
    res.status(200).json({
        message: 'Hello World!',
    })
})

router.get('/*', (_req, res) => {
    res.status(400).json({
        error: 'Path not found'
    })
})

app.use('/', router)

app.listen(3000, () => {
    console.log('Server started')
})