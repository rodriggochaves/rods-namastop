require('dotenv').config()

require('./src/server/models/mongosse').config()

const PORT = process.env.PORT || 5000
const cron = require("node-cron");
const app = require('./app')
const { remindAllUsers } = require('./src/libs/reminder')


const Note = mongoose.model('notes', {
  username: String,
  userId: String,
  text: String,
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`))

app.post('/note', (req, res) => {
  const username = req.body.user_name
  const userId = req.body.user_id
  const text = req.body.text

  const note = new Note({ username, userId, text })

  note.save((err, result) => {
    console.log(err)
    console.log(result)
  })

  res.sendStatus(200)
});

cron.schedule("* * 15 * * 5", () => {
  remindAllUsers();
});