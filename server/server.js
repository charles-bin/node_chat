const api = require('../src/socketAPI')
const GENERAL_MESSAGE = api.GENERAL_MESSAGE
const PRIVATE_MESSAGE = api.PRIVATE_MESSAGE
const SERVER_MESSAGE = api.SERVER_MESSAGE
const USERLIST_UPDATE = api.USERLIST_UPDATE
const USERNAME_REQUEST = api.USERNAME_REQUEST
const USERNAME_RESPONSE = api.USERNAME_RESPONSE
const createMessage = api.createMessage
const createUsernameResponse = api.createUsernameResponse

const express = require('express')
const morgan = require('morgan')
const path = require('path')
const app = express()

var http = require('http').Server(app)

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'))

// Serve static assets
console.log(__dirname)
app.use(express.static(path.resolve(__dirname, '..', 'build')))

// Always return the main index.html, so react-router render the route in the client
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))
})

const PORT = process.env.PORT || 9000

var server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`)
})

var userList = {}

// socket.io listens on the same HTTP server instance
var io = require('socket.io').listen(server)

io.on('connection', (socket) => {
  console.log('new socket connection')

  socket.on(USERNAME_REQUEST, (username) => {
    if (username === 'General') {
      socket.emit(USERNAME_RESPONSE,
        createUsernameResponse(username, false, username + " is not available")
      )
    } else {
      socket.emit(USERNAME_RESPONSE,
        createUsernameResponse(username, true)
      )
      userList[username] = socket
      io.emit(SERVER_MESSAGE,
        createMessage(username, username + " has connected", SERVER_MESSAGE)
      )
      io.emit(USERLIST_UPDATE, Object.keys(userList))

      socket.on('disconnect', () => {
        delete userList[username]
        console.log(username + ' has disconnected')

        io.emit(SERVER_MESSAGE, createMessage(username, username + " has disconnected", SERVER_MESSAGE))
        io.emit(USERLIST_UPDATE, Object.keys(userList))
      })
    }
  })

  socket.on(GENERAL_MESSAGE, (message) => {
    console.log(message)
    socket.broadcast.emit(GENERAL_MESSAGE, message)
  })
})
