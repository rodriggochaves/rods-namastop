const axios = require('axios');

const reminder = async (usersList) => {

  const token = "xoxb-126285058224-512405415842-7tcWmKyO0nnLn64B1TWrJRoL"
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

module.exports = reminder