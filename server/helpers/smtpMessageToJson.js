'use strict'

const cheerio = require('cheerio')
const uuid = require('node-uuid')

const smtpMessageToJson = input => {
  const parts = input.split('\r\n\r\n')
  const id = uuid.v4()
  const meta = parts[0]
  const messageRaw = parts.slice(1).join('\n')
  const email = meta.split('\n')
    .filter(str => str.length)
    .reduce((obj, current) => {
      if (~current.indexOf('SMTP/')) {
        obj.smtp = current
      } else {
        const sep = current.indexOf(':')
        const key = current.substr(0, sep).trim().toLowerCase()
        const value = current.substr(sep + 1).trim()

        obj[key] = value
      }

      return obj
    }, {})

  let message = messageRaw
    .split('=\r\n')
    .join(' ')
    .split('=3D')
    .join('=')

  const $ = cheerio.load(message)
  console.log('Generated id : ', id)
  $('body').append(
    `<script type="text/javascript">
      window.onload = function() {
        console.log('Posting to parent...')
        window.parent.postMessage({
          id: '${id}',
          height: document.body.scrollHeight,
        }, '*')
      }
    </script>`
  )

  email.message = $.html()
  email.id = id
  return email
}

module.exports = smtpMessageToJson
