const BaseAgent = require("../base/BaseAgent");
const repositoryService = require("../../services/repository/repositoryService");

class RepositoryAgent extends BaseAgent {
  constructor() {
    super("Repository");
  }

  async run(context) {
    try {
      this.log(context, "INFO", "Publishing repository...");

      const result = await repositoryService.publish(
        context.project.projectPath,
        context.project.projectName,
      );

      return this.success("Repository published successfully.", result);
    } catch (error) {
      this.log(context, "ERROR", error.message);

      return this.failure(error);
    }
  }
}

module.exports = new RepositoryAgent();
