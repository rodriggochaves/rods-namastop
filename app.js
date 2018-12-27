const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// app.post('/note', (req, res) => {
//   const username = req.body.user_name
//   const userId = req.body.user_id
//   const text = req.body.text

//   createNote(username, userId,)
// });

module.exports = app