import React, { Component } from 'react'
import { Modal, Button, FormGroup, FormControl, HelpBlock } from 'react-bootstrap'
import { initUser } from '../actions/index'

export default class Username extends Component {

  constructor(props) {
    super(props)
    this.handleEnterUsername = this.handleEnterUsername.bind(this)
    this.handleSubmitUsername = this.handleSubmitUsername.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.state = { input: '' }
  }

  componentDidMount() {
    if (this.inputElement !== null) {
      this.inputElement.focus()
    }
  }

  handleEnterUsername(e) {
    if (e.key === 'Enter') {
      this.validateUsername(e.target.value)
    }
  }

  handleSubmitUsername() {
    this.validateUsername(this.state.input)
  }

  validateUsername(username) {
    if (username.length <= 20 && !username.match(/^\s*$/)) {
      const { dispatch } = this.props
      dispatch(initUser(username))
    }
  }

  handleInputChange(e) {
    this.setState({ input: e.target.value })
  }

  getValidationState() {
    return (this.state.input.length > 20) ? 'error' : null
  }

  render() {
    const { username } = this.props
    return (
      <Modal bsSize="small" show={username === ''}>
        <Modal.Header>
          <Modal.Title>Enter Username</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup
            controlId="setUsernameForm"
            validationState={this.getValidationState()}
          >
            <FormControl
              type="text"
              placeholder=""
              onKeyPress={this.handleEnterUsername}
              onChange={this.handleInputChange}
              inputRef={input => { this.inputElement = input }}
            />
            <FormControl.Feedback />
            { this.getValidationState() === 'error' &&
              <HelpBlock>Character limit exceeded</HelpBlock>
            }
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleSubmitUsername}>Submit</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
