import { combineReducers } from 'redux'

import {
  REGISTER_SOCKET,
  APPEND_MESSAGE,
  SET_USERNAME,
  SET_USERLIST,
  SET_CURRENT_TAB,
  ADD_CHAT_TAB,
  REMOVE_CHAT_TAB,
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
    case ADD_CHAT_TAB:
      return state.concat(action.user)
    case REMOVE_CHAT_TAB:
      return state.filter(user => user !== action.user)
    default:
      return state
  }
}

function currentTab(state='General', action) {
  switch (action.type) {
    case SET_CURRENT_TAB:
      return action.key
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
  currentTab,
})

export default rootReducer
