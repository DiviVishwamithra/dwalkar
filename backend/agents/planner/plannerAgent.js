const path = require("path");
const BaseAgent = require("../base/BaseAgent");
const fileSystem = require("../../tools/filesystem");
const openAI = require("../../tools/openai/openai");
const validator = require("../../tools/validator/jsonValidator");

class PlannerAgent extends BaseAgent {
  constructor() {
    super("Planner");
  }

  async run(context) {
    try {
      this.log(context, "INFO", "Planner started.");

      const systemPrompt = fileSystem.read(
        path.join(__dirname, "../../tools/openai/prompts/planner.txt"),
      );

      const result = await openAI.generate(systemPrompt, context.prompt);
      const plan = validator.parse(result);
      return this.success("Project plan created.", plan);
    } catch (error) {
      this.log(context, "ERROR", error.message);

      return this.failure(error);
    }
  }
}

module.exports = new PlannerAgent();
