const BaseAgent = require("../base/BaseAgent");
const githubService = require("../../services/github/githubService");

class GitHubAgent extends BaseAgent {
  constructor() {
    super("GitHub");
  }

  async run(context) {
    try {
      this.log(context, "INFO", "Publishing project to GitHub...");

      const result = await githubService.publish(
        context.project.projectPath,
        context.project.projectName,
      );

      return this.success("GitHub repository created successfully.", result);
    } catch (error) {
      this.log(context, "ERROR", error.message);

      return this.failure(error);
    }
  }
}

module.exports = new GitHubAgent();
