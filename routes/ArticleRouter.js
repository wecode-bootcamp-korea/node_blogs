const express = require('express')
const router = express.Router()
const { ArticleController, CommentController } = require('../controllers')
const { validateToken } = require('../middlewares')

// articles router
router.get('/', ArticleController.getArticles)
router.get('/:articleId', ArticleController.getOneArticle)
router.post('/', validateToken, ArticleController.postOneArticle)
router.put('/:articleId', validateToken, ArticleController.updateOneArticle)
router.put(
  '/publish/:articleId',
  validateToken,
  ArticleController.publishOneArticle
)
router.delete('/:articleId', validateToken, ArticleController.deleteOneArticle)

// comments router
router.get('/:articleId/comments', CommentController.getComments)
router.post(
  '/:articleId/comments',
  validateToken,
  CommentController.postOneComment
)
router.put(
  '/:articleId/comments/:commentId',
  validateToken,
  CommentController.updateOneComment
)
router.delete(
  '/:articleId/comments/:commentId',
  validateToken,
  CommentController.deleteOneComment
)

module.exports = router
