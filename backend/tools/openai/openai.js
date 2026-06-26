const OpenAI = require("openai");

class OpenAITool {
  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generate(systemPrompt, userPrompt) {
    try {
      const response = await this.client.responses.create({
        model: "gpt-5.5",
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
    } catch (error) {
      console.error("OpenAI Error:", error);

      throw error;
    }
  }
}

module.exports = new OpenAITool();
