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
      // action.username is the username of the client
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

function chatTabs(state={tabs: {}, currentTab: "General"}, action) {
  switch (action.type) {
    case ADD_CHAT_TAB:
      if (Object.keys(state.tabs).indexOf(action.user) === -1) {
        return {...state, tabs: {...state.tabs, [action.user]: 0}}
      } else {
        return state
      }
    case REMOVE_CHAT_TAB:
      const filteredTabs = Object.keys(state.tabs).filter(
        user => user !== action.user
      ).reduce((obj, key) => {
        obj[key] = state.tabs[key]
        return obj
      }, {})
      return {...state, tabs: {...filteredTabs}}
    case APPEND_PRIVATE_MESSAGE:
      const message = action.message
      if (action.username === message.to && message.from !== state.currentTab) {
        return {...state, tabs: {...state.tabs, [message.from]: state.tabs[message.from] + 1}}
      } else {
        return state
      }
    case SET_CURRENT_TAB:
      if (action.key === "General") {
        return {...state, currentTab: action.key}
      } else {
        return {...state, tabs: {...state.tabs, [action.key]: 0}, currentTab: action.key}
      }
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
})

export default rootReducer
