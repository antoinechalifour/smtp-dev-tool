const env = process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
const nodemailer = require('nodemailer')
const config = require('../config')
const smtpHost = config.smtp.host
const smtpPort = config.smtp.port
const transport = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
})

const mailOptions = {
  encoding: 'utf8',
  from: 'john.doe@test.com',
  to: 'jane.doe@formetris.com',
  subject: 'Hi there',
  html: `
    <div>
      <h1>Hello,</h1>
      <p>Rifle boat decay warehouse Kowloon A.I. rebar euro-pop tattoo crypto-savant. Chrome San Francisco knife saturation point rifle assassin corporation. Paranoid bicycle weathered saturation point shoes long-chain hydrocarbons footage modem cartel otaku tower hacker gang render-farm garage wonton soup pen. Sprawl warehouse jeans footage semiotics tower corrupted free-market digital singularity concrete shoes order-flow garage computer geodesic BASE jump. Face forwards bridge neon garage narrative car paranoid shrine rain corporation dome. Advert dead Tokyo monofilament media meta--ware Legba. </p>
      <p>Youtube rifle denim narrative Tokyo artisanal car sign market tiger-team modem human systema woman gang. Tanto sentient fluidity range-rover corporation-space marketing monofilament ablative office nano-concrete sprawl hotdog. Boy office courier j-pop gang sentient tower narrative engine bicycle construct human. </p>
    </div>
  `
}

console.log(`Sending mail to: smtp://${smtpHost}:${smtpPort}`)
transport.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.error('===> 🤖  Error')
    console.error(err)
  } else {
    console.log('✔  Email sent️')
    console.log(info)
  }
})