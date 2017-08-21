import {
  GENERAL_MESSAGE,
  PRIVATE_MESSAGE,
  SERVER_MESSAGE,
  USERLIST_UPDATE,
  USERNAME_RESPONSE,
  createMessage,
} from '../socketAPI'

export const REGISTER_SOCKET = 'REGISTER_SOCKET'
export const APPEND_MESSAGE = 'APPEND_MESSAGE'
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
      dispatch(appendMessage(message))
    })

    socket.on(SERVER_MESSAGE, (message) => {
      dispatch(appendMessage(message))
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

export function appendMessage(message) {
  return {
    type: APPEND_MESSAGE,
    message,
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
