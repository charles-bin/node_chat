import React from 'react'
import { Badge, Glyphicon, ListGroup, ListGroupItem } from 'react-bootstrap'

const listStyle = {
  'border-style': 'none',
  'margin-bottom': '1px',
}

export default function Users(props) {
  const { chats, userList, createToggleChatHandler } = props
  const orderedUserList = chats.concat(userList.filter(user => chats.indexOf(user) === -1))
  return (
    <div>
      <h4 style={{'whiteSpace': 'nowrap'}}>Online Users <Badge>{userList.length}</Badge></h4>
      <ListGroup>
        { orderedUserList.map((user, i) => {
          const handleItemClick = createToggleChatHandler(user)
          return (
            <ListGroupItem
              key={i}
              style={listStyle}
              onClick={handleItemClick}>
              { user}
              { chats.indexOf(user) !== -1 && <span> <Glyphicon glyph="comment" /></span> }
            </ListGroupItem>
          )
        })}
      </ListGroup>
    </div>
  )
}
