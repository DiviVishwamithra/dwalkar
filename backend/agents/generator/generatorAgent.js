const BaseAgent = require("../base/BaseAgent");

const reactGenerator = require("../../services/ai/reactGeneratorService");
const writer = require("../../services/filesystem/fileWriterService");

class GeneratorAgent extends BaseAgent {
  constructor() {
    super("Generator");
  }

  async run(context) {
    try {
      this.log(context, "INFO", "Generating source files...");

      const files = context.plan.files;

      context.plan.theme = context.theme;
      context.plan.assets = context.assets;

      for (const file of files) {
        this.log(context, "INFO", `Generating ${file.path}`);

        const code = await reactGenerator.generate(context.plan, file);

        writer.write(context.project.projectPath, file.path, code);
      }

      return this.success("Files generated successfully.", {
        filesGenerated: files.length,
      });
    } catch (error) {
      this.log(context, "ERROR", error.message);

      return this.failure(error);
    }
  }
}

module.exports = new GeneratorAgent();
