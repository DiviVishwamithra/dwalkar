const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const cli = require("../../tools/system/cli");

class VercelService {
  validateCli() {
    if (!cli.exists("vercel")) {
      throw new Error(
        "Vercel CLI is not installed. Install it using: npm install -g vercel",
      );
    }

    console.log(`✅ Vercel CLI: ${cli.version("vercel")}`);
  }

  async deploy(projectPath) {
    const token = process.env.VERCEL_TOKEN;

    if (!token) {
      throw new Error("VERCEL_TOKEN is missing.");
    }

    const vercelPath = path.join(projectPath, ".vercel");

    // ------------------------------------
    // Link project (first time only)
    // ------------------------------------

    if (!fs.existsSync(vercelPath)) {
      console.log("🔗 Linking Vercel project...");

      execSync(`vercel link --yes --token ${token}`, {
        cwd: projectPath,
        stdio: "inherit",
      });
    } else {
      console.log("✅ Vercel project already linked.");
    }

    // ------------------------------------
    // Deploy
    // ------------------------------------

    console.log("🚀 Deploying to Vercel...");

    const output = execSync(`vercel --prod --yes --token ${token}`, {
      cwd: projectPath,
      encoding: "utf8",
    });

    console.log(output);

    const match = output.match(/https:\/\/[^\s]+\.vercel\.app/);

    return {
      provider: "vercel",
      deployed: true,
      url: match ? match[0] : null,
    };
  }
}

module.exports = new VercelService();
