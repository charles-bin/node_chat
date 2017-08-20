import React from 'react'
import { Badge, ListGroup, ListGroupItem } from 'react-bootstrap'

const listStyle = {
  'border-style': 'none',
  'padding': '2px 5px',
}

export default function Users(props) {
  const { userList, createItemClickHandler } = props
  return (
    <div>
      <h4 style={{'whiteSpace': 'nowrap'}}>Online Users <Badge>{userList.length}</Badge></h4>
      <ListGroup>
        { userList.map((user, i) => {
          const handleItemClick = createItemClickHandler(user)
          return (
            <ListGroupItem
              key={i}
              style={listStyle}
              onClick={handleItemClick}>
              {user}
            </ListGroupItem>
          )
        })}
      </ListGroup>
    </div>
  )
}
