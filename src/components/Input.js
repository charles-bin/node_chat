import React from 'react'
import { FormGroup, FormControl } from 'react-bootstrap'

export default function Input(props) {
  const { id, type, placeholder, onKeyPress, inputRef } = props
  return (
    <FormGroup controlId={id} >
      <FormControl
        type={type}
        placeholder={placeholder}
        onKeyPress={onKeyPress}
        inputRef={inputRef}
      />
      <FormControl.Feedback />
    </FormGroup>
  )
}
