import React from 'react'
import { Badge, Glyphicon, ListGroup, ListGroupItem } from 'react-bootstrap'

const listItemStyle = {
  'borderStyle': 'none',
  'marginBottom': '1px',
  'paddingLeft': '20px',
}

const groupStyle = {
  'height': '88%',
  'overflow': 'auto',
  'overflowWrap': 'break-word',
}

const divStyle = {
  'height': '100%',
}

const headerStyle = {
  'whiteSpace': 'nowrap',
  'borderBottom': '1px solid #ddd',
  'padding': '0 8px 13px 8px',
}

export default function Users(props) {
  const { username, chatTabs, userList, createToggleChatHandler } = props
  const orderedUserList = userList.filter(
    user => chatTabs.indexOf(user) !== -1
  ).concat(userList.filter(
    user => chatTabs.indexOf(user) === -1)
  )
  return (
    <div style={divStyle}>
      <h4 style={headerStyle}>Online Users <Badge>{userList.length}</Badge></h4>
      <ListGroup style={groupStyle}>
        { orderedUserList.map((user, i) => {
          const handleItemClick = createToggleChatHandler(user)
          return (
            <ListGroupItem
              key={i}
              style={ i === 0 ? {...listItemStyle, 'marginTop': '1px'} : listItemStyle}
              onClick={ username !== user ? handleItemClick : null }>
              { user}
              { chatTabs.indexOf(user) !== -1 && <span> <Glyphicon glyph="comment" /></span> }
            </ListGroupItem>
          )
        })}
      </ListGroup>
    </div>
  )
}
