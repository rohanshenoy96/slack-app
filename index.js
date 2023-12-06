const { app } = require('./src/app.js');
require('./src');

app.start(process.env.DEFAULT_PORT || 3000)
  .then(() => {
    console.log('Bolt server is running');
  });