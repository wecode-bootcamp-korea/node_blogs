const { CommentService, ArticleService } = require('../services')
const { errorGenerator } = require('../utils')

const getComments = async (req, res, next) => {
  try {
    const { articleId } = req.params

    const comments = await CommentService.findCommentsOfArticle({ articleId })

    res.status(200).json({ comments })
  } catch (err) {
    next(err)
  }
}

const postOneComment = async (req, res, next) => {
  try {
    const { articleId } = req.params
    const { body } = req.body
    const { id: userId } = req.foundUser

    if (!body) errorGenerator({ message: 'invalud input', statusCode: 400 })

    const createdComment = await CommentService.createCommentOfArticle({
      articleId,
      userId,
      body,
    })

    res.status(201).json({ createdComment })
  } catch (err) {
    next(err)
  }
}

const updateOneComment = async (req, res, next) => {
  try {
    const { commentId, articleId } = req.params
    const { id: userIdFromToken } = req.foundUser
    const { body } = req.body

    const foundArticle = await ArticleService.findArticle({ id: articleId })

    if (userIdFromToken !== foundArticle.user_id)
      errorGenerator({ message: 'unauthorized', statusCode: 403 })

    const isCommentIncluded = foundArticle.comments.some(
      ({ id }) => id === Number(commentId)
    )

    if (!isCommentIncluded)
      errorGenerator({ message: 'comment not in the article', statusCode: 400 })

    const updatedComment = await CommentService.updateCommentOfArticle({
      commentId,
      body,
    })

    res.status(201).json({ updatedComment })
  } catch (err) {
    next(err)
  }
}

const deleteOneComment = async (req, res, next) => {
  try {
    const { commentId, articleId: id } = req.params
    const { id: userIdFromToken } = req.foundUser

    const foundArticle = await ArticleService.findArticle({ id })

    if (userIdFromToken !== foundArticle.user_id)
      errorGenerator({ message: 'unauthorized', statusCode: 403 })

    const isCommentIncluded = foundArticle.comments.some(
      ({ id }) => id === Number(commentId)
    )

    if (!isCommentIncluded)
      errorGenerator({ message: 'comment not in the article', statusCode: 400 })

    const deletedComment = await CommentService.deleteCommentOfArticle({
      commentId,
    })

    res.status(201).json({ deletedComment })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getComments,
  postOneComment,
  updateOneComment,
  deleteOneComment,
}
