const BaseAgent = require("../base/BaseAgent");
const projectGenerator = require("../../services/project/projectGeneratorService");
const projectConfigurator = require("../../services/project/projectConfigurator");

class ProjectAgent extends BaseAgent {
  constructor() {
    super("Project");
  }

  async run(context) {
    try {
      this.log(context, "INFO", "Creating React project...");

      const project = await projectGenerator.createReactProject(
        context.plan.projectName,
      );

      this.log(context, "INFO", "Configuring React project...");

      await projectConfigurator.configure(project.projectPath);

      return this.success("Project created successfully.", project);
    } catch (error) {
      this.log(context, "ERROR", error.message);
      return this.failure(error);
    }
  }
}

module.exports = new ProjectAgent();
