const axios = require("axios");
const { execSync } = require("child_process");

class PullRequestService {
  async create(projectPath, repositoryName) {
    const username = process.env.GITHUB_USERNAME;
    const token = process.env.GITHUB_TOKEN;
    const defaultBranch = process.env.GITHUB_DEFAULT_BRANCH || "main";

    if (!username || !token) {
      throw new Error("GitHub credentials are missing.");
    }

    const featureBranch =
      context?.plan?.branchName || `feature/${repositoryName}`;

    try {
      console.log("🌿 Preparing feature branch...");

      // Check whether branch already exists
      try {
        execSync(`git rev-parse --verify ${featureBranch}`, {
          cwd: projectPath,
          stdio: "ignore",
        });

        console.log("✅ Feature branch already exists.");

        execSync(`git checkout ${featureBranch}`, {
          cwd: projectPath,
          stdio: "inherit",
        });
      } catch {
        console.log("🌿 Creating feature branch...");

        execSync(`git checkout -b ${featureBranch}`, {
          cwd: projectPath,
          stdio: "inherit",
        });
      }

      console.log("📦 Staging files...");

      execSync("git add .", {
        cwd: projectPath,
        stdio: "inherit",
      });

      const changes = execSync("git diff --cached --name-only", {
        cwd: projectPath,
        encoding: "utf8",
      }).trim();

      if (!changes) {
        console.log("✅ No staged changes.");

        return {
          skipped: true,
          message: "No staged changes available for Pull Request.",
          branch: featureBranch,
        };
      }

      console.log("📝 Creating commit...");

      execSync(
        `git commit -m "feat: generated ${repositoryName} using Dwalkar"`,
        {
          cwd: projectPath,
          stdio: "inherit",
        },
      );

      console.log("🚀 Pushing feature branch...");

      execSync(
        `git push -u https://${token}@github.com/${username}/${repositoryName}.git ${featureBranch}`,
        {
          cwd: projectPath,
          stdio: "inherit",
        },
      );

      console.log("🔍 Checking existing Pull Requests...");

      const existingPrResponse = await axios.get(
        `https://api.github.com/repos/${username}/${repositoryName}/pulls`,
        {
          params: {
            state: "open",
            head: `${username}:${featureBranch}`,
            base: defaultBranch,
          },
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github+json",
          },
        },
      );

      if (existingPrResponse.data.length > 0) {
        const existingPr = existingPrResponse.data[0];

        console.log("✅ Existing Pull Request found.");

        return {
          provider: "github",
          branch: featureBranch,
          pullRequestNumber: existingPr.number,
          pullRequestUrl: existingPr.html_url,
          state: existingPr.state,
          existing: true,
        };
      }

      console.log("📬 Creating Pull Request...");

      const response = await axios.post(
        `https://api.github.com/repos/${username}/${repositoryName}/pulls`,
        {
          title: `feat: generated ${repositoryName} using Dwalkar`,
          head: featureBranch,
          base: defaultBranch,
          body: `## 🤖 Dwalkar AI

Automatically generated project.

### Pipeline

- Planner
- Project
- Package
- Theme
- Assets
- Generator
- Validator
- Repair
- Build
- Git
- Repository
- Pull Request

Ready for review.
`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github+json",
          },
        },
      );

      console.log("✅ Pull Request created.");

      return {
        provider: "github",
        branch: featureBranch,
        pullRequestNumber: response.data.number,
        pullRequestUrl: response.data.html_url,
        state: response.data.state,
        existing: false,
      };
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }
}

module.exports = new PullRequestService();
