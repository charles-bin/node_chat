const GENERAL_MESSAGE = 'GENERAL_MESSAGE'
const PRIVATE_MESSAGE = 'PRIVATE_MESSAGE'
const SERVER_MESSAGE = 'SERVER_MESSAGE'
const USERLIST_UPDATE = 'USERLIST_UPDATE'

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

module.exports.GENERAL_MESSAGE = GENERAL_MESSAGE
module.exports.PRIVATE_MESSAGE = PRIVATE_MESSAGE
module.exports.SERVER_MESSAGE = SERVER_MESSAGE
module.exports.USERLIST_UPDATE = USERLIST_UPDATE
module.exports.createMessage = createMessage
