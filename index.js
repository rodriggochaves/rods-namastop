require('dotenv').config()

require('./src/server/models/mongosse').config()

const PORT = process.env.PORT || 5000
const cron = require("node-cron");
const app = require('./app')
const { remindAllUsers } = require('./src/libs/reminder')

app.listen(PORT, () => console.log(`Listening on ${PORT}`))

cron.schedule("* * 15 * * 5", () => {
  remindAllUsers();
});