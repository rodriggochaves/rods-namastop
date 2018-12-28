const mongoose = require('mongoose');

const Note = mongoose.model('notes', {
  username: String,
  userId: String,
  text: String,
  userAvatar: String,
  target: String,
  targetAvatar: String
});

module.exports = Note