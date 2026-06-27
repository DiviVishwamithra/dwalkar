class JobManager {
  constructor() {
    this.jobs = new Map();
  }

  create(jobId, prompt) {
    const job = {
      jobId,
      prompt,
      status: "RUNNING",
      createdAt: new Date(),

      execution: [],
      logs: [],

      repository: null,
      deployment: null,

      result: null,
      error: null,
    };

    this.jobs.set(jobId, job);

    return job;
  }

  get(jobId) {
    return this.jobs.get(jobId);
  }

  update(jobId, updates) {
    const job = this.jobs.get(jobId);

    if (!job) return null;

    Object.assign(job, updates);

    return job;
  }

  addExecution(jobId, execution) {
    const job = this.jobs.get(jobId);

    if (!job) return;

    job.execution.push(execution);
  }

  addLog(jobId, log) {
    const job = this.jobs.get(jobId);

    if (!job) return;

    job.logs.push({
      ...log,
      timestamp: new Date(),
    });
  }

  complete(jobId, result) {
    const job = this.jobs.get(jobId);

    if (!job) return;

    job.status = "COMPLETED";
    job.result = result;
  }

  fail(jobId, error) {
    const job = this.jobs.get(jobId);

    if (!job) return;

    job.status = "FAILED";
    job.error = error.message || error;
  }

  remove(jobId) {
    this.jobs.delete(jobId);
  }

  getAll() {
    return [...this.jobs.values()];
  }
}

module.exports = new JobManager();
