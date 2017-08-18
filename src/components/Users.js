import React from 'react'
import { Badge, ListGroup, ListGroupItem } from 'react-bootstrap'

const listStyle = {
  'border-style': 'none',
  'padding': '2px 5px',
}

export default function Users(props) {
  const { userList } = props
  return (
    <div>
      <h4 style={{'white-space': 'nowrap'}}>Online Users <Badge>{userList.length}</Badge></h4>
      <ListGroup>
        { userList.map((user, i) => {
          return <ListGroupItem key={i} style={listStyle}>{user}</ListGroupItem>
        })}
      </ListGroup>
    </div>
  )
}