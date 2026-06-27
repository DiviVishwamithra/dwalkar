const BaseAgent = require("../base/BaseAgent");
const packageService = require("../../services/package/packageService");

class PackageAgent extends BaseAgent {
  constructor() {
    super("Package");
  }

  async run(context) {
    try {
      this.log(context, "INFO", "Installing required packages...");

      await packageService.install(context);

      return this.success("Packages installed.", {
        installed: true,
        packages: [
          "react",
          "react-dom",
          "react-router-dom",
          "tailwindcss",
          "@tailwindcss/vite",
        ],
      });
    } catch (error) {
      this.log(context, "ERROR", error.message);
      return this.failure(error);
    }
  }
}

module.exports = new PackageAgent();
