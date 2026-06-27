const plannerAgent = require("../agents/planner/plannerAgent");
const buildAgent = require("../agents/builder/builderAgent");
const packageAgent = require("../agents/package/packageAgent");
const projectAgent = require("../agents/project/projectAgent");
const generatorAgent = require("../agents/generator/generatorAgent");
const themeAgent = require("../agents/theme/themeAgent");
const assetAgent = require("../agents/asset/assetAgent");
const validatorAgent = require("../agents/validator/validatorAgent");
const repairAgent = require("../agents/repair/repairAgent");
const gitAgent = require("../agents/git/gitAgent");
const githubAgent = require("../agents/github/githubAgent");

class Pipeline {
  constructor() {
    this.agents = [
      plannerAgent,
      projectAgent,
      packageAgent,
      themeAgent,
      assetAgent,
      generatorAgent,
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

        case "GitHub":
          context.github = result.data;
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

    // =============================================
    // Validation + Repair Loop
    // =============================================

    const MAX_REPAIR_ATTEMPTS = 3;

    let validationResult;

    for (let attempt = 1; attempt <= MAX_REPAIR_ATTEMPTS; attempt++) {
      console.log(`\n🧪 Validation Attempt ${attempt}\n`);

      context.currentAgent = validatorAgent.name;

      validationResult = await validatorAgent.run(context);

      if (!validationResult.success) {
        context.status = "FAILED";

        return {
          success: false,
          context,
        };
      }

      context.validation = validationResult.data;

      context.execution.push({
        agent: "Validator",
        status: validationResult.data.passed ? "PASSED" : "FAILED",
        startedAt: new Date(),
        completedAt: new Date(),
        duration: 0,
      });

      if (validationResult.data.passed) {
        console.log("✅ Validation Passed");
        break;
      }

      console.log("\n🔧 Running Repair Agent...\n");

      context.currentAgent = repairAgent.name;

      const repairResult = await repairAgent.run(context);

      if (!repairResult.success) {
        context.status = "FAILED";

        return {
          success: false,
          context,
        };
      }

      context.execution.push({
        agent: "Repair",
        status: repairResult.status,
        startedAt: new Date(),
        completedAt: new Date(),
        duration: 0,
      });

      if (attempt === MAX_REPAIR_ATTEMPTS) {
        console.log("❌ Maximum repair attempts reached.");

        context.status = "FAILED";

        return {
          success: false,
          context,
        };
      }
    }

    // =============================================
    // Build
    // =============================================

    context.currentAgent = buildAgent.name;

    const buildResult = await buildAgent.run(context);

    if (!buildResult.success) {
      context.status = "FAILED";

      return {
        success: false,
        context,
      };
    }

    context.build = buildResult.data;

    context.execution.push({
      agent: "Build",
      status: buildResult.status,
      startedAt: new Date(),
      completedAt: new Date(),
      duration: 0,
    });

    // =============================================
    // Git
    // =============================================

    context.currentAgent = gitAgent.name;

    const gitResult = await gitAgent.run(context);

    if (!gitResult.success) {
      context.status = "FAILED";

      return {
        success: false,
        context,
      };
    }

    context.git = gitResult.data;

    context.execution.push({
      agent: "Git",
      status: gitResult.status,
      startedAt: new Date(),
      completedAt: new Date(),
      duration: 0,
    });

    // =============================================
    // GitHub
    // =============================================

    context.currentAgent = githubAgent.name;

    const githubResult = await githubAgent.run(context);

    if (!githubResult.success) {
      context.status = "FAILED";

      return {
        success: false,
        context,
      };
    }

    context.github = githubResult.data;

    context.execution.push({
      agent: "GitHub",
      status: githubResult.status,
      startedAt: new Date(),
      completedAt: new Date(),
      duration: 0,
    });

    // =============================================
    // Success
    // =============================================

    context.status = "COMPLETED";

    return {
      success: true,
      context,
    };
  }
}

module.exports = new Pipeline();
