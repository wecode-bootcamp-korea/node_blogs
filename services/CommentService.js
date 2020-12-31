const prisma = require('../prisma')

const fetchComments = ({ article_id }) => {
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
      article_id,
      user_id,
      body,
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
  fetchComments,
  createComment,
  updateComment,
  deleteComment,
}
