const awsServerlessExpress = require('aws-serverless-express')
const app = require('./app')

const server = awsServerlessExpress.createServer(app)

exports.lambda_handler = (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false

  return awsServerlessExpress.proxy(server, event, context)
}
