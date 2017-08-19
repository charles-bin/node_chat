import { combineReducers } from 'redux'

import {
  REGISTER_SOCKET,
  APPEND_MESSAGE,
  SET_USERNAME,
  SET_USERLIST,
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
      return state.concat({
        username: action.username,
        message: action.message,
        type: action.messageType,
      })
    default:
      return state
  }
}

function username(state='', action) {
  switch (action.type) {
    case SET_USERNAME:
      return action.username
    default:
      return state
  }
}

function userList(state=[], action) {
  switch (action.type) {
    case SET_USERLIST:
      return action.userList
    default:
      return state
  }
}

function chats(state=[], action) {
  switch (action.type) {
    default:
      return state
  }
}

const rootReducer = combineReducers({
  receiveSocket,
  receiveMessage,
  username,
  userList,
  chats,
})

export default rootReducer
