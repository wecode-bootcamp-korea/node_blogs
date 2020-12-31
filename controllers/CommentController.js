const { CommentService } = require('../services')
const { errorWrapper, errorGenerator } = require('../errors')

const getComments = errorWrapper(async (req, res) => {
  const { articleId } = req.params

  const comments = await CommentService.fetchComments({ article_id: Number(articleId) })
  res.status(200).json({ comments })
})

const postComment = errorWrapper(async (req, res) => {
  const { articleId } = req.params
  const { id: userIdFromToken } = req.foundUser
  const { body } = req.body

  const createdComment = await CommentService.createComment({
    article_id: Number(articleId),
    user_id: userIdFromToken,
    body,
  })

  res.status(201).json({ createdComment })
})

const updateComment = errorWrapper(async (req, res) => {
  const { articleId, commentId } = req.params
  const { body } = req.body
  const { id: userIdFromToken } = req.foundUser

  const comments = await CommentService.fetchComments({ article_id: Number(articleId) })

  const foundComment = comments.find((comment) => comment.id === Number(commentId))
  if (!foundComment) errorGenerator({ message: 'not found', statusCode: 404 })

  const isValidUser = foundComment.user_id === userIdFromToken // true or false
  if (!isValidUser) errorGenerator({ message: 'unauthorized', statusCode: 403 })

  const updatedComment = await CommentService.updateComment({
    comment_id: Number(commentId),
    body,
  })

  res.status(200).json({ updatedComment })
})

const deleteComment = errorWrapper(async (req, res) => {
  const { articleId, commentId } = req.params
  const { id: userIdFromToken } = req.foundUser

  const comments = await CommentService.fetchComments({ article_id: Number(articleId) })

  const foundComment = comments.find((comment) => comment.id === Number(commentId))
  if (!foundComment) errorGenerator({ message: 'not found', statusCode: 404 })

  const isValidUser = foundComment.user_id === userIdFromToken
  if (!isValidUser) errorGenerator({ message: 'unauthorized', statusCode: 403 })

  const deletedComment = await CommentService.deleteComment({
    comment_id: Number(commentId),
  })

  res.status(200).json({ deletedComment })
})

module.exports = {
  getComments,
  postComment,
  updateComment,
  deleteComment,
}
