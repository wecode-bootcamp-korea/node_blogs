const { CommentService } = require('../services')
const { errorGenerator } = require('../utils')

const getComments = async (req, res, next) => {
  try {
    const { articleId } = req.params

    const comments = await CommentService.findComments({ article_id: Number(articleId) })

    res.status(200).json({ comments })
  } catch (err) {
    next(err)
  }
}

const postComment = async (req, res, next) => {
  try {
    const { articleId } = req.params
    const { body } = req.body
    const { id: userIdFromToken } = req.foundUser

    if (!body) errorGenerator({ message: 'invalid input', statusCode: 400 })

    const createdComment = await CommentService.createComment({
      article_id: Number(articleId),
      user_id: userIdFromToken,
      body,
    })

    res.status(201).json({ createdComment })
  } catch (err) {
    next(err)
  }
}

const updateComment = async (req, res, next) => {
  try {
    const { articleId, commentId } = req.params
    const { body } = req.body
    const { id: userIdFromToken } = req.foundUser

    if (!body) errorGenerator({ message: 'invalid input', statusCode: 400 })

    const comments = await CommentService.findComments({ article_id: Number(articleId) })
    const foundComment = comments.find((comment) => comment.id === Number(commentId))
    if (!foundComment) errorGenerator({ message: 'not found', statusCode: 404 })

    const isValidUser = foundComment.user_id === userIdFromToken
    if (!isValidUser) errorGenerator({ message: 'unauthorized', statusCode: 403 })

    const updatedComment = await CommentService.updateComment({
      comment_id: foundComment.id,
      body,
    })

    res.status(200).json({ updatedComment })
  } catch (err) {
    next(err)
  }
}

const deleteComment = async (req, res, next) => {
  try {
    const { articleId, commentId } = req.params
    const { body } = req.body
    const { id: userIdFromToken } = req.foundUser

    if (!body) errorGenerator({ message: 'invalid input', statusCode: 400 })

    const comments = await CommentService.findComments({ article_id: Number(articleId) })
    const foundComment = comments.find((comment) => comment.id === Number(commentId))
    if (!foundComment) errorGenerator({ message: 'not found', statusCode: 404 })

    const isValidUser = foundComment.user_id === userIdFromToken
    if (!isValidUser) errorGenerator({ message: 'unauthorized', statusCode: 403 })

    const deletedComment = await CommentService.deleteComment({
      comment_id: foundComment.id,
    })

    res.status(200).json({ deletedComment })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getComments,
  postComment,
  updateComment,
  deleteComment,
}
