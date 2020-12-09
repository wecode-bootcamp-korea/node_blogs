const prisma = require('../prisma')

const findCommentsOfArticle = ({ articleId }) => {
  return prisma.comments.findMany({
    where: {
      article_id: Number(articleId),
      deleted_at: null,
    },
  })
}

const createCommentOfArticle = ({ articleId, userId, body }) => {
  return prisma.comments.create({
    data: {
      body,
      article_id: Number(articleId),
      user_id: userId,
    },
  })
}

const updateCommentOfArticle = ({ commentId, body }) => {
  return prisma.comments.update({
    where: {
      id: Number(commentId),
    },
    data: {
      body,
      updated_at: new Date(),
    },
  })
}

const deleteCommentOfArticle = ({ commentId }) => {
  return prisma.comments.update({
    where: {
      id: Number(commentId),
    },
    data: {
      deleted_at: new Date(),
    },
  })
}

module.exports = {
  findCommentsOfArticle,
  createCommentOfArticle,
  updateCommentOfArticle,
  deleteCommentOfArticle,
}
