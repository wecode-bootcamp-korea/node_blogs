const prisma = require('../prisma')

const findComments = ({ article_id }) => {
  return prisma.comments.findMany({
    where: {
      article_id,
      deleted_at: null,
    },
  })
}

const createComment = ({ article_id, user_id, body }) => {
  return prisma.comments.create({
    data: {
      body,
      article_id,
      user_id,
    },
  })
}

const updateComment = ({ comment_id, body }) => {
  return prisma.comments.update({
    where: {
      id: comment_id,
    },
    data: {
      body,
      updated_at: new Date(),
    },
  })
}

const deleteComment = ({ comment_id }) => {
  return prisma.comments.update({
    where: {
      id: comment_id,
    },
    data: {
      deleted_at: new Date(),
    },
  })
}

module.exports = {
  findComments,
  createComment,
  updateComment,
  deleteComment,
}
