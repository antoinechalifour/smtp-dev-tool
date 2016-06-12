const sharedConfig = {
  smtp: {
    port: process.env.SMTP_PORT,
    host: process.env.SMTP_HOST
  },
  app: {
    port: process.env.PORT,
    host: process.env.HOST
  },
  client: {
    port: Number(process.env.PORT) + 1,
    host: process.env.HOST
  }
}

module.exports = Object.assign({}, sharedConfig)
