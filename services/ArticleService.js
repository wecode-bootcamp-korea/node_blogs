const prisma = require('../prisma')
const { makeQueryOption } = require('../utils')

const ARTICLES_DEFAULT_OFFSET = 0
const ARTICLES_DEFAULT_LIMIT = 5

const findArticles = (query) => {
  const { offset, limit, ...fields } = query
  const where = makeQueryOption(fields)

  return prisma.articles.findMany({
    where,
    skip: Number(offset) || ARTICLES_DEFAULT_OFFSET,
    take: Number(limit) || ARTICLES_DEFAULT_LIMIT,
  })
}

const findArticle = (field) => {
  const [uniqueKey] = Object.keys(field)

  const isKeyId = uniqueKey === 'id'
  const value = isKeyId ? Number(field[uniqueKey]) : field[uniqueKey]

  return prisma.articles.findUnique({
    where: { [uniqueKey]: value },
    include: {
      users: {
        select: {
          id: true,
          email: true,
        },
      },
      comments: {
        where: {
          deleted_at: null,
        },
      },
    },
  })
}

const createArticle = (fields) => {
  const { userId: user_id, ...dataFields } = fields

  return prisma.articles.create({
    data: {
      ...dataFields,
      user_id,
    },
  })
}

const updateArticle = (fields) => {
  const { articleId, requestedFields } = fields

  return prisma.articles.update({
    where: {
      id: Number(articleId),
    },
    data: {
      ...requestedFields,
      updated_at: new Date(),
    },
  })
}

const publishArticle = (articleId) => {
  return prisma.articles.update({
    where: {
      id: Number(articleId),
    },
    data: {
      status: 'PUBLISHED',
      updated_at: new Date(),
    },
  })
}

const deleteArticle = (articleId) => {
  return prisma.articles.update({
    where: {
      id: Number(articleId),
    },
    data: {
      deleted_at: new Date(),
    },
  })
}

module.exports = {
  findArticles,
  findArticle,
  createArticle,
  updateArticle,
  publishArticle,
  deleteArticle,
}
