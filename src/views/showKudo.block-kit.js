const getUsersList = ({ users, body }) => {
  const usersList = [];
  for (let user of users) {
    console.log(user);
    usersList.push({
      text: {
        type: "plain_text",
        text: `<${user.real_name}>`,
        emoji: true
      },
      value: user.id,
      //image_url: user.profile?.image_24,
    });
  }


  return {
    // Pass a valid trigger_id within 3 seconds of receiving it
    trigger_id: body.trigger_id,
    // View payload
    view: {
      type: 'modal',
      callback_id: 'give_kudo_modal',
      title: {
        type: 'plain_text',
        text: 'Give kudos using bolt ⚡'
      },
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "plain_text",
            "text": "Continue the positive energy through your written word",
            "emoji": true
          }
        },
        {
          "type": "input",
          "element": {
            "type": "static_select",
            "placeholder": {
              "type": "plain_text",
              "text": "Select an item",
              "emoji": true
            },
            "options": usersList,
            "action_id": "static_select-action"
          },
          "label": {
            "type": "plain_text",
            "text": "Whose deeds are deemed worthy of a kudo?",
            "emoji": true
          }
        }
      ],
      submit: {
        type: 'plain_text',
        text: 'Give kudo'
      }
    }
  }
}

module.exports = {
  getUsersList: getUsersList
};