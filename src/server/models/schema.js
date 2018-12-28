const mongoose = require('mongoose');

const Note = mongoose.model('notes', {
  username: String,
  userId: String,
  text: String,
});

module.exports = Note