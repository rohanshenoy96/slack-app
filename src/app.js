const { App } = require('@slack/bolt');
require('dotenv').config();

const app = new App({
  socketMode: true,
  // stateSecret: 'slack-app',
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  // appToken:
  // clientId: process.env.SLACK_CLIENT_ID,
  // clientSecret: process.env.SLACK_CLIENT_SECRET,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  // scopes: ['channels:history', 'chat:write', 'commands']
});

module.exports = { app };