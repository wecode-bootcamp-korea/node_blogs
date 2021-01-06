const { validationResult } = require('express-validator')
const errorGenerator = require('./errorGenerator')

const errorWrapper = (controller) => async (req, res, next) => {
  try {
    const errors = validationResult(req)
    console.log(errors)
    if (!errors.isEmpty()) errorGenerator({ statusCode: 400 })

    await controller(req, res, next)
  } catch (err) {
    next(err)
  }
}

module.exports = errorWrapper
