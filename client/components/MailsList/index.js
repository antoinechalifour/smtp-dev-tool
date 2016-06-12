import React, { Component } from 'react'
import Mail from '../Mail'

export default class MailsList extends Component {
  renderEmpty() {
    const style = require('./mails-list.css')

    return (
      <div>
        <p className={style['empty-message']}>
          Your dev mailbox is empty.
        </p>
        <p className={style['empty-message']}>
          All messages sent to {__SMTP__} will appear on this page.
        </p>
      </div>
    )
  }

  renderList() {
    const style = require('./mails-list.css')
    const { emails } = this.props

    return (
      <div>
        {emails.map(email => <Mail key={email.id} {...email} />)}
      </div>
    )
  }

  render() {
    const style = require('./mails-list.css')
    const { emails } = this.props
    const content = emails.length === 0 ? this.renderEmpty() : this.renderList()

    return (
      <div className={style['mails-list']}>
        {content}
      </div>
    )
  }
}