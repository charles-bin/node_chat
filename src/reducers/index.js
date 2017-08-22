import { combineReducers } from 'redux'

import {
  REGISTER_SOCKET,
  APPEND_GENERAL_MESSAGE,
  APPEND_PRIVATE_MESSAGE,
  SET_USERNAME,
  SET_USERNAME_FEEDBACK,
  SET_USERLIST,
  SET_CURRENT_TAB,
  ADD_CHAT_TAB,
  REMOVE_CHAT_TAB,
} from '../actions/index'

function receiveSocket(state=null, action) {
  switch (action.type) {
    case REGISTER_SOCKET:
      return action.socket
    default:
      return state
  }
}

function receiveMessage(state={General: []}, action) {
  const message = action.message
  switch (action.type) {
    case APPEND_GENERAL_MESSAGE:
      return Object.assign({}, state, {
        General: state.General.concat(message)
      })
    case APPEND_PRIVATE_MESSAGE:
      const key = action.username === message.from ? message.to : message.from
      if (Object.keys(state).indexOf(key) === -1) {
        return Object.assign({}, state, {
          [key]: [message]
        })
      } else {
        return Object.assign({}, state, {
          [key]: state[key].concat(message)
        })
      }
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

function usernameFeedback(state='', action) {
  switch (action.type) {
    case SET_USERNAME_FEEDBACK:
      return action.feedback
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

function chatTabs(state=[], action) {
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
  usernameFeedback,
  userList,
  chatTabs,
  currentTab,
})

export default rootReducer
