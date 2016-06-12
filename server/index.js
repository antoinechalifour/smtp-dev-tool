const env = process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
const express = require('express')
const compression = require('compression')
const socketIo = require('socket.io')

const app = express()
const smtp = require('./smtp')
const config = require('../config')

const port = config.app.port
const host = config.app.host
const clientPort = config.client.port
const clientHost = config.client.host
const smtpPort = config.smtp.port
const smtpHost = config.smtp.host
const emails = {}

const server = app
  .use(compression())
  .use('/mail/:mid', (req, res) => {
    if (emails[req.params.mid]) {
      res.end(emails[req.params.mid].message)
    } else {
      res.status(404).end()
    }
  })
  .listen(
    port, host,
    () => {
      console.log(`===> Socket Server running @ http://${host}:${port}`)
      console.log(`===> Email preview available @ http://${clientHost}:${clientPort}`)
    }
  )

const io = socketIo(server)
const onEmail = email => {
  const id = email.id
  console.log(id)
  emails[id] = email
  io.emit('email:new', email)
}

smtp({ onEmail }).listen(
  smtpPort, smtpHost,
  () => {
    console.log(`===> SMTP server running @ smtp://${smtpHost}:${smtpPort}`)
  }
)
