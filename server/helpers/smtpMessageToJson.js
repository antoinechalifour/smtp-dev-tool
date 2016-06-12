const smtpMessageToJson = input => {
  const fieldsReg = /([a-z\-]*): ?(.*)/ig
  const params = input.split('\n')
    .map(line => {
      const isMatch = line.match(fieldsReg)
      const json = {}
      if (isMatch) {
        const parts = line.split(':')
        const key = parts[0].toLowerCase().trim()
        json[key] = parts[1]
      } else if (~line.indexOf('SMTP/')) {
        json.smtp = line
      } else if (line.trim().length > 0) {
        json.message = line
      }

      return json
    })
    .filter(json => Object.keys(json).length)

  const message = params
    .filter(field => !!field.message)
    .reduce((concat, current) => {
      concat += '\n'
      concat += current.message
      return concat
    }, '')

  const email = params.reduce((obj, current) => {
    Object.assign(obj, current)
    return obj
  }, {})

  email.message = message
  return email
}

module.exports = smtpMessageToJson