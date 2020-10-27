module.exports = ({ message, statusCode = 500 }) => {
  const err = new Error(message)
  err.status = statusCode
  throw err
}
