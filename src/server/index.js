'use strict'

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

var http = require('http').Server(app);

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', '..', 'build')));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', '..', 'build', 'index.html'));
});

const PORT = process.env.PORT || 9000;

var server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

// socket.io listens on the same HTTP server instance
var io = require('socket.io').listen(server);

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('test', () => {
    console.log('received test message')
  })
});
