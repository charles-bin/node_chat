export const REGISTER_SOCKET = 'REGISTER_SOCKET'
export const APPEND_MESSAGE = 'APPEND_MESSAGE'
export const SET_USERNAME = 'SET_USERNAME'

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
      dispatch(appendMessage(username + ': ' + message))
    })

    socket.on('user update', (message) => {
      dispatch(appendMessage(message))
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
