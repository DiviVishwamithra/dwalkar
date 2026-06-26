require("dotenv").config({
  override: true,
});

const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function test() {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "user",
          content: "Say hello",
        },
      ],
    });

    console.log(response.choices[0].message.content);
  } catch (err) {
    console.log("Status:", err.status);
    console.log("Code:", err.code);
    console.log("Type:", err.type);
    console.dir(err.error, { depth: null });
  }
}

test();
