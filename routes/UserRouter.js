const express = require('express')
const router = express.Router({ mergeParams: true })

const { UserController } = require('../controllers')

router.post('/login', UserController.logIn)
router.post('/signup', UserController.signUp)

module.exports = router
