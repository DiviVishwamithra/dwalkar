const BaseAgent = require("../base/BaseAgent");
const terminal = require("../../services/terminal/terminalService");

class BuildAgent extends BaseAgent {
  constructor() {
    super("Build");
  }

  async run(context) {
    try {
      this.log(context, "INFO", "Running production build...");

      await terminal.execute("npm run build", context.project.projectPath);

      return this.success("Build completed successfully.", {
        status: "SUCCESS",
      });
    } catch (error) {
      this.log(context, "ERROR", error);

      return this.failure(new Error(error));
    }
  }
}

module.exports = new BuildAgent();
