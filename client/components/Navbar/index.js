import React, { Component } from 'react'
import classnames from 'classnames'

export default class Navbar extends Component {
  render() {
    const style = require('./navbar.css')
    const { connected } = this.props

    return (
      <div className={style.navbar}>
        <h1>SMTP-dev-tool</h1>
        <p className={classnames(style.status, { [style.connected]: connected })}>
          {`WS: http://${__SERVER__} | SMTP: ${__SMTP__}`}
        </p>
      </div>
    )
  }
}