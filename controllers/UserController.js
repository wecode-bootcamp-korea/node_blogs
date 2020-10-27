const { AUTH_TOKEN_SALT } = process.env
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { UserService } = require('../services')
const errorGenerator = require('../utils/errorGenerator')

const signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const foundUser = await UserService.findUser({ email })

    if (foundUser) errorGenerator({ statusCode: 409, message: 'duplicated' })

    const createdUser = await UserService.createUser({
      email,
      password: hashedPassword,
    })

    res.status(201).json({
      message: 'user created',
      user_id: createdUser.id,
    })
  } catch (err) {
    next(err)
  }
}

const logIn = async (req, res, next) => {
  try {
    const { email, password: inputPassword } = req.body

    const foundUser = await UserService.findUser({ email })

    if (!foundUser)
      errorGenerator({ statusCode: 400, message: 'client input invalid' })

    const { id, password: hashedPassword } = foundUser
    const isValidPassword = await bcrypt.compare(inputPassword, hashedPassword)

    if (!isValidPassword)
      errorGenerator({ statusCode: 400, message: 'client input invalid' })

    const token = jwt.sign({ id }, AUTH_TOKEN_SALT, { expiresIn: '1h' })
    res.status(200).json({ message: 'login success!', token })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  logIn,
  signUp,
}
