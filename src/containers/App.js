import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './App.css'
import Messages from '../components/Messages'
import Input from '../components/Input'
import Username from '../components/Username'
import { appendMessage } from '../actions/index'
import { Panel, Grid, Row, Col } from 'react-bootstrap'

class App extends Component {
  constructor(props) {
    super(props)
    // Allows { dispatch, socket } = this.props
    this.handleSendMessage = this.handleSendMessage.bind(this)
  }

  componentDidMount() {
    //const { dispatch, username } = this.props
    console.log('componentDidMount')
  }

  componentDidUpdate() {
    var element = document.getElementById("chat-display");
    element.scrollTop = element.scrollHeight;
    if (this.inputElement !== null) {
      this.inputElement.focus()
    }
  }

  handleSendMessage(e) {
    const { username } = this.props
    if(e.key === 'Enter' && !e.target.value.match(/^\s*$/)) {
      const { dispatch, socket } = this.props
      dispatch(appendMessage(username + ': ' + e.target.value))
      socket.emit('chat message', username, e.target.value)
      e.target.value = ""
    }
  }

  render() {
    const { dispatch, messages, username } = this.props
    return (
      <Grid>
        <Col md={6} mdOffset={3} className="full-height">
          <Username dispatch={dispatch} username={username} />
          <Panel>
            <Row id="chat-display">
              <Col md={12}>
                <Messages messages={messages} />
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Input
                  id="sendMessageForm"
                  type="text"
                  placeholder=""
                  onKeyPress={this.handleSendMessage}
                  inputRef={input => this.inputElement = input}
                />
              </Col>
            </Row>
          </Panel>
        </Col>
      </Grid>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  socket: PropTypes.object.isRequired,
  messages: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
}

/* By default, the entire state is provided to the AsyncApp component through the prop variable.
  This function can filter/modify the prop values before they reach the component.
*/
function mapStateToProps(state) {
  const { receiveSocket, receiveMessage, username } = state
  return {
    socket: receiveSocket,
    messages: receiveMessage,
    username: username,
  }
}

/* Any component wrapped with connect() call will receive a dispatch function as a prop,
  and any state it needs from the global state.
*/
export default connect(mapStateToProps)(App)
