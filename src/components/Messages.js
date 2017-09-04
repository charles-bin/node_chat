import React from 'react'
import PropTypes from 'prop-types'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { SERVER_MESSAGE } from '../socketAPI'

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

Messages.propTypes = {
  messages: PropTypes.array.isRequired,
}

Messages.defaultProps = {
  messages: [],
}
