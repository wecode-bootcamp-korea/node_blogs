const { AUTH_TOKEN_SALT } = process.env
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { UserService } = require('../services')
const { errorWrapper, errorGenerator } = require('../errors')

const signUp = errorWrapper(async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) errorGenerator({ statusCode: 400, message: 'invalid input' })

  const hashedPassword = await bcrypt.hash(password, 10)

  const foundUser = await UserService.findUser({ email })

  if (foundUser) errorGenerator({ statusCode: 409, message: 'duplicated' })

  const createdUser = await UserService.createUser({
    email,
    password: hashedPassword,
  })

  res.status(201).json({
    message: 'user created',
    email: createdUser.email,
  })
})

const logIn = errorWrapper(async (req, res, next) => {
  const { email, password: inputPassword } = req.body

  const foundUser = await UserService.findUser({ email })

  if (!foundUser) errorGenerator({ statusCode: 400, message: 'client input invalid' })

  const { id, password: hashedPassword } = foundUser
  const isValidPassword = await bcrypt.compare(inputPassword, hashedPassword)

  if (!isValidPassword) errorGenerator({ statusCode: 400, message: 'client input invalid' })

  const token = jwt.sign({ id }, AUTH_TOKEN_SALT)
  res.status(200).json({ message: 'login success!', token })
})

module.exports = {
  logIn,
  signUp,
}
