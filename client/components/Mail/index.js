import React, { Component } from 'react'

export default class Mail extends Component {
  constructor(props) {
    super(props)

    this.renderMeta = this.renderMeta.bind(this)
  }

  renderMeta(meta, index) {
    const style = require('./mail.css')

    return (
      <div key={index} className={style.meta}>
        <p className={style['meta-name']}>{meta.name}</p>
        <p className={style['meta-value']}>{meta.value}</p>
      </div>
    )
  }

  render() {
    const style = require('./mail.css')
    const meta = Object.keys(this.props)
      .filter(x =>
        x !== 'subject'
        && x !== 'message'
        && x !== 'from'
        && x !== 'to'
        && x !== 'date'
      )
      .map(key => ({ name: key, value: this.props[key]}))

    const recipients = Object.keys(this.props)
      .filter(x =>
        x === 'from'
        || x === 'to'
      )
      .map(key => ({ name: key, value: this.props[key]}))

    const { subject, date, message } = this.props

    return (
      <div className={style.mail}>
        <div className={style['mail-meta-block']}>
          {meta.map(this.renderMeta)}
        </div>
        <hr />
        <div className={style['mail-meta-block']}>
          {recipients.map(this.renderMeta)}
        </div>
        <hr />
        <div className={style['mail-content']}>
          <div className={style['mail-title']}>
            <h2>Subject: {subject}</h2>
            <p>Sent on: {date}</p>
          </div>
          <div
            className={style['mail-body']}
            dangerouslySetInnerHTML={{__html: message}}
          />
        </div>
      </div>
    )
  }
}