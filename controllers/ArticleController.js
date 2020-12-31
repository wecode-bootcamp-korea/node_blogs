const { ArticleService } = require('../services')
const { errorWrapper, errorGenerator } = require('../errors')
const { validateFields } = require('../utils')

const getArticles = errorWrapper(async (req, res) => {
  const articles = await ArticleService.findArticles(req.query)
  res.status(200).json({ articles })
})

const getOneArticle = errorWrapper(async (req, res) => {
  const { articleId } = req.params
  const article = await ArticleService.findArticle({ id: articleId })

  if (article.deleted_at) return res.status(200).json({ message: 'deleted ' })

  res.status(200).json({ article })
})

const postOneArticle = errorWrapper(async (req, res) => {
  const { id: userId } = req.foundUser
  const { title, body } = req.body

  if (!title || !body) errorGenerator({ statusCode: 400, message: 'invalid key error' })

  const createdArticle = await ArticleService.createArticle({
    userId,
    title,
    body,
  })

  res.status(201).json({ createdArticle })
})

const updateOneArticle = errorWrapper(async (req, res) => {
  const { id: userIdFromToken } = req.foundUser
  const { articleId } = req.params
  const requestedFields = req.body
  const allowedFields = ['title', 'body']

  const isValidFields = validateFields(requestedFields, allowedFields)

  if (!isValidFields) errorGenerator({ statusCode: 400, message: 'invalid requested fields' })

  const foundArticle = await ArticleService.findArticle({ id: articleId })
  const { user_id: userIdFromArticle } = foundArticle

  if (userIdFromToken !== userIdFromArticle)
    errorGenerator({ statusCode: 403, message: 'unauthorized' })

  const updatedArticle = await ArticleService.updateArticle({
    articleId,
    requestedFields,
  })

  res.status(201).json({ updatedArticle })
})

const publishOneArticle = errorWrapper(async (req, res) => {
  const { id: userIdFromToken } = req.foundUser
  const { articleId } = req.params

  const foundArticle = await ArticleService.findArticle({ id: articleId })
  if (!foundArticle) errorGenerator({ statusCode: 404, message: 'article not found' })
  const { user_id: userIdFromArticle } = foundArticle

  if (userIdFromToken !== userIdFromArticle)
    errorGenerator({ statusCode: 403, message: 'unauthorized' })

  const publishedArticle = await ArticleService.publishArticle(articleId)

  res.status(201).json({ publishedArticle })
})

const deleteOneArticle = errorWrapper(async (req, res) => {
  const { id: userIdFromToken } = req.foundUser
  const { articleId } = req.params

  const foundArticle = await ArticleService.findArticle({ id: articleId })
  if (!foundArticle) errorGenerator({ statusCode: 404, message: 'article not found' })
  const { user_id: userIdFromArticle } = foundArticle

  if (userIdFromToken !== userIdFromArticle)
    errorGenerator({ statusCode: 403, message: 'unauthorized' })

  const deletedArticle = await ArticleService.deleteArticle(articleId)

  res.status(201).json({ deletedArticle })
})

module.exports = {
  getArticles,
  getOneArticle,
  postOneArticle,
  updateOneArticle,
  publishOneArticle,
  deleteOneArticle,
}
