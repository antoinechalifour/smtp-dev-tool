import React, { Component } from 'react'

export default class Search extends Component {
  render () {
    const style = require('./search.css')
    const { onSearch } = this.props

    return (
      <div className={style['search-wrapper']}>
        <input
          className={style.search}
          placeholder='Filter emails...'
          onChange={onSearch}
        />
      </div>
    )
  }
}
