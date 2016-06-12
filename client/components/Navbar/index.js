import React, { Component } from 'react'
import classnames from 'classnames'

export default class Navbar extends Component {
  render () {
    const style = require('./navbar.css')
    const { connected } = this.props

    const server = __SERVER__ // eslint-disable-line
    const smtp = __SMTP__ // eslint-disable-line

    return (
      <div className={style.navbar}>
        <h1>SMTP-dev-tool</h1>
        <p className={classnames(style.status, { [style.connected]: connected })}>
          {`WS: http://${server} | SMTP: ${smtp}`}
        </p>
      </div>
    )
  }
}
