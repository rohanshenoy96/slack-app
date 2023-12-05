const { App } = require('@slack/bolt');
require('dotenv').config();


const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  stateSecret: 'slack-app',
  scopes: ['channels:history', 'chat:write', 'commands']
})

app.start(process.env.DEFAULT_PORT || 3000)
  .then(() => {
    console.log('Bolt server is running');
  });