import React from 'react'
import { Badge, Glyphicon, ListGroup, ListGroupItem } from 'react-bootstrap'

const listStyle = {
  'borderStyle': 'none',
  'marginBottom': '1px',
}

const groupStyle = {
  'height': '88%',
  'overflow': 'auto',
  'overflowWrap': 'break-word',
  'marginTop': '15%',
}

const divStyle = {
  'height': '100%',
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
      <h4 style={{'whiteSpace': 'nowrap'}}>Online Users <Badge>{userList.length}</Badge></h4>
      <ListGroup style={groupStyle}>
        { orderedUserList.map((user, i) => {
          const handleItemClick = createToggleChatHandler(user)
          return (
            <ListGroupItem
              key={i}
              style={ i > 0 ? listStyle : Object.assign({}, listStyle, {'paddingTop': 0}) }
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
