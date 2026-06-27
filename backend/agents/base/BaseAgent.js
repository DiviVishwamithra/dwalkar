const jobManager = require("../../services/jobs/jobManager");
const socketService = require("../../services/socket/socketService");

class BaseAgent {
  constructor(name) {
    this.name = name;
  }

  log(context, level, message) {
    const log = {
      agent: this.name,
      level,
      message,
      timestamp: new Date(),
    };

    // Store in execution context
    context.logs.push(log);

    // Store in Job Manager
    if (context.jobId) {
      jobManager.addLog(context.jobId, log);

      // Emit to frontend
      socketService.emit(context.jobId, "agent-log", log);
    }

    console.log(`[${this.name}] ${message}`);
  }

  success(message, data = {}) {
    return {
      success: true,
      agent: this.name,
      status: "COMPLETED",
      message,
      data,
    };
  }

  failure(error) {
    return {
      success: false,
      agent: this.name,
      status: "FAILED",
      message: error.message,
    };
  }
}

module.exports = BaseAgent;
