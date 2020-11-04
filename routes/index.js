const express = require('express')
const router = express.Router()

const UserRouter = require('./UserRouter')
const ArticleRouter = require('./ArticleRouter')

router.use('/users', UserRouter)
router.use('/articles', ArticleRouter)

module.exports = router
