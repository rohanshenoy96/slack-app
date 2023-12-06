const { app } = require('../app.js');
const { getView, getMessage } = require('../views/showKudo.block-kit.js');

const showKudoModal = async ({ client, body, ack, logger }) => {
  await ack();
  try {
    const view = await getView({ client, body });
    const result = await client.views.open(view);
    logger.info(result);
  }
  catch (error) {
    logger.error(error);
  }
};

const submitKudosForm = async ({ client, view, ack, logger }) => {
  await ack();
  try {
    if (view.state.values) {
      let results = Object.values(view.state.values), resultMap = {};
      for (let mapper of results) {
        resultMap = { ...resultMap, ...mapper };
      }
      const selectedUsers = resultMap?.user?.selected_users, 
      selectedChannel = resultMap?.channel?.selected_option?.value,
      message = resultMap?.message?.value,
      kudoType = resultMap?.kudo_type?.selected_option?.value;
      
      const kudoView = await getMessage({ selectedUsers, message, kudoType });

      const result = await client.chat.postMessage({
        channel: selectedChannel,
        blocks: kudoView
      });
      logger.info(result);
    }
  }
  catch (error) {
    logger.error(error);
  }
};

app.command('/give-kudos', showKudoModal);
app.view('give_kudo_modal', submitKudosForm)

