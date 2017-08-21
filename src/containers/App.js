import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './App.css'
import Messages from '../components/Messages'
import Input from '../components/Input'
import Username from '../components/Username'
import Users from '../components/Users'
import {
  appendMessage,
  setCurrentTab,
  addChatTab,
  initUser,
} from '../actions/index'
import { createMessage, GENERAL_MESSAGE, PRIVATE_MESSAGE } from '../socketAPI'
import { Panel, Grid, Row, Col, Tab, Tabs } from 'react-bootstrap'

class App extends Component {
  constructor(props) {
    super(props)
    // Allows { dispatch, socket } = this.props
    this.handleSendMessage = this.handleSendMessage.bind(this)
    this.handleTabSelect = this.handleTabSelect.bind(this)
    this.createItemClickHandler = this.createItemClickHandler.bind(this)
    this.initUsernameIfValid = this.initUsernameIfValid.bind(this)
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
      window.setTimeout(() => {
        this.inputElement.focus()
      }, 200)
    }
  }

  handleSendMessage(e) {
    const { username } = this.props
    if(e.key === 'Enter' && !e.target.value.match(/^\s*$/)) {
      const { dispatch, socket, currentTab } = this.props
      const message = (
        currentTab === 'General'
          ? createMessage(username, e.target.value, GENERAL_MESSAGE)
          : createMessage(username, e.target.value, PRIVATE_MESSAGE, currentTab)
      )
      dispatch(appendMessage(message))
      socket.emit(currentTab === 'General' ? GENERAL_MESSAGE : PRIVATE_MESSAGE, message)
      e.target.value = ""
    }
  }

  handleTabSelect(key) {
    const { dispatch } = this.props
    dispatch(setCurrentTab(key))
  }

  createItemClickHandler(user) {
    const { dispatch } = this.props
    return () => {
      dispatch(addChatTab(user))
      dispatch(setCurrentTab(user))
    }
  }

  initUsernameIfValid(username) {
    if (username.length <= 20 && !username.match(/^\s*$/)) {
      const { dispatch } = this.props
      dispatch(initUser(username))
    }
  }

  render() {
    console.log("App.render")
    const { messages, username, userList, chats, currentTab } = this.props
    return (
      <Grid>
        <Username username={username} initUsernameIfValid={this.initUsernameIfValid} />
        <Col
          lg={7} lgOffset={2}
          md={7} mdOffset={1}
          sm={7} smOffset={0}
          xs={7} xsOffset={0}
          className="full-height"
        >
          <Panel>
            <Row id="chat-display">
              <Tabs activeKey={currentTab} onSelect={this.handleTabSelect} id="message-tabs">
                <Tab key="General" eventKey="General" title="General">
                  <Messages messages={messages} />
                </Tab>
                { chats.map((user, i) => {
                  return (
                    <Tab key={user} eventKey={user} title={user}>
                      <Messages messages={
                        messages.filter(
                          m => m.to === user || (m.from === user && m.to === username))
                      } />
                    </Tab>
                  )
                })}
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
            <Users
              userList={userList}
              createItemClickHandler={this.createItemClickHandler}
            />
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
  chats: PropTypes.array.isRequired,
  currentTab: PropTypes.string.isRequired,
}

/* By default, the entire state is provided to the AsyncApp component through the prop variable.
  This function can filter/modify the prop values before they reach the component.
*/
function mapStateToProps(state) {
  const {
    receiveSocket,
    receiveMessage,
    username,
    userList,
    chats,
    currentTab,
  } = state

  return {
    socket: receiveSocket,
    messages: receiveMessage,
    username,
    userList,
    chats,
    currentTab,
  }
}

/* Any component wrapped with connect() call will receive a dispatch function as a prop,
  and any state it needs from the global state.
*/
export default connect(mapStateToProps)(App)
