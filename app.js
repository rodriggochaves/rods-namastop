const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Note = require('./src/server/models/schema')

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.post('/notes', (req, res) => {
  const username = req.body.user_name
  const userId = req.body.user_id
  const text = req.body.text

  const note = new Note({ username, userId, text })
  note.save()
  
  res.json({ text: "Your gratitude was sent. :blue_heart:" })
});

app.get('/notes', async (req, res) => {
  await Note.find({}).exec().then(notes => {
    res.json(notes)
  })
});

module.exports = app