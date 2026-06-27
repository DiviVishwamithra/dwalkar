const axios = require("axios");
const { execSync } = require("child_process");

class RepositoryService {
  constructor() {
    this.username = process.env.GITHUB_USERNAME;
    this.token = process.env.GITHUB_TOKEN;
  }

  async publish(projectPath, repositoryName) {
    this.validateCredentials();

    let repository = await this.getRepository(repositoryName);

    if (!repository) {
      console.log("📦 Repository not found. Creating...");
      repository = await this.createRepository(repositoryName);
    } else {
      console.log("✅ Repository already exists.");
    }

    await this.configureRemote(projectPath, repository);
    await this.push(projectPath, repository);

    return {
      provider: "github",
      created: true,
      exists: false,
      repositoryName: repository.name,
      repositoryUrl: repository.html_url,
      cloneUrl: repository.clone_url,
      defaultBranch: repository.default_branch,
      visibility: repository.private ? "private" : "public",
    };

    console.log("✅ Repository already exists.");

    // Keep remote in sync, but DO NOT push
    await this.configureRemote(projectPath, repository);

    return {
      provider: "github",
      created: false,
      exists: true,
      repositoryName: repository.name,
      repositoryUrl: repository.html_url,
      cloneUrl: repository.clone_url,
      defaultBranch: repository.default_branch,
      visibility: repository.private ? "private" : "public",
    };
  }

  validateCredentials() {
    if (!this.username || !this.token) {
      throw new Error(
        "GitHub credentials are missing. Configure GITHUB_USERNAME and GITHUB_TOKEN.",
      );
    }
  }

  async getRepository(repositoryName) {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${this.username}/${repositoryName}`,
        {
          timeout: 30000,
          headers: {
            Authorization: `Bearer ${this.token}`,
            Accept: "application/vnd.github+json",
          },
        },
      );

      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        return null;
      }

      throw new Error(error.response?.data?.message || error.message);
    }
  }

  async createRepository(repositoryName) {
    const response = await axios.post(
      "https://api.github.com/user/repos",
      {
        name: repositoryName,
        private: false,
        auto_init: false,
      },
      {
        timeout: 30000,
        headers: {
          Authorization: `Bearer ${this.token}`,
          Accept: "application/vnd.github+json",
        },
      },
    );

    console.log("✅ Repository created.");

    return response.data;
  }

  async configureRemote(projectPath, repository) {
    console.log("🔗 Configuring Git remote...");

    try {
      execSync("git remote remove origin", {
        cwd: projectPath,
        stdio: "ignore",
      });
    } catch (_) {}

    execSync(`git remote add origin ${repository.clone_url}`, {
      cwd: projectPath,
      stdio: "inherit",
    });
  }

  async push(projectPath, repository) {
    console.log("🚀 Pushing code...");

    execSync(
      `git push -u https://${this.token}@github.com/${this.username}/${repository.name}.git main`,
      {
        cwd: projectPath,
        stdio: "inherit",
      },
    );

    execSync(`git remote set-url origin ${repository.clone_url}`, {
      cwd: projectPath,
      stdio: "ignore",
    });

    console.log("✅ Push completed.");
  }
}

module.exports = new RepositoryService();
