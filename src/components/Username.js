import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import Input from './Input'
import { setUsername } from '../actions/index'

export default class Username extends Component {

  constructor(props) {
    super(props)
    this.handleEnterUsername = this.handleEnterUsername.bind(this)
    this.handleSubmitUsername = this.handleSubmitUsername.bind(this)
  }

  componentDidUpdate() {
    if (this.inputElement !== null) {
      this.inputElement.focus()
    }
  }

  handleEnterUsername(e) {
    if (e.key === 'Enter' && !e.target.value.match(/^\s*$/)) {
      const { dispatch } = this.props
      dispatch(setUsername(e.target.value))
    }
  }

  handleSubmitUsername() {
    const e = this.inputElement
    if (!e.value.match(/^\s*$/)) {
      const { dispatch } = this.props
      dispatch(setUsername(e.value))
    }
  }

  render() {
    const { username } = this.props
    return (
      <Modal show={username === ''}>
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
