const { v4: uuid } = require("uuid");

const plannerAgent = require("../agents/planner/plannerAgent");

class Orchestrator {
  async execute(prompt) {
    const context = {
      jobId: uuid(),
      prompt,
      status: "RUNNING",
      currentAgent: null,
      createdAt: new Date(),
      logs: [],
      execution: [],

      // Explicit context sections
      plan: null,
      project: null,
      build: null,
      git: null,
      deployment: null,

      metadata: {},
    };

    // --------------------------
    // Planner Agent
    // --------------------------

    context.currentAgent = plannerAgent.name;

    const plannerResult = await plannerAgent.run(context);

    if (!plannerResult.success) {
      context.status = "FAILED";
      return {
        success: false,
        context,
      };
    }

    context.plan = plannerResult.data;

    context.execution.push({
      agent: plannerResult.agent,
      status: plannerResult.status,
      startedAt: new Date(),
      completedAt: new Date(),
      duration: 0,
    });

    context.status = "COMPLETED";

    return {
      success: true,
      context,
    };
  }
}

module.exports = new Orchestrator();
