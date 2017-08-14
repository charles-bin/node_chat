import { combineReducers } from 'redux'

import {
  REGISTER_SOCKET,
  APPEND_MESSAGE,
} from '../actions/index'

function receiveSocket(state={}, action) {
  switch (action.type) {
    case REGISTER_SOCKET:
      return action.socket
    default:
      return state
  }
}

function receiveMessage(state=[], action) {
  switch (action.type) {
    case APPEND_MESSAGE:
      return state.concat(action.message)
    default:
      return state
  }
}

const rootReducer = combineReducers({
  receiveSocket,
  receiveMessage,
})

export default rootReducer
