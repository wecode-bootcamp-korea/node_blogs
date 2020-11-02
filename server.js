require('dotenv').config()
const { PORT } = process.env
const http = require('http')
const express = require('express')
const prisma = require('./prisma')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json())

app.post('/users/signup', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email && !password)
      return res.status(400).json({ message: 'invalid input' })

    const hashedPassword = await bcrypt.hash(password, 10)

    const createdUser = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
      },
    })

    res.status(201).json({
      user: {
        id: createdUser.id,
        email: createdUser.email,
      },
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

app.post('/users/login', async (req, res) => {
  try {
    const { email, password: inputPassword } = req.body

    const foundUser = await prisma.users.findOne({ where: { email } })

    if (!foundUser) {
      const error = new Error('invalid input')
      error.statusCode = 400
      throw error
    }

    const { id, password: hashedPassword } = foundUser

    const isValidPassword = await bcrypt.compare(inputPassword, hashedPassword)

    if (!isValidPassword) {
      const error = new Error('invalid input')
      error.statusCode = 400
      throw error
    }

    const token = jwt.sign({ id }, 'node_blogs_secret_key', { expiresIn: '1h' })
    res.status(200).json({ message: 'login success', token })
  } catch (err) {
    res.status(err.statusCode).json({ message: err.message })
  }
})

const server = http.createServer(app)
const start = async () => {
  try {
    server.listen(PORT, () => console.log(`Server is listening on ${PORT}`))
  } catch (err) {
    console.error(err)
    await prisma.$disconnect()
  }
}

start()
