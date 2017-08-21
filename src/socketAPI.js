function createMessage(from, body, messageType, to) {
  return {
    from,
    body,
    messageType,
    to,
    toString: function() {
      return Object.keys(this).filter(v => v !== 'toString').map(v => v + ": " + this[v])
    }
  }
}

function createUsernameResponse(username, approved, feedback) {
  return {
    username,
    approved,
    feedback,
  }
}

module.exports.GENERAL_MESSAGE = 'GENERAL_MESSAGE'
module.exports.PRIVATE_MESSAGE = 'PRIVATE_MESSAGE'
module.exports.SERVER_MESSAGE = 'SERVER_MESSAGE'
module.exports.USERLIST_UPDATE = 'USERLIST_UPDATE'
module.exports.USERNAME_REQUEST = 'USERNAME_REQUEST'
module.exports.USERNAME_RESPONSE = 'USERNAME_RESPONSE'

module.exports.createMessage = createMessage
module.exports.createUsernameResponse = createUsernameResponse
