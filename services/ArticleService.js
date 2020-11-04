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
  const { userId, title, body } = fields
  console.log(userId, title, body)

  return prisma.articles.create({
    data: {
      body,
      title,
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
