const openAI = require("../../tools/openai/openai");
const promptBuilder = require("../generator/promptBuilder");
const cleaner = require("./codeCleaner");
const promptFactory = require("../../prompts/promptFactory");
const rulesPrompt = require("../../prompts/shared/rules.prompt");
const MODELS = require("../../config/models");

class ReactGeneratorService {
  async generate(plan, file) {
    const systemPrompt = rulesPrompt + "\n\n" + promptFactory.get(file.type);

    const userPrompt = promptBuilder.build(plan, file);

    const response = await openAI.generate(
      MODELS.generator,
      systemPrompt,
      userPrompt,
    );

    return cleaner.clean(response);
  }
}

module.exports = new ReactGeneratorService();
