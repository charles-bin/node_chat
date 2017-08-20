import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { GENERAL_MESSAGE, PRIVATE_MESSAGE, SERVER_MESSAGE } from '../socketAPI'

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
            { m.messageType === SERVER_MESSAGE ? m.body : m.from + ": " + m.body }
          </ListGroupItem>
        )
      })}
    </ListGroup>
  )
}
