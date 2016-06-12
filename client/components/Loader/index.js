import React, { Component } from 'react'

export default class Loader extends Component {
  render() {
    const style = require('./loader.css')

    return (
      <div className={style['loader-wrapper']}>
        <div className={style.loader}>
          <div className={style.spinner}>
            <div className={style.rect1} />
            <div className={style.rect2} />
            <div className={style.rect3} />
            <div className={style.rect4} />
            <div className={style.rect5} />
          </div>

          <p className={style['loader-message']}>Connecting to {__SERVER__}</p>
        </div>
      </div>
    )
  }
}