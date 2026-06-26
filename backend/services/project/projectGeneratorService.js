const terminal = require("../terminal/terminalService");
const workspace = require("../filesystem/workspaceService");

class ProjectGeneratorService {
  async createReactProject(projectName) {
    const workspacePath = workspace.createWorkspace();

    await terminal.execute(
      `npm create vite@latest ${projectName} -- --template react`,
      workspacePath,
    );

    const projectPath = workspace.getProjectPath(projectName);

    console.log("Installing npm packages...");

    await terminal.execute("npm install", projectPath);

    return {
      projectName,
      framework: "React",
      language: "JavaScript",
      projectPath,
      packageManager: "npm",
      status: "CREATED",
    };
  }
}

module.exports = new ProjectGeneratorService();
