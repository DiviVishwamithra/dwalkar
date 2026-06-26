const plannerAgent = require("../agents/planner/plannerAgent");
const codeAgent = require("../agents/coder/codeAgent");

class Pipeline {
  constructor() {
    this.agents = [plannerAgent, codeAgent];
  }

  async execute(context) {
    for (const agent of this.agents) {
      context.currentAgent = agent.name;

      const result = await agent.run(context);

      if (!result.success) {
        context.status = "FAILED";

        return {
          success: false,
          context,
        };
      }

      //   console.log("Agent Result:");
      //   console.dir(result, { depth: null });

      //   console.log("Pipeline Context Plan:");
      //   console.dir(context.plan, { depth: null });

      console.log("agent.name:", agent.name);
      console.log("result.agent:", result.agent);

      // Store agent output into context
      switch (result.agent) {
        case "Planner":
          context.plan = result.data;
          break;

        case "Code":
          context.project = result.data;
          break;

        case "Build":
          context.build = result.data;
          break;

        case "Git":
          context.git = result.data;
          break;

        case "Deploy":
          context.deployment = result.data;
          break;
      }

      context.execution.push({
        agent: result.agent,
        status: result.status,
        startedAt: new Date(),
        completedAt: new Date(),
        duration: 0,
      });
    }

    context.status = "COMPLETED";

    return {
      success: true,
      context,
    };
  }
}

module.exports = new Pipeline();
