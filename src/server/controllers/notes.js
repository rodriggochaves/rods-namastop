const axios = require('axios');
const token = process.env.SLACK_OAUTH_TOKEN
const Note = require('../models/schema')

const createNote = (request, response) => {
  const username = request.body.user_name
  const userId = request.body.user_id
  const text = request.body.text
  const url = `https://slack.com/api/users.profile.get?token=${token}&user=${userId}`
  const image = axios.get(url).then((response) => {
    const data = response.data
    const userAvatar = data.profile.image_72
    const note = new Note({ username, userId, text, userAvatar })

    note.save()

    response.json({ text: "Your gratitude was sent. :blue_heart:" })
  })
}

const listNotes = async (req, res) => {
  await Note.find({}).exec().then(notes => {
    res.json(notes)
  })
}

module.exports = { createNote, listNotes }