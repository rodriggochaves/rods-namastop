const path = require('path')

const client = (_, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
}

module.exports = { client }