import React from 'react'

const listStyle = {
  'listStyleType': 'none',
  'margin': 0,
  'padding': 0,
}

export default function Messages(props) {
  const { messages } = props
  return (
    <div>
      <ul style={listStyle}>
        { messages.map((v, i) => {
          return <li key={i}>{v}</li>
        })}
      </ul>
    </div>
  )
}
