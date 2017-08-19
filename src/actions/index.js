export const REGISTER_SOCKET = 'REGISTER_SOCKET'
export const APPEND_MESSAGE = 'APPEND_MESSAGE'
export const SET_USERNAME = 'SET_USERNAME'
export const SET_USERLIST = 'SET_USERLIST'

export const MESSAGE_TYPE_CHAT = 'MESSAGE_TYPE_CHAT'
export const MESSAGE_TYPE_UPDATE = 'MESSAGE_TYPE_UPDATE'

export function initSocket(username) {
  return dispatch => {
    const io = require('socket.io-client')
    const socket = io({
      query: {
        username
      }
    })
    dispatch(registerSocket(socket))

    socket.on('chat message', (username, message) => {
      dispatch(appendMessage(username, message, MESSAGE_TYPE_CHAT))
    })

    socket.on('user update', (username, message) => {
      dispatch(appendMessage(username, message, MESSAGE_TYPE_UPDATE))
    })

    socket.on('user list', (userList) => {
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

export function appendMessage(username, message, messageType) {
  return {
    type: APPEND_MESSAGE,
    username,
    message,
    messageType,
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
