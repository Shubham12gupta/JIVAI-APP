const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

module.exports = async function (context, req) {
  try {
    const message = req.body?.message;

    if (!message) {
      context.res = {
        status: 400,
        body: { reply: "Message is required." }
      };
      return;
    }

    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are JIVAI, a medical safety assistant. Awareness only. No diagnosis."
        },
        { role: "user", content: message }
      ]
    });

    context.res = {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: {
        reply: response.choices[0].message.content
      }
    };

  } catch (err) {
    context.log.error("CHAT ERROR:", err);

    context.res = {
      status: 500,
      body: { reply: "Internal error in AI service." }
    };
  }
};
