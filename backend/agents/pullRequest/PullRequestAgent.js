const BaseAgent = require("../base/BaseAgent");
const pullRequestService = require("../../services/pullRequest/pullRequestService");

class PullRequestAgent extends BaseAgent {
  constructor() {
    super("PullRequest");
  }

  async run(context) {
    try {
      // ----------------------------------------
      // Skip PR for first project creation
      // ----------------------------------------

      if (context.repository?.created) {
        this.log(
          context,
          "INFO",
          "Initial repository created. Skipping Pull Request.",
        );

        return this.success("Pull Request skipped.", {
          skipped: true,
          reason: "Initial repository creation.",
        });
      }

      this.log(context, "INFO", "Creating Pull Request...");

      const result = await pullRequestService.create(
        context.project.projectPath,
        context.project.projectName,
      );

      return this.success("Pull Request completed.", result);
    } catch (error) {
      this.log(context, "ERROR", error.message);

      return this.failure(error);
    }
  }
}

module.exports = new PullRequestAgent();
