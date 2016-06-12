import React, { Component } from 'react'
import io from 'socket.io-client'
import Loader from '../components/Loader'
import Layout from '../components/Layout'

export default class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      connected: false,
      emails: [],
      filter: false
    }

    this.onSearch = this.onSearch.bind(this)
  }

  onSearch (e) {
    const filter = e.target.value

    if (filter.length < 3) {
      this.setState({ filter: false })
    } else {
      this.setState({ filter: filter.toLowerCase() })
    }
  }

  renderLoading () {
    return <Loader />
  }

  renderContent () {
    const { emails, filter, connected } = this.state

    const filteredEmails = emails.filter(e =>
      ~e.from.toLowerCase().indexOf(filter) ||
      ~e.to.indexOf(filter) ||
      ~e.subject.indexOf(filter)
    )

    const emailsToDisplay = filter ? filteredEmails : emails
    return (
      <Layout
        onSearch={this.onSearch}
        connected={connected}
        emails={emailsToDisplay}
      />
    )
  }

  componentDidMount () {
    const server = __SERVER__ // eslint-disable-line
    const socket = io.connect(server)
    socket.on('connect', () => (this.setState({ connected: true })))
    socket.on('disconnect', () => (this.setState({ connected: false })))
    socket.on('email:new', data => {
      this.setState({ emails: [data, ...this.state.emails] })
    })
  }

  render () {
    const { connected, emails } = this.state
    const isFirstLoad = !connected && !emails.length
    return isFirstLoad ? this.renderLoading() : this.renderContent()
  }
}
