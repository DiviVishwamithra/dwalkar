const jobManager = require("../services/jobs/jobManager");

console.log("Creating Job...");

jobManager.create("job-001", "Create an Expense Tracker");

console.log(jobManager.get("job-001"));

console.log("Adding Execution...");

jobManager.addExecution("job-001", {
  agent: "Planner",
  status: "RUNNING",
});

console.log(jobManager.get("job-001"));

console.log("Adding Log...");

jobManager.addLog("job-001", {
  level: "INFO",
  message: "Planner started",
});

console.log(jobManager.get("job-001"));

console.log("Completing Job...");

jobManager.complete("job-001", {
  repository: "https://github.com/test/repo",
});

console.log(jobManager.get("job-001"));
