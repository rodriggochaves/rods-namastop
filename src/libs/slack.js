const Axios = require('axios');

class Slack {
  
  static apiUrl() {
    return "https://slack.com/api"
  }

  static botToken() {
    return process.env.SLACK_BOT_TOKEN
  }

  static userToken() {
    return process.env.SLACK_OAUTH_TOKEN
  }

  static async getAllUsers() {
    const url = `${this.apiUrl()}/users.list?token=${this.botToken()}`
    return Axios.get(url).then(response => response.data)
  }

  static async getUser(userId) {
    const url = `${this.apiUrl()}/users.profile.get?token=${this.userToken()}&user=${userId}`
    return Axios.get(url).then((response) => response.data)
  }
}

module.exports = Slack