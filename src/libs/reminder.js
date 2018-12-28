const Slack = require('./slack');
const axios = require('axios');

const remindAllUsers = async () => {
  const response = await Slack.getAllUser()
  const channelsId = response.members.map(user => user.id)
  sendReminders(channelsId)
}

const sendReminders = async (usersList) => {

  const token = process.env.SLACK_BOT_TOKEN
  const text = "hello"

  const promises = usersList.map((user) => {
    const url = `https://slack.com/api/chat.postMessage?token=${token}&channel=${user}&text=${text}&pretty=1&as_user=true`
    return axios.post(url)
  })

  await Promise.all(promises)
    .then((responses) => {
      responses.map(response => response.data)
    })
  
}

module.exports = {
  remindAllUsers: remindAllUsers,
  sendReminders: sendReminders,
}