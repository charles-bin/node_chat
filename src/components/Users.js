import React from 'react'
import { Badge, Glyphicon, ListGroup, ListGroupItem } from 'react-bootstrap'

const listStyle = {
  'borderStyle': 'none',
  'marginBottom': '1px',
}

export default function Users(props) {
  const { username, chatTabs, userList, createToggleChatHandler } = props
  const orderedUserList = userList.filter(
    user => chatTabs.indexOf(user) !== -1
  ).concat(userList.filter(
    user => chatTabs.indexOf(user) === -1)
  )
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
              onClick={ username !== user && handleItemClick}>
              { user}
              { chatTabs.indexOf(user) !== -1 && <span> <Glyphicon glyph="comment" /></span> }
            </ListGroupItem>
          )
        })}
      </ListGroup>
    </div>
  )
}
