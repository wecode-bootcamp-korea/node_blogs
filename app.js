const express = require('express')
const routes = require('./routes')
const logger = require('morgan')('dev')

const app = express()

app.use(express.json())
app.use(logger)
app.use(routes)

// general error handler
app.use((err, req, res, next) => {
  const { statusCode, message } = err
  console.error(err)
  res.status(statusCode || 500).json({ message })
})

module.exports = app
