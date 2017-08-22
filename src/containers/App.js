import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './App.css'
import Messages from '../components/Messages'
import Input from '../components/Input'
import Username from '../components/Username'
import Users from '../components/Users'
import {
  initSocket,
  appendMessage,
  setCurrentTab,
  addChatTab,
  removeChatTab,
} from '../actions/index'
import {
  createMessage,
  GENERAL_MESSAGE,
  PRIVATE_MESSAGE,
  USERNAME_REQUEST,
} from '../socketAPI'
import { Panel, Grid, Row, Col, Tab, Tabs } from 'react-bootstrap'

class App extends Component {
  constructor(props) {
    super(props)
    // Allows { dispatch, socket } = this.props
    this.handleSendMessage = this.handleSendMessage.bind(this)
    this.handleTabSelect = this.handleTabSelect.bind(this)
    this.createToggleChatHandler = this.createToggleChatHandler.bind(this)
    this.requestUsernameIfValid = this.requestUsernameIfValid.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    console.log('App.componentDidMount')
    dispatch(initSocket())
  }

  componentDidUpdate() {
    console.log('App.componentDidUpdate')
    const { username } = this.props
    const messageTabs = document.getElementById("message-tabs")
    const tabContent = messageTabs.getElementsByClassName("tab-content")[0]
    tabContent.scrollTop = tabContent.scrollHeight;

    if (this.inputElement !== null && username !== '') {
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

  createToggleChatHandler(user) {
    const { dispatch, chatTabs } = this.props
    return () => {
      const index = chatTabs.indexOf(user)
      if (index === -1) {
        dispatch(addChatTab(user))
        dispatch(setCurrentTab(user))
      } else if (index === 0) {
        dispatch(removeChatTab(user))
        dispatch(setCurrentTab('General'))
      } else {
        dispatch(removeChatTab(user))
        dispatch(setCurrentTab(chatTabs[index-1]))
      }
    }
  }

  requestUsernameIfValid(username) {
    if (username.length <= 20 && !username.match(/^\s*$/)) {
      const { socket } = this.props
      if (socket) {
        socket.emit(USERNAME_REQUEST, username)
      }
    }
  }

  render() {
    console.log("App.render")
    const {
      dispatch,
      messages,
      username,
      usernameFeedback,
      userList,
      chatTabs,
      currentTab
    } = this.props

    return (
      <Grid>
        <Username
          dispatch={dispatch}
          username={username}
          usernameFeedback={usernameFeedback}
          requestUsernameIfValid={this.requestUsernameIfValid}
        />
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
                { chatTabs.map((user, i) => {
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
              username={username}
              chatTabs={chatTabs}
              userList={userList}
              createToggleChatHandler={this.createToggleChatHandler}
            />
          </Panel>
        </Col>
      </Grid>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  socket: PropTypes.object,
  messages: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
  userList: PropTypes.array.isRequired,
  chatTabs: PropTypes.array.isRequired,
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
    usernameFeedback,
    userList,
    chatTabs,
    currentTab,
  } = state

  return {
    socket: receiveSocket,
    messages: receiveMessage,
    username,
    usernameFeedback,
    userList,
    chatTabs,
    currentTab,
  }
}

/* Any component wrapped with connect() call will receive a dispatch function as a prop,
  and any state it needs from the global state.
*/
export default connect(mapStateToProps)(App)
