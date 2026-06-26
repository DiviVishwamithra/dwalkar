const fs = require("fs");
const path = require("path");

class WorkspaceService {
  getWorkspacePath() {
    return path.join(process.cwd(), "../workspace");
  }

  createWorkspace() {
    const workspace = this.getWorkspacePath();

    if (!fs.existsSync(workspace)) {
      fs.mkdirSync(workspace, { recursive: true });
    }

    return workspace;
  }

  getProjectPath(projectName) {
    return path.join(this.getWorkspacePath(), projectName);
  }
}

module.exports = new WorkspaceService();
