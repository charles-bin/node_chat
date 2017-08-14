import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

const listStyle = {
  'background': '#f5f5f5',
}

export default function Messages(props) {
  const { messages } = props
  return (
    <ListGroup>
      { messages.map((v, i) => {
        const style = i % 2 === 0 ? listStyle : {}
        return <ListGroupItem key={i} style={style}>{v}</ListGroupItem>
      })}
    </ListGroup>
  )
}
