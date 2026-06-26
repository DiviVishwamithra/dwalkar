const OpenAI = require("openai");

class OpenAITool {
  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generate(systemPrompt, userPrompt) {
    const response = await this.client.responses.create({
      model: "gpt-4.1-mini",

      input: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
    });

    return response.output_text;
  }
}

module.exports = new OpenAITool();
