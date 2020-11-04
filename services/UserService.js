const prisma = require('../prisma')
const { makeDataForCreate } = require('../utils')

const createUser = (fields) => {
  const data = makeDataForCreate(fields)
  return prisma.users.create({ data })
}

const findUser = (field) => {
  const [uniqueKey] = Object.keys(field)

  const isKeyId = uniqueKey === 'id'
  const value = isKeyId ? Number(field[uniqueKey]) : field[uniqueKey]

  return prisma.users.findOne({ where: { [uniqueKey]: value } })
}

module.exports = {
  createUser,
  findUser,
}
