import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './App.css'
import Messages from '../components/Messages'
import Input from '../components/Input'
const io = require('socket.io-client')

class App extends Component {
  constructor(props) {
    super(props)
    this.handleSearchEnter = this.handleSearchEnter.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    //dispatch(loadAuthClient())
    console.log('componentDidMount')
    const socket = io()
    socket.emit('test', {})
  }

  handleSearchEnter(e) {
    if(e.key === 'Enter') {
      const { dispatch } = this.props
      //dispatch(fetchChannelIfNeeded(e.target.value))
    }
  }

  render() {
    return (
      <div>
        <Messages />
        <Input />
      </div>
    )
  }
}

App.propTypes = {
}

/* By default, the entire state is provided to the AsyncApp component through the prop variable.
  This function can filter/modify the prop values before they reach the component.
*/
function mapStateToProps(state) {
  return {
    state
  }
}

/* Any component wrapped with connect() call will receive a dispatch function as a prop,
  and any state it needs from the global state.
*/
export default connect(mapStateToProps)(App)
