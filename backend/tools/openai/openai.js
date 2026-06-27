const OpenAI = require("openai");

class OpenAITool {
  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generate(model, systemPrompt, userPrompt) {
    console.log(`🤖 Model: ${model}`);

    const response = await this.client.responses.create({
      model,
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
