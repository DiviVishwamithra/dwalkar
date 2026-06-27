const BaseAgent = require("../base/BaseAgent");
const vercelService = require("../../services/vercel/vercelService");

class VercelAgent extends BaseAgent {
  constructor() {
    super("Vercel");
  }

  async run(context) {
    try {
      this.log(context, "INFO", "Deploying project to Vercel...");

      const result = await vercelService.deploy(context.project.projectPath);

      return this.success("Project deployed successfully.", result);
    } catch (error) {
      this.log(context, "ERROR", error.message);

      return this.failure(error);
    }
  }
}

module.exports = new VercelAgent();
