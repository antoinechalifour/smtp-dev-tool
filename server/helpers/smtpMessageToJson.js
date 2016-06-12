const smtpMessageToJson = input => {
  const parts = input.split('\n\r\n\r')
  const meta = parts[0]
  const messageRaw = parts.slice(1).join('\n')
  const fieldsReg = /([a-z\-]*): ?(.*)/ig
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

  const message = messageRaw
    .split('=\r\n')
    .join(' ')
    .split('=3D')
    .join('=')
  email.message = message
  return email
}

module.exports = smtpMessageToJson