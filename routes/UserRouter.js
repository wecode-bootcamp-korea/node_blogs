const express = require('express')
const router = express.Router()
const { body } = require('express-validator')

const { UserController } = require('../controllers')

router.post(
  '/login',
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
  UserController.logIn
)
router.post(
  '/signup',
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
  UserController.signUp
)

module.exports = router
