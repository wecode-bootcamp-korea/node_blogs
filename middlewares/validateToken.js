const { errorGenerator } = require('../utils')
const { UserService } = require('../services')
const { AUTH_TOKEN_SALT } = process.env
const jwt = require('jsonwebtoken')

const validateToken = async (req, res, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(' ')
    const { id } = jwt.verify(token, AUTH_TOKEN_SALT)

    const foundUser = await UserService.findUser({ id })

    if (!foundUser)
      errorGenerator({ statusCode: 404, message: 'user not found' })

    req.foundUser = foundUser
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = validateToken
