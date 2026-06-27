const axios = require("axios");
const { execSync } = require("child_process");

class GitHubService {
  async publish(projectPath, repositoryName) {
    const username = process.env.GITHUB_USERNAME;
    const token = process.env.GITHUB_TOKEN;

    if (!username || !token) {
      throw new Error(
        "GitHub credentials are missing. Please configure GITHUB_USERNAME and GITHUB_TOKEN.",
      );
    }

    try {
      console.log("🐙 Creating GitHub repository...");

      const response = await axios.post(
        "https://api.github.com/user/repos",
        {
          name: repositoryName,
          private: false,
          auto_init: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github+json",
          },
          timeout: 30000,
        },
      );

      const repository = response.data;

      console.log("🔗 Adding GitHub remote...");

      try {
        execSync("git remote remove origin", {
          cwd: projectPath,
          stdio: "ignore",
        });
      } catch (_) {
        // Remote doesn't exist
      }

      execSync(
        `git remote add origin https://github.com/${username}/${repository.name}.git`,
        {
          cwd: projectPath,
          stdio: "inherit",
        },
      );

      console.log("🚀 Pushing repository...");

      execSync(
        `git push -u https://${token}@github.com/${username}/${repository.name}.git main`,
        {
          cwd: projectPath,
          stdio: "inherit",
        },
      );

      execSync(
        `git remote set-url origin https://github.com/${username}/${repository.name}.git`,
        {
          cwd: projectPath,
          stdio: "ignore",
        },
      );

      console.log("✅ Repository published successfully.");

      return {
        provider: "github",
        repositoryName: repository.name,
        repositoryUrl: repository.html_url,
        cloneUrl: repository.clone_url,
        defaultBranch: repository.default_branch,
        visibility: repository.private ? "private" : "public",
      };
    } catch (error) {
      if (
        error.response?.status === 422 &&
        error.response?.data?.errors?.some((e) => e.code === "already_exists")
      ) {
        throw new Error(
          `Repository "${repositoryName}" already exists on GitHub.`,
        );
      }

      throw new Error(
        error.response?.data?.errors?.[0]?.message ||
          error.response?.data?.message ||
          error.message,
      );
    }
  }
}

module.exports = new GitHubService();
