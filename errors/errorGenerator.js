const DEFAULT_HTTP_STATUS_MESSAGES = {
  400: 'Bad Requests',
  401: 'Unauthorized',
  403: 'Foribdden',
  404: 'Not Found',
  500: 'Internal Server Error',
  503: 'Temporary Unavailable',
}

const errorGenerator = ({ message = '', statusCode = 500 }) => {
  const err = new Error(message || DEFAULT_HTTP_STATUS_MESSAGES[statusCode])
  err.statusCode = statusCode
  throw err
}

module.exports = errorGenerator
