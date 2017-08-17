import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import Input from './Input'
import { initUser } from '../actions/index'

export default class Username extends Component {

  constructor(props) {
    super(props)
    this.handleEnterUsername = this.handleEnterUsername.bind(this)
    this.handleSubmitUsername = this.handleSubmitUsername.bind(this)
  }

  componentDidMount() {
    if (this.inputElement !== null) {
      this.inputElement.focus()
      window.userel = this.inputElement
    }
  }

  handleEnterUsername(e) {
    if (e.key === 'Enter' && !e.target.value.match(/^\s*$/)) {
      const { dispatch } = this.props
      dispatch(initUser(e.target.value))
    }
  }

  handleSubmitUsername() {
    const e = this.inputElement
    if (!e.value.match(/^\s*$/)) {
      const { dispatch } = this.props
      dispatch(initUser(e.value))
    }
  }

  render() {
    const { username } = this.props
    return (
      <Modal bsSize="small" show={username === ''}>
        <Modal.Header>
          <Modal.Title>Enter Username</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            id="setUsernameForm"
            type="text"
            placeholder=""
            onKeyPress={this.handleEnterUsername}
            inputRef={input => this.inputElement = input}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleSubmitUsername}>Submit</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
