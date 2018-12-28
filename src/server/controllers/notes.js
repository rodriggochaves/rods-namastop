const Slack = require('../../libs/slack')
const Note = require('../models/schema')
const extractMention = require("../../libs/extract_mention")

const createNote = (request, response) => {
  const username = request.body.user_name
  const userId = request.body.user_id
  const text = request.body.text
  const target = extractMention(text)[0]
  const note = new Note({ username, userId, text, target })
  
  Slack.getUser(userId).then((data) => {
    const userAvatar = data.profile.image_72
    note.userAvatar = userAvatar

    return Slack.getAllUsers()

  }).then((users) => {
    users.members.find((user) => {
      if (user.name == target.substring(1, target.length)) {
        note.targetAvatar = user.profile.image_72
      }
    })
    
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