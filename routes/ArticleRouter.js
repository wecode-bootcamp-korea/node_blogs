const express = require('express')
const router = express.Router()
const { ArticleController } = require('../controllers')
const { validateToken } = require('../middlewares')

// articles router
router.get('/', ArticleController.getArticles)
router.get('/:articleId', ArticleController.getOneArticle)
router.post('/', validateToken, ArticleController.postOneArticle)
router.put('/:articleId', validateToken, ArticleController.updateOneArticle)
router.put('/publish/:articleId', validateToken, ArticleController.publishOneArticle)
router.delete('/:articleId', validateToken, ArticleController.deleteOneArticle)

module.exports = router
