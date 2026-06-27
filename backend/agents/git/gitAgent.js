const BaseAgent = require("../base/BaseAgent");
const gitService = require("../../services/git/gitService");

class GitAgent extends BaseAgent {
  constructor() {
    super("Git");
  }

  async run(context) {
    try {
      this.log(context, "INFO", "Initializing Git repository...");

      const result = await gitService.initialize(
        context.project.projectPath,
        context.project.projectName,
      );

      return this.success("Git repository initialized.", result);
    } catch (error) {
      this.log(context, "ERROR", error.message);

      return this.failure(error);
    }
  }
}

module.exports = new GitAgent();
