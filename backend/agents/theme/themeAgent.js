const BaseAgent = require("../base/BaseAgent");
const themeGenerator = require("../../services/theme/themeGeneratorService");

class ThemeAgent extends BaseAgent {
  constructor() {
    super("Theme");
  }

  async run(context) {
    try {
      this.log(context, "INFO", "Generating design system...");

      const theme = await themeGenerator.generate(context.plan);

      return this.success("Theme generated successfully.", theme);
    } catch (error) {
      this.log(context, "ERROR", error.message);
      return this.failure(error);
    }
  }
}

module.exports = new ThemeAgent();
