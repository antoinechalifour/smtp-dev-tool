import React, { Component } from 'react'
import MailsList from '../MailsList'
import Navbar from '../Navbar'
import Search from '../Search'

export default class Layout extends Component {
  render() {
    return (
      <div>
        <Navbar {...this.props} />
        <Search {...this.props} />
        <MailsList {...this.props} />
      </div>
    )
  }
}