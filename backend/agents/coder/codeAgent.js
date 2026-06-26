const BaseAgent = require("../base/BaseAgent");
const projectGenerator = require("../../services/project/projectGeneratorService");

class CodeAgent extends BaseAgent {
  constructor() {
    super("Code");
  }

  async run(context) {
    try {
      this.log(context, "INFO", "Preparing workspace...");

      const project = await projectGenerator.createReactProject(
        context.plan.projectName,
      );

      return this.success("React project created.", project);
    } catch (error) {
      this.log(context, "ERROR", error);

      return this.failure(new Error(error));
    }
  }
}

module.exports = new CodeAgent();
