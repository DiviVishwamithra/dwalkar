const BaseAgent = require("../base/BaseAgent");

class PlannerAgent extends BaseAgent {
  constructor() {
    super("Planner");
  }

  async run(context) {
    // Log when the planner starts
    this.log(context, "INFO", "Planner started.");

    // Simulate project planning
    return this.success("Project plan created successfully.", {
      projectName: "todo-app",
      framework: "React",
      language: "JavaScript",
      styling: "Tailwind CSS",
    });
  }
}

module.exports = new PlannerAgent();
