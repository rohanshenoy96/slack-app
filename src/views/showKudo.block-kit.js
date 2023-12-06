const fetch = require('node-fetch');
const { appreciations } = require('../shared/constant');
const { getDescription } = require("../services/openai.service");

const getUsersListDropdown = async ({ client }, formView) => {
  const response = await client.users.list();
  const usersList = response.members.map(user => ({
    text: {
      type: "plain_text",
      text: `<${user.real_name}>`,
      emoji: true
    },
    value: user.id,
    //image_url: user.profile?.image_24,
  }));

  usersList && usersList.length && formView.push({
    "type": "input",
    "element": {
      "type": "multi_users_select",
      "placeholder": {
        "type": "plain_text",
        "text": "Select an item",
        "emoji": true
      },
      // "options": usersList,
      "action_id": "user"
    },
    "label": {
      "type": "plain_text",
      "text": "Whose deeds are deemed worthy of a kudo?",
      "emoji": true
    }
  })
}

const getChannelsList = async ({ client }, formView) => {
  const response = await client.conversations.list();
  const channelsList = response?.channels?.map(user => ({
    text: {
      type: "plain_text",
      text: `<#${user.id}>`,
      emoji: true
    },
    value: user.id,
    //image_url: user.profile?.image_24,
  }));


  channelsList && channelsList.length && formView.push({
    "type": "input",
    "element": {
      "type": "static_select",
      "placeholder": {
        "type": "plain_text",
        "text": "Select an item",
        "emoji": true
      },
      "options": channelsList,
      "action_id": "channel"
    },
    "label": {
      "type": "plain_text",
      "text": "Where should this message be shared?",
      "emoji": true
    }
  });
}

const getMessageTextarea = (formView) => {
  formView.push({
    "type": "input",
    "element": {
      "type": "plain_text_input",
      "multiline": true,
      "action_id": "message"
    },
    "label": {
      "type": "plain_text",
      "text": "What would you like to say?",
      "emoji": true
    }
  });
}

const getKudosTypeList = (formView) => {
  const appreciationsView = appreciations.map(appreciation => ({
    text: {
      type: "plain_text",
      text: `<${appreciation.label}>`,
      emoji: true
    },
    value: appreciation.value
  }));

  formView.push({
    "type": "input",
    "element": {
      "type": "static_select",
      "placeholder": {
        "type": "plain_text",
        "text": "Select an item",
        "emoji": true
      },
      "options": appreciationsView,
      "action_id": "kudo_type"
    },
    "label": {
      "type": "plain_text",
      "text": "What is this kudo's \"vibe\"?",
      "emoji": true
    }
  });
}


const getView = async ({ client, body }) => {
  const formView = [];
  await getUsersListDropdown({ client }, formView);
  await getChannelsList({ client }, formView);
  getMessageTextarea(formView);
  getKudosTypeList(formView);

  return {
    trigger_id: body.trigger_id,
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
        ...formView
      ],
      submit: {
        type: 'plain_text',
        text: 'Give kudo'
      }
    }
  }
}

const getMessage = async ({ selectedUsers, message, kudoType }) => {
  let view;
  try {
    const description = await getDescription(message);
    const image = await fetch(`https://source.unsplash.com/800x600/?${kudoType.replaceAll('_', ' ')}`);
    const imageUrl = image.url;

    const usersView = selectedUsers.map(userId => ({
      "type": "context",
      "elements": [
        {
          "type": "mrkdwn",
          "text": `<@${userId}> \n`
        }
      ]
    }))

    view = [
      {
        "type": "image",
        "title": {
          "type": "plain_text",
          "text": appreciations.filter(e => e.value === kudoType)[0].label,
          "emoji": true
        },
        "image_url": imageUrl,
        "alt_text": "marg"
      },
      ...usersView,
      {
        "type": "section",
        "text": {
          "type": "plain_text",
          "text": description,
          "emoji": true
        }
      }
    ];
    console.log('RS blocks', view);
  } catch(error) {
    console.log('RS error', error);
  }
  return view;
};

module.exports = { getView, getMessage };