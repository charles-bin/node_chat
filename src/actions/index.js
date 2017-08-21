import {
  GENERAL_MESSAGE,
  PRIVATE_MESSAGE,
  SERVER_MESSAGE,
  USERLIST_UPDATE,
  createMessage,
} from '../socketAPI'

export const REGISTER_SOCKET = 'REGISTER_SOCKET'
export const APPEND_MESSAGE = 'APPEND_MESSAGE'
export const SET_USERNAME = 'SET_USERNAME'
export const SET_USERLIST = 'SET_USERLIST'
export const SET_CURRENT_TAB = 'SET_CURRENT_TAB'
export const ADD_CHAT_TAB = 'ADD_CHAT_TAB'
export const REMOVE_CHAT_TAB = 'REMOVE_CHAT_TAB'

export function initSocket(username) {
  return dispatch => {
    const io = require('socket.io-client')
    const socket = io({
      query: {
        username
      }
    })
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

export function initUser(username) {
  return dispatch => {
    dispatch(initSocket(username))
    dispatch(setUsername(username))
  }
}

function setUsername(username) {
  return {
    type: SET_USERNAME,
    username
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
