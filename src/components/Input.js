import React from 'react'

export default function Input(props) {
  const onKeyPressEnter = props.onKeyPressEnter
  return (
    <div>
      <input onKeyPress={onKeyPressEnter} />
      <button>Send</button>
    </div>
  )
}
