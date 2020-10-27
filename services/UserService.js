const prisma = require('../prisma')
const makeDataForCreate = require('../utils/makeDataForCreate')

const createUser = (fields) => {
  const data = makeDataForCreate(fields)
  return prisma.users.create({ data })
}

const findUser = (field) => {
  const [uniqueKey] = Object.keys(field)
  return prisma.users.findOne({ where: { [uniqueKey]: field[uniqueKey] } })
}

module.exports = {
  createUser,
  findUser,
}
