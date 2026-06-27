const fs = require("fs");
const openAI = require("../../tools/openai/openai");
const cleaner = require("../ai/codeCleaner");
const repairPrompt = require("../../prompts/repair/repair.prompt");
const MODELS = require("../../config/models");
const path = require("path");

class RepairService {
  async repair(projectPath, issue) {
    console.log(`🔧 Repairing: ${issue.file}`);

    const absoluteFilePath = path.join(projectPath, issue.file);

    if (!fs.existsSync(absoluteFilePath)) {
      throw new Error(`Repair failed. File does not exist: ${issue.file}`);
    }

    const code = fs.readFileSync(absoluteFilePath, "utf8");

    const prompt = `
PROJECT

${path.basename(projectPath)}

=====================================

FILE

${issue.file}

=====================================

ISSUE TYPE

${issue.type}

=====================================

ISSUE

${issue.message}

=====================================

AVAILABLE FILES

${fs.readdirSync(path.join(projectPath, "src", "pages")).join("\n")}

=====================================

CURRENT FILE

${code}

=====================================

Fix ONLY the reported issue.

Do NOT modify unrelated code.

Return ONLY the corrected file.
`;

    const response = await openAI.generate(MODELS.repair, repairPrompt, prompt);

    const repairedCode = cleaner.clean(response);

    fs.writeFileSync(absoluteFilePath, repairedCode);

    return {
      repaired: true,
      file: issue.file,
    };
  }
}

module.exports = new RepairService();
