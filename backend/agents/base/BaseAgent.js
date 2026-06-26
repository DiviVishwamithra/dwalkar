class BaseAgent {
  constructor(name) {
    this.name = name;
  }

  log(context, level, message) {
    context.logs.push({
      agent: this.name,
      level,
      message,
      timestamp: new Date(),
    });

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
