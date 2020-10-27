const express = require('express')
const router = express.Router()

const UsersRouter = require('./users')

router.use('/users', UsersRouter)

module.exports = router
