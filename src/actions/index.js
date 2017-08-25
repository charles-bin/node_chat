import {
  GENERAL_MESSAGE,
  PRIVATE_MESSAGE,
  SERVER_MESSAGE,
  USERLIST_UPDATE,
  USERNAME_RESPONSE,
} from '../socketAPI'

export const REGISTER_SOCKET = 'REGISTER_SOCKET'
export const APPEND_GENERAL_MESSAGE = 'APPEND_GENERAL_MESSAGE'
export const APPEND_PRIVATE_MESSAGE = 'APPEND_PRIVATE_MESSAGE'
export const SET_USERNAME = 'SET_USERNAME'
export const SET_USERNAME_FEEDBACK = 'SET_USERNAME_FEEDBACK'
export const SET_USERLIST = 'SET_USERLIST'
export const SET_CURRENT_TAB = 'SET_CURRENT_TAB'
export const ADD_CHAT_TAB = 'ADD_CHAT_TAB'
export const REMOVE_CHAT_TAB = 'REMOVE_CHAT_TAB'

export function initSocket() {
  return dispatch => {
    const io = require('socket.io-client')
    const socket = io()
    dispatch(registerSocket(socket))

    socket.on(GENERAL_MESSAGE, (message) => {
      dispatch(appendGeneralMessage(message))
    })

    socket.on(PRIVATE_MESSAGE, (message) => {
      dispatch(addChatTab(message.from))
      dispatch(appendPrivateMessage(message, message.to))
    })

    socket.on(SERVER_MESSAGE, (message) => {
      dispatch(appendGeneralMessage(message))
    })

    socket.on(USERLIST_UPDATE, (userList) => {
      dispatch(setUserList(userList))
    })

    socket.on(USERNAME_RESPONSE, (response) => {
      const { username, approved, feedback } = response
      if (approved) {
        dispatch(setUsername(username))
      } else {
        dispatch(setUsernameFeedback(feedback))
      }
    })
  }
}

function registerSocket(socket) {
  return {
    type: REGISTER_SOCKET,
    socket
  }
}

export function appendGeneralMessage(message) {
  return {
    type: APPEND_GENERAL_MESSAGE,
    message,
  }
}

export function appendPrivateMessage(message, username) {
  return {
    type: APPEND_PRIVATE_MESSAGE,
    message,
    username,
  }
}

function setUsername(username) {
  return {
    type: SET_USERNAME,
    username
  }
}

export function setUsernameFeedback(feedback) {
  return {
    type: SET_USERNAME_FEEDBACK,
    feedback
  }
}

export function setUserList(userList) {
  return {
    type: SET_USERLIST,
    userList
  }
}

export function setCurrentTab(key) {
  return {
    type: SET_CURRENT_TAB,
    key
  }
}

export function addChatTab(user) {
  return {
    type: ADD_CHAT_TAB,
    user
  }
}

export function removeChatTab(user) {
  return {
    type: REMOVE_CHAT_TAB,
    user
  }
}
