import React, { Component } from 'react'
import classnames from 'classnames'

export default class Navbar extends Component {
  render() {
    const style = require('./navbar.css')
    const { connected } = this.props
    const status = connected ? `Connected to ${__SERVER__}` : 'Disconnected'

    return (
      <div className={style.navbar}>
        <h1>SMTP-dev-tool</h1>
        <p className={classnames(style.status, { [style.connected]: connected })}>
          {status}
        </p>
      </div>
    )
  }
}