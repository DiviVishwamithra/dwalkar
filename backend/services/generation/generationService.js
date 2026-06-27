const orchestrator = require("../../orchestrator/orchestrator");

class GenerationService {
  async generate(prompt) {
    const result = await orchestrator.execute(prompt);

    return {
      jobId: result.context.jobId,
      status: result.context.status,
      execution: result.context.execution,
      repository: result.context.repository,
      deployment: result.context.deployment,
    };
  }
}

module.exports = new GenerationService();
