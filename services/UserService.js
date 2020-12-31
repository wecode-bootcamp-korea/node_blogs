const prisma = require('../prisma')

const createUser = (fields) => {
  return prisma.users.create({ data: fields })
}

const findUser = (field) => {
  const [uniqueKey] = Object.keys(field)

  const isKeyId = uniqueKey === 'id'
  const value = isKeyId ? Number(field[uniqueKey]) : field[uniqueKey]

  return prisma.users.findUnique({ where: { [uniqueKey]: value } })
}

module.exports = {
  createUser,
  findUser,
}
