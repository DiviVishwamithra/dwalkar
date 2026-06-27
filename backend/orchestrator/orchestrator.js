const { v4: uuid } = require("uuid");

const pipeline = require("./pipeline");
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

      plan: null,
      project: null,
      packages: null,
      theme: null,
      validation: null,
      generator: null,
      assets: [],
      build: null,
      git: null,
      deployment: null,

      metadata: {},
    };

    const result = await pipeline.execute(context);

    return result;
  }
}

module.exports = new Orchestrator();
