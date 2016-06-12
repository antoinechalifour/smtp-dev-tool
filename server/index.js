const env = process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
const socketIo = require('socket.io')

const smtp = require('./smtp')
const config = require('../config')

const port = config.app.port
const host = config.app.host
const clientPort = config.client.port
const clientHost = config.client.host
const smtpPort = config.smtp.port
const smtpHost = config.smtp.host

const io = socketIo.listen(port)

smtp({ io }).listen(
  smtpPort, smtpHost,
  () => {
    console.log(`===> SMTP server running @ smtp://${smtpHost}:${smtpPort}`)
    console.log(`===> Socket Server running @ http://${host}:${port}`)
    console.log(`===> Email preview available @ http://${clientHost}:${clientPort}`)
  }
)
