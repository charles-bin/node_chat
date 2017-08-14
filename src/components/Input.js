import React from 'react'
import { FormGroup, FormControl } from 'react-bootstrap'

export default function Input(props) {
  const { id, type, placeholder, onKeyPressEnter } = props
  return (
    <FormGroup controlId={id} >
      <FormControl
        type={type}
        placeholder={placeholder}
        onKeyPress={onKeyPressEnter}
      />
      <FormControl.Feedback />
    </FormGroup>
  )
}
