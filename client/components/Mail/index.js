import React, { Component } from 'react'

export default class Mail extends Component {
  constructor(props) {
    super(props)

    this.state = { iframeHeight: 'auto' }
    this.renderMeta = this.renderMeta.bind(this)
    this.onIframeMessage = this.onIframeMessage.bind(this)
  }

  onIframeMessage(e) {
    const { id } = this.props

    if (e.data.id === id) {
      this.setState({ iframeHeight: `${e.data.height}px`})
    }
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

  componentWillMount() {
    window.addEventListener('message', this.onIframeMessage)
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.onIframeMessage)
  }

  render() {
    const style = require('./mail.css')
    const { iframeHeight } = this.state
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

    const { id, subject, date, message } = this.props

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
          <iframe
            src={`http://${__SERVER__}/mail/${id}`}
            className={style['mail-body']}
            height={iframeHeight}
          />
        </div>
      </div>
    )
  }
}