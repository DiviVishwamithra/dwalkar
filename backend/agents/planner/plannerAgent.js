const BaseAgent = require("../base/BaseAgent");
const fileSystem = require("../../tools/filesystem");
const openAI = require("../../tools/openai/openai");
const validator = require("../../tools/validator/jsonValidator");
const plannerPrompt = require("../../prompts/planner.prompt");
const MODELS = require("../../config/models");

class PlannerAgent extends BaseAgent {
  constructor() {
    super("Planner");
  }

  async run(context) {
    try {
      this.log(context, "INFO", "Planner started.");

      const result = await openAI.generate(
        MODELS.planner,
        plannerPrompt,
        context.prompt,
      );
      const plan = validator.parse(result);
      return this.success("Project plan created.", plan);
    } catch (error) {
      this.log(context, "ERROR", error.message);

      return this.failure(error);
    }
  }
}

module.exports = new PlannerAgent();
