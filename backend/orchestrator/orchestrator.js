const { v4: uuid } = require("uuid");

const pipeline = require("./pipeline");

const jobManager = require("../services/jobs/jobManager");
const socketService = require("../services/socket/socketService");

class Orchestrator {
  async execute(prompt, jobId = uuid()) {
    const context = {
      jobId,
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
      repository: null,
      hosting: null,

      metadata: {},
    };

    try {
      // Create Job
      jobManager.create(jobId, prompt);

      socketService.emit(jobId, "job-started", {
        jobId,
        prompt,
        status: "RUNNING",
      });

      // Execute Pipeline
      const result = await pipeline.execute(context);

      // Update Job
      jobManager.update(jobId, {
        status: context.status,
        execution: context.execution,
        repository: context.repository,
        deployment: context.hosting,
      });

      // Notify Frontend
      socketService.emit(jobId, "job-completed", {
        jobId,
        status: context.status,
        execution: context.execution,
        repository: context.repository,
        deployment: context.hosting,
      });

      return result;
    } catch (error) {
      context.status = "FAILED";

      jobManager.fail(jobId, error);

      socketService.emit(jobId, "job-failed", {
        jobId,
        message: error.message,
      });

      throw error;
    }
  }
}

module.exports = new Orchestrator();
