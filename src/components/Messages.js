import React from 'react'

const listStyle = {
  'list-style-type': 'none',
  'margin': 0,
  'padding': 0,
}

export default function Messages(props) {
  return (
    <div>
      <ul style={listStyle}>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
    </div>
  )
}
