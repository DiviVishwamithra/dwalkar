const fs = require("fs");
const openAI = require("../../tools/openai/openai");
const cleaner = require("../ai/codeCleaner");
const repairPrompt = require("../../prompts/repair/repair.prompt");
const MODELS = require("../../config/models");

class RepairService {
  async repair(issue) {
    console.log(`🔧 Repairing: ${issue.file}`);

    const code = fs.readFileSync(issue.file, "utf8");

    const prompt = `
FILE

${issue.file}

ISSUE TYPE

${issue.type}

ISSUE

${issue.message}

CURRENT CODE

${code}

Fix ONLY this issue.

Return ONLY the corrected file.
`;

    const response = await openAI.generate(MODELS.repair, repairPrompt, prompt);

    const repairedCode = cleaner.clean(response);

    fs.writeFileSync(issue.file, repairedCode);

    return {
      repaired: true,
      file: issue.file,
    };
  }
}

module.exports = new RepairService();
