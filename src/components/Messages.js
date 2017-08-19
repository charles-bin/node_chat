import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { MESSAGE_TYPE_CHAT, MESSAGE_TYPE_UPDATE } from '../actions/index'

const listStyle = {
  'background': '#f5f5f5',
}

export default function Messages(props) {
  const { messages } = props
  return (
    <ListGroup style={{'marginBottom': 0}}>
      { messages.map((m, i) => {
        const style = i % 2 === 0 ? listStyle : {}
        return (
          <ListGroupItem key={i} style={style}>
            { m.type === MESSAGE_TYPE_CHAT ? m.username + ": " + m.message : m.message}
          </ListGroupItem>
        )
      })}
    </ListGroup>
  )
}
