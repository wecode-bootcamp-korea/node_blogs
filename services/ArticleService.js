const prisma = require('../prisma')
const { makeDataForCreate } = require('../utils')

const findArticles = (fields = {}) => {
  return prisma.articles.findMany({
    where: {
      deleted_at: null,
      status: 'PUBLISHED',
    },
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
    },
  })
}

const createArticle = (fields) => {
  const { userId: user_id, ...dataFields } = fields
  const data = makeDataForCreate(dataFields)

  return prisma.articles.create({
    data: {
      ...data,
      user_id,
    },
  })
}

const updateArticle = (fields) => {
  const { articleId, requestedFields } = fields
  const data = makeDataForCreate(requestedFields)

  return prisma.articles.update({
    where: {
      id: Number(articleId),
    },
    data: {
      ...data,
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
