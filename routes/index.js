const express = require('express')
const router = express.Router({ mergeParams: true })

const UserRouter = require('./UserRouter')
const ArticleRouter = require('./ArticleRouter')

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Lambda function successfully invoked' })
})
router.use('/users', UserRouter)
router.use('/articles', ArticleRouter)

module.exports = router
