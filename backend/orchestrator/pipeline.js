const plannerAgent = require("../agents/planner/plannerAgent");
const buildAgent = require("../agents/builder/builderAgent");
const packageAgent = require("../agents/package/packageAgent");
const projectAgent = require("../agents/project/projectAgent");
const generatorAgent = require("../agents/generator/generatorAgent");
const themeAgent = require("../agents/theme/themeAgent");
const assetAgent = require("../agents/asset/assetAgent");
const validatorAgent = require("../agents/validator/validatorAgent");

class Pipeline {
  constructor() {
    this.agents = [
      plannerAgent,
      projectAgent,
      packageAgent,
      themeAgent,
      assetAgent,
      generatorAgent,
      validatorAgent,
      buildAgent,
    ];
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

        case "Project":
          context.project = result.data;
          break;

        case "Package":
          context.packages = result.data;

          if (context.plan) {
            context.plan.installedPackages = result.data.packages;
          }

          break;

        case "Theme":
          context.theme = result.data;
          break;

        case "Asset":
          context.assets = result.data;
          break;

        case "Validator":
          context.validation = result.data;
          break;

        case "Generator":
          context.generator = result.data;
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
