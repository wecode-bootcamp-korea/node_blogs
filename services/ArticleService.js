const prisma = require('../prisma')
const { makeDataForCreate } = require('../utils')

const findArticles = (fields = {}) => {
  return prisma.articles.findMany({
    where: {
      deleted_at: null,
    },
  })
}

const findArticle = (field) => {
  const [uniqueKey] = Object.keys(field)

  const isKeyId = uniqueKey === 'id'
  const value = isKeyId ? Number(field[uniqueKey]) : field[uniqueKey]

  return prisma.articles.findOne({
    where: { [uniqueKey]: value },
    include: {
      users: true,
    },
  })
}

const createArticle = (fields) => {
  const { userId, ...dataFields } = fields
  const data = makeDataForCreate(dataFields)

  return prisma.articles.create({
    data: {
      ...data,
      users: {
        connect: {
          id: userId,
        },
      },
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
    data,
  })
}

const publishArticle = (articleId) => {
  return prisma.articles.update({
    where: {
      id: Number(articleId),
    },
    data: {
      status: 'PUBLISHED',
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
