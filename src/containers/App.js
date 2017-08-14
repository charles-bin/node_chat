import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './App.css'
import Messages from '../components/Messages'
import Input from '../components/Input'
import { initSocket } from '../actions/index'
import { Panel, Grid, Row, Col } from 'react-bootstrap'

class App extends Component {
  constructor(props) {
    super(props)
    // Allows { dispatch, socket } = this.props
    this.onKeyPressEnter = this.onKeyPressEnter.bind(this)
  }

  componentDidMount() {
    const { dispatch } = this.props
    console.log('componentDidMount')
    dispatch(initSocket())
  }

  onKeyPressEnter(e) {
    if(e.key === 'Enter') {
      const { socket } = this.props
      socket.emit('chat message', e.target.value)
      e.target.value = ""
    }
  }

  render() {
    const { messages } = this.props
    return (
      <Grid>
        <Col md={6} mdOffset={3} className="full-height">
          <Panel>
            <Row className="chat-display">
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
                  onKeyPressEnter={this.onKeyPressEnter}
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
}

/* By default, the entire state is provided to the AsyncApp component through the prop variable.
  This function can filter/modify the prop values before they reach the component.
*/
function mapStateToProps(state) {
  const { receiveSocket, receiveMessage } = state
  return {
    socket: receiveSocket,
    messages: receiveMessage,
  }
}

/* Any component wrapped with connect() call will receive a dispatch function as a prop,
  and any state it needs from the global state.
*/
export default connect(mapStateToProps)(App)
