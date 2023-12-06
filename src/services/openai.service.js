const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPEN_AI_KEY });

const getDescription = async (message) => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `2 line sentence for Appreciation for ${message}`
      }
    ],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0].message.content;
}

module.exports = { getDescription };