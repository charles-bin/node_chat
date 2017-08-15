export const REGISTER_SOCKET = 'REGISTER_SOCKET'
export const APPEND_MESSAGE = 'APPEND_MESSAGE'

export function initSocket() {
  return dispatch => {
    const io = require('socket.io-client')
    const socket = io()
    dispatch(registerSocket(socket))

    socket.on('chat message', (message) => {
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
    message
  }
}
