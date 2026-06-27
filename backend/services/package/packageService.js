const terminal = require("../terminal/terminalService");

class PackageService {
  async install(context) {
    const packages = this.detectPackages(context.plan);

    if (!packages.length) return;

    console.log("Installing:", packages.join(", "));

    await terminal.execute(
      `npm install ${packages.join(" ")}`,
      context.project.projectPath,
    );
  }

  detectPackages(plan) {
    const packages = [];

    if (plan.framework === "React") {
      packages.push("react-router-dom");
    }

    if (plan.styling === "Tailwind CSS") {
      packages.push("@tailwindcss/vite", "tailwindcss");
    }

    return [...new Set(packages)];
  }
}

module.exports = new PackageService();
