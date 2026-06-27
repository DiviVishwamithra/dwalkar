const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

class GitService {
  initialize(projectPath, projectName) {
    const gitPath = path.join(projectPath, ".git");

    if (!fs.existsSync(gitPath)) {
      console.log("🌿 Initializing Git repository...");

      execSync("git init", {
        cwd: projectPath,
        stdio: "inherit",
      });

      execSync("git branch -M main", {
        cwd: projectPath,
        stdio: "inherit",
      });
    } else {
      console.log("🌿 Repository already initialized.");
    }

    console.log("📦 Staging files...");

    execSync("git add .", {
      cwd: projectPath,
      stdio: "inherit",
    });

    const commitMessage = `feat: generated ${projectName} using Dwalkar`;

    console.log("📝 Creating commit...");

    try {
      execSync(`git commit -m "${commitMessage}"`, {
        cwd: projectPath,
        stdio: "inherit",
      });
    } catch {
      console.log("ℹ️ Nothing to commit.");
    }

    const branch = execSync("git branch --show-current", {
      cwd: projectPath,
      encoding: "utf8",
    }).trim();

    let commit = "";

    try {
      commit = execSync("git rev-parse --short HEAD", {
        cwd: projectPath,
        encoding: "utf8",
      }).trim();
    } catch {}

    return {
      initialized: true,
      branch,
      commit,
      message: commitMessage,
    };

    return {
      initialized: true,
      branch,
    };
  }
}

module.exports = new GitService();
