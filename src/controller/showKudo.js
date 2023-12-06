const { app } = require('../app.js');
const { getUsersList } = require('../views/showKudo.block-kit.js');
const showKudoModal = async ({ client, body, ack, logger }) => {
  await ack();

  try {
    const response = await client.users.list();
    const view = getUsersList({ users: response.members, body });
    // console.log(response);

    const result = await client.views.open(view);
    logger.info(result);
  }
  catch (error) {
    logger.error(error);
  }
}

app.command('/give-kudos', showKudoModal);

