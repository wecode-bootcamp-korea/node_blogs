const { ArticleService } = require('../services')
const { errorGenerator, validateFields } = require('../utils')

const getArticles = async (req, res, next) => {
  try {
    const articles = await ArticleService.findArticles()

    res.status(200).json({ articles })
  } catch (err) {
    next(err)
  }
}

const getOneArticle = async (req, res, next) => {
  try {
    const { articleId } = req.params
    const article = await ArticleService.findArticle({ id: articleId })

    if (article.deleted_at) return res.status(200).json({ message: 'deleted ' })

    res.status(200).json({ article })
  } catch (err) {
    next(err)
  }
}

const postOneArticle = async (req, res, next) => {
  try {
    const { id: userId } = req.foundUser
    const { title, body } = req.body

    if (!title || !body) errorGenerator({ statusCode: 400, message: 'invalid key error' })

    const createdArticle = await ArticleService.createArticle({
      userId,
      title,
      body,
    })

    res.status(201).json({ createdArticle })
  } catch (err) {
    next(err)
  }
}

const updateOneArticle = async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err)
  }
}

const publishOneArticle = async (req, res, next) => {
  try {
    const { id: userIdFromToken } = req.foundUser
    const { articleId } = req.params

    const foundArticle = await ArticleService.findArticle({ id: articleId })
    if (!foundArticle) errorGenerator({ statusCode: 404, message: 'article not found' })
    const { user_id: userIdFromArticle } = foundArticle

    if (userIdFromToken !== userIdFromArticle)
      errorGenerator({ statusCode: 403, message: 'unauthorized' })

    const publishedArticle = await ArticleService.publishArticle(articleId)

    res.status(201).json({ publishedArticle })
  } catch (err) {
    next(err)
  }
}

const deleteOneArticle = async (req, res, next) => {
  try {
    const { id: userIdFromToken } = req.foundUser
    const { articleId } = req.params

    const foundArticle = await ArticleService.findArticle({ id: articleId })

    if (!foundArticle) errorGenerator({ statusCode: 404, message: 'article not found' })
    const { user_id: userIdFromArticle } = foundArticle

    if (userIdFromToken !== userIdFromArticle)
      errorGenerator({ statusCode: 403, message: 'unauthorized' })

    const deletedArticle = await ArticleService.deleteArticle(articleId)

    res.status(201).json({ deletedArticle })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getArticles,
  getOneArticle,
  postOneArticle,
  updateOneArticle,
  publishOneArticle,
  deleteOneArticle,
}
