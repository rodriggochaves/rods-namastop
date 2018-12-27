require('dotenv').config()
const PORT = process.env.PORT || 5000
const cron = require("node-cron");
const app = require('./app')
const reminder = require('./src/libs/reminder')


app.listen(PORT, () => console.log(`Listening on ${PORT}`))

cron.schedule("* * 15 * * 5", () => {
  reminder();
});