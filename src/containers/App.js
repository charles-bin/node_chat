import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './App.css'
import Messages from '../components/Messages'
import Input from '../components/Input'
import Username from '../components/Username'
import Users from '../components/Users'
import { appendMessage } from '../actions/index'
import { Panel, Grid, Row, Col, Tab, Tabs } from 'react-bootstrap'

class App extends Component {
  constructor(props) {
    super(props)
    // Allows { dispatch, socket } = this.props
    this.handleSendMessage = this.handleSendMessage.bind(this)
  }

  componentDidMount() {
    //const { dispatch, username } = this.props
    console.log('App.componentDidMount')
  }

  componentDidUpdate() {
    console.log('App.componentDidUpdate')

    const messageTabs = document.getElementById("message-tabs")
    const tabContent = messageTabs.getElementsByClassName("tab-content")[0]
    tabContent.scrollTop = tabContent.scrollHeight;

    if (this.inputElement !== null) {
      /*
        Must use arrow function here because a regular function's "this" will
        get bound to the window object upon execution. The arrow function's
        "this" will get bound to enclosing App object with the inputElement.
      */
      window.setTimeout(() => {
        this.inputElement.focus()
      }, 200)
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
    console.log("App.render")
    const { dispatch, messages, username, userList } = this.props
    return (
      <Grid>
        <Username dispatch={dispatch} username={username} />
        <Col
          lg={7} lgOffset={2}
          md={7} mdOffset={1}
          sm={7} smOffset={0}
          xs={7} xsOffset={0}
          className="full-height"
        >
          <Panel>
            <Row id="chat-display">
              <Tabs defaultActiveKey={1} id="message-tabs">
                <Tab eventKey={1} title="Tab 1"><Messages messages={messages} /></Tab>
                <Tab eventKey={2} title="Tab 2"><Messages messages={messages} /></Tab>
                <Tab eventKey={3} title="Tab 3"><Messages messages={messages} /></Tab>
              </Tabs>
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
        <Col
          lg={2}
          md={3}
          sm={3}
          xs={3}
          className="full-height"
        >
          <Panel id="user-list">
            <Users userList={userList}/>
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
  userList: PropTypes.array.isRequired,
}

/* By default, the entire state is provided to the AsyncApp component through the prop variable.
  This function can filter/modify the prop values before they reach the component.
*/
function mapStateToProps(state) {
  const { receiveSocket, receiveMessage, username, userList } = state
  return {
    socket: receiveSocket,
    messages: receiveMessage,
    username: username,
    userList: userList,
  }
}

/* Any component wrapped with connect() call will receive a dispatch function as a prop,
  and any state it needs from the global state.
*/
export default connect(mapStateToProps)(App)
