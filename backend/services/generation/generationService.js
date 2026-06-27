const { v4: uuid } = require("uuid");

const orchestrator = require("../../orchestrator/orchestrator");

class GenerationService {
  async generate(prompt) {
    const jobId = uuid();

    // Run in background
    (async () => {
      try {
        await orchestrator.execute(prompt, jobId);
      } catch (error) {
        console.error(error);
      }
    })();

    // Return immediately
    return {
      jobId,
      status: "RUNNING",
    };
  }
}

module.exports = new GenerationService();
